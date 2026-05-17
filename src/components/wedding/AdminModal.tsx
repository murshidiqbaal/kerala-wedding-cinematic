import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ShieldAlert, KeyRound, Sparkles, CheckCircle2, Chrome } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (googleToken: string) => void;
}

export const AdminModal = ({ isOpen, onClose, onLoginSuccess }: AdminModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailAuthed, setIsEmailAuthed] = useState(false);
  
  // Settings for Google Credentials (admin can configure in settings, or we use defaults)
  const [clientId, setClientId] = useState(() => localStorage.getItem("gdrive_client_id") || "");

  // Simple keyboard shortcut listener in the parent Index page triggers this modal,
  // but we can also double check its visibility state
  useEffect(() => {
    if (isOpen) {
      setError("");
      // Reset flow if reopened
      setIsEmailAuthed(false);
      setPassword("");
    }
  }, [isOpen]);

  const handleEmailAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== "weddinginvitationworks@gmail.com") {
      setError("Unauthorized access. Admin email unrecognized.");
      toast.error("Unauthorized email address.");
      return;
    }

    if (password === "") {
      setError("Please enter password.");
      return;
    }

    // Standard static secure password for photographer/admin
    if (password !== "anjana&rohith2026" && password !== "photographer2026") {
      setError("Invalid password. Please check your wedding credentials.");
      toast.error("Incorrect password.");
      return;
    }

    // Success with email authentication step
    setIsEmailAuthed(true);
    toast.success("Identity verified! Now, connect your Google Drive.");
  };

  const handleGoogleConnect = () => {
    setLoading(true);

    // Retrieve active client ID from state/localStorage
    const activeClientId = clientId || localStorage.getItem("gdrive_client_id");
    
    if (!activeClientId) {
      toast.warning("Google Client ID is not configured yet. Opening dashboard in setup mode.");
      onLoginSuccess("temp_token_unconfigured");
      setLoading(false);
      return;
    }

    try {
      // Initialize the Google Accounts token client
      // @ts-ignore
      if (typeof window.google === "undefined" || !window.google.accounts) {
        toast.error("Google API client not loaded yet. Please wait a second and retry.");
        setLoading(false);
        return;
      }

      // @ts-ignore
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: activeClientId,
        scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly",
        callback: (tokenResponse: any) => {
          setLoading(false);
          if (tokenResponse.error) {
            toast.error(`Authentication failed: ${tokenResponse.error}`);
            return;
          }
          
          if (tokenResponse.access_token) {
            localStorage.setItem("gdrive_access_token", tokenResponse.access_token);
            // Save expiry (typically 3600 seconds)
            const expiryTime = Date.now() + 3600 * 1000;
            localStorage.setItem("gdrive_token_expiry", expiryTime.toString());
            
            toast.success("Google Drive connected successfully!");
            onLoginSuccess(tokenResponse.access_token);
          }
        },
      });

      tokenClient.requestAccessToken({ prompt: "consent" });
    } catch (err: any) {
      console.error(err);
      toast.error("Error launching Google Auth popup.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 overflow-y-auto">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", duration: 0.55 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-stone-900 via-zinc-900 to-black p-8 text-white shadow-[0_0_50px_rgba(245,158,11,0.15)] z-[1001]"
          >
            {/* Elegant Luxury Background Glows */}
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="text-center mb-8 relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold tracking-wide text-amber-100 font-serif">
                Admin Gateway
              </h2>
              <p className="text-stone-400 text-xs mt-1">
                Authorized Photographer & Coordinator Access Only
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6 rounded-lg bg-red-950/40 border border-red-500/30 p-3 text-red-300 text-xs"
              >
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {!isEmailAuthed ? (
              // Step 1: Email Password login
              <form onSubmit={handleEmailAuthSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-stone-300 text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-amber-500/70" /> Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="weddinginvitationworks@gmail.com"
                    required
                    className="bg-black/45 border-stone-800 focus:border-amber-500/50 text-white placeholder-stone-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-11"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-300 text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <KeyRound className="h-3 w-3 text-amber-500/70" /> Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="bg-black/45 border-stone-800 focus:border-amber-500/50 text-white placeholder-stone-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-11"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-stone-950 font-semibold tracking-wide h-11 shadow-[0_4px_15px_rgba(245,158,11,0.25)] border-0"
                  >
                    Authenticate Credentials
                  </Button>
                </div>
              </form>
            ) : (
              // Step 2: Google OAuth Connect
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 text-center"
              >
                <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/30 p-4 mb-4">
                  <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-semibold justify-center">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Identity Verified Successfully</span>
                  </div>
                  <p className="text-stone-400 text-[11px] mt-1.5 leading-relaxed">
                    Account: <span className="text-stone-300 font-medium">weddinginvitationworks@gmail.com</span>
                  </p>
                </div>

                <p className="text-stone-400 text-xs leading-relaxed max-w-sm mx-auto">
                  To stream photo uploads directly into your Google Drive, please connect your Google account storage.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={handleGoogleConnect}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-stone-100 text-stone-900 font-semibold tracking-wide h-11 border border-stone-200 shadow-lg"
                  >
                    <Chrome className="h-4.5 w-4.5 text-amber-600" />
                    {loading ? "Initializing OAuth..." : "Connect Google Drive"}
                  </Button>

                  <p className="text-[10px] text-stone-500 italic">
                    If OAuth credentials are not set up in dashboard settings, you will be redirected to offline mode.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Subtle Gold Divider */}
            <div className="my-6 border-t border-stone-800/60" />

            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500/40" /> Verified Host
              </span>
              <button
                onClick={onClose}
                className="hover:text-stone-300 transition-colors cursor-pointer underline underline-offset-2"
              >
                Cancel / Return
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
