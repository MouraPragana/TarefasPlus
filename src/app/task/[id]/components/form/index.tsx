"use client";

import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "../../../../components/textarea";
import styles from "./styles.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../../services/firebaseConnection";

interface IForm {
  taskId: string;
}

export function Form({ taskId }: IForm) {
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: taskId,
      });

      setInput("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleComment}>
      <Textarea
        placeholder="Digite seu comentário..."
        value={input}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setInput(event.target.value)
        }
      />
      <button className={styles.button}>Enviar comentário</button>
    </form>
  );
}
