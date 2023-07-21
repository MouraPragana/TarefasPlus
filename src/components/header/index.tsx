"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import styles from "./styles.module.css";

export function Header() {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  return pathName !== "/" && status === "loading" ? (
    <span>Processando...</span>
  ) : (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>
              Tarefas <span>+</span>
            </h1>
          </Link>
          {session?.user && (
            <Link className={styles.link} href="/dashboard">
              Meu Painel
            </Link>
          )}
        </nav>
        {session ? (
          <button
            className={styles.loginButton}
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Olá {session?.user?.name}
          </button>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => signIn("", { callbackUrl: "/dashboard" })}
          >
            Acessar
          </button>
        )}
      </section>
    </header>
  );
}
