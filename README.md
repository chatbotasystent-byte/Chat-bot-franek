# AI Chatbot dla salonu Beauty Lux

Kompletna aplikacja Next.js App Router z landing page'em, widgetem chatu AI i prostym formularzem kontaktowym dla salonu kosmetycznego.

## Wymagania

- Node.js 20 lub nowszy
- konto OpenAI i klucz API

## Jak zainstalować Node.js

1. Wejdz na strone [nodejs.org](https://nodejs.org/).
2. Pobierz wersje LTS dla swojego systemu.
3. Zainstaluj Node.js z domyślnymi ustawieniami.
4. Sprawdź instalację w terminalu:

```bash
node -v
npm -v
```

## Uruchomienie lokalnie

Zainstaluj zależności:

```bash
npm install
```

Utwórz plik `.env.local` w głównym katalogu projektu:

```bash
OPENAI_API_KEY=
MAKE_WEBHOOK_URL=
```

Wklej swój klucz OpenAI po znaku `=` w zmiennej `OPENAI_API_KEY`.
Nie dodawaj cudzysłowów i nie wpisuj klucza w żadnym pliku React ani frontendowym.

Po zmianie `.env.local` zrestartuj serwer developerski:

1. Zatrzymaj działające `npm run dev` skrótem `Ctrl + C`.
2. Uruchom aplikację ponownie:

```bash
npm run dev
```

Otwórz w przeglądarce:

```text
http://localhost:3000
```

## Jak dodać OPENAI_API_KEY

1. Zaloguj sie do panelu OpenAI.
2. Utwórz nowy API key.
3. Wklej go do pliku `.env.local`:

```bash
OPENAI_API_KEY=
```

4. Zapisz plik.
5. Zrestartuj `npm run dev`, bo Next.js wczytuje zmienne środowiskowe przy starcie serwera.

Klucz jest używany tylko po stronie serwera w endpointzie `/api/chat`, więc nie trafia do frontendu.

## Wdrozenie na Vercel

1. Wypchnij projekt do repozytorium GitHub.
2. Wejdz na [vercel.com](https://vercel.com/) i wybierz `Add New Project`.
3. Zaimportuj repozytorium.
4. W ustawieniach projektu dodaj zmienne środowiskowe:

```bash
OPENAI_API_KEY=
MAKE_WEBHOOK_URL=
```

5. Kliknij `Deploy`.

## Najważniejsze pliki

- `app/page.tsx` - strona główna landing page'a.
- `components/ChatWidget.tsx` - interaktywny widget chatu.
- `components/ContactForm.tsx` - formularz kontaktowy.
- `app/api/chat/route.ts` - endpoint łączący aplikację z OpenAI Responses API.
- `app/api/lead/route.ts` - endpoint przyjmujący leady z formularza.
- `.env.example` - przykładowe zmienne środowiskowe.
