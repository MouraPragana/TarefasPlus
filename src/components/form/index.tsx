import { db } from "@/services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "../textarea";
import styles from "./styles.module.css";
import { Session } from "next-auth";

interface IForm {
  userData: Session | null;
}

export function Form({ userData }: IForm) {
  const [input, setInput] = useState<string>("");
  const [publicTask, setPublicTask] = useState<boolean>(false);

  function handleChangePublic(value: boolean) {
    setPublicTask(value);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: userData?.user?.email,
        public: publicTask,
      });

      setInput("");
      setPublicTask(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleRegisterTask}>
      <Textarea
        placeholder="Digite qual sua tarefa..."
        value={input}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setInput(event.target.value)
        }
      />
      <div className={styles.checkboxArea}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={publicTask}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChangePublic(event.target.checked)
          }
        />
        <label>Deixar tarefa pública?</label>
      </div>
      <button type="submit" className={styles.button}>
        Registrar
      </button>
    </form>
  );
}
