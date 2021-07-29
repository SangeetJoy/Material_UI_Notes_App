import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import React from "react"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Avatar from '@material-ui/core/Avatar'

const drawerWidth = "15%";



export default function Layout(props) {
    const { darkMode, onDarkModeChange } = props
    const useStyles = makeStyles((theme) => {
        return {
            page: {
                width: "100%",
                padding: theme.spacing(3)
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
            <Paper>
                <AppBar className={classes.appbar} elevation={0}>
                    <Toolbar>
                        <Switch checked={darkMode} onChange={onDarkModeChange} color="default" />
                        <Typography color="textSecondary" className={classes.dateContainer}>
                            Today is the {format(new Date(), "do MMMM Y")}
                        </Typography>
                        <div className={classes.avatarContainer}>
                            <Typography color="textSecondary">
                                Joy
                            </Typography>
                            <Avatar variant="circle" src="/myavatar.png" style={{ width: "56px", height: "58px" }} />
                        </div>
                    </Toolbar>
                </AppBar>
            </Paper>
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
            {location.pathname === "/create" ?
                <div className={classes.createPage}>
                    <div className={classes.toolbar}></div>
                    {props.children.props.children[1]}
                </div> :
                <div className={classes.page}>
                    <div className={classes.toolbar}></div>
                    {props.children.props.children[0]}
                </div>
            }
        </div>
    )
}