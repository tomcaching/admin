import { fetchCaches } from "@/client";
import { useAdminContext } from "@/context";
import { type GeocacheDto } from "@/types";
import { useState, type FC } from "react";
import { useQuery } from "react-query";
import { CachesList } from "./CachesList";

const LoadingScreen: FC = () => {
    return (
        <></>
    )
}

const CachesEditor: FC = () => {
    const { password } = useAdminContext();
    const { data: caches, isLoading: cachesLoading } = useQuery<Array<GeocacheDto>>("caches", async () => await fetchCaches(password!));
    const [selectedCache, setSelectedCache] = useState<number | null>(null);

    return (
        <>
            {
                cachesLoading
                    ? <LoadingScreen />
                    : (
                        <div>
                            <CachesList caches={caches!} selectedCache={selectedCache} onSelect={(id) => setSelectedCache(id)} />
                        </div>
                    )
            }
        </>
    );
};

export default CachesEditor;