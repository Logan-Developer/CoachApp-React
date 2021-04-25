import React, { useState, useEffect } from "react"

import Router from "./Router";

const Root = () => {

    const [token, setToken] = useState( String(localStorage.getItem("token") || "-1"));
    const [refreshToken, setRefreshToken] = useState( String(localStorage.getItem("refresh_token") || "-1"));
    const [login, setLogin] = useState( String(localStorage.getItem("login") || "-1"));

    useEffect(() => localStorage.setItem("token", token), [token]);
    useEffect(() => localStorage.setItem("refresh_token", refreshToken), [refreshToken]);
    useEffect(() => localStorage.setItem("login", login), [login]);

    const changeSession = (tokenParam, refreshTokenParam, loginParam) => {

        setToken(tokenParam);
        setRefreshToken(refreshTokenParam);
        setLogin(loginParam);
    }

    return (
        <Router handleChangeSession={changeSession} login={login}/>
    )
}

export default Root;