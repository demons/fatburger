import GroupList from "./components/GroupList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <GroupList />
    </main>
  );
}
