import { GeocacheDto } from "@/types";
import { FC } from "react";

type CachesListProps = {
    caches: Array<GeocacheDto>;
    selectedCache: number | null;
    onSelect: (id: number) => void;
};

export const CachesList: FC<CachesListProps> = ({ caches, selectedCache, onSelect }: CachesListProps) => {
    return (
        <div>
            {
                caches.map((cache) =>
                    <div key={cache.id} onClick={() => onSelect(cache.id)}>
                        {cache.title}
                    </div>
                )
            }
        </div>
    )
};