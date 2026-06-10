import OpenAI from "openai";
import { NextResponse } from "next/server";

type ExtractedLead = {
  name: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  industry: string;
  message: string;
  hasContact: boolean;
  missingContact: boolean;
};

const fallbackMessage = "Kontakt zostawiony przez chatbota";

const systemPrompt = `
Jesteś parserem leadów z rozmowy chatbota AI.
Twoim zadaniem jest wyciągnąć dane kontaktowe i biznesowe z tekstu użytkownika.
Zwracasz wyłącznie poprawny JSON.

Pola:
- name: imię i nazwisko osoby kontaktowej
- email: poprawny adres email
- phone: numer telefonu
- website: strona www lub Instagram
- companyName: nazwa firmy
- industry: branża
- message: krótki opis potrzeby użytkownika, bez danych kontaktowych
- hasContact: true jeśli istnieje email albo telefon
- missingContact: true jeśli nie ma emaila i telefonu

Zasady:
1. Dane kontaktowe nie mogą trafiać do message.
2. Jeśli użytkownik podał tylko imię, email i telefon, message ustaw na "Kontakt zostawiony przez chatbota".
3. Jeśli użytkownik podał opis potrzeby, zostaw go w message, ale usuń z niego imię, email, telefon, stronę i Instagram.
4. Rozpoznawaj polskie imiona i nazwiska.
5. Zachowuj polskie znaki.
6. Rozpoznawaj chaotyczne teksty.
7. Jeśli użytkownik pisze "imie łukasz bąk", name ma być "Łukasz Bąk".
8. Jeśli użytkownik pisze "telefon 5654321354", phone ma być "5654321354".
9. Jeśli użytkownik pisze "email lukasz@gmail.com", email ma być "lukasz@gmail.com".
10. Jeśli email jest niepoprawny, zostaw email pusty.
11. Jeśli telefon ma mniej niż 7 cyfr, zostaw phone pusty.
12. Jeśli jest @profil albo instagram.com/profil, zapisz to w website.
13. Jeśli jest domena typu firma.pl, zapisz to w website.
14. Jeśli jest branża typu warsztat, komis, beauty, barber, klinika, restauracja, e-commerce, zapisz ją w industry.
15. Zwracaj tylko JSON.
`;

function emptyLead(): ExtractedLead {
  return {
    name: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
    industry: "",
    message: fallbackMessage,
    hasContact: false,
    missingContact: true
  };
}

function getEmail(text: string) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]?.trim() ?? "";
}

function getPhone(text: string) {
  const matches = text.match(/(?:\+?\d[\d\s-]{5,}\d)/g) ?? [];

  return matches.find((match) => {
    const digits = match.replace(/\D/g, "").replace(/^48(?=\d{9}$)/, "");
    return digits.length >= 7;
  })?.trim() ?? "";
}

function getWebsite(text: string) {
  const instagram = text.match(/(?:instagram\.com\/[^\s,;]+|@[a-zA-Z0-9._]+)/i)?.[0];

  if (instagram) {
    return instagram.trim();
  }

  const instagramProfile = text.match(/\binstagram\s+([a-zA-Z0-9._]{2,30})\b/i)?.[1];

  if (instagramProfile) {
    return `@${instagramProfile}`;
  }

  const domain = text.match(/(?:https?:\/\/[^\s,;]+|www\.[^\s,;]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s,;]*)/)?.[0]?.trim() ?? "";
  const commonMailDomains = new Set(["gmail.com", "wp.pl", "onet.pl", "interia.pl", "o2.pl", "icloud.com", "outlook.com"]);
  const normalizedDomain = domain.replace(/^https?:\/\//, "").replace(/^www\./, "").toLowerCase();

  return commonMailDomains.has(normalizedDomain) ? "" : domain;
}

function detectIndustry(text: string) {
  const normalizedText = text.toLowerCase();

  if (/(warsztat|mechanik|auto serwis|autoserwis)/i.test(normalizedText)) return "warsztat samochodowy";
  if (/(komis|sprzedaż aut|sprzedaz aut|samochody używane|samochody uzywane)/i.test(normalizedText)) return "komis samochodowy";
  if (/(beauty|kosmetycz|paznokcie|fryzjer|barber|salon)/i.test(normalizedText)) return "salon beauty";
  if (/(klinika|gabinet|stomatolog|lekarz)/i.test(normalizedText)) return "klinika / gabinet";
  if (/(restauracja|gastronomia|stolik|rezerwacje)/i.test(normalizedText)) return "restauracja";
  if (/(sklep|ecommerce|e-commerce|produkty)/i.test(normalizedText)) return "e-commerce";
  if (/(nieruchomości|nieruchomosci|mieszkania|deweloper|agent)/i.test(normalizedText)) return "nieruchomości";
  if (/(kursy|szkoła|szkola|szkolenia|edukacja)/i.test(normalizedText)) return "edukacja / kursy";
  if (/(usługi|uslugi|firma usługowa|firma uslugowa)/i.test(normalizedText)) return "firma usługowa";

  return "";
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeExtractedData(text: string, parts: string[]) {
  return parts
    .filter(Boolean)
    .reduce((value, part) => value.replace(new RegExp(escapeRegExp(part), "gi"), " "), text)
    .replace(/\b(imie|imię|nazwisko|telefon|tel\.?|email|e-mail|mail|kontakt|branża|branza|strona|instagram|to)\b/gi, " ")
    .replace(/[;,|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCaseName(text: string) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase("pl-PL") + word.slice(1).toLocaleLowerCase("pl-PL"))
    .join(" ");
}

function stripIndustryWords(text: string) {
  return text
    .replace(/\b(mam|prowadzę|prowadze|firma|firmę|firme|samochodowy|samochodowa|warsztat|mechanik|auto|serwis|autoserwis|komis|sprzedaż|sprzedaz|aut|samochody|używane|uzywane|salon|beauty|kosmetyczny|kosmetyczna|kosmetycz|paznokcie|fryzjer|barber|klinika|gabinet|stomatolog|lekarz|restauracja|rezerwacje|stolik|gastronomia|sklep|ecommerce|e-commerce|produkty|nieruchomości|nieruchomosci|mieszkania|deweloper|agent|kursy|szkoła|szkola|szkolenia|edukacja|usługi|uslugi|usługowa|uslugowa|inne)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getName(text: string, email: string, phone: string, website: string, industry: string) {
  const blockedWords = new Set([
    "telefon", "tel", "email", "mail", "kontakt", "branża", "branza", "strona", "instagram",
    "imie", "imię", "nazwisko", "mam", "chcę", "chce", "i", "oraz", "prowadzę", "prowadze", "firma", "warsztat", "samochodowy",
    "komis", "salon", "beauty", "klinika", "gabinet", "restauracja", "sklep", "ecommerce",
    "e-commerce", "usługi", "uslugi", "umawiać", "umawiac", "klientów", "klientow", "to", "a"
  ]);

  function pickName(source: string) {
    const nameWords = stripIndustryWords(source)
      .split(" ")
      .filter((word) => /^[\p{L}'-]+$/u.test(word))
      .filter((word) => !blockedWords.has(word.toLowerCase()))
      .slice(0, 3);

    return nameWords.length > 0 && nameWords.length <= 3 ? titleCaseName(nameWords.join(" ")) : "";
  }

  const textWithoutData = text
    .replace(email, " ")
    .replace(phone, " ")
    .replace(website, " ")
    .replace(industry, " ");
  const afterNameLabel = textWithoutData.match(/\b(?:imie|imię|nazywam się|nazywam sie)\s+([\p{L}'-]+(?:\s+[\p{L}'-]+){0,2})/iu)?.[1];

  if (afterNameLabel) {
    return pickName(afterNameLabel);
  }

  const segments = textWithoutData
    .split(/[;,|]/)
    .map((segment) => removeExtractedData(segment, []))
    .filter(Boolean);
  const nameSegment = segments.find((segment) => {
    const normalizedSegment = segment.toLowerCase();
    return !/\b(mam|chcę|chce|potrzebuję|potrzebuje|prowadzę|prowadze)\b/i.test(normalizedSegment) && pickName(segment);
  });

  if (nameSegment) {
    return pickName(nameSegment);
  }

  const nameWords = removeExtractedData(textWithoutData, [])
    .split(" ")
    .filter((word) => /^[\p{L}'-]+$/u.test(word))
    .filter((word) => !blockedWords.has(word.toLowerCase()))
    .slice(0, 3);

  return nameWords.length > 0 ? titleCaseName(nameWords.join(" ")) : "";
}

function getMessage(text: string, email: string, phone: string, website: string, name: string) {
  const withoutData = removeExtractedData(text, [email, phone, website, name]);
  const firstSegment = withoutData.split(/[;,|]/)[0]?.trim() ?? "";

  if (/\b(mam|prowadzę|prowadze|chcę|chce|potrzebuję|potrzebuje)\b/i.test(firstSegment)) {
    return firstSegment.slice(0, 1000);
  }

  return fallbackMessage;
}

function fallbackExtractLead(text: string): ExtractedLead {
  const email = getEmail(text);
  const phone = getPhone(text);
  const website = getWebsite(email ? text.replace(email, " ") : text);
  const industry = detectIndustry(text);
  const name = getName(text, email, phone, website, industry);
  const message = getMessage(text, email, phone, website, name);
  const hasContact = Boolean(email || phone);

  return {
    name,
    email,
    phone,
    website,
    companyName: "",
    industry,
    message: message || fallbackMessage,
    hasContact,
    missingContact: !hasContact
  };
}

function normalizeLead(value: Partial<ExtractedLead>, fallback: ExtractedLead): ExtractedLead {
  const email = typeof value.email === "string" && getEmail(value.email) ? value.email.trim() : fallback.email;
  const phone = typeof value.phone === "string" && value.phone.replace(/\D/g, "").length >= 7 ? value.phone.trim() : fallback.phone;
  const hasContact = Boolean(email || phone);

  return {
    name: typeof value.name === "string" ? value.name.trim() : fallback.name,
    email,
    phone,
    website: typeof value.website === "string" ? value.website.trim() : fallback.website,
    companyName: typeof value.companyName === "string" ? value.companyName.trim() : fallback.companyName,
    industry: typeof value.industry === "string" ? value.industry.trim() : fallback.industry,
    message: typeof value.message === "string" && value.message.trim() ? value.message.trim().slice(0, 1000) : fallback.message,
    hasContact,
    missingContact: !hasContact
  };
}

function parseJson(text: string) {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(cleaned) as Partial<ExtractedLead>;
}

export async function POST(request: Request) {
  const body = (await request.json()) as { text?: string };
  const text = body.text?.trim() ?? "";
  const fallback = text ? fallbackExtractLead(text) : emptyLead();

  console.log("Extract lead input:", text);

  if (!text) {
    return NextResponse.json(fallback);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("Extract lead fallback: missing OPENAI_API_KEY");
    return NextResponse.json(fallback);
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions: systemPrompt,
      input: `Tekst użytkownika:\n${text}`,
      max_output_tokens: 500
    });
    const parsed = parseJson(response.output_text);
    const extracted = normalizeLead(parsed, fallback);

    if (extracted.message && extracted.message !== fallbackMessage) {
      extracted.message = getMessage(text, extracted.email, extracted.phone, extracted.website, extracted.name);
    }

    console.log("Extract lead output:", extracted);
    return NextResponse.json(extracted);
  } catch (error) {
    console.error("Extract lead failed, using fallback:", error);
    console.log("Extract lead fallback output:", fallback);
    return NextResponse.json(fallback);
  }
}
