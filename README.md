# AI Growth Partners - demo strony z chatbotem AI

Kompletna aplikacja Next.js App Router dla firmy, która pomaga małym i średnim biznesom wdrażać AI. Strona sprzedaje usługę przygotowania chatbotów AI, automatyzacji zbierania leadów, integracji formularzy z Google Sheets oraz audytów AI.

## Co zawiera projekt

- landing page dla AI Growth Partners
- widget chatu AI działający jako konsultant biznesowy
- formularz kontaktowy do zamówienia darmowego demo AI
- endpoint `/api/chat` korzystający z OpenAI Responses API
- endpoint `/api/lead` przygotowany pod późniejszą integrację z Google Sheets, Make albo Zapier
- Tailwind CSS i TypeScript

## Wymagania

- Node.js 20 lub nowszy
- konto OpenAI i klucz API

## Jak zainstalować Node.js

1. Wejdź na stronę [nodejs.org](https://nodejs.org/).
2. Pobierz wersję LTS dla swojego systemu.
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

Wklej swój klucz OpenAI po znaku `=` w zmiennej `OPENAI_API_KEY`. Nie dodawaj cudzysłowów i nie wpisuj klucza w żadnym pliku React ani frontendowym.

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

1. Zaloguj się do panelu OpenAI.
2. Utwórz nowy API key.
3. Wklej go do pliku `.env.local`:

```bash
OPENAI_API_KEY=
```

4. Zapisz plik.
5. Zrestartuj `npm run dev`, bo Next.js wczytuje zmienne środowiskowe przy starcie serwera.

Klucz jest używany tylko po stronie serwera w endpointzie `/api/chat`, więc nie trafia do frontendu.

## Wdrożenie na Vercel

1. Wypchnij projekt do repozytorium GitHub.
2. Wejdź na [vercel.com](https://vercel.com/) i wybierz `Add New Project`.
3. Zaimportuj repozytorium.
4. W ustawieniach projektu dodaj zmienne środowiskowe:

```bash
OPENAI_API_KEY=
MAKE_WEBHOOK_URL=
```

5. Kliknij `Deploy`.

## Najważniejsze pliki

- `app/page.tsx` - strona główna landing page'a AI Growth Partners.
- `components/ChatWidget.tsx` - interaktywny widget chatu dla konsultanta AI.
- `components/ContactForm.tsx` - formularz kontaktowy do zamówienia darmowego demo.
- `app/api/chat/route.ts` - endpoint łączący aplikację z OpenAI Responses API.
- `app/api/lead/route.ts` - endpoint przyjmujący leady z formularza.
- `.env.example` - przykładowe zmienne środowiskowe.
