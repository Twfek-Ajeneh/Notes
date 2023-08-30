import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem  from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import SubjectOutlined from '@mui/icons-material/SubjectOutlined'
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import {useHistory , useLocation} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
            height: '100%'
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        root: {
            display: 'flex',
            minHeight: '100vh'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`,
            background: '#ffffff'
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: 15
        }
    }
});

const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined  color="secondary"/>,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined  color="secondary"/>,
            path: '/create'
        },
    ]

    return ( 
        <div className={classes.root} >

            <AppBar
                className={classes.appbar}
                elevation={1}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the { new Date().toUTCString() }
                    </Typography>
                    <Typography>Twfek Ajeneh</Typography>
                    <Avatar src="/kaneki ken .jpg" className={classes.avatar}/>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{paper: classes.drawerPaper}}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Notes 
                    </Typography>
                </div>

                <List>
                    {menuItems.map((e) => (
                        <ListItem
                            button
                            key={e.text}
                            onClick={() => history.push(e.path)} 
                            className={location.pathname===e.path ? classes.active : null}
                        >
                            <ListItemIcon>{e.icon}</ListItemIcon>
                            <ListItemText primary={e.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    );
}

export default Layout;