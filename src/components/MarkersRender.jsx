import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import { useSelector } from 'react-redux'
import uuid from 'react-uuid'

import MarkerPopup from './MarkerPopup'
import MarkerPopupEdit from './MarkerPopupEdit'

const MarkersRender = ({ mapEdit }) => {
    const markers = useSelector((state) => state.marker)

    const markerIcon = (icon) => {
        // return new L.DivIcon({
        //     className: 'custom-icon',
        //     html: `<img src="images/icons/${icon}.svg" alt="Marker icon" class="marker-icon"/>`,
        //     iconSize: [64, 64],
        //     iconAnchor: [9, 10],
        // })

        return L.icon({
            iconUrl: `images/icons/${icon}.svg`,
            iconSize: [32, 32],
            className: 'marker-icon',
        })
    }

    return markers.map((marker, index) => (
        <Marker
            key={uuid()}
            index={index}
            position={marker.position}
            icon={markerIcon(marker.icon)}
        >
            <Popup minWidth="310" maxWidth="310" maxHeight="auto">
                {mapEdit ? (
                    <MarkerPopupEdit marker={marker} />
                ) : (
                    <MarkerPopup marker={marker} />
                )}
            </Popup>
        </Marker>
    ))
}

export default MarkersRender
