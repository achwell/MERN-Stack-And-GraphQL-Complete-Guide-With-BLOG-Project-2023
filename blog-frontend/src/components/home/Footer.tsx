import {homepageStyles} from "../../styles/homepage-styles";
import {Box, Button, Typography} from "@mui/material";

const Footer = () => {
    return (
        <Box sx={homepageStyles.footerContainer}>
            <Button variant="contained" sx={homepageStyles.footerBtn}>View Articles</Button>
            <Typography sx={homepageStyles.footerText}>Made With &#x1F498; By Indian Coders</Typography>
            <Button variant="contained" sx={homepageStyles.footerBtn}>Publishe One</Button>
        </Box>
    )
}
export default Footer
