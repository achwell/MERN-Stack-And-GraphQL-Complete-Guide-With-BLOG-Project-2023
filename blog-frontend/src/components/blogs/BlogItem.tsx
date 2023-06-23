import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Card, Typography} from "@mui/material";
import {FcCalendar} from "react-icons/fc";
import {BlogType} from "../../types/types";
import {blogStyles, randomBgColor} from "../../styles/blog-list-styles";

const BlogItem:FC<{blog: BlogType}> = ({blog}) => {

    const navigate = useNavigate();

    const handleClick = async () => {
        await navigate(`/blog/view/${blog.id}`);
    }

    return (
        <Card sx={blogStyles.card} onClick={handleClick}>
            <Box sx={{...blogStyles.cardHeader, backgroundColor: randomBgColor()}}>
                {blog.date && <Box sx={blogStyles.dateContainer}>
                    <FcCalendar size={"30px"}/>
                    <Typography fontSize={"20px"} color="white" variant="caption">{new Date(+blog.date).toDateString()}</Typography>
                </Box>}
                <Typography sx={blogStyles.title}>{blog.title}</Typography>
            </Box>
            <Box sx={blogStyles.cardContent}>
                <Typography sx={blogStyles.contentText}>{blog.content}</Typography>
            </Box>
        </Card>
    )
}
export default BlogItem
