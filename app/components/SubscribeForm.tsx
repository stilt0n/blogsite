"use client";

import { useState, type FormEvent } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      return;
    }

    // TODO: Integrate with email service (Buttondown, ConvertKit, etc.)
    console.log("Subscribing email:", email);
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <article>
        <p>Thanks for subscribing! You'll receive updates when new posts are published.</p>
      </article>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={status === "error" ? true : undefined}
        />
        {status === "error" && (
          <small>Please enter a valid email address.</small>
        )}
      </fieldset>
      <button type="submit">Subscribe</button>
    </form>
  );
}
