import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useParams } from "react-router-dom"
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
    Avatar,
    Navbar,
} from "@material-tailwind/react"
import { lists } from "../dummydata"
import { api_user } from "../utils/api"

const SearchResults: React.FC = () => {
    const { searchString } = useParams()
    const navigate = useNavigate()
    const [lists, setLists] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    // Filter the lists based on the search keyword
    useEffect(() => {
        if (loading) {
            api_user.get(`/list/search/${searchString}`).then((res) => {
                setLists(res.data.lists)
            })
            setLoading(false)
        }
    })

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Search Results for "{searchString}"</h1>

            {lists.length > 0 ? (
                <Card className="p-2 md:w-[65vw]">
                    <List>
                        {lists.map((list) => (
                            <ListItem
                                key={list.id}
                                onClick={() => {
                                    navigate(`/list/${list.id}`)
                                }}
                            >
                                {list.title}
                            </ListItem>
                        ))}
                    </List>
                </Card>
            ) : (
                <p>No search results found.</p>
            )}
        </div>
    )
}

export default SearchResults
