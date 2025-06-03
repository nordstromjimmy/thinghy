export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#1e1e2f] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-white font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-white">
          At Thinghy, your privacy is important to us. This policy outlines what
          we collect, why we collect it, and how we use and protect your
          information.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
          What We Collect
        </h2>
        <ul className="list-disc ml-6 text-white">
          <li>Your email address when you sign up</li>
          <li>Your saved data (Thinghies, categories, and uploaded images)</li>
          <li>
            Authentication details provided via email/password or Google Sign-In
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
          How We Use Your Data
        </h2>
        <p className="mb-4 text-white">
          Your data is used solely to provide and improve the service. We do not
          sell or share your personal information with third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
          Third-Party Services
        </h2>
        <p className="mb-4 text-white">
          Thinghy uses Supabase for authentication and data storage. Your
          information is managed securely through these platforms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">
          Data Retention & Deletion
        </h2>
        <p className="mb-4 text-white">
          You can delete your account and all stored data at any time from your
          profile page. If you’d like us to delete your data manually, contact
          us at{" "}
          <a href="mailto:info@thinghy.com" className="text-white underline">
            info@thinghy.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">Cookies</h2>
        <p className="mb-4 text-white">
          We use minimal cookies to keep you signed in and provide a smooth
          experience.
        </p>

        <p className="text-white">
          If you have any questions about this policy, email us at{" "}
          <a href="mailto:info@thinghy.com" className="text-white underline">
            info@thinghy.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
