import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  website?: string;
  industry?: string;
  message?: string;
};

async function saveLead(lead: LeadPayload) {
  console.log("New AI Growth Partners lead:", {
    ...lead,
    createdAt: new Date().toISOString()
  });

  // Later you can send this payload to Make, Zapier or Google Sheets here.
  // Example:
  // if (process.env.MAKE_WEBHOOK_URL) {
  //   await fetch(process.env.MAKE_WEBHOOK_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(lead)
  //   });
  // }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const lead = {
      name: body.name?.trim() ?? "",
      email: body.email?.trim() ?? "",
      phone: body.phone?.trim() ?? "",
      companyName: body.companyName?.trim() ?? "",
      website: body.website?.trim() ?? "",
      industry: body.industry?.trim() ?? "",
      message: body.message?.trim() ?? ""
    };

    if (
      !lead.name ||
      !lead.email ||
      !lead.website ||
      !lead.industry ||
      !lead.message
    ) {
      return NextResponse.json(
        { error: "Wypełnij wszystkie pola formularza." },
        { status: 400 }
      );
    }

    await saveLead(lead);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);

    return NextResponse.json(
      { error: "Nie udało się zapisać leada." },
      { status: 500 }
    );
  }
}
