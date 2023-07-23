"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";

interface IComent {
  user: string;
  name: string;
  id: string;
  comment: string;
}

interface IComments {
  comments: IComent[];
  handleCommentDelete: (id: string) => Promise<void>;
}

export function Comments({ comments, handleCommentDelete }: IComments) {
  const { data } = useSession();

  return comments.length === 0 ? (
    <span>Nenhum comentário foi encontrado...</span>
  ) : (
    comments.map((comment) => (
      <article className={styles.comment} key={comment.id}>
        <div className={styles.headComment}>
          <label className={styles.commentsLabel}>{comment.name}</label>
          {comment.user === data?.user?.email && (
            <button
              className={styles.buttonTrash}
              onClick={() => handleCommentDelete(comment.id)}
            >
              <FaTrash size={18} color="#ea3140" />
            </button>
          )}
        </div>
        <p>{comment.comment}</p>
      </article>
    ))
  );
}
