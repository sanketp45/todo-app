"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@repo/ui/components/Button";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/home");
      else setChecking(false);
    });
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.replace("/home");
    }
  }

  if (checking) return null;

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {/* ── Heading ── */}
        <h1 className={styles.heading}>Sign In</h1>
        <p className={styles.subheading}>Sign in to manage your tasks</p>

        {/* ── Fields ── */}
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <div className={styles.fieldGroup}>
              <label htmlFor="login-email" className={styles.fieldLabel}>Email</label>
              <input
                id="login-email"
                type="email"
                className={styles.fieldInput}
                placeholder="Enter your email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                autoComplete="email"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="login-password" className={styles.fieldLabel}>Password</label>
              <input
                id="login-password"
                type="password"
                className={styles.fieldInput}
                placeholder="Enter your password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                autoComplete="current-password"
              />
            </div>

            <div className={styles.forgotRow}>
              <Link href="#" className={styles.forgotLink}>Forgot password?</Link>
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
              {loading ? "Signing in…" : "SIGN IN"}
            </Button>

            <p className={styles.switchText}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className={styles.switchLink}>Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
