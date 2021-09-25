import React, { useState } from "react"
import { useHistory, useLocation } from 'react-router-dom';
import { useLayoutStyle } from '../styles/LayoutStyle';
import { generateAppBarMarkUp, generateWebDrawerMarkup, generateMobileDrawerMarkup } from "../helpers/layout-views"


export default function Layout(props) {
    const { darkMode, onDarkModeChange, theme, onLogInButtonClick } = props
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

    const pagesMarkup = (
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {props.children}
        </div>
    )
    return (
        <div className={classes.drawerContainer}>
            {generateAppBarMarkUp({ classes, handleDrawerToggle, darkMode, onDarkModeChange, onLogInButtonClick  })}
            {generateWebDrawerMarkup({ classes, onListItemClick, location})}
            {generateMobileDrawerMarkup({ classes, theme, location, handleDrawerToggle, mobileOpen, onListItemClick })}
            {pagesMarkup}
        </div>
    )
}