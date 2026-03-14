"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/Button";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      {/* Top — illustration grows to fill all free space */}
      <div className={styles.top}>
        <div className={styles.illustrationWrap}>
          <Image
            src="/task.svg"
            alt="Task management illustration"
            fill
            priority
            sizes="286px"
          />
        </div>
      </div>

      {/* Middle — title + subtitle */}
      <div className={styles.middle}>
        <h1 className={styles.title}>Task Management and to do list app</h1>
        <p className={styles.subtitle}>
          This productive tool is designed to help you better manage your task
          project-wise conveniently!
        </p>
      </div>

      {/* Bottom — CTA button pinned to bottom */}
      <div className={styles.bottom}>
        <Button
          variant="primary"
          className={styles.cta}
          onClick={() => router.push("/home")}
        >
          START
        </Button>
      </div>
    </main>
  );
}
