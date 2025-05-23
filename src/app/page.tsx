import { WaitlistForm } from "@/components/WaitlistForm";
import Image from "next/image";

export const metadata = {
  title: "Thinghy - Your Searchable Brain",
  description:
    "Thinghy helps you remember the fixes, facts, and forgotten things you figure out — so you never have to solve the same problem twice.",
  keywords: [
    "personal memory app",
    "fix log",
    "home maintenance",
    "recall tool",
    "Thinghy",
  ],
  openGraph: {
    title: "Thinghy",
    description: "Unload your brain. Find it later.",
    url: "https://thinghy.com",
    siteName: "Thinghy",
    images: [
      {
        url: "https://thinghy.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thinghy App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thinghyapp", // optional
    title: "Thinghy",
    description: "Your brain, but searchable.",
    images: ["https://thinghy.com/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <Image
          src="/logo.png"
          alt="Thinghy mascot logo"
          width={200}
          height={100}
          className="mb-6"
        />
        <h1 className="text-5xl font-bold mb-4">Thinghy.</h1>
        <h2 className="text-2xl italic font-bold mb-4">
          Your searchable brain
        </h2>
        <p className="text-xl max-w-2xl mb-6">
          Thinghy helps you remember all the little things, fixes, purchases,
          and “how did I do that again?” moments - so you never have to solve
          the same problem twice.
        </p>
        <WaitlistForm />
        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce text-black text-3xl">↓</div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Thinghy?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Fix It Once, Remember Forever
            </h3>
            <p className="text-gray-600">
              Remember where you stored that warranty, how you connected your
              Wi-Fi printer, or which paint color you used in the bedroom.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Highly Customizable Logs
            </h3>
            <p className="text-gray-600">
              Add notes, links, photos, receipts, tags, reminders - make it fit
              your way of remembering.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Searchable & Structured
            </h3>
            <p className="text-gray-600">
              Forget scrolling through random notes. Search by keyword,
              category, or even tag like “filters” or “car.”
            </p>
          </div>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          What Could You Save in Thinghy?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-gray-700">
          <div className="p-6 border rounded-xl bg-white shadow">
            <h4 className="font-bold text-lg mb-2">💡 Home & Maintenance</h4>
            <ul className="list-disc ml-6">
              <li>HVAC filter size + link to reorder</li>
              <li>Wi-Fi setup for basement router</li>
              <li>Which paint color you used in the living room</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-white shadow">
            <h4 className="font-bold text-lg mb-2">🚗 Car & Garage</h4>
            <ul className="list-disc ml-6">
              <li>Oil type + when it was last changed</li>
              <li>Tire pressure for your winter set</li>
              <li>Which windshield wipers fit your model</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-white shadow">
            <h4 className="font-bold text-lg mb-2">
              🧠 Life Hacks & Processes
            </h4>
            <ul className="list-disc ml-6">
              <li>How to set up your smart thermostat</li>
              <li>Steps to reset that annoying printer</li>
              <li>Instructions for canceling an obscure subscription</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-white shadow">
            <h4 className="font-bold text-lg mb-2">📦 Purchases & Products</h4>
            <ul className="list-disc ml-6">
              <li>Where you bought your favorite lightbulbs</li>
              <li>Which HDMI adapter actually worked</li>
              <li>What batteries your smoke alarm takes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-black text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Thinghy is launching soon.</h2>
        <p className="mb-6">
          Unload your brain. Find it later. Join the early access list.
        </p>
        <form className="w-full max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-md mb-3 text-black"
          />
          <button
            type="submit"
            className="w-full bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            Get Early Access
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-sm text-gray-400 flex justify-center gap-6">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </section>
    </main>
  );
}
