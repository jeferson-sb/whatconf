import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

import styles from "./index.module.css";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <h1 className={styles.title}>
            WhatConf
          </h1>

          <h3 className={styles.subtitle}>This stack uses:</h3>
          <div className={styles.cardGrid}>
            <TechnologyCard
              name="NextJS"
              description="The React framework for production"
              documentation="https://nextjs.org/"
            />
            <TechnologyCard
              name="TypeScript"
              description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
              documentation="https://www.typescriptlang.org/"
            />
            <TechnologyCard
              name="TailwindCSS"
              description="Rapidly build modern websites without ever leaving your HTML"
              documentation="https://tailwindcss.com/"
            />
            <TechnologyCard
              name="tRPC"
              description="End-to-end typesafe APIs made easy"
              documentation="https://trpc.io/"
            />
            <TechnologyCard
              name="Next-Auth"
              description="Authentication for Next.js"
              documentation="https://next-auth.js.org/"
            />
            <TechnologyCard
              name="Prisma"
              description="Build data-driven JavaScript & TypeScript apps in less time"
              documentation="https://www.prisma.io/docs/"
            />
          </div>

          <div className={styles.helloFrom}>
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  description,
  documentation,
}) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>{name}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <Link
        className={styles.cardDocumentation}
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link>
    </section>
  );
};
