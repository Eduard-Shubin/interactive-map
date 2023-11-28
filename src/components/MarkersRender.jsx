import { Marker, Popup } from 'react-leaflet'

import { useSelector } from 'react-redux'
import uuid from 'react-uuid'

import MarkerPopup from './MarkerPopup'
import MarkerPopupEdit from './MarkerPopupEdit'

const MarkersRender = ({ markerIcon, mapEdit }) => {
    const markers = useSelector((state) => state.marker)

    return markers.map((marker, index) => (
        <Marker
            key={uuid()}
            index={index}
            position={marker.position}
            icon={markerIcon}
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
