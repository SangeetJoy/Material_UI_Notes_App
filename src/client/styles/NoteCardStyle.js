import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import yellow from "@material-ui/core/colors/yellow";
import blue from "@material-ui/core/colors/blue";
import { makeStyles } from '@material-ui/core/styles';

export const useNodeCardStyles = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if (note.category === "work") { return yellow[700] }
            if (note.category === "money") { return green[500] }
            if (note.category === "todos") { return pink[500] }
            return blue[500]
        }
    },
    editTextField: {
        padding: "1rem",
        width: "90%",
    },
    saveBtn: {
        backgroundColor: "#689f38",
        padding: "3px",
        width: "90%",
        marginLeft: "4%",
        marginBottom: "4%",
        "&:hover": {
            backgroundColor: "#99d066"
        }
    },
    closeBtn: {
        padding: "3px",
        width: "90%",
        marginLeft: "4%",
        marginBottom: "4%",
        backgroundColor: pink[500],
        "&:hover": {
            backgroundColor: pink[400]
        }
    },
    editBtn: {
        marginRight: "-10px"
    }
})
