import React from "react";
import {Card} from "react-bootstrap";
import Moment from "moment";

const Comment = ({comment, user, handleDeleteComment}) => {

    return (
        <Card>
            <Card.Header>De <i>
                {comment.owner === null ? (
                        <>Anonyme</>
                    ) :
                    (
                        <>{comment.owner.login}</>
                    )
                }
            </i> le {Moment(comment.date).format("DD/MM/YYYY à HH:mm")}

                {comment.owner === null ?
                    (<> </>)
                    : (<> {comment.owner.login === user.login ?
                        (
                            <>
                                <button className="input-submit" onClick={() => handleDeleteComment(comment.id)}>Supprimer</button>
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