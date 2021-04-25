import React, {useEffect, useState} from "react";

import Workshop from "./Workshop";
import axios from "./AxiosInterceptor";
import {Table} from "react-bootstrap";

const WorkshopsList = props => {
    const [workshops, setWorkshops] = useState([]);

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
        </div>
    )
}

export default WorkshopsList;