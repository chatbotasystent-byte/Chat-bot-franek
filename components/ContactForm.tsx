"use client";

import { FormEvent, useRef, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-[#86EFAC]/18 bg-[#050706]/74 px-4 py-3 text-base text-[#F4FFF9] outline-none transition placeholder:text-[#7FA99B] focus:border-[#22C55E]/70 focus:bg-[#07110D] focus:ring-2 focus:ring-[#22C55E]/18 sm:text-sm";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const formStartedAtRef = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (state === "loading") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("companyWebsiteConfirm") ?? "").trim();

    if (honeypot) {
      form.reset();
      setState("success");
      setMessage("Dziękujemy! Odezwiemy się z propozycją automatyzacji AI.");
      formStartedAtRef.current = Date.now();
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      companyName: String(formData.get("companyName") ?? "").trim(),
      industry: String(formData.get("industry") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      source: "contact-form",
      elapsedMs: Date.now() - formStartedAtRef.current
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

      if (response.status === 429) {
        setState("error");
        setMessage("Wysłano już zgłoszenie. Spróbuj ponownie za chwilę.");
        return;
      }

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      form.reset();
      setState("success");
      setMessage("Dziękujemy! Odezwiemy się z propozycją automatyzacji AI.");
      formStartedAtRef.current = Date.now();
    } catch {
      setState("error");
      setMessage("Nie udało się wysłać formularza. Spróbuj ponownie lub skontaktuj się mailowo.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-[#22C55E]/16 bg-[#050706]/82 p-6 text-[#F4FFF9] shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8"
    >
      <label className="sr-only" aria-hidden="true">
        Potwierdź stronę firmy
        <input
          name="companyWebsiteConfirm"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#F4FFF9]">
          Imię i nazwisko *
          <input
            name="name"
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-[#F4FFF9]">
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
        <label className="block text-sm font-medium text-[#F4FFF9]">
          Telefon (opcjonalnie)
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-medium text-[#F4FFF9]">
          Nazwa firmy (opcjonalnie)
          <input
            name="companyName"
            autoComplete="organization"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#F4FFF9]">
          Strona firmy lub Instagram *
          <input
            name="website"
            type="text"
            autoComplete="url"
            className={fieldClass}
            placeholder="twojafirma.pl lub @profil"
          />
        </label>
        <label className="block text-sm font-medium text-[#F4FFF9]">
          Branża (opcjonalnie)
          <input
            name="industry"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-[#F4FFF9]">
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
        className="cta-primary cta-shine mt-6 min-h-12 w-full rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "loading" ? "Wysyłanie..." : "Wyślij zgłoszenie"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            state === "error" ? "text-red-300" : "text-[#86EFAC]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

