import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { db } from "../../../services/firebaseConnection";
import styles from "./styles.module.css";

import { Body } from "./components/body";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const docRef = doc(db, "tarefas", params.id);
  const snapshot = await getDoc(docRef);
  const tarefaText = snapshot.data()?.tarefa.substring(0, 10) + "...";

  return {
    title: `Tarefas+ | ${tarefaText}`,
  };
}

async function getData(id: string) {
  const docRef = doc(db, "tarefas", id);
  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined || !snapshot.data()?.public) {
    return undefined;
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    id: snapshot.id,
  };

  return {
    props: {
      task: task,
    },
  };
}

export default async function Task({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  if (!data?.props.task.public) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{data?.props.task.tarefa}</p>
        </article>
      </main>

      <Body taskId={data?.props.task.id as string} />
    </div>
  );
}
