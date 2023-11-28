import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import { useState } from 'react'
import L from 'leaflet'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import customImage from './img/FOKAS2k.png'
import MarkersRender from './components/MarkersRender'
import Controls from '../src/components/Controls'

import 'leaflet/dist/leaflet.css'
import './mapStyles.css'
import './scss/Map.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

const KrasnoeBedstvieMap = () => {
    const admin = true // Temporary variable

    const [mapEdit, setMapEdit] = useState(true)

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
        setMapEdit(!mapEdit) // Инвертируем текущее состояние
    }

    return (
        <HelmetProvider>
            <div id="map">
                <Helmet>
                    <title>Красное Бедствие | Интерактивная карта</title>
                </Helmet>
                <MapContainer
                    center={center}
                    zoom={8}
                    maxZoom={12}
                    minZoom={8}
                    scrollWheelZoom={true}
                >
                    <ImageOverlay url={customImage} bounds={bounds} />
                    <MarkersRender markerIcon={markerIcon} mapEdit={mapEdit} />

                    {admin ? (
                        <Controls
                            markerIcon={markerIcon}
                            mapEdit={mapEdit}
                            handleSwitchChange={handleSwitchChange}
                        />
                    ) : null}
                    <PanRestrict bounds={bounds} />
                </MapContainer>
            </div>
        </HelmetProvider>
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

export default KrasnoeBedstvieMap
