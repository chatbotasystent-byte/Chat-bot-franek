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
      phone: String(formData.get("phone") ?? ""),
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
      setMessage("Dziękujemy. Skontaktujemy się najszybciej, jak to możliwe.");
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
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Imię
          <input
            name="name"
            required
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-rosewood focus:ring-2 focus:ring-rosewood/20"
            placeholder="Anna"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-rosewood focus:ring-2 focus:ring-rosewood/20"
            placeholder="anna@example.com"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-ink">
        Telefon
        <input
          name="phone"
          type="tel"
          required
          className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-rosewood focus:ring-2 focus:ring-rosewood/20"
          placeholder="+48 500 000 000"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-ink">
          Wiadomość
        <textarea
          name="message"
          rows={5}
          required
          className="mt-2 w-full resize-none rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-rosewood focus:ring-2 focus:ring-rosewood/20"
          placeholder="Chcę umówić manicure hybrydowy w przyszłym tygodniu."
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-5 w-full rounded-md bg-sage px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#587866] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {state === "loading" ? "Wysyłanie..." : "Wyślij zapytanie"}
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
