import Link from "next/link";

export const metadata = {
  title: "Polityka prywatności | AI Automatyzacja",
  description: "Podstawowe informacje o przetwarzaniu danych w formularzu kontaktowym AI Automatyzacja."
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030705] px-5 py-12 text-[#F4FFF9] sm:px-8 lg:px-12">
      <section className="mx-auto max-w-3xl rounded-3xl border border-[#86EFAC]/16 bg-[#0B1F18]/[0.045] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
        <Link
          href="/"
          className="inline-flex rounded-full border border-[#86EFAC]/22 px-4 py-2 text-sm font-semibold text-[#86EFAC] transition hover:border-[#86EFAC]/45 hover:bg-[#0B1F18]/[0.06]"
        >
          Wróć na stronę główną
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#86EFAC]">
          AI Automatyzacja
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
          Polityka prywatności
        </h1>
        <p className="mt-4 leading-7 text-[#D6D3D1]">
          Ta strona opisuje, jakie dane mogą być przetwarzane po wysłaniu formularza kontaktowego
          lub zgłoszenia dotyczącego darmowego audytu AI.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-[#D6D3D1]">
          <section>
            <h2 className="text-lg font-semibold text-[#F4FFF9]">Jakie dane zbieramy?</h2>
            <p className="mt-2">
              Możemy przetwarzać dane wpisane w formularzu: imię i nazwisko, adres email, telefon,
              stronę firmy lub profil społecznościowy, nazwę firmy, branżę oraz treść wiadomości.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#F4FFF9]">W jakim celu?</h2>
            <p className="mt-2">
              Dane są wykorzystywane do kontaktu w sprawie audytu, przygotowania propozycji
              automatyzacji AI oraz obsługi zapytania przesłanego przez stronę.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#F4FFF9]">Gdzie trafiają dane?</h2>
            <p className="mt-2">
              Zgłoszenia mogą być przekazywane do narzędzi automatyzacji, takich jak Make,
              Google Sheets lub poczta email, wyłącznie w celu obsługi kontaktu.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#F4FFF9]">Jak długo przechowujemy dane?</h2>
            <p className="mt-2">
              Dane są przechowywane przez czas potrzebny do obsługi zgłoszenia i dalszej komunikacji,
              chyba że poprosisz o ich usunięcie.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#F4FFF9]">Kontakt</h2>
            <p className="mt-2">
              W sprawach związanych z danymi osobowymi możesz skontaktować się przez formularz
              na stronie głównej.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

