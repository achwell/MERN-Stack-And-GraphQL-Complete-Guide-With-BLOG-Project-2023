import {Styles} from "./homepage-styles";

export const blogPageStyles: Styles = {
    container: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        padding: 2
    },
    profileHeader: {
        display: "flex",
        flexDirection: "column"
    },
    headerText: {
        fontFamily: "Arvo",
        fontSize: "18px",
        padding: 1

    },
    profileHeaderItems: {
        display: "flex",
        alignItems: "center",
        gap: 1
    },
    blogTitle: {
        fontSize: "30px",
        textAlign: "center",
        fontFamily: "Arvo",
        fontWeight: "700",
        textShadow: "2px 2px 12px #ccc"
    },
    blogContent: {
        textShadow: "1px 1px 6px #ccc",
        padding: 5,
        fontSize: "20px",
        textAlign: "justify",
        fontFamily: "Work Sans",
    },
    commentBox: {
        padding: 2,
        display: "flex",
        alignItems: "center",
        gap: 2
    },
    commentInputContainer: {
        padding: 2,
        width: "30%",
        height: "40%"
    },
    inputLayout: {
        display: "flex",
        gap: 2,
        alignItems: "center",
    },
    textField: {
        width: "100%"
    },
    comments: {
        display: "flex",
        flexDirection: "column"
    },
    commentItem: {
        display: "flex",
        padding: 1,
        gap: 1,
        borderBottom: "1px solid black",
        borderBottomWidth: 10,
        margin: 1,
        alignItems: "center",
        height: "auto"
    },
    commentText: {
        margin: 2,
        fontWeight: 600,
        fontFamily: "Arvo",
    }
}
