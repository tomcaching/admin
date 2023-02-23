import {useRouter} from "next/router";
import {AdminContext} from "@/context";
import {CacheForm} from "@/components/CacheForm";
import {useState} from "react";
import {PasswordPrompt} from "@/components/PasswordPrompt";
import Head from "next/head";


const EditPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const creatingNew = id == "new";
    const [password, setPassword] = useState<string | null>(null);
    return (
        <AdminContext.Provider value={{password, setPassword}}>
            <Head>
                <title>Tomcaching admin</title>
                <meta name="description" content="Administrace kešek pro Tomcaching" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {
                password === null
                    ? <PasswordPrompt/>
                    : <CacheForm creatingNew={creatingNew} cacheId={creatingNew ? null : Number(id)}/>

            }
        </AdminContext.Provider>
    )
}

export default EditPage