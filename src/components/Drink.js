import React from "react";
import {useHistory} from "react-router-dom";

const Drink = props => {

    const history = useHistory();

    const handleDoubleClick = () => {
        history.push(`/drinks/${props.drink.id}`);
    }

    return (
        <tr onDoubleClick={handleDoubleClick}>
            <th><img alt="Boisson" src={`http://localhost:8000/image/${props.drink.image}`}/></th>
            <th>{props.drink.title}</th>
        </tr>
    )
}

export default Drink;