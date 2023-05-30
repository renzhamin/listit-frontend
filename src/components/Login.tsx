import {
    Alert,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react"

import React, { useState } from "react"
import { api_client } from "../utils/api"
import { useNavigate } from "react-router-dom"

export default function SignIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const loginData = {
            username,
            password,
        }
        console.log(loginData)
        api_client
            .post("/auth/login", loginData)
            .then(() => {
                navigate("/dashboard")
            })
            .catch((e) => {
                setError(e.response.data.error)
                setTimeout(() => {
                    setError("")
                }, 2500)
            })
    }

    return (
        <div>
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        label="Username or Email"
                        size="lg"
                        onChange={handleUsernameChange}
                    />
                    <Input
                        label="Password"
                        size="lg"
                        onChange={handlePasswordChange}
                    />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <Typography
                        variant="small"
                        className="mt-6 flex justify-center"
                    >
                        Don't have an account?
                        <Typography
                            as="a"
                            href="signup"
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                        >
                            Sign Up
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
            {error && (
                <div>
                    <Alert
                        color="red"
                        className="absolute bottom-3 right-3 w-fit"
                    >
                        {error}
                    </Alert>
                </div>
            )}
        </div>
    )
}
