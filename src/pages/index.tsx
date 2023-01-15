import Head from 'next/head'
import { getSession, signIn} from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

export default function Login() {
  return (
    <>
      <Head>
        <title>Authentic App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
        <h1 className="text-6xl font-bold text-white">
          Hello world!
        </h1>
        <button 
          onClick={() => signIn("github", {callbackUrl: '/profile'})}
          className='mt-5 p-5 rounded-md text-center font-bold text-xl bg-violet-600  hover:bg-violet-500'>
          SignIn with GitHub
          </button>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if(session) {
    return {
      redirect: {
        destination:'/profile',
        permanent: false
      },
    }
  }

  return {props: {}}
};
