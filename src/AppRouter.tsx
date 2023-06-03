import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import About from "./components/About"
import NotFound from "./components/NotFound"
import SignIn from "./components/SignIn"
import Dashboard from "./components/Dashboard"
import Home from "./components/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import ShowList from "./components/List"
import Searchresults from "./components/Searchresults"

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<SignIn />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/search-results/:searchString"
                    element={<Searchresults />}
                />
                <Route path="/list/:id" element={<ShowList />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
