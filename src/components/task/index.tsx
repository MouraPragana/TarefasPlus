import { db } from "@/services/firebaseConnection";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import styles from "./styles.module.css";

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

interface ITasks {
  userData: Session | null;
  userStatus: "authenticated" | "loading";
}

export function Tasks({ userData, userStatus }: ITasks) {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTarefas() {
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", userData?.user?.email)
      );

      onSnapshot(q, (snapShot) => {
        let lista = [] as TaskProps[];

        snapShot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            created: doc.data().created,
            public: doc.data().public,
            user: doc.data().user,
          });
        });

        setTasks(lista);
      });
    }

    userStatus === "authenticated" && void loadTarefas();
  }, [userData?.user?.email, userStatus]);

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
  }

  async function handleDelete(id: string) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  return (
    <>
      {tasks.map((task) => (
        <article key={task.id} className={styles.task}>
          {task.public && (
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PUBLICO</label>
              <button
                className={styles.shareButton}
                onClick={() => handleShare(task.id)}
              >
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>
          )}

          <div className={styles.taskContent}>
            {task.public ? (
              <Link href={`/task/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>
            ) : (
              <p>{task.tarefa}</p>
            )}

            <button
              className={styles.trashButton}
              onClick={() => handleDelete(task.id)}
            >
              <FaTrash size={24} color="#ea3140" />
            </button>
          </div>
        </article>
      ))}
    </>
  );
}
