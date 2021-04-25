import { BrowserRouter, Route, Switch } from "react-router-dom";

import About from "../pages/About";
import NoMatch from "../pages/NoMatch";
import Home from "../pages/Home";
import NavBar from "./NavBar";
import WorkshopsList from "./WorkshopsList";
import DrinksList from "./DrinksList";
import WorkshopDetails from "./WorkshopDetails";
import DrinkDetails from "./DrinkDetails";
import Login from "./Login";
import Logout from "./Logout";
import MyAccount from "./MyAccount";

const Router = props => {
    return (
        <BrowserRouter>
            <NavBar login={props.login}/>
            <Switch>
                <Route exact path="/about">
                    <About/>
                </Route>
                <Route exact path="/workshops/:id">
                    <WorkshopDetails login={props.login}/>
                </Route>
                <Route exact path="/workshops">
                    <WorkshopsList/>
                </Route>
                <Route exact path="/drinks/:id">
                    <DrinkDetails login={props.login}/>
                </Route>
                <Route exact path="/drinks">
                    <DrinksList/>
                </Route>
                <Route exact path="/login">
                    <Login handleChangeSession={props.handleChangeSession}/>
                </Route>
                <Route exact path="/logout">
                    <Logout handleChangeSession={props.handleChangeSession}/>
                </Route>
                <Route exact path="/myaccount">
                    <MyAccount/>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="*">
                    <NoMatch/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;