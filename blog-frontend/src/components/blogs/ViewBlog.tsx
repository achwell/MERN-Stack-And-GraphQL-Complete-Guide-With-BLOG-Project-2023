import {Avatar, Box, Dialog, DialogContent, DialogTitle, LinearProgress, Typography} from "@mui/material";
import {blogPageStyles} from "../../styles/view-styles";
import {useQuery} from "@apollo/client";
import {GET_BLOG_BY_ID, GET_USER_BLOGS} from "../../graphql/queries";
import {useParams} from "react-router-dom";
import {CommentType} from "../../types/types";
import {ImMail} from "react-icons/im";
import {BsCalendar2DateFill} from "react-icons/bs";

function getInitials(name: string) {
    const nameAr = name.split(" ");
    return `${nameAr[0][0]}${nameAr[1][0]}`
}

const ViewBlog = () => {

    const {id} = useParams();

    const { loading, data, error} = useQuery(GET_BLOG_BY_ID, {
        variables: {id},
        skip: !id
    });

    if(loading) return <LinearProgress/>
    if(error) return <Dialog open={!!error}>
        <DialogTitle>Error fetching blog</DialogTitle>
        <DialogContent>{error.message}</DialogContent>
    </Dialog>
    if(!data) return null

    const {blog: {content, title, date, user: {name, email}, comments}} = data

    return (
        <Box sx={blogPageStyles.container}>
            <Box sx={blogPageStyles.profileHeader}>
                <Typography sx={blogPageStyles.headerText}>{name}</Typography>
                <Box sx={blogPageStyles.profileHeaderItems}>
                    <ImMail />
                    <Typography sx={blogPageStyles.headerText}>{email}</Typography>
                    <Box sx={{ml: "auto", display: "flex", gap: 3, alignItems: "center"}}>
                        <BsCalendar2DateFill/>
                        <Typography fontFamily="Work Sans" fontWeight="500">
                            {new Date(+date).toDateString()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Typography sx={blogPageStyles.blogTitle}>{title}</Typography>
            <Typography sx={blogPageStyles.blogContent}>{content}</Typography>
            <Box sx={blogPageStyles.commentBox}>
                <Typography>Comments:</Typography>
            </Box>
            <Box sx={blogPageStyles.commentInputContainer}>
                <Typography margin={2} fontFamily={"Arvo"}>
                    Add your Comment
                </Typography>
            </Box>
            {comments.length > 0 && (
                <Box sx={blogPageStyles.comments}>
                    {comments.map((comment: CommentType) => {
                        <Box key={comment.id} sx={blogPageStyles.commentItem}>
                            <Avatar sx={{padding: 1, color: "red", backgroundColor: "transparent"}}>{getInitials(comment.user.name)}</Avatar>
                            <Typography sx={blogPageStyles.commentText}>{content.text}</Typography>
                        </Box>
                    })}
                </Box>
            )}
        </Box>
    )
}
export default ViewBlog
