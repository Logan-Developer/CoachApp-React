import React from 'react';

import '../NoMatch.css';

const NoMatch = () => {

    return (
        <div>
            <div className="mainbox">
                <div className="err">4</div>
                <div className="err2">0</div>
                <div className="err3">4</div>
                <div className="msg">Peut-être que cette page a été déplacée ou supprimée.<p>Retourner <a href="/">à l'accueil</a></p></div>
            </div>
        </div>
    )
}

export default NoMatch;