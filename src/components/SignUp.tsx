import React, { useState } from "react"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react"

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleSignUp = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        // Check if the passwords match
        if (password !== retypePassword) {
            setPasswordError("Passwords don't match")
            return
        }

        // Perform the registration logic
        const registrationData = {
            username,
            email,
            password,
        }

        // Send a POST request to /api/auth/register with registrationData
        // You can use libraries like Axios or fetch to make the API call

        console.log("Registering:", registrationData)
    }

    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={handleSignUp}
            >
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        size="lg"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (e.target.value == retypePassword) {
                                setPasswordError("")
                            }
                        }}
                    />
                    <Input
                        type="password"
                        size="lg"
                        label="Retype Password"
                        value={retypePassword}
                        onChange={(e) => {
                            setRetypePassword(e.target.value)
                            if (password == e.target.value) {
                                setPasswordError("")
                            }
                        }}
                    />
                </div>
                {passwordError && (
                    <Typography color="red" className="mb-4">
                        {passwordError}
                    </Typography>
                )}
                <Button className="mt-6" fullWidth type="submit">
                    Register
                </Button>
                <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                >
                    Already have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign In
                    </a>
                </Typography>
            </form>
        </Card>
    )
}
