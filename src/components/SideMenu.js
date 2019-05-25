import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';
import OrderStatusIcon from '@material-ui/icons/Restore';
import IconButton from "@material-ui/core/IconButton";
import PreviousOrderIcon from "@material-ui/icons/LibraryBooks";
import ContactIcon from "@material-ui/icons/ContactPhone";

import MenuIcon from '@material-ui/icons/Menu';


const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class SideMenu extends React.Component {
    state = {
        status:false
    };


    toggleDrawer = (status) => () => {
        this.setState({
            status: status,
        });
    };
    redirectTo(path){
        window.location.href=(path);
    }

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    {/*{['حساب کاربری', 'وضعیت سفارش', 'خریدهای گذشته'].map((text, index) => (*/}
                    {/*    <ListItem button key={text}>*/}
                    {/*        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                    {/*        <ListItemText primary={text} />*/}
                    {/*    </ListItem>*/}
                    {/*))}*/}


                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.redirectTo('/user/account')}>
                        <ListItemText primary="حساب کاربری" />
                        <ListItemIcon> <AccountIcon /> </ListItemIcon>

                    </ListItem>

                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.redirectTo('/user/orderstatus')}>
                        <ListItemText primary="وضعیت سفارش" />
                        <ListItemIcon> <OrderStatusIcon /> </ListItemIcon>

                    </ListItem>

                    <ListItem button style={{textAlign:"right"}} >
                        <ListItemText primary="خریدهای گذشته" />
                        <ListItemIcon> <PreviousOrderIcon /> </ListItemIcon>

                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button style={{textAlign:"right"}}>
                        <ListItemText primary="تماس با پشتیبانی" />
                        <ListItemIcon> <ContactIcon /> </ListItemIcon>

                    </ListItem>
                </List>
            </div>
        );



        return (
            <div>
             {/*//   <Button onClick={this.toggleDrawer(true)}>Open Right</Button>*/}
                <IconButton  color="default" aria-label="Open drawer">
                    <MenuIcon onClick={this.toggleDrawer(true)}/>
                </IconButton>
                <Drawer anchor="right" open={this.state.status} onClose={this.toggleDrawer( false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        // onClick={this.toggleDrawer( false)}
                        // onKeyDown={this.toggleDrawer( false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(SideMenu);