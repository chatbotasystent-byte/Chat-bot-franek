"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-[#E8D7B9]/80 bg-[#FFF7ED] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:bg-white focus:ring-2 focus:ring-[#0F8A6C]/20";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (state === "loading") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      companyName: String(formData.get("companyName") ?? "").trim(),
      industry: String(formData.get("industry") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      source: "contact-form"
    };

    if (!payload.name) {
      setState("error");
      setMessage("Podaj imię i nazwisko.");
      return;
    }

    if (!payload.email) {
      setState("error");
      setMessage("Podaj adres email.");
      return;
    }

    if (!payload.website) {
      setState("error");
      setMessage("Podaj stronę firmy lub Instagram.");
      return;
    }

    if (!payload.message) {
      setState("error");
      setMessage("Napisz krótko, czego dotyczy zgłoszenie.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      form.reset();
      setState("success");
      setMessage("Dziękujemy! Odezwiemy się z propozycją automatyzacji AI.");
    } catch {
      setState("error");
      setMessage("Nie udało się wysłać formularza. Spróbuj ponownie lub skontaktuj się mailowo.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-[#E8D7B9]/70 bg-white p-6 text-[#171717] shadow-2xl shadow-emerald-950/15 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#171717]">
          Imię i nazwisko *
          <input
            name="name"
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-[#171717]">
          Email *
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#171717]">
          Telefon (opcjonalnie)
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-[#171717]">
          Nazwa firmy (opcjonalnie)
          <input
            name="companyName"
            autoComplete="organization"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#171717]">
          Strona firmy lub Instagram *
          <input
            name="website"
            type="text"
            autoComplete="url"
            className={fieldClass}
            placeholder="twojafirma.pl lub @profil"
          />
        </label>
        <label className="block text-sm font-medium text-[#171717]">
          Branża (opcjonalnie)
          <input
            name="industry"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-[#171717]">
        Wiadomość *
        <textarea
          name="message"
          rows={5}
          maxLength={1000}
          className={`${fieldClass} resize-none`}
          placeholder="Krótko opisz firmę i co chcesz zautomatyzować"
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-6 min-h-12 w-full rounded-xl bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-3 text-sm font-semibold text-[#171717] shadow-sm transition hover:shadow-[0_12px_30px_rgba(15,138,108,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
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
