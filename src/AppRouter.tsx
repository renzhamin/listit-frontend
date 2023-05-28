import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import NotFound from "./components/NotFound"

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
