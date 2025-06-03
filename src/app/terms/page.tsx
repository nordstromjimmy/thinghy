export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#1e1e2f] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-white font-bold mb-6">Terms of Service</h1>

        <p className="mb-4 text-white">
          By using Thinghy, you agree to the following terms. Please read them
          carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
          1. Use of the Service
        </h2>
        <p className="mb-4 text-white">
          You may use Thinghy for personal, non-commercial purposes. You agree
          not to abuse the platform or attempt to interfere with its operation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
          2. Account Responsibility
        </h2>
        <p className="mb-4 text-white">
          You are responsible for maintaining the security of your account and
          any activity that occurs under your credentials.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
          3. Data Loss
        </h2>
        <p className="mb-4 text-white">
          Thinghy is provided “as is.” We strive to provide a stable and secure
          service, but we do not guarantee uptime or data retention. Please back
          up any critical information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
          4. Changes
        </h2>
        <p className="mb-4 text-white">
          We may update these terms from time to time. Continued use of Thinghy
          constitutes acceptance of any revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-white">
          5. Termination
        </h2>
        <p className="mb-4 text-white">
          We reserve the right to suspend or delete accounts for violating these
          terms or for suspicious behavior.
        </p>

        <p className="text-white">
          For questions, reach out to{" "}
          <a href="mailto:info@thinghy.com" className="text-white underline">
            info@thinghy.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
