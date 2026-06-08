"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    setMessage("");

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      website: String(formData.get("website") ?? ""),
      industry: String(formData.get("industry") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Nie udało się wysłać formularza.");
      }

      form.reset();
      setState("success");
      setMessage("Dziękujemy. Przygotujemy krótką propozycję i wrócimy z kontaktem.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas wysyłania formularza."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-cyan-950/20 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Imię
          <input
            name="name"
            required
            className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            placeholder="Anna"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            placeholder="anna@example.com"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Strona firmy
          <input
            name="website"
            required
            className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            placeholder="https://twojafirma.pl"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Branża
          <input
            name="industry"
            required
            className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
            placeholder="np. salon beauty, usługi, klinika"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-ink">
        Wiadomość
        <textarea
          name="message"
          rows={5}
          required
          className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
          placeholder="Opisz krótko firmę i pytania, które najczęściej zadają klienci."
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
          className="mt-6 w-full rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {state === "loading" ? "Wysyłanie..." : "Wyślij zgłoszenie"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            state === "error" ? "text-red-600" : "text-sage"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
