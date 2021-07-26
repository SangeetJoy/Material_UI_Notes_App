import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import React from "react"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Avatar from '@material-ui/core/Avatar'

const drawerWidth = "15%";

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerContainer: {
            display: "flex"
        },
        active: {
            background: "#eeeeee",
            fontFamily: "helvatica"
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth})`,
            backgroundColor: "#f9f9f9",
            color: "black"
        },
        toolbar: theme.mixins.toolbar,
        dateContainer: {
            flexGrow: 1
        },
        avatarContainer: {
            display: "flex",
            alignItems: "center"
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color="primary" />,
            path: "/"
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlineOutlined color="primary" />,
            path: "/create"
        }
    ]
    return (
        <div className={classes.drawerContainer}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography color="textSecondary" className={classes.dateContainer}>
                        Today is the {format(new Date(), "do MMMM Y")}
                    </Typography>
                    <div className={classes.avatarContainer}>
                        <Typography>
                            Joy
                        </Typography>
                        <Avatar variant="circle" src="/myavatar.png" style={{ width: "56px", height: "58px" }} />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.title}>
                    <Typography variant="h5">
                        Quick Notes
                    </Typography>
                </div>

                <List>
                    {
                        menuItems.map(item => (
                            <ListItem
                                button
                                onClick={() => history.push(item.path)}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}