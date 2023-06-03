import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Alert,
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api_user } from "../utils/api"
import { getUserId } from "../utils/getUserId"

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
    const [showDelete, setShowDelete] = useState(false)
    const [deleteItemIndex, setDeleteItemIndex] = useState(-1)
    const [editItemIndex, setEditItemIndex] = useState(-1)
    const [editedTitle, setEditedTitle] = useState("")
    const [editedMainTitle, setEditedMainTitle] = useState("")
    const [editedContent, setEditedContent] = useState("")
    const [editingTitle, setEditingTitle] = useState(false)
    const [addingItem, setAddingItem] = useState(false)
    const [newItemTitle, setNewItemTitle] = useState("")
    const [newItemContent, setNewItemContent] = useState("")
    const [addListButton, setAddListButton] = useState(true)
    const [newTitle, setNewTitle] = useState("")
    const [newContent, setNewContent] = useState("")

    const [list, setList] = useState<any>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const userId = getUserId()

    useEffect(() => {
        if (loading) {
            api_user
                .get(`/list/${id}`)
                .then((data) => {
                    setList(data.data.list)
                })
                .catch((e) => {
                    console.log("ERROR HERE", e)
                    setError(e.error)
                })

            setLoading(false)
        }
    })

    useEffect(() => {
        if (changed) {
            console.log(list)
            api_user.put(`/list/${id}`, list).catch((e) => {
                console.log(e)
            })
            setChanged(false)
        }
    }, [changed])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("")
            }, 2500)
        }
    }, [error])

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value)
    }

    if (!list) {
        return <div>List not found</div>
    }

    const handleEdit = (itemIndex: number) => {
        const item = list.content[itemIndex]
        setEditItemIndex(itemIndex)
        setEditedTitle(item.title)
        setEditedContent(item.content)
    }

    const handleSaveEdit = () => {
        // Perform save edit logic here
        if (userId !== list.userId) {
            setError("List not owned by you")
            return
        }
        console.log(`Save edited item ${editItemIndex} of list ${list.id}`)
        list.content[editItemIndex].title = editedTitle
        list.content[editItemIndex].content = editedContent
        setChanged(true)
        setEditItemIndex(-1)
        setEditedTitle("")
        setEditedContent("")
    }

    const handleCancelEdit = () => {
        setEditItemIndex(-1)
        setEditedTitle("")
        setEditedContent("")
    }

    const handleEditTitle = () => {
        // console.log(`Edit title of list ${list.id}`);
        setEditingTitle(true)
        setEditedMainTitle(list.title)
    }

    const handleSaveTitle = () => {
        if (userId !== list.userId) {
            setError("List not owned by you")
            return
        }

        // Perform save title logic here
        console.log(`Save edited title of list ${list.id}`)
        list.title = editedMainTitle
        setChanged(true)
        setEditingTitle(false)
        setEditedTitle("")
    }

    const handleCancelTitle = () => {
        setEditingTitle(false)
        setEditedTitle("")
    }

    const openDeleteItemDialog = (itemIndex: number) => {
        setOpen(-1)
        setShowDelete(true)
        console.log(itemIndex)
        setDeleteItemIndex(itemIndex)
    }

    const closeDeleteItemDialog = () => {
        setOpen(-1)
        setShowDelete(false)
        setDeleteItemIndex(-1)
    }

    const confirmDelete = (e) => {
        // Perform deletion logic here
        e.stopPropagation()
        list.content.splice(deleteItemIndex, 1)
        setChanged(true)
        setShowDelete(false)
        setDeleteItemIndex(-1)
    }

    const handleAddItems = () => {
        setAddingItem(true)
    }

    const handleCancelNewItem = () => {
        /* setAddingItem(false) */
        /* setNewItemTitle("") */
        /* setNewItemContent("") */
        setNewTitle("")
        setNewContent("")
        setAddListButton(true)
    }

    const handleAddList = () => {
        setAddListButton(false)
    }

    const handleSubmit = () => {
        const newItem = {
            title: newTitle,
            content: newContent || "...",
        }

        list.content.push(newItem)
        setChanged(true)
        setNewTitle("")
        setNewContent("")
        setAddListButton(true)
    }

    return (
        <div>
            <Card className="p-4 w-72 sm:w-[75vw] md:w-[65vw]">
                <Typography variant="h3" className="mb-8">
                    {/* {editListIndex === } */}
                    {editingTitle ? (
                        <div>
                            <Input
                                variant="static"
                                label="Edit Title"
                                value={editedMainTitle}
                                onChange={(e) =>
                                    setEditedMainTitle(e.target.value)
                                }
                                style={{
                                    width: "100%",
                                    fontSize: "18px",
                                }}
                            />

                            <Button
                                ripple={true}
                                color="green"
                                onClick={handleSaveTitle}
                                size="sm"
                                className="float-right"
                            >
                                Save
                            </Button>
                            <Button
                                ripple={true}
                                color="red"
                                onClick={handleCancelTitle}
                                size="sm"
                                className="float-right mr-2"
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <>
                            {list.title}
                            <Button
                                ripple={true}
                                color="blue-gray"
                                onClick={handleEditTitle}
                                size="sm"
                                className="float-right"
                            >
                                Edit title
                            </Button>
                        </>
                    )}
                </Typography>
                {list.content.map((item, ind) => (
                    <div key={ind}>
                        <Accordion
                            open={open == ind + 1}
                            icon={<Icon id={ind + 1} open={open} />}
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(ind + 1)}
                            >
                                <IconButton
                                    color="red"
                                    onClick={() => openDeleteItemDialog(ind)}
                                    size="sm"
                                    style={{ minWidth: "30px" }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
                                    </svg>
                                </IconButton>
                                <Typography
                                    variant="h5"
                                    style={{
                                        width: "100%",
                                        margin: "0px 20px",
                                    }}
                                >
                                    {editItemIndex === ind ? (
                                        <Input
                                            variant="static"
                                            label="Edit Title"
                                            value={editedTitle}
                                            onChange={(e) =>
                                                setEditedTitle(e.target.value)
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                width: "100%",
                                                fontSize: "18px",
                                            }}
                                        />
                                    ) : (
                                        item.title
                                    )}
                                </Typography>
                            </AccordionHeader>
                            {item.content && (
                                <AccordionBody
                                    style={{
                                        width: "100%",
                                        padding: "20px 50px",
                                    }}
                                >
                                    {editItemIndex === ind ? (
                                        <Textarea
                                            variant="static"
                                            rows={8}
                                            label="Edit Content"
                                            value={editedContent}
                                            onChange={(e) =>
                                                setEditedContent(e.target.value)
                                            }
                                            resize
                                            style={{ height: "50px" }}
                                        />
                                    ) : (
                                        <Typography className="font-medium text-left pl-8">
                                            {item.content}
                                        </Typography>
                                    )}
                                    {editItemIndex === ind ? (
                                        <div>
                                            <Button
                                                ripple={true}
                                                color="green"
                                                onClick={handleSaveEdit}
                                                size="sm"
                                                className="float-right"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                ripple={true}
                                                color="red"
                                                onClick={handleCancelEdit}
                                                size="sm"
                                                className="float-right mr-2"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            ripple={true}
                                            color="blue-gray"
                                            onClick={() => handleEdit(ind)}
                                            size="sm"
                                            className="float-right"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </AccordionBody>
                            )}
                        </Accordion>
                    </div>
                ))}

                {addListButton ? (
                    <Button
                        color="blue-gray"
                        onClick={handleAddList}
                        size="sm"
                        className="mt-4"
                    >
                        ADD ITEM
                    </Button>
                ) : (
                    <div className="mt-4">
                        <Input
                            variant="standard"
                            label="Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full"
                        />
                        <br />
                        <Textarea
                            variant="standard"
                            rows={8}
                            label="Content"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className="w-full"
                            style={{ height: "100px" }}
                        />
                        <div className="flex">
                            <Button
                                color="red"
                                onClick={handleCancelNewItem}
                                size="sm"
                                className="m-4"
                                style={{ width: "100%" }}
                            >
                                Cancel
                            </Button>

                            <Button
                                color="blue-gray"
                                onClick={handleSubmit}
                                size="sm"
                                className="m-4"
                                style={{ width: "100%" }}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            <Dialog
                size="sm"
                open={showDelete}
                handler={closeDeleteItemDialog}
                style={{
                    minWidth: "230px",
                }}
            >
                <DialogHeader>Delete Item</DialogHeader>
                <DialogBody>
                    Are you sure you want to delete this item?
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="red"
                        onClick={confirmDelete}
                        className="mr-2"
                    >
                        Delete
                    </Button>
                    <Button color="gray" onClick={closeDeleteItemDialog}>
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
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

export default ShowList
