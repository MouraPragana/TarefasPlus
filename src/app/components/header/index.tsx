"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./styles.module.css";

export function Header() {
  const { data: session } = useSession();
  const pathName = usePathname() as string;
  const router = useRouter();

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.replace("http://localhost:3000/");
              router.refresh();
            }}
          >
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
                callbackUrl: pathName.match("/task/") ? pathName : "/",
              })
            }
          >
            Olá {session?.user?.name}
          </button>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() =>
              signIn("", {
                callbackUrl: pathName === "/" ? "/dashboard" : pathName,
              })
            }
          >
            Acessar
          </button>
        )}
      </section>
    </header>
  );
}
