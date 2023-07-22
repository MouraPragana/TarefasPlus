"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";

interface IComments {
  comments: any[];
}

export function Comments({ comments }: IComments) {
  const { data } = useSession();

  return comments.length === 0 ? (
    <span>Nenhum comentário foi encontrado...</span>
  ) : (
    comments.map((comment) => (
      <article className={styles.comment} key={comment.id}>
        <div className={styles.headComment}>
          <label className={styles.commentsLabel}>{comment.name}</label>
          {comment.user === data?.user?.email && (
            <button className={styles.buttonTrash}>
              <FaTrash size={18} color="#ea3140" />
            </button>
          )}
        </div>
        <p>{comment.comment}</p>
      </article>
    ))
  );
}
