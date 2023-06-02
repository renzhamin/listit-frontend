import React, { useState } from "react";
import {
    Accordion,
    Typography,
    AccordionHeader,
    AccordionBody,
    Card,
    Button,
    IconButton,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Textarea,
    Input,
} from "@material-tailwind/react"
import { lists } from "../dummydata";
import { useParams } from "react-router-dom";

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
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

const ShowList: React.FC = () => {
    const [open, setOpen] = useState(-1);
    const { id } = useParams();
    const [deleteItemIndex, setDeleteItemIndex] = useState(false);
    const [editItemIndex, setEditItemIndex] = useState(-1);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedMainTitle, setEditedMainTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");
    const [editingTitle, setEditingTitle] = useState(false);
    const [addingItem, setAddingItem] = useState(false);
    const [newItemTitle, setNewItemTitle] = useState("");
    const [newItemContent, setNewItemContent] = useState("");

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    const list = lists.find((l) => l.id === id);

    if (!list) {
        return <div>List not found</div>;
    }

    const handleEdit = (itemIndex: number) => {
        const item = list.content[itemIndex];
        setEditItemIndex(itemIndex);
        setEditedTitle(item.title);
        setEditedContent(item.content);
    };

    const handleSaveEdit = () => {
        // Perform save edit logic here
        console.log(`Save edited item ${editItemIndex} of list ${list.id}`);
        setEditItemIndex(-1);
        setEditedTitle("");
        setEditedContent("");
    };

    const handleCancelEdit = () => {
        setEditItemIndex(-1);
        setEditedTitle("");
        setEditedContent("");
    };


    const handleEditTitle = () => {
        // console.log(`Edit title of list ${list.id}`);
        setEditingTitle(true);
    setEditedMainTitle(list.title);
    };

    const handleSaveTitle = () => {
        // Perform save title logic here
        console.log(`Save edited title of list ${list.id}`);
        setEditingTitle(false);
        setEditedTitle("");
      };


      const handleCancelTitle = () => {
        setEditingTitle(false);
        setEditedTitle("");
      };


    const openDeleteItemDialog = () => {
        setOpen(-1);
        setDeleteItemIndex(true);
    };

    const closeDeleteItemDialog = () => {
        setOpen(-1);
        setDeleteItemIndex(false);
    };

    const handleDelete = (itemIndex: number) => {
        setDeleteItemIndex(itemIndex);
    };

    const confirmDelete = () => {
        // Perform deletion logic here
        setDeleteItemIndex(false);
    };

    const handleAddItems = () => {
        setAddingItem(true);
      };
    
      const handleSaveNewItem = () => {
        // Perform save new item logic here
        console.log(`Save new item for list ${list.id}`);
        setNewItemTitle("");
        setNewItemContent("");
      };
    
      const handleCancelNewItem = () => {
        setAddingItem(false);
        setNewItemTitle("");
        setNewItemContent("");
      };

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
              onChange={(e) => setEditedMainTitle(e.target.value)}
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
                            disabled={!item.content}
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(ind + 1)}
                            >
                                <IconButton
                                    color="red"
                                    onClick={openDeleteItemDialog}
                                    size="sm"
                                    ripple="dark"
                                    style={{ minWidth: "30px" }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-trash"
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
                                        padding: "20px 20px",
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
                                            style={{height: "50px"}}
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
            </Card>
            <Dialog
                size="sm"
                open={deleteItemIndex}
                onClose={closeDeleteItemDialog}
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
                        ripple="light"
                        className="mr-2"
                    >
                        Delete
                    </Button>
                    <Button
                        color="gray"
                        onClick={closeDeleteItemDialog}
                        ripple="dark"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
};

export default ShowList;
