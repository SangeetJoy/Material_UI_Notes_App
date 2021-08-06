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
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'
import SubjectOutlined from '@material-ui/icons/SubjectOutlined'
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Avatar from '@material-ui/core/Avatar'
import { useLayoutStyle } from '../styles/LayoutStyle';


export default function Layout(props) {
    const { darkMode, onDarkModeChange } = props
    const classes = useLayoutStyle(darkMode)()
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
                            <Avatar variant="circular" src="/myavatar.png" style={{ width: "56px", height: "58px" }} />
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
                        menuItems.map((item, index) => (
                            <ListItem
                                key={index}
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
                {props.children}
            </div>
        </div>
    )
}