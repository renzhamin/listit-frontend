import {
    Avatar,
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    List,
    ListItem,
    Navbar,
    Typography,
} from "@material-tailwind/react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api_user } from "../utils/api"
import { getUserId } from "../utils/getUserId"

const Home: React.FC = () => {
    const navigate = useNavigate()
    const [isCreatingList, setIsCreatingList] = useState(false)
    const [deleteListIndex, setDeleteListIndex] = useState(-1)
    const [listTitle, setListTitle] = useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    const [loading, setLoading] = useState(true)

    const [lists, setLists] = useState<any[]>([])

    useEffect(() => {
        if (loading) {
            api_user
                .get("/lists")
                .then((data) => {
                    setLists(data.data.lists)
                })
                .catch((e) => {
                    console.log(e)
                })
            setLoading(false)
        }
    }, [loading])

    const openCreateListDialog = () => {
        setIsCreatingList(true)
    }

    const closeCreateListDialog = () => {
        setIsCreatingList(false)
        setListTitle("")
    }

    const handleListTitleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setListTitle(event.target.value)
    }

    const handleCreateList = () => {
        setIsCreatingList(false)
        const list = {
            title: listTitle,
            content: [],
        }
        setListTitle("")
        api_user.post("/list", list).then(() => {
            setLoading(true)
        })
    }

    const openDeleteListDialog = (event: React.MouseEvent, index: number) => {
        event.stopPropagation() // Stop event propagation
        setDeleteListIndex(index)
    }

    const closeDeleteListDialog = () => {
        setDeleteListIndex(-1)
    }

    const confirmDeleteList = () => {
        // Delete the list logic goes here
        if (deleteListIndex != -1) {
            api_user.delete(`/list/${lists[deleteListIndex].id}`)
            lists.splice(deleteListIndex, 1)
        }
        closeDeleteListDialog()
    }

    const handleSearch = () => {
        navigate(`/search-results/${searchKeyword}`) // Navigate to search results page
    }

    const handleSearchKeywordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchKeyword(event.target.value)
    }

    return (
        <div>
            <Navbar className="mx-auto max-w-screen-xl px-4 py-3">
                <div
                    className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900"
                    style={{ justifyContent: "space-around" }}
                >
                    <Typography
                        as="a"
                        href="#"
                        variant="h6"
                        className="mr-4 ml-2 cursor-pointer py-1.5"
                    >
                        LISTIT
                    </Typography>
                    <div className="relative flex w-full gap-2 md:w-max">
                        <Input
                            type="search"
                            label="Type here..."
                            className="pr-20"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                            style={{ width: "100%" }}
                            value={searchKeyword}
                            onChange={handleSearchKeywordChange}
                        />
                        <Button
                            size="sm"
                            className="!absolute right-1 top-1 rounded"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                    <div className="float-right">
                        <Avatar
                            size="sm"
                            src="https://media.licdn.com/dms/image/D5603AQFuFctO_XNrzw/profile-displayphoto-shrink_800_800/0/1681912296906?e=2147483647&v=beta&t=sWU9B6Qj5JP9z7GDCvzLkZo0JR5MUi_4KfwV8Hk5rh8"
                            alt="avatar"
                        />
                        <Button
                            color="red"
                            size="sm"
                            style={{ margin: "0px 10px" }}
                            onClick={() => {
                                api_user.delete("/auth/logout_all").then(() => {
                                    navigate("/")
                                })
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Navbar>

            <Card className="p-2 md:w-[65vw]">
                <List>
                    {lists.map((l, index) => (
                        <ListItem
                            key={index}
                            onClick={() => {
                                navigate(`/list/${l.id}`)
                            }}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <IconButton
                                color="red"
                                onClick={(event) =>
                                    openDeleteListDialog(event, index)
                                }
                                size="sm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5zm-8-9a1 1 0 0 1 1-1h3.586a1 1 0 0 1 .707.293l1.414 1.414A1 1 0 0 1 12 3h3a1 1 0 0 1 1 1v1H2V3zM2 4h12v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4z"
                                    />
                                </svg>
                            </IconButton>

                            <div style={{ marginLeft: "18px", flexGrow: 1 }}>
                                {l.title}
                            </div>
                        </ListItem>
                    ))}
                    <Button
                        color="blue"
                        size="sm"
                        onClick={openCreateListDialog}
                        className="mt-2"
                    >
                        New List
                    </Button>
                </List>
            </Card>
            <Dialog
                size="sm"
                open={isCreatingList}
                handler={closeCreateListDialog}
            >
                <DialogHeader>Create New List</DialogHeader>
                <DialogBody>
                    <Input
                        type="text"
                        placeholder="Enter list title"
                        value={listTitle}
                        onChange={handleListTitleChange}
                    />
                </DialogBody>
                <DialogFooter className="flex w-max gap-4">
                    <Button
                        color="green"
                        onClick={handleCreateList}
                        disabled={!listTitle}
                    >
                        Create
                    </Button>
                    <Button color="gray" onClick={closeCreateListDialog}>
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog
                size="sm"
                open={deleteListIndex != -1}
                handler={closeDeleteListDialog}
                style={{
                    minWidth: "230px",
                }}
            >
                <DialogHeader>Delete List</DialogHeader>
                <DialogBody>
                    Are you sure you want to delete this list?
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="red"
                        onClick={confirmDeleteList}
                        className="mr-2"
                    >
                        Delete
                    </Button>
                    <Button color="gray" onClick={closeDeleteListDialog}>
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default Home
