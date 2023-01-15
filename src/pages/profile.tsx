import { GetServerSidePropsContext } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]";


export default function Profile({ user }: Session) {
  return (
    <>
      <Head>
        <title>Authentic App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
        <div className="flex flex-row-reverse gap-2 items-center px-6 py-4">
          <h2 className="text-2xl text-white font-bold">{user?.name}</h2>
            <Image src={user?.image as string} 
              alt=""
              height={80}
              width={80}
              className="rounded-full"
              unoptimized={true}
              />
        </div>
        <button className="p-2 rounded font-semibold bg-violet-600  hover:bg-violet-500" onClick={() => signOut()}>Sign out!</button>

      </main>
    </>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if(session) {
    const user = session.user;

    return {props: {user}}
  }
  return {
    redirect: {
      destination: '/',
      permanent: false
    },
  }
};
