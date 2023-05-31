import React, { useState } from "react"
import {
    Accordion,
    Typography,
    AccordionHeader,
    AccordionBody,
    Card,
    Button,
    IconButton,
} from "@material-tailwind/react"
import { lists } from "../dummydata"
import { useParams } from "react-router-dom"

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
                id === open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
            />
        </svg>
    )
}

const ShowList: React.FC = () => {
    const [open, setOpen] = useState(-1)
    const { id } = useParams()
    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value)
    }

    const list = lists.find((l) => l.id === id)

    if (!list) {
        return <div>List not found</div>
    }

    const handleEdit = (itemIndex: number) => {
        console.log(`Edit item ${itemIndex} of list ${list.id}`)
    }

    const handleDelete = (itemIndex: number) => {
        console.log(`Delete item ${itemIndex} of list ${list.id}`)
    }

    return (
        <div>
            <Card className="p-4 w-72 sm:w-[75vw] md:w-[65vw]">
                <Typography variant="h3" className="mb-8">
                    {list.title}
                </Typography>
                {list.content.map((item, ind) => (
                    <div key={ind}>
                        <Accordion
                            open={open == ind + 1}
                            icon={<Icon id={ind + 1} open={open} />}
                            disabled={!item.content}
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(ind + 1)}
                            >
                               <IconButton
                                    color="red"
                                    onClick={() => handleDelete(ind)}
                                    size="sm"
                                    ripple="dark"
                                   >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="16"
                                        height="16" 
                                        fill="currentColor" 
                                        class="bi bi-trash" 
                                        viewBox="0 0 16 16"> 
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </IconButton>
                                <Typography variant="h5">
                                    {item.title}
                                </Typography>
                            </AccordionHeader>
                            {item.content && (
                                <AccordionBody>
                                    <Button
                                        ripple={true}
                                        color="blue-gray"
                                        onClick={() => handleEdit(ind)}
                                        size="sm"
                                        className="float-right"
                                    >
                                        Edit
                                    </Button>
                                    <Typography className="font-medium text-left pl-8">
                                        {item.content}
                                    </Typography>
                                </AccordionBody>
                            )}
                        </Accordion>
                    </div>
                ))}
            </Card>
        </div>
    )
}

export default ShowList
