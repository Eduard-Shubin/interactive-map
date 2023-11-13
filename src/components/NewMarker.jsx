import { Marker, Popup, useMapEvents } from 'react-leaflet'

const NewMarker = ({
    position,
    setPosition,
    markerIcon,
    markerName,
    markerDescription,
}) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng
            setPosition([lat, lng])
        },
    })

    return position ? (
        <Marker position={position} icon={markerIcon}>
            <Popup className="marker-popup">
                <p>{markerName}</p>
                <br />
                <p>{markerDescription}</p>
            </Popup>
        </Marker>
    ) : null
}

export default NewMarker
