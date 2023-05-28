import { Button, Card, Input, Typography } from "@material-tailwind/react"
import React, { useState } from "react"

const SignIn: React.FC = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Perform login logic here
    }

    return (
        <Card
            color="transparent"
            shadow={false}
            className="flex items-center justify-center h-screen"
        >
            <div className="w-96">
                <Typography variant="h4" color="blue-gray" className="mb-6">
                    Sign In
                </Typography>
                <div className="bg-white rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Input
                                id="username"
                                size="lg"
                                label="Email or Username"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                id="password"
                                size="lg"
                                label="Password"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="mt-6" fullWidth>
                            Sign In
                        </Button>
                        <Typography
                            color="gray"
                            className="mt-4 text-center font-normal"
                        >
                            Don't have an account?{" "}
                            <a
                                href="/signup"
                                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                            >
                                Sign Up
                            </a>
                        </Typography>
                    </form>
                </div>
            </div>
        </Card>
    )
}

export default SignIn
