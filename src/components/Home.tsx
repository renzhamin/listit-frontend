import React from "react"
import { useNavigate } from "react-router-dom"
import {
    List,
    ListItem,
    ListItemSuffix,
    Chip,
    Card,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react"
import { lists } from "../dummydata"

const Home: React.FC = () => {
    const navigate = useNavigate()

    const handleCreateList = () => {
        navigate("/create-list")
    }

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
                        onClick={handleCreateList}
                        className="mt-2"
                    >
                        New List
                    </Button>
                </List>
            </Card>
        </div>
    )
}

export default Home
