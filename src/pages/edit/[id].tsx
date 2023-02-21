import {useRouter} from "next/router";
import {AdminContext} from "@/context";
import {CacheForm} from "@/components/CacheForm";
import {useState} from "react";
import {PasswordPrompt} from "@/components/PasswordPrompt";


const EditPage = () => {
    const router = useRouter();
    const {id} = router.query;
const creatingNew = id=="new";
    const [password, setPassword] = useState<string | null>(null);
    return (
        <AdminContext.Provider value={{password, setPassword}}>


            {
                password === null
                    ? <PasswordPrompt/>
                    : <CacheForm creatingNew={creatingNew} cacheId={creatingNew?null:Number(id)}/>

            }
        </AdminContext.Provider>
    )
}

export default EditPage