import React, {useEffect, useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";

const Login = props => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [boolRefresh, setBoolRefresh] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (boolRefresh) {
            props.handleChangeSession("-1", "-1", "-1");
            setBoolRefresh(false);
        }
    }, [props, boolRefresh]);

    const handleSubmit = element => {
        element.preventDefault();

        axios.post('authentication_token', {
            login: login,
            password: password
        })
            .then(response => {
                setMessage(<Alert variant="success">Connexion réussie!</Alert> )
                console.log(response);
                props.handleChangeSession(response.data.token, response.data.refresh_token, login);
                history.push("/myaccount");

            }, error => {
                switch (error.response.status) {
                    case 401:
                        setMessage(<Alert variant="danger">Identification non valide!</Alert> )
                        break;
                    default:
                        setMessage(<Alert variant="danger">Erreur inconnue!</Alert> )
                }
            })
    }

    return (
        <div className="container">
            <h1>Connexion</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={login} onChange={element => setLogin(element.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={element => setPassword(element.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button className="input-submit" onClick={handleSubmit}>Valider</Button>
            </Form>
            {message}
        </div>
    )
}

export default Login;