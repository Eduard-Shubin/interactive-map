import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import { useState } from 'react'
import L from 'leaflet'

import customImage from './img/FOKAS2k.png'
import MarkersRender from './components/MarkersRender'
import Controls from '../src/components/Controls'

import 'leaflet/dist/leaflet.css'
import './mapStyles.css'
import './scss/Map.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
function Map() {
    const [markers, setMarkers] = useState([
        {
            name: 'Кингури',
            description:
                'Древний восточный город, утопающий в атмосфере таинственности и богатства. Расположенный посреди живописных пустынь и оазисов, город известен своими изысканными дворцами, покрытыми узорчатыми коврами и украшенными золотом и драгоценными камнями.',
            img: ['images/sErZPQPDZEo.jpg'],
            position: [1, 8],
        },
        {
            name: 'Two',
            description: 'Two descr',
            img: ['images/QEXGBQpgXYw.jpg'],
            position: [1, 10],
        },
        {
            name: 'three',
            description: 'three descr',
            img: [
                'images/HIJyR8H7a2Q.jpg',
                'images/gdywmtFwgdU.jpg',
                'images/7HkDg5Vu-GQ.jpg',
            ],
            position: [1, 12],
        },
    ])

    const [admin, setAdmin] = useState(true)

    const markerIcon = new L.DivIcon({
        className: 'custom-icon',
        html: '<img src="images/icons/circle-fill.svg" alt="Marker icon" class="marker-icon"/>',
        iconSize: [32, 32],
        iconAnchor: [9, 10],
    })

    const bounds = [
        [0, 0],
        [9, 16],
    ]

    const center = [2.5, 7.2]

    const handleSwitchChange = () => {
        setAdmin(!admin) // Инвертируем текущее состояние
    }

    return (
        <div id="map">
            <MapContainer
                center={center}
                zoom={8}
                maxZoom={12}
                minZoom={8}
                scrollWheelZoom={true}
            >
                <ImageOverlay url={customImage} bounds={bounds} />
                <MarkersRender
                    markers={markers}
                    markerIcon={markerIcon}
                    admin={admin}
                />
                <Controls
                    setMarkers={setMarkers}
                    markers={markers}
                    markerIcon={markerIcon}
                    admin={admin}
                    handleSwitchChange={handleSwitchChange}
                />
                <PanRestrict bounds={bounds} />
            </MapContainer>
        </div>
    )
}

// Ограничение перемещения за пределы карты
function PanRestrict({ bounds }) {
    const map = useMap()
    map.setMaxBounds(bounds)
    map.on('drag', () => {
        if (
            map.getBounds().getNorth() < bounds[0][0] ||
            map.getBounds().getEast() < bounds[0][1] ||
            map.getBounds().getSouth() > bounds[1][0] ||
            map.getBounds().getWest() > bounds[1][1]
        ) {
            map.panInsideBounds(bounds)
        }
    })

    return null
}

export default Map
