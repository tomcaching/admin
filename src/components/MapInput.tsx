import {type FC, useState} from "react";
import {GeocacheCoordinates} from "../api/types";
import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import MapInputMarker from "./MapInputMarker";

type MapInputProps = {
    onSubmit: (coordinates: GeocacheCoordinates) => void
}

const MapInput: FC<MapInputProps> = ({onSubmit}: MapInputProps) => {
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    return (
        <div>
            <MapContainer
                center={[50.77481, 15.04828]}
                zoom={13}
                scrollWheelZoom={true}
                style={{height: '300px', width: '300px'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapInputMarker
                    alternate={false}
                    onLocationSelect={(coordinates) => {
                        onSubmit(coordinates);
                    }}
                    initialCoordinates={{lat: 50.77481, lng: 15.04828}}
                />

            </MapContainer>
        </div>
    );
};

export default MapInput;