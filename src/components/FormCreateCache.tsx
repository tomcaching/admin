import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Stack,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {GeocacheType, GeocacheCoordinates, GeocacheRequest} from "../api/types";
import MapInput from "./MapInput";
import {checkPassword, createCache} from "../api";


function FormCreateCache() {
    const [type, setType] = useState<GeocacheType>("mystery");
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [coordinates, setCoordinates] = useState<GeocacheCoordinates>({lat: 0, lng: 0});
    const [fakeCoordinates, setFakeCoordinates] = useState<GeocacheCoordinates>({lat: 0, lng: 0});
    const [question, setQuestion] = useState<string>();
    const [solution, setSolution] = useState<string>();

    const isMystery = type == "mystery";
    const submit = () => {
        const password = prompt("Zadej heslo");
        if (password == null) {
            return
        }

        checkPassword(password)
            .then(isCorrect => {
                if (!isCorrect) {
                    alert("Nespravne heslo")
                    return;
                }
            })

        let request: GeocacheRequest;

        if (isMystery) {
            request = {
                type: "mystery",
                title: title,
                content: content,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                fakeLatitude: fakeCoordinates.lat,
                fakeLongitude: fakeCoordinates.lng,
                question: question,
                solution: solution
            }
        } else {
            request = {
                type: "traditional",
                title: title,
                content: content,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
            }
        }

        createCache(password, request);

    }


    return (
        <Stack spacing={6}>
            <Heading>Vytvorit kesku</Heading>

            <FormControl>
                <FormLabel>Nazev kesky</FormLabel>
                <Input
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Popis</FormLabel>
                <Input
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
            </FormControl>

            <RadioGroup
                onChange={(value: GeocacheType) => setType(value)}
                value={type}
                defaultValue={"mystery"}
            >
                <FormLabel>Typ Kešky</FormLabel>
                <Stack direction={"row"}>
                    <Radio value="traditional">Tradiční</Radio>
                    <Radio value="mystery">Mysterka</Radio>
                </Stack>
            </RadioGroup>


            <FormControl>
                <FormLabel>Souradnice</FormLabel>
                <MapInput onSubmit={(coordinates) => setCoordinates(coordinates)}/>
            </FormControl>

            {isMystery && (
                <FormControl>
                    <FormLabel>Falesne souradnice</FormLabel>
                    <MapInput onSubmit={(coordinates) => setFakeCoordinates(coordinates)}/>
                </FormControl>
            )}


            {isMystery && (
                <FormControl>
                    <FormLabel>Otazka</FormLabel>
                    <Input
                        onChange={(event) => setQuestion(event.target.value)}
                        value={question}
                    />
                </FormControl>
            )}

            {isMystery && (
                <FormControl>
                    <FormLabel>Odpoved</FormLabel>
                    <Input
                        onChange={(event) => setSolution(event.target.value)}
                        value={solution}
                    />
                </FormControl>
            )}


            <Button
                onClick={() => submit()}
            >Vytvorit</Button>

        </Stack>
    )
}

export default FormCreateCache;