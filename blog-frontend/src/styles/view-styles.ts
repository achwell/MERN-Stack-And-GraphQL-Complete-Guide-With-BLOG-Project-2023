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
        flexDirection: "column",
        padding: 1
    },
    headerText: {
        fontFamily: "Arvo"
    },
    profileHeaderItems: {
        display: "flex",
        alignItems: "center",
        padding: 1,
        gap: 2
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
    comments: {

    },
    commentBox: {

    },
    commentInputContainer: {

    },
    commentItem: {

    },
    commentText: {

    }
}
