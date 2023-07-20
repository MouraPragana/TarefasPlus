import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from "./styles.module.css";
import { Textarea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Tarefas+ | Minhas tarefas",
};

export default async function Dashboard() {
  const session = await getServerSession(OPTIONS);

  if (!session) {
    redirect("/");
  }

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.contentForm}>
          <h1 className={styles.title}>Qual sua tarefa?</h1>

          <form>
            <Textarea placeholder="Digite qual sua tarefa..." />
            <div className={styles.checkboxArea}>
              <input type="checkbox" className={styles.checkbox} />
              <label>Deixar tarefa pública?</label>
            </div>
            <button type="submit" className={styles.button}>
              Registrar
            </button>
          </form>
        </div>
      </section>

      <section className={styles.taskContainer}>
        <h1>Minhas tarefas</h1>

        <article className={styles.task}>
          <div className={styles.tagContainer}>
            <label className={styles.tag}>PUBLICO</label>
            <button className={styles.shareButton}>
              <FiShare2 size={22} color="#3183ff" />
            </button>
          </div>

          <div className={styles.taskContent}>
            <p>Minha primeira tarefa de exemplo show demais</p>
            <button className={styles.trashButton}>
              <FaTrash size={24} color="#ea3140" />
            </button>
          </div>
        </article>

        <article className={styles.task}>
          <div className={styles.tagContainer}>
            <label className={styles.tag}>PUBLICO</label>
            <button className={styles.shareButton}>
              <FiShare2 size={22} color="#3183ff" />
            </button>
          </div>

          <div className={styles.taskContent}>
            <p>Minha primeira tarefa de exemplo show demais</p>
            <button className={styles.trashButton}>
              <FaTrash size={24} color="#ea3140" />
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
