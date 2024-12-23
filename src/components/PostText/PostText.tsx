import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"

export const PostText = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const text: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quas porro laboriosam molestias, vitae officia dignissimos ea quae nisi tenetur excepturi, facilis reiciendis exercitationem similique fugiat iste tempora voluptatibus. Maiores?
                    Necessitatibus magni nostrum dolor cumque ex est porro exercitationem blanditiis odio? Repellat, quasi? Explicabo aliquam vitae commodi. Distinctio dolor sint ab omnis eaque quas nisi! Vero atque ullam ratione fugit!
                    Possimus incidunt eligendi quas hic corporis eos placeat, impedit deserunt itaque et voluptate dolorum reiciendis vel molestias, quam esse! Culpa temporibus pariatur voluptas sapiente! Fugit recusandae tempore ab rerum culpa.
                    Assumenda nam perferendis repellendus optio nisi eos praesentium officia, architecto quam libero molestiae obcaecati fugit, ullam animi deleniti. Ipsam alias deserunt asperiores commodi quasi quos, mollitia iure. Doloremque, nisi cupiditate!
                    Quo inventore rem ducimus excepturi nihil, ea sit culpa? Alias nulla, ratione, pariatur et nesciunt saepe, dolorum incidunt veniam sequi voluptatibus inventore vitae! Sint expedita sit unde harum! Optio, maxime?`;

    const maxLength:number = 200

    const onReadMore = () => {
        setIsExpanded(!isExpanded)
    }


    return (
        <Box sx={{padding: '1rem'}} justifyItems='start'>
            <Typography variant="body1" textAlign="start">
                {isExpanded ? text : `${text.substring(0, maxLength)}...`}
            </Typography>
            <Button variant="text" color="inherit" size="small" onClick={onReadMore}>
                {isExpanded ? 'Read less' : 'Read more'}
            </Button>
        </Box>
    )
}