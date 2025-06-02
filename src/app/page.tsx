import Image from "next/image";
import { Brain, Car, Lightbulb, Package } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import ZoomableImage from "@/components/ZoomableImage";

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
    <main className="bg-[#1e1e2f] text-gray-900 ">
      <LandingHeader />
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <Image
          src="/logo.png"
          alt="Thinghy mascot logo"
          width={200}
          height={100}
          className="mb-6 transition-transform transform hover:-translate-y-2"
        />
        <h1 className="text-5xl text-white font-bold mb-4">Thinghy.</h1>
        <h2 className="text-2xl italic text-white font-bold mb-4">
          Your searchable brain
        </h2>
        <p className="text-xl max-w-2xl text-white mb-6">
          Ditch your boring note-taking app. Thinghy is your smarter, structured
          memory - built to keep fixes, purchases, and “how did I do that?”
          moments in one organized place.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/signup"
            className="bg-yellow-300 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-400 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="border border-yellow-300 text-yellow-300 px-6 py-2 rounded hover:bg-yellow-300 hover:text-black transition"
          >
            Log In
          </a>
        </div>
        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce text-white text-3xl">↓</div>
      </section>

      {/* Feature Highlights */}
      <div id="why" className="py-30 bgbg-[#1e1e2f]"></div>
      <section className="py-20 bg-[#2a2a3c] px-6 text-center">
        <h2 className="text-3xl text-white font-semibold mb-6">Why Thinghy?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="transition-transform transform hover:-translate-x-1 hover:cursor-default">
            <h3 className="text-xl text-white font-semibold mb-2">
              Fix It Once, Remember Forever
            </h3>
            <p className="text-gray-300">
              Remember where you stored that warranty, how you connected your
              Wi-Fi printer, or which paint color you used in the bedroom.
            </p>
          </div>
          <div className="transition-transform transform hover:translate-y-1 hover:cursor-default">
            <h3 className="text-xl text-white font-semibold mb-2">
              Highly Customizable Logs
            </h3>
            <p className="text-gray-300">
              Add notes, links, photos, receipts, tags, reminders - make it fit
              your way of remembering.
            </p>
          </div>
          <div className="transition-transform transform hover:translate-x-1 hover:cursor-default">
            <h3 className="text-xl text-white font-semibold mb-2">
              Searchable & Structured
            </h3>
            <p className="text-gray-300">
              Forget scrolling through random notes. Find what you are looking
              for fast.
            </p>
          </div>
        </div>
      </section>

      <div id="how-it-works" className="py-30 bgbg-[#1e1e2f]"></div>
      <section className="text-white px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              1. Keep everything in one place
            </h3>
            <p className="text-gray-300">
              Keep all your importent Thinghies in one place, nicely sorted in
              groups, by name or date.
            </p>
            <ZoomableImage
              src="/howitworks1.png"
              alt="Preview"
              className="w-full rounded border border-gray-600 shadow"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2. Detailed view</h3>
            <p className="text-gray-300">
              Every Thinghy has its own page with clean, structured fields. Add
              passwords, tags, images, and more — no clutter, just clarity.
            </p>
            <ZoomableImage
              src="/howitworks2.png"
              alt="Preview"
              className="w-full rounded border border-gray-600 shadow"
            />
          </div>
        </div>
      </section>
      <div className="py-30 bg-[#1e1e2f]"></div>
      {/* Example Use Cases */}
      <section className="py-6 px-6 bg-[#2a2a3c]">
        <h2 className="text-3xl text-white font-semibold mb-8 text-center">
          Examples of What You Could Save in Thinghy
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-gray-700">
          <div className="p-6 border rounded-xl bg-[#2a2a3c] text-white shadow transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 hover:cursor-default">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-300" /> Home &
              Maintenance
            </h4>
            <ul className="list-disc text-gray-300 ml-6">
              <li>HVAC filter size + link to reorder</li>
              <li>Wi-Fi setup for basement router</li>
              <li>Which paint color you used in the living room</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-[#2a2a3c] text-white shadow transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 hover:cursor-default">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Car className="w-5 h-5 text-yellow-300" /> Car & Garage
            </h4>
            <ul className="list-disc text-gray-300 ml-6">
              <li>Oil type + when it was last changed</li>
              <li>Tire pressure for your winter set</li>
              <li>Which windshield wipers fit your model</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-[#2a2a3c] text-white shadow transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 hover:cursor-default">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-yellow-300" /> Life Hacks &
              Processes
            </h4>
            <ul className="list-disc text-gray-300 ml-6">
              <li>How to set up your smart thermostat</li>
              <li>Steps to reset that annoying printer</li>
              <li>Instructions for canceling an obscure subscription</li>
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-[#2a2a3c] text-white shadow transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 hover:cursor-default">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Package className="w-5 h-5 text-yellow-300" /> Purchases &
              Products
            </h4>
            <ul className="list-disc text-gray-300 ml-6">
              <li>Where you bought your favorite lightbulbs</li>
              <li>Which HDMI adapter actually worked</li>
              <li>What batteries your smoke alarm takes</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="py-20 bgbg-[#1e1e2f]"></div>
      {/* CTA Footer */}
      <section className="py-20 bg-[#2a2a3c] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to unload your brain?</h2>
        <p className="mb-6">
          Start saving fixes, facts, and thinghs you do not want to forget
          today!
        </p>
        <a
          href="/signup"
          className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-2 rounded font-semibold transition"
        >
          Create Your Free Account
        </a>

        {/* Footer Links */}
        <div className="mt-8 text-sm text-gray-400 flex justify-center">
          <div className="flex-col">
            <p className="mb-2">
              &copy; {new Date().getFullYear()} thinghy.com | All rights
              reserved.
            </p>
            <a href="/privacy" className="hover:underline mr-2">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
