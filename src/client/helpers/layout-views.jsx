import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import React from "react"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'
import SubjectOutlined from '@material-ui/icons/SubjectOutlined'
import { format } from 'date-fns';
import Avatar from '@material-ui/core/Avatar'
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom"

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

export const drawerMarkup = ({ classes, onListItemClick, location, mobileOpen = false }) => (
    <>
        <div className={classes.title}>
            <Typography className={classes.sideBarMainText} variant="h5">
                Quick Notes
            </Typography>
        </div>
        <List>
            {
                menuItems.map((item, index) => (
                    <ListItem
                        key={index}
                        button
                        onClick={() => onListItemClick(item, mobileOpen)}
                        className={location.pathname === item.path ? classes.active : null}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))
            }
        </List>
    </>
)

export const generateAppBarMarkUp = ({ classes, handleDrawerToggle, darkMode, onDarkModeChange, onLogInButtonClick }) => {
    return (
        <Paper>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Switch checked={darkMode} onChange={onDarkModeChange} color="default" />
                    <Typography color="textSecondary" className={classes.dateContainer}>
                        Today is the {format(new Date(), "do MMMM Y")}
                    </Typography>
                    <Link to="/signup"><Button onClick={onLogInButtonClick}>Login</Button></Link>
                    {/* <div className={classes.avatarContainer}>
                        <Typography color="textSecondary">
                            Joy
                        </Typography>
                        <Avatar variant="circular" src="/myavatar.png" style={{ width: "56px", height: "58px" }} />
                    </div> */}
                </Toolbar>
            </AppBar>
        </Paper>
    )
}

export const generateWebDrawerMarkup = ({ classes, onListItemClick, location }) => {
    return (
        <Hidden xsDown implementation="css" className={classes.drawer}>
            <Drawer
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                {drawerMarkup({ classes, onListItemClick, location })}
            </Drawer>
        </Hidden>
    )
}

export const generateMobileDrawerMarkup = ({ classes, handleDrawerToggle, location, theme, mobileOpen, onListItemClick }) => {
    return (
        <Hidden smUp implementation="css">
            <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper
                }}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
            >
                {drawerMarkup({ mobileOpen, classes, location, onListItemClick })}
            </Drawer>
        </Hidden>
    )
}