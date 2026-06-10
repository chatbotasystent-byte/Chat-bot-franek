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
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const createdAt = new Date().toISOString();

    const lead = {
      createdAt,
      name: body.name?.trim() ?? "",
      email: body.email?.trim() ?? "",
      phone: body.phone?.trim() ?? "",
      website: body.website?.trim() ?? "",
      companyName: body.companyName?.trim() ?? "",
      industry: body.industry?.trim() ?? "",
      message: body.message?.trim() ?? "",
      source: body.source?.trim() ?? ""
    };

    if (!lead.email) {
      return NextResponse.json(
        { error: "Email jest wymagany" },
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);

    return NextResponse.json(
      { error: "Nie udało się zapisać leada." },
      { status: 500 }
    );
  }
}
