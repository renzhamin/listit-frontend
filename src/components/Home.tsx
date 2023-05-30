import React from "react"
import { useNavigate } from "react-router-dom"
import {
    List,
    ListItem,
    ListItemSuffix,
    Chip,
    Card,
} from "@material-tailwind/react"

import { lists } from "../dummydata"

const Home: React.FC = () => {
    const navigate = useNavigate()


    return (
        <div>
            <Card className="w-96">
                <List>
                    {lists.map((l) => {
                        return (
                            <ListItem onClick={(e)=>{
                                    navigate(`/list/${l.id}`)
                                }}>
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
