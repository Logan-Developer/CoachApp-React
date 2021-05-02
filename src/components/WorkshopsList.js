import React, {useEffect, useState} from "react";

import Workshop from "./Workshop";
import axios from "./AxiosInterceptor";
import {Button, Form, Table} from "react-bootstrap";

const WorkshopsList = props => {
    const [workshops, setWorkshops] = useState([]);

    const [workshopTitle, setWorkshopTitle] = useState("");
    const [workshopDescription, setWorkshopDescription] = useState("");
    const [workshopPerfUnity, setWorkshopPerfUnity] = useState("");
    const [workshopIntensityUnity, setWorkshopIntensityUnity] = useState("");

    const handleAddWorkshop = event => {
        event.preventDefault();
        axios.post(`api/workshops`,
            {
                title: workshopTitle,
                description: workshopDescription,
                perfUnity: workshopPerfUnity,
                intensityUnity: workshopIntensityUnity
            })
            .then(response => {
                console.log(response.data);
                setWorkshopTitle("");
                setWorkshopPerfUnity("");
                setWorkshopIntensityUnity("");
                setWorkshopDescription("");

                setWorkshops([...workshops, {id: response.data.id, title: workshopTitle, description: workshopDescription, perfUnity: workshopPerfUnity, intensityUnity: workshopIntensityUnity}])
            }, error => console.log(error));
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('api/workshops')
                .then(response => {
                    setWorkshops(response.data)
                }, error => console.log(error));
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Nos ateliers</h1>
            <Table striped bordered hover>
                <thead className="table-dark">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Titre</th>
                </tr>
                </thead>
                <tbody>
                    {workshops.map(currentWorkshop => <Workshop key={currentWorkshop.id} workshop={currentWorkshop}/>)}
                </tbody>
            </Table>

            {props.user ===  undefined || props.user.role !== "ROLE_ADMIN" ? (
                    <></>
                ) :
                (
                    <>
                        <Form>
                            <Form.Group controlId="formWorkshopTitle">
                                <Form.Label>Titre</Form.Label>
                                <Form.Control size="lg" type="text" value={workshopTitle} onChange={event => setWorkshopTitle(event.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formWorkshopDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={10} cols={50} value={workshopDescription} onChange={event => setWorkshopDescription(event.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formWorkshopPerfUnity">
                                <Form.Label>Unité de performance</Form.Label>
                                <Form.Control size="lg" type="text" value={workshopPerfUnity} onChange={event => setWorkshopPerfUnity(event.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formWorkshopIntensityUnity">
                                <Form.Label>Unité d'intensité</Form.Label>
                                <Form.Control size="lg" type="text" value={workshopIntensityUnity} onChange={event => setWorkshopIntensityUnity(event.target.value)}/>
                            </Form.Group>
                            <br/>
                            <Button className="input-submit" onClick={handleAddWorkshop}>Valider</Button>
                        </Form>
                    </>
                )
            }
        </div>
    )
}

export default WorkshopsList;