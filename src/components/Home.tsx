import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Card,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { lists } from "../dummydata";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [deleteListIndex, setDeleteListIndex] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const openCreateListDialog = () => {
    setIsCreatingList(true);
  };

  const closeCreateListDialog = () => {
    setIsCreatingList(false);
    setListTitle("");
  };

  const handleListTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(event.target.value);
  };

  const handleCreateList = () => {
    console.log("List Title:", listTitle);
    setListTitle("");
    navigate("/list");
  };

  const openDeleteListDialog = (event: React.MouseEvent, index: number) => {
    event.stopPropagation(); // Stop event propagation
    setDeleteListIndex(true);
    // setDeleteListIndex(index);
  };

  const closeDeleteListDialog = () => {
    setDeleteListIndex(false);
  };

  const confirmDeleteList = () => {
    // Delete the list logic goes here
    closeDeleteListDialog();
  };

  return (
    <div>
      <Card className="p-2 md:w-[65vw]">
        <List>
          {lists.map((l, index) => (
            <ListItem
              key={index}
              onClick={() => {
                navigate(`/list/${l.id}`);
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                color="red"
                onClick={(event) => openDeleteListDialog(event, index)}
                size="sm"
                ripple="dark"
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

              <ListItemSuffix>
                <Chip
                  value={String(l.content?.length)}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
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
      <Dialog size="sm" open={deleteListIndex} handler={closeDeleteListDialog}>
        <DialogHeader>Delete List</DialogHeader>
        <DialogBody>Are you sure you want to delete this list?</DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={confirmDeleteList}
            ripple="light"
            className="mr-2"
          >
            Delete
          </Button>
          <Button color="gray" onClick={closeDeleteListDialog} ripple="dark">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Home;
