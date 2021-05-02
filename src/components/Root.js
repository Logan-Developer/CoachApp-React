import React, { useState, useEffect } from "react"

import Router from "./Router";
import axios from "axios";

const Root = () => {

    const [token, setToken] = useState( String(localStorage.getItem("token") || "-1"));
    const [refreshToken, setRefreshToken] = useState( String(localStorage.getItem("refresh_token") || "-1"));
    const [login, setLogin] = useState( String(localStorage.getItem("login") || "-1"));
    const [role, setRole] = useState( String(localStorage.getItem("role") || "-1"));
    const [user, setUser] = useState(undefined);

    useEffect(() => localStorage.setItem("token", token), [token]);
    useEffect(() => localStorage.setItem("refresh_token", refreshToken), [refreshToken]);
    useEffect(() => localStorage.setItem("login", login), [login]);
    useEffect(() => localStorage.setItem("role", role), [role]);

    const changeSession = (tokenParam, refreshTokenParam) => {

        setToken(tokenParam);
        setRefreshToken(refreshTokenParam);

        console.log(tokenParam);
        if (tokenParam === "-1" && refreshTokenParam === "-1") {
            setLogin("-1");
            setRole("-1");
            setUser(undefined);

        } else {

            axios.get('api/currentUser')
                .then(response => {
                    setLogin(response.data.login);

                    let varRole = "ROLE_USER";

                    if (response.data.roles.includes("ROLE_ADMIN")) {
                        varRole = "ROLE_ADMIN";
                    }

                    setUser({login: response.data.login, role: varRole});
                })
        }
    }

    return (
        <Router handleChangeSession={changeSession} user={user}/>
    )
}

export default Root;