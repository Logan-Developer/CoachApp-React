import React from "react";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";

const NavBar = props => {

    let loginNav;
    if (props.login === "" || props.login === "-1") {
        loginNav = <Navbar.Brand as={Link} to="/login">Connexion</Navbar.Brand>

    } else {
        loginNav =
            <>
                <Navbar.Brand as={Link} to="/myAccount">Mon compte</Navbar.Brand>
                <Navbar.Brand as={Link} to="/logout">Déconnexion</Navbar.Brand>
                <Navbar.Text>{props.login}</Navbar.Text>
            </>
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Ma salle de muscu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/about">A propos</Nav.Link>
                    <Nav.Link as={Link} to="/workshops">Nos ateliers</Nav.Link>
                    <Nav.Link as={Link} to="/drinks">Nos boissons</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {loginNav}
        </Navbar>
    )
}

export default NavBar;