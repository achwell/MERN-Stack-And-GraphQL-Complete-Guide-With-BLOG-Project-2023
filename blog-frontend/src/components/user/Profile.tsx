import {Avatar, Box, Dialog, DialogContent, DialogTitle, LinearProgress, Typography} from "@mui/material";
import {profileStyles} from "../../styles/profile-styles";
import BlogItem from "../blogs/BlogItem";
import {useEffect, useState} from "react";
import {BlogType, UserType} from "../../types/types";
import {GET_USER_BLOGS} from "../../graphql/queries";
import {useQuery} from "@apollo/client";

const Profile = () => {
    const [user, setUser] = useState<UserType>()
    const { loading, data, error} = useQuery(GET_USER_BLOGS, {
        variables: {
            id: user?.id
        },
        skip: !user?.id
    });

    console.log({user, loading, data, error})


    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (!!data && JSON.parse(data) != null) {
            setUser(JSON.parse(data))
        }
    }, [])

    if(loading) return <LinearProgress/>
    if(error) return <Dialog open={!!error}>
        <DialogTitle>Error fetching profile</DialogTitle>
        <DialogContent>{error.message}</DialogContent>
    </Dialog>

    return (
        data && user && <Box sx={profileStyles.container}>
            <Box sx={profileStyles.blogsContainer}>
                <Typography variant="h3" sx={profileStyles.text}>My Posts</Typography>
                <Box sx={profileStyles.cardsContainer}>
                    {data.user.blogs.map((item: BlogType) => <BlogItem blog={item}/>)}
                </Box>
            </Box>
            <Box sx={profileStyles.profileContainer}>
                <Box sx={profileStyles.userContainer}>
                    <Avatar sx={profileStyles.avatar}></Avatar>
                    <Typography variant="h3" fontFamily="Work Sans">{user?.name}</Typography>
                    <Typography variant="h4" fontFamily="Work Sans">Email: {user?.email}</Typography>
                    <Typography variant="h4" fontFamily="monospace">You wrote: {data.user?.blogs ? data.user.blogs.length : 0} Blogs 🎉</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default Profile
