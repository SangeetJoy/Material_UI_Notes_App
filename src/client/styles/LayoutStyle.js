import { makeStyles } from "@material-ui/core";
const drawerWidth = "15%";

export const useLayoutStyle = (darkMode) => {
    return makeStyles((theme) => {
        return {
            page: {
                width: "100%",
                padding: theme.spacing(3),
                minHeight: 'calc(100vh - 40px)'
            },
            createPage: {
                width: "100%",
                padding: theme.spacing(3),
                height: "95vh"
            },
            drawer: {
                width: drawerWidth
            },
            drawerPaper: {
                width: drawerWidth,
                height: "100%"
            },
            drawerContainer: {
                display: "flex"
            },
            active: {
                background: darkMode ? "#6d6d6d" : "#eeeeee",
                fontFamily: "helvatica"
            },
            title: {
                padding: theme.spacing(2)
            },
            appbar: {
                width: `calc(100% - ${drawerWidth})`,
                backgroundColor: darkMode ? "#484848" : "#f9f9f9",
                color: "black"
            },
            toolbar: theme.mixins.toolbar,
            dateContainer: {
                flexGrow: 1
            },
            avatarContainer: {
                display: "flex",
                alignItems: "center"
            },
            toggleBtn: {
                backgroundColor: "white"
            }
        }
    })
}
