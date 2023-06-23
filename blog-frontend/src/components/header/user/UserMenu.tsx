import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {FaUserNurse} from "react-icons/fa";
import {authActions} from "../../../store/auth-slice";

const UserMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [anchorEl, setsetAnchorEl] = useState<Element |null>(null)

    const handleLogout = async () => {
        localStorage.removeItem("userData")
        await dispatch(authActions.logout())
        await navigate("/")
    }
    const onProfileClicked = async () => await navigate("/profile")

    return (
        <Box>
            <IconButton color="inherit" onClick={(e) => {
                setOpen(prev => !prev)
                setsetAnchorEl(e.currentTarget);
            }}>
                <FaUserNurse/>
                <Menu open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
                    <MenuItem LinkComponent={Link} onClick={onProfileClicked}>
                        <Typography>Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Typography>Logout</Typography>
                    </MenuItem>
                </Menu>
            </IconButton>
        </Box>
    )
}
export default UserMenu
