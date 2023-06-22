import {useState} from "react";
import {Link} from "react-router-dom";
import {AppBar, Box, Button, Tab, Tabs, Toolbar} from "@mui/material";
import {ImBlogger} from "react-icons/im";
import {BiLogInCircle} from "react-icons/bi";
import {headerStyles} from "../../styles/header-styles"

const Header = () => {
    const [value, setValue] = useState(0);
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
                    <Link style={{textDecoration: "none"}} to="/auth">
                        <Button endIcon={<BiLogInCircle/>} sx={headerStyles.authBtn}>Auth</Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Header
