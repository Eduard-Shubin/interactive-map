import { useState, useEffect, useRef } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import {
    MDBPopover,
    MDBPopoverBody,
    MDBPopoverHeader,
    MDBSwitch,
} from 'mdb-react-ui-kit'
import L from 'leaflet'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'

import NewMarker from './NewMarker'
import ImagesUpload from './ImagesUpload'
import { addMarker } from '../features/marker/markerSlice'

const Controls = ({ markerIcon, mapEdit, handleSwitchChange, admin }) => {
    const containerRef = useRef(null)
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (containerRef.current) {
            L.DomEvent.disableClickPropagation(containerRef.current)
            L.DomEvent.disableScrollPropagation(containerRef.current)
        }
    }, [])

    const [newPosition, setNewPosition] = useState(null)
    const [newMarkerName, setNewMarkerName] = useState('')
    const [newMarkerDescription, setNewMarkerDescription] = useState('')
    const [newMarkerImage, setNewMarkerImage] = useState(null)
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState('')
    const [imageError, setImageError] = useState(true)

    //Add marker handle function
    const handleAddMarker = (event) => {
        event.preventDefault()
        setValidated(true)

        if (event.currentTarget.checkValidity() === false) {
            return
        }

        if (!newPosition) {
            return
        }

        if (imageError) {
            return
        }

        const newMarker = {
            id: uuid(),
            name: newMarkerName,
            description: newMarkerDescription,
            img: newMarkerImage.map((img) => `images/${img.name}`),
            position: newPosition,
        }

        dispatch(addMarker(newMarker))

        setNewMarkerName('')
        setNewMarkerDescription('')
        setNewMarkerImage(null)
        setNewPosition(null)
        setValidated(false)
        setError('')

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }
    useEffect(() => {
        if (!newPosition) {
            setError('Пожалуйста, установите маркер')
        } else {
            setError('')
        }
    }, [newPosition])

    useEffect(() => {
        if (!(newMarkerImage && !(newMarkerImage.length === 0))) {
            setImageError(true)
        } else {
            setImageError(false)
        }
    }, [newMarkerImage])

    return (
        <div>
            {mapEdit ? (
                <NewMarker
                    newPosition={newPosition}
                    setNewPosition={setNewPosition}
                    markerIcon={markerIcon}
                    newMarkerName={newMarkerName}
                    newMarkerDescription={newMarkerDescription}
                    newMarkerImg={newMarkerImage}
                />
            ) : null}
            <div className="leaflet-top leaflet-right" ref={containerRef}>
                <div className="leaflet-control leaflet-bar control-switch">
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                    >
                        <MDBSwitch
                            id="adminSwitch"
                            checked={mapEdit}
                            onChange={handleSwitchChange}
                        />
                    </div>
                    {mapEdit ? (
                        <MDBPopover
                            color="secondary"
                            btnChildren="Добавить маркер"
                            placement="bottom"
                            className="mt-2"
                            btnClassName="control-btn mt-2"
                            poperStyle={{
                                width: '350px',
                                maxHeight: '800px',
                                overflowY: 'auto',
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
                                            controlId="newMarkerName"
                                        >
                                            <Form.Label>
                                                Название маркера
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newMarkerName}
                                                onChange={(e) =>
                                                    setNewMarkerName(
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
                                            controlId="newMarkerDescription"
                                        >
                                            <Form.Label>Описание</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={newMarkerDescription}
                                                onChange={(e) =>
                                                    setNewMarkerDescription(
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
                                            controlId="newMarkerImage"
                                        >
                                            <Form.Label>
                                                Загрузить картинку
                                            </Form.Label>
                                            <ImagesUpload
                                                images={newMarkerImage}
                                                setImages={setNewMarkerImage}
                                            />
                                            {imageError && (
                                                <Alert
                                                    variant="danger"
                                                    className="mt-2"
                                                >
                                                    Пожалуйста, загрузите
                                                    изображение.
                                                </Alert>
                                            )}
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
