import { useState, useEffect, useRef } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import {
    MDBPopover,
    MDBPopoverBody,
    MDBPopoverHeader,
    MDBSwitch,
} from 'mdb-react-ui-kit'
import L from 'leaflet'

import NewMarker from './NewMarker'

const Controls = ({
    setMarkers,
    markers,
    markerIcon,
    admin,
    handleSwitchChange,
}) => {
    const containerRef = useRef(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            L.DomEvent.disableClickPropagation(containerRef.current)
            L.DomEvent.disableScrollPropagation(containerRef.current)
        }
    }, [])

    const [position, setPosition] = useState(null)
    const [markerName, setMarkerName] = useState('')
    const [markerDescription, setMarkerDescription] = useState('')
    const [markerImage, setMarkerImage] = useState([])
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState('')

    const handleAddMarker = (event) => {
        event.preventDefault()
        setValidated(true)

        if (event.currentTarget.checkValidity() === false) {
            return
        }

        if (!position) {
            return
        }

        const newMarker = {
            name: markerName,
            description: markerDescription,
            img: markerImage,
            position,
        }

        console.log(newMarker)
        setMarkers([...markers, newMarker])

        setMarkerName('')
        setMarkerDescription('')
        setMarkerImage(null)
        setValidated(false)
        setError('')

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }
    useEffect(() => {
        if (!position) {
            setError('Пожалуйста, установите маркер')
        } else {
            setError('')
        }
    }, [position])

    return (
        <div>
            {admin ? (
                <NewMarker
                    position={position}
                    setPosition={setPosition}
                    markerIcon={markerIcon}
                    markerName={markerName}
                    markerDescription={markerDescription}
                />
            ) : null}
            <div className="leaflet-top leaflet-right" ref={containerRef}>
                <div
                    className="leaflet-control leaflet-bar"
                    style={{ position: 'relative' }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                    >
                        <MDBSwitch
                            id="adminSwitch"
                            checked={admin}
                            onChange={handleSwitchChange}
                        />
                    </div>
                    {admin ? (
                        <MDBPopover
                            color="secondary"
                            btnChildren="Добавить маркер"
                            placement="bottom"
                            className="mt-2 control-box"
                            style={{
                                position: 'absolute',
                                top: '40px',
                                right: '10px',
                            }}
                        >
                            <MDBPopoverHeader>Добавить маркер</MDBPopoverHeader>
                            <MDBPopoverBody>
                                <Container className="marker-control">
                                    <Form
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleAddMarker}
                                    >
                                        <Form.Group
                                            className="mb-3"
                                            controlId="markerName"
                                        >
                                            <Form.Label>
                                                Название маркера
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={markerName}
                                                onChange={(e) =>
                                                    setMarkerName(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Пожалуйста, введите название
                                                маркера.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="markerDescription"
                                        >
                                            <Form.Label>Описание</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={markerDescription}
                                                onChange={(e) =>
                                                    setMarkerDescription(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Пожалуйста, введите описание
                                                маркера.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="markerImage"
                                        >
                                            <Form.Label>
                                                Загрузить картинку
                                            </Form.Label>
                                            <Form.Control
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={(e) => {
                                                    setMarkerImage(() => {
                                                        const fileNames = []
                                                        for (
                                                            let i = 0;
                                                            i <
                                                            e.target.files
                                                                .length;
                                                            i++
                                                        ) {
                                                            fileNames.push(
                                                                e.target.files[
                                                                    i
                                                                ].name
                                                            )
                                                        }
                                                        return fileNames
                                                    })
                                                }}
                                                required
                                                multiple
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Пожалуйста, загрузите
                                                изображение.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {error && (
                                            <Alert variant="danger">
                                                {error}
                                            </Alert>
                                        )}
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="mb-3"
                                        >
                                            Добавить маркер
                                        </Button>
                                    </Form>
                                </Container>
                            </MDBPopoverBody>
                        </MDBPopover>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Controls
