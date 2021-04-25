import React, {useEffect, useState} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";
import Drink from "./Drink";

const DrinksList = props => {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('api/drinks')
                .then(response => {
                    setDrinks(response.data)
                }, error => console.log(error));
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Boissons</h1>
            <p>En choisissant la bonne boisson adaptée à vos efforts, vous progresserez encore plus vite!</p>
            <Table striped bordered hover>
                <thead className="table-dark">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Titre</th>
                </tr>
                </thead>
                <tbody>
                {drinks.map(currentDrink => <Drink key={currentDrink.id} drink={currentDrink}/>)}
                </tbody>
            </Table>
        </div>
    );
}

export default DrinksList;