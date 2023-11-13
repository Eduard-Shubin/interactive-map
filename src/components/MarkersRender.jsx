import {
    MDBCarousel,
    MDBCarouselItem,
    MDBBtn,
    MDBContainer,
    MDBTypography,
} from 'mdb-react-ui-kit'
import { Marker, Popup } from 'react-leaflet'
import uuid from 'react-uuid'

const MarkersRender = ({ markers, markerIcon, admin }) => {
    return markers.map((marker) => (
        <Marker key={uuid()} position={marker.position} icon={markerIcon}>
            <Popup minWidth="310" maxWidth="310" maxHeight="auto">
                <MDBContainer className="d-block justify-content-center p-0">
                    <MDBTypography tag="h3" className="text-center m-2">
                        {marker.name}
                    </MDBTypography>
                    {marker.img.length > 1 ? (
                        <MDBCarousel showControls>
                            {marker.img.map((img, index) => {
                                return (
                                    <MDBCarouselItem
                                        itemId={index + 1}
                                        key={uuid()}
                                    >
                                        <img
                                            src={img}
                                            className="img-fluid"
                                            alt="..."
                                        />
                                    </MDBCarouselItem>
                                )
                            })}
                        </MDBCarousel>
                    ) : (
                        <img src={marker.img} className="img-fluid" alt="..." />
                    )}
                    <MDBContainer fluid className="mt-2 mb-2 pr-1 pl-1">
                        {marker.description}
                    </MDBContainer>
                    {admin ? (
                        <div className="d-flex justify-content-between">
                            <MDBBtn
                                outline
                                color="warning"
                                className="m-1"
                                title="Редактировать"
                            >
                                <i className="fas fa-pen"></i>
                            </MDBBtn>
                            <MDBBtn
                                outline
                                color="danger"
                                className="m-1"
                                title="Удалить"
                            >
                                <i className="fas fa-trash-can"></i>
                            </MDBBtn>
                        </div>
                    ) : null}
                </MDBContainer>
            </Popup>
        </Marker>
    ))
}

export default MarkersRender
