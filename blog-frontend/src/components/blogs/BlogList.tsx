import {FC} from "react";
import {BlogType} from "../../types/types";
import {blogStyles} from "../../styles/blog-list-styles";
import {Box} from "@mui/material";
import BlogItem from "./BlogItem";

interface Props {
    blogs: BlogType[]
}

const BlogList: FC<Props> = ({blogs}) => {
    return (
        <Box sx={blogStyles.container}>
            {blogs.length > 0 && blogs.map((blog, index) => <BlogItem key={index} blog={blog}/>)}
        </Box>
    )
}
export default BlogList
