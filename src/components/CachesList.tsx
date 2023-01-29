import { GeocacheDto } from "@/types";
import { FC } from "react";

type CachesListProps = {
    caches: Array<GeocacheDto>;
    onSelect: (id: number) => void;
};

export const CachesList: FC<CachesListProps> = ({ caches, onSelect }: CachesListProps) => {
    return (
        <ul>
            {
                caches.map((cache) => 
                    <li onClick={() => onSelect(cache.id)} key={cache.id}>{cache.title}</li>
                )
            }
        </ul>
    )
};