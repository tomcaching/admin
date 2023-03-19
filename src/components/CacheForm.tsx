import React, { FC, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { GeocacheDto, GeocacheRequest, GeocacheType } from "@/types";
import { createCache, fetchCaches, resetCache, updateCache } from "@/client";
import { useAdminContext } from "@/context";
import { useQuery } from "react-query";
import ReactMarkdown from "react-markdown";
import { checkPassword } from '../client/index';

type CacheFormProps = {
    creatingNew: boolean;
    cacheId: number | null;

}

type LoadedCacheFormProps = {
    creatingNew: boolean;
    cache?: GeocacheDto;
}

const LoadingScreen: FC = () => {
    return (
        <div>Nacitani kesky</div>
    )
}

const LoadedCacheForm: FC<LoadedCacheFormProps> = ({ creatingNew, cache }) => {


    const { password } = useAdminContext();

    const defaultLatitude = () => 50.7741467 + (Math.random() / 100);
    const defaultLongitude = () => 15.0484722 + (Math.random() / 100);


    const initialCache: GeocacheRequest =
        creatingNew
            ? {
                title: "Nova Keska",
                type: "mystery",
                content: "",
                latitude: defaultLatitude(),
                longitude: defaultLongitude(),
                fakeLatitude: defaultLatitude(),
                fakeLongitude: defaultLongitude(),
                hint: "",
                question: "",
                solution: "",
                challenge: "",
            }
            : {
                title: cache!.title,
                type: cache!.type,
                content: cache!.content,
                latitude: cache!.coordinates.lat,
                longitude: cache!.coordinates.lng,
                fakeLatitude: cache!.fakeCoordinates?.lat ?? defaultLatitude(),
                fakeLongitude: cache!.fakeCoordinates?.lng ?? defaultLongitude(),
                hint: cache!.hint ?? "",
                question: cache!.question ?? "",
                solution: cache!.solution ?? "",
                challenge: cache!.challenge ?? "",
            }


    const [title, setTitle] = useState<string>(initialCache.title);
    const [type, setType] = useState<GeocacheType>(initialCache.type);
    const [content, setContent] = useState<string>(initialCache.content);
    const [hint, setHint] = useState<string>(creatingNew ? "" : cache!.hint);
    const isMystery = type == "mystery";

    const [realLat, setRealLat] = useState(initialCache.latitude.toString())
    const [realLng, setRealLng] = useState(initialCache.longitude.toString())

    const [fakeLat, setFakeLat] = useState(initialCache.fakeLatitude!.toString())
    const [fakeLng, setFakeLng] = useState(initialCache.fakeLongitude!.toString())

    const [question, setQuestion] = useState(initialCache.question);

    const [solution, setSolution] = useState(initialCache.solution)
    const [challenge, setChallenge] = useState(initialCache.challenge)
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

            const base = {
                title,
                content,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                hint,
            };

            const request: GeocacheRequest = isMystery
                ? {
                    ...base,
                    type: "mystery",
                    fakeLatitude: fakeCoordinates.lat,
                    fakeLongitude: fakeCoordinates.lng,
                    question,
                    solution,
                    challenge,
                }
                : { ...base, type: "traditional" };


            if (creatingNew) {
                createCache(password!, request)
                    .then(result => {
                        console.log(result)

                    })
            } else {
                updateCache(password!, cache!.id, request)
                    .then(result => {
                        console.log(result)
                    })
            }

        }}>
            {
                (!creatingNew) &&
                <div className={"btn btn-sm btn-outline-secondary"}
                    onClick={() => resetCache(password!, cache!.id)}>resetovat kesku</div>
            }
            <Form.Group className="mb-3">
                <Form.Label>Nazev kesky</Form.Label>
                <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </Form.Group>
            {/*
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Nalezena" onChange={() => setFound(!found)} checked={found}/>
            </Form.Group>

                 */}
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Mysterka" onChange={() => toggleMysterka()} checked={isMystery} />
            </Form.Group>
            {/*
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Zamcena" onChange={() => setLocked(!locked)} checked={locked}/>
                </Form.Group>
            */}

            <Form.Group className="mb-3">
                <Form.Label>Realne souradnice</Form.Label>
                <Row>
                    <Col>
                        <Form.Text className="text-muted">N</Form.Text>
                        <Form.Control type="text" placeholder="" value={realLat}
                            onChange={(event) => setRealLat(event.target.value)} />
                    </Col>
                    <Col>
                        <Form.Text className="text-muted">E</Form.Text>
                        <Form.Control type="text" placeholder="" value={realLng}
                            onChange={(event) => setRealLng(event.target.value)} />
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
                                onChange={(event) => setFakeLat(event.target.value)} />
                        </Col>
                        <Col>
                            <Form.Text className="text-muted">E</Form.Text>
                            <Form.Control type="text" placeholder="" value={fakeLng}
                                onChange={(event) => setFakeLng(event.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
            }
            {
                <Form.Group className="mb-3">
                    <Form.Label>Napoveda</Form.Label>

                    <Form.Control as={"textarea"} placeholder="" value={hint}
                        onChange={(event) => setHint(event.target.value)} />
                    <Card>

                        <ReactMarkdown skipHtml={true} className={"m-2"}>{hint}</ReactMarkdown>
                    </Card>

                </Form.Group>
            }
            {
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Label>Otazka</Form.Label>

                    <Form.Control as={"textarea"} placeholder="" value={question}
                        onChange={(event) => setQuestion(event.target.value)} />
                    <Card>

                        <ReactMarkdown skipHtml={true} className={"m-2"}>{question ?? ""}</ReactMarkdown>
                    </Card>

                </Form.Group>
            }
            {
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Label>Odkaz</Form.Label>

                    <Form.Control placeholder="" value={challenge}
                        onChange={(event) => setChallenge(event.target.value)} />


                    <a target="_blank" className="btn btn-info" href={challenge}>test</a>

                </Form.Group>
            }
            {
                isMystery &&
                <Form.Group className="mb-3">
                    <Form.Label>Odpoved</Form.Label>

                    <Form.Control type="text" placeholder="" value={solution}
                        onChange={(event) => setSolution(event.target.value)} />
                </Form.Group>
            }

            <Form.Group className="mb-3">
                <Form.Label>Popis</Form.Label>

                <Form.Control as={"textarea"} value={content} onChange={event => setContent(event.target.value)} />
                <Card>

                    <ReactMarkdown skipHtml={true} className={"m-2"}>{content}</ReactMarkdown>
                </Card>

            </Form.Group>
            <div>
                <Button className="btn-primary btn m-2 d-inline-block" type="submit">
                    Ulozit
                </Button>
            </div>
        </Form>
    )
}


export const CacheForm: FC<CacheFormProps> = ({ creatingNew, cacheId }) => {

    const { password } = useAdminContext();

    const {
        data: caches,
        isLoading: cachesLoading
    } = useQuery<Array<GeocacheDto>>("caches", async () => await fetchCaches(password!));


    return (<>
        {
            cachesLoading
                ? <LoadingScreen />
                : creatingNew
                    ? <LoadedCacheForm creatingNew={true} />
                    : <LoadedCacheForm creatingNew={false} cache={caches!.find(cache => cache.id == cacheId)} />
        }

    </>)

}

