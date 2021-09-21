import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    margin: {
        margin: theme.spacing.unit,

    },
});

function PermanentDrawerLeft(props) {

    const allPostHandler = () => {
        props.history.push('/dashboard')
    }

    const registerHandler = () => {
        props.history.push("/register")
    }

    const { classes } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <List>
                    <ListItem button key="ALl Post" onClick={allPostHandler}>
                        <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                        <ListItemText primary="ALL POSTS" />
                    </ListItem>
                    <ListItem button key="User Posts">
                        <ListItemIcon>{<MailIcon />}</ListItemIcon>
                        <ListItemText primary="USER POSTS" />
                    </ListItem>
                    <ListItem button key="Registration" onClick={registerHandler}>
                        <ListItemIcon>{<MailIcon />}</ListItemIcon>
                        <ListItemText primary="REGISTRATION" />
                    </ListItem>
                </List>
            </Drawer>
        </div >
    );
}

PermanentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(PermanentDrawerLeft));
