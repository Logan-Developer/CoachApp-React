import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const MyAccount = () => {

    const [userInfos, setUserInfos] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            axios.get("/api/currentUser")
                .then(response => {
                    setUserInfos(response.data);
                }, error => {
                    console.log(error);
                });
        }
        fetchData();
    }, []);

    if (userInfos) {
        return (
            <div className="container">
                <h1>Mes informations</h1>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>Identifiant</td>
                        <td>{userInfos.login}</td>
                    </tr>
                    <tr>
                        <td>Nom</td>
                        <td>{userInfos.lastname}</td>
                    </tr>
                    <tr>
                        <td>Prénom</td>
                        <td>{userInfos.firstname}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{userInfos.email}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default MyAccount;