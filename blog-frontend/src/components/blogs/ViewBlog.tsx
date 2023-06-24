import {
    Avatar,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    LinearProgress,
    TextField,
    Typography
} from "@mui/material";
import {blogPageStyles} from "../../styles/view-styles";
import {useMutation, useQuery} from "@apollo/client";
import {useForm} from "react-hook-form";
import {GET_BLOG_BY_ID} from "../../graphql/queries";
import {useParams} from "react-router-dom";
import {CommentType, UserType} from "../../types/types";
import {ImMail} from "react-icons/im";
import {BsCalendar2DateFill} from "react-icons/bs";
import {FaComments} from "react-icons/fa";
import {BiSend} from "react-icons/bi";
import {ADD_COMMENT} from "../../graphql/mutations";
import {useEffect, useState} from "react";

function getInitials(name: string) {
    const nameAr = name.split(" ");
    return `${nameAr[0][0]}${nameAr[1][0]}`
}

const ViewBlog = () => {

    const {id} = useParams();
    const [user, setUser] = useState<UserType>()

    const { loading, data, error} = useQuery(GET_BLOG_BY_ID, {
        variables: {id},
        skip: !id
    });


    console.log({data})


    const {register, formState: {errors}, handleSubmit} = useForm<{comment: string}>({mode: "all"});

    const [addComment] = useMutation(ADD_COMMENT);

    const onSubmit = async ({comment}: { comment: string }) => {
        try {
            const variables = {
                text: comment,
                date: new Date(),
                user: user?.id,
                blog: id
            };
            await addComment({variables})
        } catch (error: any) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (!!data && JSON.parse(data) != null) {
            setUser(JSON.parse(data))
        }
    }, [])

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
                Comments: {" "}
                <IconButton><FaComments size={"30px"}/></IconButton>
            </Box>
            <Box sx={blogPageStyles.commentInputContainer}>
                <Typography margin={2} fontFamily={"Arvo"}>Add your Comment</Typography>
                <Box sx={blogPageStyles.inputLayout}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        error={Boolean(errors.comment)}
                        aria-errormessage={errors.comment?.message}
                        sx={blogPageStyles.textField}
                        {...register("comment", {required: "You must fill in a comment to add"})}
                        InputProps={{
                            style: {
                                width: "60vW",
                                borderRadius: "20px",
                                fontFamily: "Work Sans"
                            },
                            endAdornment: (
                                <IconButton type="submit">
                                    <BiSend size={"25"}/>
                                </IconButton>
                            )
                        }}/>
                    </form>
                </Box>
            </Box>
            <Box sx={blogPageStyles.comments}>
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
        </Box>
    )
}
export default ViewBlog
