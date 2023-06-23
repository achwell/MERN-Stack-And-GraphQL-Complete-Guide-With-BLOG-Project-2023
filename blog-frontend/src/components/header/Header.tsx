import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import {ImBlogger} from "react-icons/im";
import {headerStyles} from "../../styles/header-styles"
import UserMenu from "./user/UserMenu";
import {useSelector} from "react-redux";
import {BiLogInCircle} from "react-icons/bi";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: any) => state.isLoggedIn)
    const [value, setValue] = useState(0);

    const handleAddBlog = async () => {
        await navigate("/add")
    }

    return (
        <AppBar sx={headerStyles.appBar}>
            <Toolbar>
                <ImBlogger
                    size={"30px"}
                    style={{
                        borderRadius: "50%",
                        padding:"10px",
                        backgroundColor: "#6c5252"
                }}/>
                <Box sx={headerStyles.addLink} onClick={handleAddBlog}>
                    <Typography fontSize={20} fontFamily="Work Sans">Post New Blog</Typography>
                    <IconButton color="inherit">
                        <ImBlogger/>
                    </IconButton>
                </Box>
                <Box sx={headerStyles.tabContainer}>
                    <Tabs
                        textColor="inherit"
                        TabIndicatorProps={{
                            style: {
                                background: "red"
                            }
                        }}
                        value={value}
                        onChange={(_,val)=>setValue(val)}>
                        {/* @ts-ignore */}
                        <Tab LinkComponent={Link} to="/" disableRipple label="Home"></Tab>
                        {/* @ts-ignore */}
                        <Tab LinkComponent={Link} to="/blogs" disableRipple label="Blogs"></Tab>
                    </Tabs>
                    {!isLoggedIn ? <Link style={{textDecoration: "none"}} to="/auth">
                        <Button endIcon={<BiLogInCircle/>} sx={headerStyles.authBtn}>Auth</Button>
                    </Link> :<UserMenu/>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Header
