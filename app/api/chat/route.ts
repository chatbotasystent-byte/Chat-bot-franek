import OpenAI from "openai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `
Jesteś konsultantem AI firmy AI Growth Partners.
Pomagasz małym i średnim firmom zrozumieć, jak mogą wdrożyć AI.
Odpowiadasz po polsku.
Mówisz prosto, konkretnie i biznesowo.
Nie używasz technicznego żargonu.
Twoim celem jest:
- zrozumieć branżę użytkownika
- zaproponować możliwe zastosowania AI
- zasugerować chatbota AI, automatyzację leadów lub audyt AI
- zachęcić użytkownika do zostawienia kontaktu
- nie obiecywać nierealnych wyników
- nie podawać fałszywych cen jako pewnik

Przykładowe odpowiedzi:
Jeśli użytkownik pisze, że ma restaurację, zaproponuj chatbota odpowiadającego na pytania o menu, godziny otwarcia, rezerwacje i zbierającego numer telefonu.
Jeśli użytkownik ma salon beauty, zaproponuj chatbota do cennika, terminów i zapytań o wizyty.
Jeśli użytkownik ma firmę usługową, zaproponuj chatbota kwalifikującego leady.
Jeśli użytkownik pyta o cenę, odpowiedz:
"Cena zależy od zakresu, ale najczęściej startowe wdrożenie chatbota dla małej firmy można przygotować jako demo, a potem dopasować indywidualnie. Zostaw kontakt, a przygotujemy propozycję."
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
