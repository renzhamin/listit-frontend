import { Fragment, useState } from "react"
import { api_user } from "../utils/api"
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
} from "@material-tailwind/react"

function Dashboard() {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [open, setOpen] = useState(-1)

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value)
    }

    const fetchData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await api_user.get("/users")
            setData(response.data.users)
        } catch (error) {
            /* setError(error.message) */
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Fragment>
            <button onClick={fetchData} disabled={isLoading}>
                {isLoading ? "Loading..." : "Fetch Data"}
            </button>
            {error && <p>Error: {error}</p>}
            {data && (
                <div>
                    <h2>List of Users</h2>
                    {data.map((user, ind) => (
                        <div key={ind}>
                            <Accordion open={open == ind + 1}>
                                <AccordionHeader
                                    onClick={() => handleOpen(ind + 1)}
                                >
                                    {user.username}
                                </AccordionHeader>
                                <AccordionBody>
                                    <Typography>
                                        ID : {user.id} {"\n"}
                                    </Typography>
                                    <Typography>
                                        Email : {user.email}
                                    </Typography>
                                </AccordionBody>
                            </Accordion>
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    )
}

export default Dashboard
