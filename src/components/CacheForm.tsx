import React, {FC, useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import {GeocacheCoordinates, GeocacheDto, GeocacheRequest, GeocacheType} from "@/types";

type CacheFormProps = {
    creatingNew: boolean;
    cache?: GeocacheDto;

}
const defaultCoords: GeocacheCoordinates = {
    lat: 50.7741467,
    lng: 15.0484722,
}
const CacheForm: FC<CacheFormProps> = ({creatingNew, cache}: CacheFormProps) => {

    //nevim jak je udelany vytvareni id u novych kesek takze ten DTO bude mit -1
    const id = creatingNew ? -1 : cache!.id;

    const [title, setTitle] = useState<string>(creatingNew ? "Nova Keska" : cache!.title);
    const [type, setType] = useState<GeocacheType>(creatingNew ? "traditional" : cache!.type);
    const [content, setContent] = useState<string>(creatingNew ? "" : cache!.content);
    const [locked, setLocked] = useState(creatingNew ? true : cache!.locked)
    const [found, setFound] = useState(creatingNew? false : cache!.found)
    const isMystery = type == "mystery";

    const [realLat, setRealLat] = useState((creatingNew ? defaultCoords.lat : cache!.coordinates.lat).toString())
    const [realLng, setRealLng] = useState((creatingNew ? defaultCoords.lat : cache!.coordinates.lng).toString())

    const hasStartingFakeCoords = cache?.fakeCoordinates != null;
    const [fakeLat, setFakeLat] = useState((hasStartingFakeCoords ? cache!.fakeCoordinates!.lat : defaultCoords.lat).toString())
    const [fakeLng, setFakeLng] = useState((hasStartingFakeCoords ? cache!.fakeCoordinates!.lng : defaultCoords.lng).toString())

    const hasStartingQuestion = cache?.question != null;
    const [question, setQuestion] = useState(hasStartingQuestion ? cache!.question : "");
    const hasStartingSolution = cache?.solution != null;
    const [solution, setSolution] = useState(hasStartingSolution ? cache!.solution : "")
    const toggleMysterka = () => setType(isMystery ? "traditional" : "mystery")


    return (
        <Form className="m-5" onSubmit={(event) => {
            event.preventDefault()

            const coordinates = {
                lat: Number(realLat),
                lng: Number(realLng),
            }

            const fakeCoordinates = {
                lat: Number(fakeLat),
                lng: Number(fakeLng),
            }

            // TODO
            const hint = "Hint placeholder";
            const base = {
                title,
                content,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                hint
            };

            const request: GeocacheRequest = isMystery 
                ? { ...base, type: "mystery", fakeLatitude: fakeCoordinates.lat, fakeLongitude: fakeCoordinates.lng, question, solution }
                : { ...base, type: "traditional" };

            console.log(request);

            if (creatingNew) {
                //id je -1 protze nevim jak funguje generovani id
                //novaKeska(cacheDto)
            } else {
                //aktualizovatKesku(cacheDto)
            }
        }}>
            <Form.Group className="mb-3">
                <Form.Label>Nazev kesky</Form.Label>
                <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Nalezena" onChange={() => setFound(!found)} checked={found}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Mysterka" onChange={() => toggleMysterka()} checked={isMystery}/>
            </Form.Group>
            {
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Zamcena" onChange={() => setLocked(!locked)} checked={locked}/>
                </Form.Group>
            }

            <Form.Group className="mb-3">
                <Form.Label>Realne souradnice</Form.Label>
                <Row>
                    <Col>
                        <Form.Text className="text-muted">N</Form.Text>
                        <Form.Control type="text" placeholder="" value={realLat}
                                      onChange={(event) => setRealLat(event.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Text className="text-muted">E</Form.Text>
                        <Form.Control type="text" placeholder="" value={realLng}
                                      onChange={(event) => setRealLng(event.target.value)}/>
                    </Col>
                </Row>
            </Form.Group>
            {
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Label>Falesne souradnice</Form.Label>
                    <Row>
                        <Col>
                            <Form.Text className="text-muted">N</Form.Text>
                            <Form.Control type="text" placeholder="" value={fakeLat}
                                          onChange={(event) => setFakeLat(event.target.value)}/>
                        </Col>
                        <Col>
                            <Form.Text className="text-muted">E</Form.Text>
                            <Form.Control type="text" placeholder="" value={fakeLng}
                                          onChange={(event) => setFakeLng(event.target.value)}/>
                        </Col>
                    </Row>
                </Form.Group>
            }
            {
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Label>Otazka</Form.Label>

                    <Form.Control type="text" placeholder="" value={question}
                                  onChange={(event) => setQuestion(event.target.value)}/>
                </Form.Group>
            }
            {
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Label>Odpoved</Form.Label>

                    <Form.Control type="text" placeholder="" value={solution}
                                  onChange={(event) => setSolution(event.target.value)}/>
                </Form.Group>
            }

            <Form.Group className="mb-3">
                <Form.Label>Popis</Form.Label>

                <Form.Control as={"textarea"} value={content} onChange={(event) => setContent(event.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Ulozit
            </Button>
        </Form>
    )
}


export default CacheForm;