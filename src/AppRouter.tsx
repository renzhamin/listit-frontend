import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import About from "./components/About"
import NotFound from "./components/NotFound"

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
