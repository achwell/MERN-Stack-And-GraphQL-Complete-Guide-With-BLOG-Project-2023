import {CSSProperties} from "react";
import {Styles} from "./homepage-styles";

export const addBlogStyles: Styles = {
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    blogHeader: {
        display: "flex",
        justifyContent: "space-around",
        fontWeight: "bold",
        padding: 3,
        alignItems: "center"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
    }
}
export const htmlElementStyles: {[key: string]: CSSProperties} = {
    h2: {
        fontFamily: "Work Sans",
        fontSize: "40px",
        fontWeight: 500,
        marginLeft: "50px",
        marginRight: "50px",
        marginTop: "40px",
        outline: "none"
    },
    p: {
        border: "none",
        fontFamily: "Work Sans",
        fontSize: "18px",
        marginLeft: "50px",
        marginRight: "50px",
        marginTop: "30px",
        minHeight: "300px",
        outline: "none"
    }
}
