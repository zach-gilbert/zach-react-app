import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import PasswordGen from "./PasswordGen";
import NoPage from "./NoPage";

const drawerWidth = 220
const HOME = 'Home'
const ABOUT = 'About'
const PASSWORD_GENERATOR = 'Password Generator'
const NO_PAGE = 'Error 404: Page not found'

class AppBarNavigation extends React.Component {

    /**
     * Render the contents of the class
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <NavigationDrawerLeft />
        )
    }
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
)

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

const NavigationDrawerLeft = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const getPageLabel = () => {
        let pathURL = window.location.pathname // Gets the path URL

        switch (pathURL) {
            case '/':
                return HOME
            case '/about':
                return ABOUT
            case '/passwordgenerator':
                return PASSWORD_GENERATOR
            case '/nopage':
            default:
                return NO_PAGE
        }
    }

    const [page, setPage] = React.useState(() => {
        return getPageLabel() // Initial state fetched by pathURL in getPageLabel
    })

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {page}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItemButton component={Link} to="/" onClick={() => setPage(HOME)}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton component={Link} to="/about" onClick={() => setPage(ABOUT)}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton component={Link} to="/passwordgenerator" onClick={() => setPage(PASSWORD_GENERATOR)}>
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary="Password Generator" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton component={Link} to="/nopage" onClick={() => setPage(NO_PAGE)}>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText primary="NoPage" />
                    </ListItemButton>
                    <Divider />
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <RouteContent />
            </Main>
        </Box>
    )
}

const RouteContent = () => (
    <Routes>
        <Route exact path ="/" element={<Home />} />
        <Route path ="/about" element={<About />} />
        <Route path ="/passwordgenerator" element={<PasswordGen />} />
        <Route path ="*" element={<NoPage />} />
    </Routes>
)

export default AppBarNavigation;
