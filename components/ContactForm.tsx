"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-md border border-[#E8D7B9]/80 bg-[#FFF7ED] px-4 py-3 text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:bg-white focus:ring-2 focus:ring-[#0F8A6C]/20";

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
      className="rounded-3xl border border-[#E8D7B9]/70 bg-white p-6 text-[#171717] shadow-2xl shadow-emerald-950/15 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#171717]">
          Imię
          <input
            name="name"
            required
            className={fieldClass}
            placeholder="Anna"
          />
        </label>
        <label className="block text-sm font-medium text-[#171717]">
          Email
          <input
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder="anna@example.com"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#171717]">
          Strona firmy
          <input
            name="website"
            required
            className={fieldClass}
            placeholder="https://twojafirma.pl"
          />
        </label>
        <label className="block text-sm font-medium text-[#171717]">
          Branża
          <input
            name="industry"
            required
            className={fieldClass}
            placeholder="np. salon beauty, usługi, klinika"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-[#171717]">
        Wiadomość
        <textarea
          name="message"
          rows={5}
          required
          className={`${fieldClass} resize-none`}
          placeholder="Opisz krótko firmę i pytania, które najczęściej zadają klienci."
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-6 w-full rounded-md bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-3 text-sm font-semibold text-[#171717] shadow-sm transition hover:shadow-[0_12px_30px_rgba(15,138,108,0.22)] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {state === "loading" ? "Wysyłanie..." : "Wyślij zgłoszenie"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            state === "error" ? "text-red-600" : "text-[#0F8A6C]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
