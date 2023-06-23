import {Box, Button, Typography} from "@mui/material";
import {addBlogStyles, htmlElementStyles} from "../../styles/add-blog-styles";
import {useEffect, useRef, useState} from "react";
import {ADD_BLOG} from "../../graphql/mutations";
import {UserType} from "../../types/types";
import {useMutation} from "@apollo/client";

const AddBlog = () => {
    const headingRef = useRef<HTMLHeadingElement |null>(null)
    const contentRef = useRef<HTMLParagraphElement |null>(null)
    const [addBlog] = useMutation(ADD_BLOG)

    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (!!data && JSON.parse(data) != null) {
            setUser(JSON.parse(data))
        }
    }, [])

    const handleSubmit = async () => {
        const title = headingRef.current?.innerHTML.trim();
        const content = contentRef.current?.innerHTML.trim();
        if (title && title.length > 0 && content && content.length > 0) {
            try {
                const res = await addBlog({variables: {title, content, date: new Date(), user: user?.id}})
                const data = await res.data;
                console.log({data})
            } catch (error) {
                console.error({error})
            }

        }
    }

    return (
        <Box sx={addBlogStyles.container}>
            <Box sx={addBlogStyles.blogHeader}>
                <Typography>{`Authored By: ${user?.name}`}</Typography>
                <Button color="success" variant="contained" onClick={handleSubmit}>Publish</Button>
            </Box>
            <Box sx={addBlogStyles.formContainer}>
                <h2 placeholder="Post your story title" contentEditable style={htmlElementStyles.h2} ref={headingRef}/>
                <p placeholder="Describe your story" contentEditable style={htmlElementStyles.p} ref={contentRef}/>
            </Box>
        </Box>
    )
}
export default AddBlog
