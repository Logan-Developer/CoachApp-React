import React from "react";
import {useHistory} from "react-router-dom";

const Workshop = props => {

    const history = useHistory();

    const handleDoubleClick = () => {
        history.push(`/workshops/${props.workshop.id}`);
    }

    return (
            <tr onDoubleClick={handleDoubleClick}>
                <th><img alt="Activité" src={`http://localhost:8000/image/${props.workshop.image}`}/></th>
                <th>{props.workshop.title}</th>
            </tr>
    )
}

export default Workshop;