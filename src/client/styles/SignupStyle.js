import { makeStyles } from '@material-ui/core/styles';
import backgroundPic from "../../assets/background.svg"
export const useSignupStyles = makeStyles((theme) => ({
    signUpContainer: {
        marginTop: "27vh",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "1rem",
    },
    signUpIcon: {
        backgroundColor: "#4c8c4a",
    },
    signupHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    signUpField: {
        marginTop: 10,
        marginBottom: 10,
    },
    imageCover: {
        width: "39rem",
        height: "27.5rem",
        marginTop: "15px"
    },
}));