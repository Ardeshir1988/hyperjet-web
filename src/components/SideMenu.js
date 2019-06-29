 import React from 'react';

import {createMuiTheme, withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';
import PreviousOrderIcon from '@material-ui/icons/Restore';
import OrderStatusIcon from "@material-ui/icons/LibraryBooks";
import Refresh from "@material-ui/icons/Refresh";
import ContactIcon from "@material-ui/icons/Phone";
import Dm from "../utils/DataManager";
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import LogoIcon from "../assets/logo-white.png";
import SupportIcon from "../assets/support.svg";
 import Fail from "../assets/close-circle.svg";
 import Link from "@material-ui/core/Link";


const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    item:{
        width: 24,
        minWidth: 24,
    },

};

 const theme = createMuiTheme({

     typography: {
         // Use the system font.
         fontFamily:
             'iran-sans',

     },
     palette: {
         primary: {
             // light: will be calculated from palette.primary.main,
             main: '#9929ef',
             // dark: will be calculated from palette.primary.main,
             // contrastText: will be calculated to contast with palette.primary.main
         },
         secondary: {
             light: '#1ab91d',
             main: '#1ab91d',
             // dark: will be calculated from palette.secondary.main,
             contrastText: '#ffcc00',
         },
         // error: will us the default color
     },


 })

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
            <MuiThemeProvider theme={theme}>
                <div className= "side-header">
                    <div className="img-logo">
                        <img src={LogoIcon}/>
                    </div>
                </div>
            <div className={classes.list}>

                <Dialog
                        open={this.state.open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        <div className= "dialog-header-success">
                            <Link color={"primary"} href="tel:02122823567" > <div className="img-logo">
                                    <img src={SupportIcon}/>
                            </div>
                                </Link>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Link color={"secondary"}  href="tel:02122823567" >
                            <div className= "dialog-empty-cart">
                                <h4>تماس با پشتیبانی</h4>
                               <h3> 021 <span>-</span> 22823567</h3>
                            </div>
                            </Link>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={()=>this.closeDialog()} color="primary" fullWidth={true} size={"large"}>
                            بستن
                        </Button>
                    </DialogActions>
                </Dialog>

                <List>
                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.redirectTo(this.state.menupath)}>
                        <ListItemText  primary={ this.state.menuname} />
                        <ListItemIcon style={{minWidth:"24px", marginLeft:"10px"}}><AccountIcon />  </ListItemIcon>

                    </ListItem>

                    <ListItem button disabled={this.state.registered} style={{textAlign:"right"}} onClick={()=>this.redirectTo('/user/orderstatus')}>
                        <ListItemText primary="وضعیت سفارش" />
                        <ListItemIcon style={{minWidth:"24px", marginLeft:"10px"}}> <OrderStatusIcon /> </ListItemIcon>

                    </ListItem>

                    <ListItem button disabled={this.state.registered} style={{textAlign:"right"}} onClick={()=>this.redirectTo('/user/orders')} >
                        <ListItemText primary="خریدهای گذشته" />
                        <ListItemIcon style={{minWidth:"24px", marginLeft:"10px"}}>  <PreviousOrderIcon /> </ListItemIcon>

                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.openDialog()}>
                        <ListItemText primary="تماس با پشتیبانی" />
                        <ListItemIcon style={{minWidth:"24px", marginLeft:"10px"}}> <ContactIcon /> </ListItemIcon>
                    </ListItem>
                    <ListItem button style={{textAlign:"right"}} onClick={()=>this.refresh()} >
                        <ListItemText primary="خروج"/>
                        <ListItemIcon style={{minWidth:"24px", marginLeft:"10px"}}>  <Refresh /> </ListItemIcon>
                    </ListItem>
                </List>
            </div>
            </MuiThemeProvider>
        );

        return (
            <MuiThemeProvider theme={theme}>
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
            </MuiThemeProvider>
        );

    }

}

export default withStyles(styles)(SideMenu);