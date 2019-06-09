 import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';
import OrderStatusIcon from '@material-ui/icons/Restore';
import PreviousOrderIcon from "@material-ui/icons/LibraryBooks";
import Refresh from "@material-ui/icons/Refresh";
import ContactIcon from "@material-ui/icons/ContactPhone";
import Dm from "../utils/DataManager";
import MenuIcon from '@material-ui/icons/Menu';
 import Dialog from "@material-ui/core/Dialog";
 import DialogTitle from "@material-ui/core/DialogTitle";
 import DialogContent from "@material-ui/core/DialogContent";
 import DialogContentText from "@material-ui/core/DialogContentText";
 import DialogActions from "@material-ui/core/DialogActions";
 import Button from "@material-ui/core/Button";
 import Paper from "@material-ui/core/Paper";


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
        status:false,
        menuname:'ثبت نام',
        menupath:'/user/registration',
        registered:'true',
        open:false
    };


    toggleDrawer = (status) => () => {
        this.setState({
            status: status,
        });
        if (Dm.getUserData() !== undefined) {
            this.setState({menuname: 'حساب کاربری', menupath: '/user/account'});
            this.setState({registered:false})
        }

    };
    redirectTo(path){
        window.location.href=(path);
    }

    refresh(){
        Dm.removeUserData();
        this.redirectTo('/user/registration')
    }
    closeDialog(){
        this.setState({open:false});
    }
    openDialog(){
        this.setState({open:true});
    }
    render() {

        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>

                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"تماس با پشتیبانی"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            22823567
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" onClick={()=>this.closeDialog()} color="secondary" autoFocus>
                            بستن
                        </Button>
                    </DialogActions>
                </Dialog>
                <List>
                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.redirectTo(this.state.menupath)}>
                        <ListItemText  primary={ this.state.menuname} />
                        <ListItemIcon><AccountIcon />  </ListItemIcon>

                    </ListItem>

                    <ListItem button disabled={this.state.registered} style={{textAlign:"right"}} onClick={()=>this.redirectTo('/user/orderstatus')}>
                        <ListItemText primary="وضعیت سفارش" />
                        <ListItemIcon> <OrderStatusIcon /> </ListItemIcon>

                    </ListItem>

                    <ListItem button disabled={this.state.registered} style={{textAlign:"right"}} onClick={()=>this.redirectTo('/user/orders')} >
                        <ListItemText primary="خریدهای گذشته" />
                        <ListItemIcon> <PreviousOrderIcon /> </ListItemIcon>

                    </ListItem>
                </List>
                <Divider />
                <List>

                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.openDialog()}>
                        <ListItemText primary="تماس با پشتیبانی" />
                        <ListItemIcon> <ContactIcon /> </ListItemIcon>
                    </ListItem>
                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.refresh()} >
                        <ListItemText primary="خروج"/>
                        <ListItemIcon> <Refresh /> </ListItemIcon>
                    </ListItem>
                </List>
            </div>
        );



        return (
            <div>
                <MenuIcon  style={{color:"white"}} onClick={this.toggleDrawer(true)}/>
                <Drawer anchor="right" open={this.state.status} onClose={this.toggleDrawer( false)}>
                    <div
                        tabIndex={0}
                        role="button">
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(SideMenu);