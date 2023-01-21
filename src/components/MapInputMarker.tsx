import {FC, useState} from "react";
import {GeocacheCoordinates} from "../api/types";
import {Marker, useMapEvents} from "react-leaflet";

type MapInputMarkerProps = {
    alternate: boolean,
    onLocationSelect: (coordinates: GeocacheCoordinates) => void,
    initialCoordinates: GeocacheCoordinates,
}

const MapInputMarker: FC<MapInputMarkerProps> = ({alternate,onLocationSelect,initialCoordinates}:MapInputMarkerProps) => {

    const [latitude, setLatitude] = useState<number>(initialCoordinates.lat)
    const [longitude, setLongitude] = useState<number>(initialCoordinates.lng)



    const map = useMapEvents({
        click: event => {
            setLatitude(event.latlng.lat);
            setLongitude(event.latlng.lng);
            onLocationSelect({
                lat: event.latlng.lat,
                lng: event.latlng.lng
            })
        }
    })


    return(
        <Marker position={{lat:latitude,lng:longitude}}/>
    )
}

export default MapInputMarker;