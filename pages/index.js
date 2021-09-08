import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";
import Image from "next/image";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>iBlog | Personal Blog by Ishaq.</title>
        <link rel="icon" href="/image/people-write.png" />
      </Head>
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Image src="/image/people-write.png" width={400} height={400} />
          </div>
          <h1>Welcome to My Personal Blog</h1>
          <p>
            Jonathan Perelman once said that content is king, but distribution
            is queen and she wears the pants. That quotes inspired me to write a
            content to share my knowledge or my journet to everyone in the world through my blog. Kindly visit my portfolio web{" "}
            <a href={`https://ishaqadhel.com`}>here</a>.
          </p>
        </header>
        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
