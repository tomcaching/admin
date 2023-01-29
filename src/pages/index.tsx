import CachesEditor from '@/components/CachesEditor';
import { PasswordPrompt } from '@/components/PasswordPrompt'
import { AdminContext } from '@/context'
import { GeocacheDto } from '@/types';
import Head from 'next/head'
import { useState } from 'react'


export default function Home() {
  const [password, setPassword] = useState<string | null>(null);
  return (
    <AdminContext.Provider value={{ password, setPassword }}>
      <Head>
        <title>Tomcaching admin</title>
        <meta name="description" content="Administrace kešek pro Tomcaching" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {
        password === null
          ? <PasswordPrompt />
          : <CachesEditor />
      }

    </AdminContext.Provider>
  )
}
