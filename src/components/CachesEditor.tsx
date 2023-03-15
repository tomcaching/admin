import { deleteCache, fetchCaches, resetCache } from "@/client";
import { useAdminContext } from "@/context";
import { type GeocacheDto } from "@/types";
import { type FC, useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { localStoragePassword } from "@/components/PasswordPrompt";

const LoadingScreen: FC = () => {
    return (
        <div>Nacitani kesek</div>
    )
}

const CachesEditor: FC = () => {
    const { password } = useAdminContext();
    const {
        data: caches,
        isLoading: cachesLoading
    } = useQuery<Array<GeocacheDto>>("caches", async () => await fetchCaches(password!));
    console.log(caches)
    const [passwordInfo, setPasswordInfo] = useState(false)

    return (
        <>
            {
                cachesLoading
                    ? <LoadingScreen />
                    :
                    <>
                        <span className={"m-2"}>Pocet kesek: {caches!.length}</span>
                        {
                            caches!.map(
                                (cache, index) =>
                                    <div
                                        key={index}
                                    >
                                        <Link
                                            href={"/edit/" + cache.id}
                                            className={"btn-outline-secondary btn m-2 w-25"}
                                        >

                                            <div
                                                className={"d-block m-2"}
                                            >
                                                {cache.title}
                                            </div>
                                        </Link>
                                        <Button
                                            variant={"secondary"}
                                            onClick={() => resetCache(password!, cache.id)}
                                        >Reset</Button>
                                        <Button
                                            variant={"danger"}
                                            className={"m-1"}
                                            onClick={() => {
                                                if (confirm(cache.title + "\nbude smazana!")) deleteCache(password!, cache.id).then(response => console.log("deleted", response));
                                            }}
                                        >X</Button>
                                    </div>
                            )
                        }
                        <Link
                            href={"/edit/new"}
                            className={"btn-primary btn d-block m-2 w-25"}
                        >+</Link>
                        <div>

                            <Button title={"vymazat heslo z localStorage"} disabled={passwordInfo} className={"btn-sm"} variant={"secondary"} onClick={() => {
                                localStorage.removeItem(localStoragePassword);
                                setPasswordInfo(true)
                            }}>
                                {
                                    passwordInfo
                                        ? <>heslo bylo zapomenuto</>
                                        : <>zapomenout heslo</>
                                }
                            </Button>
                        </div>
                    </>
            }
        </>
    );
};

export default CachesEditor;
