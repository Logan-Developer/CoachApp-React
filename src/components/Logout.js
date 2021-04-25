import React from "react";
import {useHistory} from "react-router-dom";

const Logout = props => {

    const history = useHistory();

    const handleSubmitLogout = event => {
        event.preventDefault();

        props.handleChangeSession("-1", "-1", "-1");
        history.push("/login");
    }

    const handleSubmitCancel = event => {
        event.preventDefault();
        history.push("/");
    }

    return (
        <div className="container">
            <h1>Confirmez-vous la déconnexion ?</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <form onSubmit={handleSubmitLogout} className="form-container">
                            <button className="input-submit">Oui</button>
                        </form>
                    </td>
                    <td>
                        <form onSubmit={handleSubmitCancel} className="form-container">
                            <button className="input-submit">Non</button>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Logout;