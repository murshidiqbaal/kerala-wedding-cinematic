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

  useEffect(() => {
    if (isOpen) {
      setError("");
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

    // Success - immediately direct photographer into dashboard, bypassing the OAuth gateway
    const savedToken = localStorage.getItem("gdrive_access_token") || "temp_token_unconfigured";
    toast.success("Welcome to Photographer Dashboard!");
    onLoginSuccess(savedToken);
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
                Photographer Access
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

            {/* Email Password login */}
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
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-stone-950 font-semibold tracking-wide h-11 shadow-[0_4px_15px_rgba(245,158,11,0.25)] border-0 cursor-pointer"
                >
                  Sign In to Dashboard
                </Button>
              </div>
            </form>

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
