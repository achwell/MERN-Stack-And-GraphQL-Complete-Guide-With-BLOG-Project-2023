import {useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {ImBlogger} from "react-icons/im";
import {Box, Button, InputLabel, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {authStyles} from "../../styles/auth-styles";
import {USER_LOGIN, USER_SIGNUP} from "../../graphql/mutations";

type Inputs = {
    name: string;
    email: string;
    password: string;
}
const Auth = () => {
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm<Inputs>({mode: "all"});
    const [login] = useMutation(USER_LOGIN);
    const [signup] = useMutation(USER_SIGNUP);

    const [isSignup, setIsSignup] = useState(false);
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

    const onResReceived = (data: any) => {
        if (data.signup) {
            const {id, name, email} = data.signup
            localStorage.setItem("userData", JSON.stringify({id, name, email}))
        } else if (data.login){
            const {id, name, email} = data.login
            localStorage.setItem("userData", JSON.stringify({id, name, email}))
        }
        return navigate("/blogs")
    }

    const onSubmit = async ({name, email, password}: Inputs) => {
        if (isSignup) {
            try {
                const res = await signup({variables: {name, email, password}})
                if (res.data) {
                    onResReceived(res.data)
                }
            } catch (error:any) {
                console.error(error.message)
            }
        } else {
            try {
                const res = await login({variables: {email, password}})
                if (res.data) {
                    onResReceived(res.data)
                }
            } catch (error:any) {
                console.error(error.message)
            }
        }
    }

    return (
        <Box sx={authStyles.container}>
            <Box sx={authStyles.logoTitle}>
                <ImBlogger
                    size={"30px"}
                    style={{
                        borderRadius: "50%",
                        padding: "10px",
                        backgroundColor: "#6c5252"
                    }}/>
                <Typography sx={authStyles.logoText}>devBlog</Typography>
            </Box>
            <Box sx={{...authStyles.formContainer, width: isBelowMd ? "50%" : "300px"}}>
                <Typography sx={authStyles.logoText}>{isSignup ? "Signup" : "Login"}</Typography>{" "}
                {/* @ts-ignore */}
                <form style={authStyles.form} onSubmit={handleSubmit(onSubmit)}>
                    {isSignup && <>
                        <InputLabel aria-label="name"/>
                        <TextField
                            error={Boolean(errors.name)}
                            aria-label="name"
                            label="Name"
                            margin="normal"
                            InputProps={{style: {borderRadius: 10}}}
                            {...register("name", {required: true})}
                        />
                    </>}
                    <InputLabel aria-label="email"/>
                    <TextField
                        error={Boolean(errors.email)}
                        aria-label="email"
                        label="Email"
                        type="email"
                        margin="normal"
                        InputProps={{style: {borderRadius: 10}}}
                        {...register("email", {
                            required: true,
                            validate: (val: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)
                        })}
                    />
                    <InputLabel aria-label="password"/>
                    <TextField
                        error={Boolean(errors.password)}
                        aria-label="password"
                        label="Password"
                        type="password"
                        margin="normal"
                        InputProps={{style: {borderRadius: 10}}}
                        {...register("password", {required: true, minLength: 6})}
                    />
                    <Button variant="contained" sx={authStyles.submitBtn} type="submit">Submit</Button>
                    <Button
                        // @ts-ignore
                        sx={{...authStyles.submitBtn, ...authStyles.switchBtn}}
                        onClick={() => setIsSignup(prev => !prev)}
                    >Switch to {isSignup ? "Login" : "Signup"}</Button>
                </form>
            </Box>
        </Box>
    )
}
export default Auth
