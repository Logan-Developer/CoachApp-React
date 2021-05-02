import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import Table from "react-bootstrap/Table";
import axios from "./AxiosInterceptor";
import {Button, Form} from "react-bootstrap";
import Comment from "./Comment";

const WorkshopDetails = props => {

    const [workshop, setWorkshop] = useState({});
    const {id} = useParams();

    const [commentTitle, setCommentTitle] = useState("");
    const [commentMessage, setCommentMessage] = useState("");

    const handleAddComment = event => {
        event.preventDefault();
        axios.post(`api/workshops/${id}/comments`,
            {
                title: commentTitle,
                message: commentMessage
            })
            .then(response => {
                console.log(workshop);
                workshop.commentaries.push(response.data);
                setWorkshop(workshop);
                setCommentTitle("");
                setCommentMessage("");
            }, error => console.log(error));
    }

    const handleDeleteComment = idComment => {
        axios.delete(`api/workshop_commentaries/${idComment}`)
            .then(response => {
                setWorkshop(
                    {
                        ...workshop,
                        commentaries: workshop.commentaries.filter(comment => comment.id !== idComment)
                    }
                )
            }, error => console.log(error))
    }

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`api/workshops/${id}`)
                .then(response => {
                    setWorkshop(response.data)
                }, error => {
                    console.log(error);
                });
        }

        fetchData();
    }, [id]);

    if (workshop) {
        return (
            <div className="container">
                <h1><img alt="Activité" src={`http://localhost:8000/image/${workshop.image}`}/> Détails de l'atelier {workshop.title}</h1>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Description</td>
                            <td>{workshop.description}</td>
                        </tr>
                        <tr>
                            <td>Unité de performance</td>
                            <td>{workshop.perfUnity}</td>
                        </tr>
                        <tr>
                            <td>Unité d'intensité</td>
                            <td>{workshop.intensityUnity}</td>
                        </tr>
                    </tbody>
                </Table>
                <h2>Commentaires</h2>
                {workshop.commentaries === undefined ? (
                        <p>Pas encore de commentaire</p>
                    ) :
                    (
                        <>
                            {
                                workshop.commentaries.map(comment => <Comment comment={comment} user={props.user} handleDeleteComment={handleDeleteComment}/>)
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
    }
}

export default WorkshopDetails;