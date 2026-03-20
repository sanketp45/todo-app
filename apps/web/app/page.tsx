"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@repo/ui/components/Button";
import styles from "./page.module.css";

export default function LandingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/home");
      else setChecking(false);
    });
  }, [router]);

  if (checking) return null;

  return (
    <main className={styles.page}>
      {/* ── Logo + branding ── */}
      <div className={styles.hero}>
        <div className={styles.logoWrap}>
          <div className={styles.logoCircle}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <line x1="14" y1="18" x2="34" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <line x1="14" y1="24" x2="34" y2="24" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <line x1="14" y1="30" x2="28" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <h1 className={styles.appName}>Taskly</h1>
        <p className={styles.tagline}>Your mindful task companion</p>
      </div>

      {/* ── Single CTA pinned to bottom ── */}
      <div className={styles.ctas}>
        <Button
          variant="primary"
          size="md"
          style={{ width: "100%" }}
          onClick={() => router.push("/signup")}
        >
          GET STARTED
        </Button>
        <p className={styles.footer}>Designed with care · 2025 Taskly</p>
      </div>
    </main>
  );
}
