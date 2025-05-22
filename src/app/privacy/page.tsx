export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Thinghy respects your privacy. We do not share, sell, or abuse your
        data. The only thing we store is your email address if you sign up for
        our waitlist. This is used solely to contact you when the product is
        ready.
      </p>
      <p>
        If you want your information deleted, please contact us at{" "}
        <a href="mailto:info@thinghy.com" className="hover:underline">
          info@thinghy.com
        </a>
      </p>
    </main>
  );
}
