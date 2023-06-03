import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Input, Typography } from "@material-tailwind/react"

const CreateList: React.FC = () => {
    const navigate = useNavigate()
    const [listTitle, setListTitle] = useState("")
    const [listItems, setListItems] = useState([{ title: "", content: "" }])

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListTitle(event.target.value)
    }

    const handleItemTitleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedItems = [...listItems]
        updatedItems[index].title = event.target.value
        setListItems(updatedItems)
    }

    const handleItemContentChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedItems = [...listItems]
        updatedItems[index].content = event.target.value
        setListItems(updatedItems)
    }

    const handleAddItem = () => {
        setListItems([...listItems, { title: "", content: "" }])
    }

    const handleCreateList = () => {
        console.log("List Title:", listTitle)
        console.log("List Items:", listItems)
        // Reset the form fields
        setListTitle("")
        setListItems([{ title: "", content: "" }])
        // Navigate back to the home page or any other desired destination
        navigate("/")
    }

    return (
        <Card className="p-10 w-96">
            <Typography className="text-4xl mb-10 font-bold">
                Create List
            </Typography>
            {/* <div className="relative flex w-full max-w-[24rem]"> */}
            <div className="flex flex-col w-100 gap-6">
                <Input
                    label="List Title"
                    value={listTitle}
                    onChange={handleTitleChange}
                    className="pr-20"
                    containerProps={{
                        className: "min-w-0",
                    }}
                />
                {/* <Button
        size="sm"
        color={listTitle ? "blue" : "blue-gray"}
        disabled={!listTitle}
        className="!absolute right-1 top-1 rounded"
      >
        Done
      </Button> */}
                <div />
                <Typography className="text-lg font-bold mb-2">
                    List Items:
                </Typography>
                {listItems.map((item, index) => (
                    <div key={index} className="flex flex-col w-72 gap-3">
                        <Input
                            label={`Item ${index + 1} Title`}
                            value={item.title}
                            onChange={(event) =>
                                handleItemTitleChange(event, index)
                            }
                            className="mr-4"
                        />
                        <Input
                            label={`Item ${index + 1} Content`}
                            value={item.content}
                            onChange={(event) =>
                                handleItemContentChange(event, index)
                            }
                            className="mr-4"
                        />
                    </div>
                ))}
                <Button
                    color="green"
                    onClick={handleAddItem}
                    className="mb-4"
                    size="sm"
                >
                    Add Item
                </Button>
                <Button
                    color={listTitle ? "blue" : "blue-gray"}
                    onClick={handleCreateList}
                >
                    Create List
                </Button>
            </div>
        </Card>
    )
}

export default CreateList
