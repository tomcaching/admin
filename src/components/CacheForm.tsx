import {FC, useState} from "react";
import {Form} from "react-bootstrap";
import {GeocacheDto, GeocacheType} from "@/types";


type CacheFormProps = {
    creatingNew: boolean;
    cache?:GeocacheDto;

}
const CacheForm: FC<CacheFormProps> = ({creatingNew,cache}: CacheFormProps ) => {
console.log(cache)

    const [newType,setNewType] = useState<GeocacheType>(creatingNew?"traditional":cache!.type);
    const [newTitle,setNewTitle] = useState<string>(creatingNew?"Nova Keska":cache!.title);

    return(
        <form>
            <header>{creatingNew?"Vytvareni":"Upravovani"} kesky <input value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} /></header>
        </form>
    )
}


export default CacheForm;