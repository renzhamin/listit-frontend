import React, { useEffect, useState } from "react"
import AppRouter from "./AppRouter"
import { api_user } from "./utils/api"

export const AppContext = React.createContext({})

const App: React.FC = () => {
    const [accessToken, setAccessToken] = useState("")
    useEffect(() => {
        const interval = setInterval(() => {
            api_user
                .get("/auth/refresh")
                .then(() => {})
                .catch((e) => {
                    console.log("refresh error", e)
                })
        }, 1000 * 60 * 5)

        return () => clearInterval(interval)
    })
    return (
        <AppContext.Provider value={{ accessToken, setAccessToken }}>
            <div className="App">
                <AppRouter />
            </div>
        </AppContext.Provider>
    )
}

export default App
