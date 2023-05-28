import React, { useState } from "react"
import AppRouter from "./AppRouter"

export const AppContext = React.createContext({})

const App: React.FC = () => {
    const [accessToken, setAccessToken] = useState("")
    return (
        <AppContext.Provider value={{ accessToken, setAccessToken }}>
            <div className="App">
                <AppRouter />
            </div>
        </AppContext.Provider>
    )
}

export default App
