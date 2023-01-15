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
      <h1 className="">
        Hello world!
      </h1>
      <button 
        onClick={() => signIn("github", {callbackUrl: '/profile'})}
        className='bg-violet-600 p-2 rounded-md text-center text-base text-white hover:bg-violet-500'>
        SignIn with GitHub
        </button>
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
