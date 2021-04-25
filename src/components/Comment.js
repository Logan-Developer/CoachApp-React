import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import Moment from "moment";
import axios from "./AxiosInterceptor";

const Comment = ({commentUrl, login, handleDeleteComment}) => {

    const [comment, setComment] = useState({});
    const [owner, setOwner] = useState({});

    useEffect(() => {
        const fetchComment = async () => {
            axios.get(commentUrl)
                .then(response => {
                    setComment(response.data)
                    fetchOwner(response.data.owner)
                }, error => {
                    console.log(error);
                });
        }

        fetchComment();
    }, [commentUrl]);

    const fetchOwner = async ownerUrl => {
        axios.get(ownerUrl)
            .then(response => {
                setOwner(response.data)
            }, error => {
                console.log(error);
            });
    }

    return (
        <Card>
            <Card.Header>De <i>
                {owner === null ? (
                        <>Anonyme</>
                    ) :
                    (
                        <>{owner.login}</>
                    )
                }
            </i> le {Moment(comment.date).format("DD/MM/YYYY à HH:mm")}

                {owner === null ?
                    (<> </>)
                    : (<> {owner.login === login ?
                        (
                            <>
                                <button className="input-submit" onClick={event => handleDeleteComment(comment.id)}>Supprimer</button>
                            </>
                        ) : (<></>)
                    }
                    </>)}
            </Card.Header>
            <Card.Body>
                <Card.Title> {comment.title} </Card.Title>
                <Card.Text>
                    {comment.message}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Comment;