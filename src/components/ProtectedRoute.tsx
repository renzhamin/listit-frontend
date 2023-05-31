import { Navigate } from "react-router-dom"

function hasValidRefreshToken() {
    const d = new Date()
    d.setTime(d.getTime() + 1000)
    const expires = "expires=" + d.toUTCString()
    const cookiename = "refreshToken"
    document.cookie = cookiename + "=new_value;path=/;" + expires
    return document.cookie.indexOf(cookiename + "=") == -1
}

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = hasValidRefreshToken()

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/" />
}

export default ProtectedRoute
