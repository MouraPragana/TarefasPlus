import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import heroImg from "../../public/assets/hero.png";
import { db } from "../services/firebaseConnection";
import styles from "../styles/home.module.css";
import { Header } from "./components/header";

export async function getData() {
  const tarefasRef = collection(db, "tarefas");
  const tarefasSnapShot = await getDocs(tarefasRef);

  return tarefasSnapShot.size || 0;
}

export default async function Home() {
  const tarefas = await getData();

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo Tarefas+"
            src={heroImg}
            priority={true}
          />
        </div>

        <h1 className={styles.title}>
          Sistema feito para você organizar
          <br /> seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{tarefas} posts</span>
          </section>

          <section className={styles.box}>
            <span>+0 comentários</span>
          </section>
        </div>
      </main>
    </>
  );
}
