import OpenAI from "openai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `
Bot reprezentuje salon kosmetyczny Beauty Lux.
Odpowiada po polsku, krótko, profesjonalnie.
Dane firmy:
- manicure hybrydowy: od 120 zł
- pedicure: od 140 zł
- stylizacja brwi: od 80 zł
- godziny otwarcia: poniedziałek-piątek 9:00-18:00, sobota 10:00-14:00
- lokalizacja: Warszawa, Mokotów
Jeśli klient chce rezerwację, zachęć do zostawienia numeru telefonu.
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
      max_output_tokens: 220
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
