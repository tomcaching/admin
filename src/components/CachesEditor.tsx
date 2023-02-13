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
    const { password } = useAdminContext();
    const {
        data: caches,
        isLoading: cachesLoading
    } = useQuery<Array<GeocacheDto>>("caches", async () => await fetchCaches(password!));
    const [selectedCache, setSelectedCache] = useState<number | null>(null);
    const isEditing = selectedCache != null;

    return (
        <>
            {
                cachesLoading
                    ? <LoadingScreen />
                    : (

                        isEditing
                            ? (
                                selectedCache === -1 ?
                                    <CacheForm creatingNew={true} />
                                    :
                                    <CacheForm creatingNew={false} cache={caches!.at(selectedCache!)} />
                            ) : (
                                <div>
                                    <CachesList caches={caches!} selectedCache={selectedCache}
                                        onSelect={(id) => { setSelectedCache(id) }} />

                                    <Button onClick={event => {
                                        setSelectedCache(-1);
                                    }}>Nova keska</Button>
                                </div>
                            )
                    )
            }
        </>
    );
};

export default CachesEditor;