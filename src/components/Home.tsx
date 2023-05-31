import React from "react"
import { useNavigate } from "react-router-dom"
import {useState} from "react";
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
} from "@material-tailwind/react"
import { lists } from "../dummydata"

const Home: React.FC = () => {
    const navigate = useNavigate()
    const [isCreatingList, setIsCreatingList] = useState(false);
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
    // Reset the form fields
    setListTitle("");
    navigate("/list");
  };

//     const handleCreateList = () => {
//         navigate("/create-list")
//     }

    return (
        <div>
            <Card className="p-2 md:w-[65vw]">
                <List>
                    {lists.map((l) => {
                        return (
                            <ListItem
                                onClick={() => {
                                    navigate(`/list/${l.id}`)
                                }}
                            >
                                {l.title}
                                <ListItemSuffix>
                                    <Chip
                                        value={String(l.content?.length)}
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full"
                                    />
                                </ListItemSuffix>
                            </ListItem>
                        )
                    })}
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
            <Dialog size="sm" open={isCreatingList} handler={closeCreateListDialog}>
        <DialogHeader>
          Create New List
        </DialogHeader>
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
        </div>
    )
}

export default Home
