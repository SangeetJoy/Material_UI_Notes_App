import { makeStyles } from "@material-ui/core";
const drawerWidth = "15%";

export const useLayoutStyle = (darkMode) => {
    return makeStyles((theme) => {
        return {
            page: {
                width: "100%",
                padding: theme.spacing(3),
                minHeight: 'calc(100vh - 40px)',
                [theme.breakpoints.down('sm')]: {
                    padding: "none",
                    marginTop: "1.5rem",
                  },
            },
            createPage: {
                width: "100%",
                padding: theme.spacing(3),
                height: "95vh"
            },
            drawer: {
                width: drawerWidth,
            },
            drawerPaper: {
                width: drawerWidth,
                height: "100%",
                [theme.breakpoints.down('sm')]: {
                    display: "flex",
                    justifyContent: "center",
                    padding: "1.5rem"
                  }, 
            },
            ListItemIconContainer: {
              fontSize: "2rem"
            },
            drawerContainer: {
                display: "flex",
            },
            active: {
                background: darkMode ? "#6d6d6d" : "#eeeeee",
                fontFamily: "helvatica",
            },
            title: {
                padding: theme.spacing(2)
            },
            appbar: {
                [theme.breakpoints.down('sm')]: {
                    width: "100%",
                  },
                width: `calc(100% - ${drawerWidth})`,
                backgroundColor: darkMode ? "#484848" : "#f9f9f9",
                color: "black"
            },
            sideBarText: {
                [theme.breakpoints.down('sm')]: {
                    display: "none",
                  },
                  marginBottom: "1rem"
            },
            sideBarMainText: {
                [theme.breakpoints.down('sm')]: {
                    display: "none",
                  },  
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
            },
            menuButton: {
                marginRight: theme.spacing(2),
                [theme.breakpoints.up("sm")]: {
                  display: "none"
                }
              }
        }
    })
}
