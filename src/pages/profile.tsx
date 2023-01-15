import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";


export default function Profile({ user }: Session) {
  return (
    <>
      <Head>
        <title>Authentic App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div>
          <h2>{user?.name}</h2>
          <Image src={user?.image as string} alt="" width={20} height={20} />
        </div>
        <button onClick={() => signOut()}>Sign out!</button>

      </section>
    </>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if(session) {
    const user = session.user

    return { props : {user}}
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    },
  }
};
