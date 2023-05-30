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
} from "@material-tailwind/react"

import { lists } from "../dummydata"

const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Card className="p-2">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Lists
                    </Typography>
                </CardHeader>
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
                </List>
            </Card>
        </div>
    )
}

export default Home
