"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase-browser";
import { showToast, showErrorToast } from "@/components/ShowToast";
import { Trash2, Mail } from "lucide-react";
import { KeyRound } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import ConfirmModal from "@/components/ConfirmModal";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      setIsGoogleUser(user?.app_metadata?.provider === "google");

      if (error || !user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");
      setLoading(false);
    })();
  }, [isGoogleUser]);

  const handlePasswordReset = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      showErrorToast("Unable to find your email.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      showErrorToast("Failed to send reset email.");
    } else {
      showToast(
        "Password reset email sent! Make sure to check your spam folder"
      );
    }
  };

  const handleDeleteAccount = async () => {
    const res = await fetch("/api/delete-account", {
      method: "POST",
    });

    const result = await res.json();

    if (result.error) {
      showErrorToast("Failed to delete account: " + result.error);
      setShowConfirm(false);
      return;
    }
    showToast("Account successfully deleted.");
    setShowConfirm(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Optionally redirect or clear local session
    window.location.href = "/";
  };

  if (loading)
    return <p className="text-white px-6 py-12">Loading profile...</p>;

  return (
    <main className="py-6 max-w-3xl mx-auto text-white px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

      <div className="bg-[#2a2a3c] rounded-xl p-6 shadow-md border border-gray-700 space-y-8">
        {/* Email Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Account Info</h2>
          <div className="flex items-center gap-2 text-gray-300 mb-8">
            <Mail size={18} />
            <span className="text-base font-medium">{email}</span>
          </div>
          <div>
            {!isGoogleUser && (
              <button
                onClick={handlePasswordReset}
                className="flex items-center gap-2 rounded text-white hover:text-gray-300 hover:underline transition cursor-pointer"
              >
                <KeyRound size={18} />
                Reset Password
              </button>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Session</h2>
            <p className="text-gray-400 text-sm mb-2">
              You’re currently logged in. Log out anytime below.
            </p>
            <LogoutButton />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-gray-700">
          <h2 className="text-xl font-semibold text-red-500 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Permanently delete your account and all associated Thinghies.
          </p>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white transition"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        title={"Delete account"}
        description="Are you sure you want to delete your account? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteAccount}
      />
    </main>
  );
}
