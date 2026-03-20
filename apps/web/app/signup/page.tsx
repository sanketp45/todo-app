"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@repo/ui/components/Button";
import styles from "./page.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [confirmationSent, setConfirmationSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/home");
      else setChecking(false);
    });
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: name.trim() } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.replace("/home");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setConfirmationSent(true);
      setLoading(false);
    } else {
      router.replace("/home");
    }
  }

  if (checking) return null;

  if (confirmationSent) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Check your email</h1>
          <p className={styles.subheading}>
            We sent a confirmation link to{" "}
            <strong style={{ color: "#1a1a2e" }}>{email}</strong>. Please confirm to proceed.
          </p>
          <div className={styles.actions} style={{ marginTop: 32 }}>
            <Link href="/login" className={styles.switchLink}>← Back to sign in</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {/* ── Heading ── */}
        <h1 className={styles.heading}>Sign up with your email</h1>
        <p className={styles.subheading}>Sign up to start managing your tasks</p>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <div className={styles.fieldGroup}>
              <label htmlFor="signup-name" className={styles.fieldLabel}>Full Name</label>
              <input
                id="signup-name"
                type="text"
                className={styles.fieldInput}
                placeholder="Enter your full name"
                value={name}
                onChange={e => { setName(e.target.value); setError(""); }}
                autoComplete="name"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="signup-email" className={styles.fieldLabel}>Email</label>
              <input
                id="signup-email"
                type="email"
                className={styles.fieldInput}
                placeholder="Enter your email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                autoComplete="email"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="signup-password" className={styles.fieldLabel}>Password</label>
              <input
                id="signup-password"
                type="password"
                className={styles.fieldInput}
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Creating account…" : "SIGN UP"}
            </Button>

            <p className={styles.switchText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.switchLink}>Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
