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
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import styles from "./styles.module.css";
import { Box, LinearProgress } from "@mui/material";

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data } = useSession();

  useEffect(() => {
    async function loadTarefas() {
      setLoading(true);
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", data?.user?.email)
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
        setLoading(false);
      });
    }

    void loadTarefas();
  }, [data?.user?.email]);

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
  }

  async function handleDelete(id: string) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  if (loading) {
    return (
      <Box sx={{ width: "100%", color: "black", marginTop: 5 }}>
        <LinearProgress color="inherit" />
      </Box>
    );
  }

  return tasks.map((task) => (
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
  ));
}
