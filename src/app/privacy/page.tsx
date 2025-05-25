export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#1e1e2f] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-white font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-white">
          Thinghy respects your privacy. We do not share, sell, or abuse your
          data. The only thing we store is your email address if you sign up for
          our waitlist. This is used solely to contact you when the product is
          ready.
        </p>
        <p className="text-white">
          If you want your information deleted, please contact us at{" "}
          <a
            href="mailto:info@thinghy.com"
            className="text-white hover:underline"
          >
            info@thinghy.com
          </a>
        </p>
      </div>
    </main>
  );
}
