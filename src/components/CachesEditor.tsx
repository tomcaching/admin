import { fetchCaches } from "@/client";
import { useAdminContext } from "@/context";
import { type GeocacheDto } from "@/types";
import { useState, type FC } from "react";
import { useQuery } from "react-query";
import { CachesList } from "./CachesList";
import CacheForm from "@/components/CacheForm";
import { Button } from "react-bootstrap";

const LoadingScreen: FC = () => {
    return (
        <div>Nacitani kesek</div>
    )
}

const CachesEditor: FC = () => {
    const NEW_CACHE_ID = -1;
    const { password } = useAdminContext();
    const {
        data: caches,
        isLoading: cachesLoading
    } = useQuery<Array<GeocacheDto>>("caches", async () => await fetchCaches(password!));
    const [selectedCacheId, setSelectedCacheId] = useState<number | null>(null);
    const selectedCache = caches?.find(cache => cache.id == selectedCacheId )
    const isEditing = selectedCacheId != null;

    return (
        <>
            {
                cachesLoading
                    ? <LoadingScreen />
                    : (

                        isEditing
                            ? (
                                selectedCacheId === NEW_CACHE_ID ?
                                    <CacheForm creatingNew={true} />
                                    :
                                    <CacheForm creatingNew={false} cache={selectedCache} />
                            ) : (
                                <div>
                                    <CachesList caches={caches!} selectedCache={selectedCacheId}
                                        onSelect={(id) => { setSelectedCacheId(id) }} />

                                    <Button onClick={() => {
                                        setSelectedCacheId(NEW_CACHE_ID);
                                    }}>Nova keska</Button>
                                </div>
                            )
                    )
            }
        </>
    );
};

export default CachesEditor;