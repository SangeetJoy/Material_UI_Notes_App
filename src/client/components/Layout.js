import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import React, { useState } from "react"
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
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CalendarTodaySharpIcon from '@material-ui/icons/CalendarTodaySharp';


export default function Layout(props) {
    const { darkMode, onDarkModeChange, theme } = props
    const classes = useLayoutStyle(darkMode)()
    const history = useHistory()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const onListItemClick = (item, isMobileDrawer) => {
        history.push(item.path)
        isMobileDrawer && setMobileOpen(!mobileOpen);
    }

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

    const appBarMarkUp = (
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
                <div className={classes.avatarContainer}>
                    <Typography color="textSecondary">
                        Joy
                    </Typography>
                    <Avatar variant="circular" src="/myavatar.png" style={{ width: "56px", height: "58px" }} />
                </div>
            </Toolbar>
        </AppBar>
    )

    const drawerMarkup = (isMobileDrawer=false) => (
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
                            onClick={() => onListItemClick(item, isMobileDrawer)}
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

    const generateDrawerMarkup = () => {
        return (
            <Hidden xsDown implementation="css" className={classes.drawer}>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    classes={{ paper: classes.drawerPaper }}
                >
                    {drawerMarkup()}
                </Drawer>
            </Hidden>
        )
    }

    const generateMobileDrawerMarkup = () => {
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
                    {drawerMarkup(mobileOpen)}
                </Drawer>
            </Hidden>
        )
    }

    return (
        <div className={classes.drawerContainer}>
            <Paper>{appBarMarkUp}</Paper>
            {generateDrawerMarkup()}
            {generateMobileDrawerMarkup()}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {props.children}
            </div>
        </div>
    )
}