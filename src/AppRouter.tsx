import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import NotFound from "./components/NotFound"

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter
