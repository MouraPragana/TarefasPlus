"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { Form } from "./components/form";
import { Tasks } from "./components/task";

export default function Dashboard() {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      document.title = "Tarefas+ | Minhas Tarefas";
    }
  }, [status]);

  return (
    status === "authenticated" && (
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>
            <Form />
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>
          <Tasks />
        </section>
      </main>
    )
  );
}
