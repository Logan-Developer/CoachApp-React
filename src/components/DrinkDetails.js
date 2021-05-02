import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import Table from "react-bootstrap/Table";
import axios from "./AxiosInterceptor";
import Comment from "./Comment";
import {Button, Form} from "react-bootstrap";

const DrinkDetails = props => {

    const [drink, setDrink] = useState();
    const {id} = useParams();

    const [commentTitle, setCommentTitle] = useState("");
    const [commentMessage, setCommentMessage] = useState("");

    const handleAddComment = event => {
        event.preventDefault();

        axios.post(`/api/drinks/${id}/comments`,
            {
                title: commentTitle,
                message: commentMessage
            })
            .then(response => {
                console.log(response.data);
                drink.comments.push(response.data);
                setDrink(drink);
                setCommentTitle("")
                setCommentMessage("")
            }, error => console.log(error));
    }

    const handleDeleteComment = idComment => {
        axios.delete(`api/drink_comments/${idComment}`)
            .then(response => {
                setDrink(
                    {
                        ...drink,
                        comments: drink.comments.filter(comment => comment.id !== idComment)
                    }
                )
            }, error => console.log(error))
    }

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`api/drinks/${id}`)
                .then(response => {
                    setDrink(response.data)
                }, error => {
                    console.log(error);
                });
        }

        fetchData();
    }, [id]);

    if (drink) {
        return (
            <div className="container">
                <h1><img alt="Boisson " src={`http://localhost:8000/image/${drink.image}`}/> Détails de la boisson {drink.title}</h1>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>Description</td>
                        <td>{drink.description}</td>
                    </tr>
                    </tbody>
                </Table>
                <h2>Commentaires</h2>
                {drink.comments.length === 0 ? (
                        <p>Pas encore de commentaire</p>
                    ) :
                    (
                        <>
                            {
                                drink.comments.map(comment => <Comment comment={comment} user={props.user} handleDeleteComment={handleDeleteComment}/>)
                            }
                        </>
                    )
                }

                {props.user === undefined ? (
                        <></>
                    ) :
                    (
                        <>
                            <Form>
                                <Form.Group controlId="formCommentTitle">
                                    <Form.Label>Titre</Form.Label>
                                    <Form.Control size="lg" type="text" value={commentTitle} onChange={event => setCommentTitle(event.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formCommentMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={10} cols={50} value={commentMessage} onChange={event => setCommentMessage(event.target.value)}/>
                                </Form.Group>
                                <br/>
                                <Button className="input-submit" onClick={handleAddComment}>Valider</Button>
                            </Form>
                        </>
                    )
                }
            </div>
        )
    } else {
        return (
            <div className="container">
                <p>Oups, nous ne possédons pas cette boisson!</p>
            </div>
        )
    }
}

export default DrinkDetails;