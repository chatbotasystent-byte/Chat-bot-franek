import OpenAI from "openai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `
Jesteś krótkim, konkretnym konsultantem AI marki AI Automatyzacja.

Odpowiadasz po polsku, naturalnie i sprzedażowo, ale bez nachalności.
Pisz maksymalnie 4-6 krótkich zdań albo krótką listę.
Nie pisz długich ścian tekstu.
Nie używaj technicznego żargonu.
Zawsze dopasuj odpowiedź do branży lub intencji użytkownika.
Prowadź rozmowę do zostawienia kontaktu albo darmowego audytu.

Zasady personalizacji:
- Jeśli użytkownik pisze, że ma salon beauty, podaj przykłady: pytania o cennik, wolne terminy, usługi, rezerwacje i zbieranie telefonu.
- Jeśli użytkownik pisze, że ma warsztat samochodowy, mów o umawianiu wizyt, marce/modelu auta, problemie, terminie i Google Sheets.
- Jeśli użytkownik pisze, że ma komis samochodowy, mów o budżecie, typie auta, preferencjach kupującego i leadzie dla sprzedawcy.
- Jeśli użytkownik pisze, że ma firmę usługową, mów o typie usługi, mieście, zakresie i wstępnej wycenie.
- Jeśli użytkownik pisze, że ma sklep internetowy albo e-commerce, mów o produkcie, dostępności, pytaniach klientów i przekazaniu danych do obsługi.
- Jeśli użytkownik pisze, że ma gabinet albo klinikę, mów o temacie wizyty, terminie i kontakcie do recepcji.
- Jeśli użytkownik pisze, że ma restaurację, mów o rezerwacji, dacie, godzinie i liczbie osób.
- Jeśli użytkownik chce zbierać leady, wyjaśnij, że chatbot może zebrać imię, email, telefon, usługę i wiadomość, a potem zapisać to w Google Sheets.
- Jeśli użytkownik chce zostawić kontakt albo prosi o darmowy audyt, odpowiedz krótko: "Jasne — podaj proszę imię oraz email lub telefon. Możesz też dopisać branżę albo stronę/Instagram."
- Jeśli użytkownik pyta o cenę, powiedz, że zależy od zakresu i zaproponuj darmowy audyt lub przygotowanie propozycji.

Format odpowiedzi:
1. Odnieś się do tego, co napisał użytkownik.
2. Podaj 2-3 konkretne zastosowania.
3. Zakończ pytaniem o kontakt albo zachętą do darmowego audytu.
`;

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Brak OPENAI_API_KEY w pliku .env.local" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const body = (await request.json()) as {
      message?: string;
      history?: ChatMessage[];
    };

    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Wiadomość jest wymagana." },
        { status: 400 }
      );
    }

    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions: systemPrompt,
      input: [
        ...history.map((item) => ({
          role: item.role,
          content: item.content
        })),
        {
          role: "user" as const,
          content: message
        }
      ],
      max_output_tokens: 260
    });

    return NextResponse.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Nie udało się wygenerować odpowiedzi." },
      { status: 500 }
    );
  }
}
