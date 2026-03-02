import type { Metadata } from "next";
import SubscribeForm from "../components/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe to receive updates when new posts are published",
};

export default function SubscribePage() {
  return (
    <>
      <h1>Subscribe</h1>
      <p>Get notified when I publish new posts. No spam, unsubscribe anytime.</p>
      <SubscribeForm />
    </>
  );
}
