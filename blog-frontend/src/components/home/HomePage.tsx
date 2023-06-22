import {Box, Typography} from "@mui/material";
import {homepageStyles} from "../../styles/homepage-styles";

const HomePage = () => {
    return (
        <Box sx={homepageStyles.container}>
            <Box sx={homepageStyles.wrapper}>
                <Typography sx={homepageStyles.text}>Write and Share Your Blog</Typography>
                <img
                    width="50%"
                    height="50%"
                    //@ts-ignore
                    style={homepageStyles.image}
                    src="/blog.png"
                    alt="Blog"/>
            </Box>
            <Box sx={homepageStyles.wrapper}>
                <img
                    width="50%"
                    height="50%"
                    //@ts-ignore
                    style={homepageStyles.image}
                    src="/publish.png"
                    alt="Publish"/>
                <Typography sx={homepageStyles.text}>Write and Share Your Blog</Typography>
            </Box>
            <Box sx={homepageStyles.wrapper}>
                <Typography sx={homepageStyles.text}>Write and Share Your Blog</Typography>
                <img
                    width="50%"
                    height="50%"
                    //@ts-ignore
                    style={homepageStyles.image}
                    src="/articles.png"
                    alt="Articles"/>
            </Box>
        </Box>
    )
}
export default HomePage
