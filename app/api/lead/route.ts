import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  companyName?: string;
  industry?: string;
  message?: string;
  source?: string;
  companyWebsiteConfirm?: string;
  elapsedMs?: number;
};

const RATE_LIMIT_MS = 90_000;
const MIN_FORM_TIME_MS = 3_000;
const lastLeadByIp = new Map<string, number>();

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "unknown";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (clean(body.companyWebsiteConfirm, 200)) {
      return NextResponse.json({ success: true });
    }

    if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FORM_TIME_MS) {
      return NextResponse.json(
        { error: "Formularz został wysłany zbyt szybko. Spróbuj ponownie." },
        { status: 400 }
      );
    }

    const ip = getClientIp(request);
    const now = Date.now();
    const lastLeadAt = lastLeadByIp.get(ip) ?? 0;

    if (now - lastLeadAt < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Zbyt wiele zgłoszeń. Spróbuj ponownie za chwilę." },
        { status: 429 }
      );
    }

    const createdAt = new Date().toISOString();
    const lead = {
      createdAt,
      name: clean(body.name, 120),
      email: clean(body.email, 160),
      phone: clean(body.phone, 40),
      website: clean(body.website, 200),
      companyName: clean(body.companyName, 160),
      industry: clean(body.industry, 120),
      message: clean(body.message, 1000),
      source: clean(body.source, 80)
    };

    if (!lead.name) {
      return NextResponse.json({ error: "Podaj imię i nazwisko." }, { status: 400 });
    }

    if (!lead.email) {
      return NextResponse.json({ error: "Podaj adres email." }, { status: 400 });
    }

    if (!isValidEmail(lead.email)) {
      return NextResponse.json({ error: "Podaj poprawny adres email." }, { status: 400 });
    }

    if (!lead.website) {
      return NextResponse.json({ error: "Podaj stronę firmy lub Instagram." }, { status: 400 });
    }

    if (!lead.message) {
      return NextResponse.json(
        { error: "Napisz krótko, czego dotyczy zgłoszenie." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Brak MAKE_WEBHOOK_URL w konfiguracji serwera" },
        { status: 500 }
      );
    }

    let makeResponse: Response;

    try {
      makeResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });
    } catch (error) {
      console.error("Make webhook request failed:", error);

      return NextResponse.json(
        { error: "Nie udało się przekazać leada do automatyzacji" },
        { status: 502 }
      );
    }

    if (!makeResponse.ok) {
      console.error("Make webhook responded with error:", makeResponse.status);

      return NextResponse.json(
        { error: "Nie udało się przekazać leada do automatyzacji" },
        { status: 502 }
      );
    }

    lastLeadByIp.set(ip, now);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);

    return NextResponse.json(
      { error: "Nie udało się zapisać leada." },
      { status: 500 }
    );
  }
}
