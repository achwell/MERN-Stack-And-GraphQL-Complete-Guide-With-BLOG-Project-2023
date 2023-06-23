import {Styles} from "./homepage-styles";

export const authStyles: Styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto"
    },
    logoTitle: {
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        mt: 1,
        mb: 1
    },
    logoText: {
        fontFamily: "Work Sans",
        fontSize: "30px",
        textAlign: "center"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: 5,
        boxShadow: "5px 5px 5px #000",
        margin: "auto",
        mt: 5,
        mb: 5
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    submitBtn: {
        fontFamily: "Work Sans",
        mt: 1,
        mb: 1,
        borderRadius: 10,
        backgroundColor: "#273238",
        width: "200px",
        ":hover": {
            color: "white",
            backgroundColor: "orangered",
            boxShadow: "10px 10px 20px #ccc",
        }
    },
    switchBtn: {
        backgroundColor: "transparent",
        color: "#273238",
        ":hover": {
            textDecoration: "underline",
            textUnderlineOffset: "5px"
        }
    }
}
