import React, { useState } from "react"
import { Accordion, Typography,AccordionHeader, AccordionBody, Card } from "@material-tailwind/react"
import {lists} from "../dummydata"
import { useParams } from "react-router-dom"

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
    const [open, setOpen] = useState(-1)
    const { id } = useParams()
    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value)
    }

    const list = lists.find((l)=>l.id == id)

    if (!list) {
        return <div>List not found</div>
    }

    return (
       <Card className="p-10">
           <Typography className="text-4xl mb-10 font-bold">
               {list.title}
           </Typography>
           {list.content.map((item, ind) => (
                <div key={ind}>
                    <Accordion open={open == ind + 1} 
                icon={<Icon id={ind + 1} open={open} />}
                    disabled={!item.content}>
                        <AccordionHeader
                            onClick={() => handleOpen(ind + 1)}
                        >
                            {item.title}
                        </AccordionHeader>
                        {item.content && <AccordionBody>
                            <Typography className="font-medium text-left pl-10">
                                {item.content}
                            </Typography>
                        </AccordionBody>}
                    </Accordion>
                </div>
            ))}
       </Card>
    )
}

export default ShowList