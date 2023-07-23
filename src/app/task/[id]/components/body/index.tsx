"use client";

import { Box, LinearProgress } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "../../../../../services/firebaseConnection";
import { Textarea } from "../../../../components/textarea";
import { Comments } from "../comments";
import styles from "./styles.module.css";

interface IForm {
  taskId: string;
}

interface CommentsProps {
  id: string;
  comment: string;
  user: string;
  name: string;
  taskId: string;
  created: string;
}

export function Body({ taskId }: IForm) {
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const q = query(
        collection(db, "comments"),
        where("taskId", "==", taskId),
        orderBy("created", "asc")
      );

      onSnapshot(q, (snapShot) => {
        let allComments: CommentsProps[] = [];

        snapShot.forEach((doc) => {
          const miliSeconds = doc.data()?.created?.seconds * 1000;
          allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId,
            created: new Date(miliSeconds).toLocaleDateString(),
          });
        });

        setComments(allComments);
        setLoading(false);
      });
    }

    void getData();
  }, [taskId]);

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "comments"), {
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

  async function handleCommentDelete(id: string) {
    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
  }

  return (
    <>
      {session && (
        <section className={styles.commentsContainer}>
          <h2>Deixar comentário</h2>
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
        </section>
      )}
      <section className={styles.commentsContainer}>
        <h2>Todos comentários</h2>
        {loading ? (
          <Box color="black">
            <LinearProgress color="inherit" />
          </Box>
        ) : (
          <Comments
            comments={comments}
            handleCommentDelete={handleCommentDelete}
          />
        )}
      </section>
    </>
  );
}
