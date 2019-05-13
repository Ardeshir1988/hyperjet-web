import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from "@material-ui/core/IconButton";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class Basket extends React.Component {
    state = {
        status:false
    };


    toggleDrawer = (status) => () => {
        this.setState({
            status: status,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>


                    <li className="cart-item" >


                        <div className="product-total">
                            <p className="quantity">
                                2
                            </p>
                            <p className="amount">25000</p>
                        </div>
                        {/*<a*/}
                        {/*    className="product-remove"*/}
                        {/*    href="#"*/}

                        {/*>*/}
                        {/*    ×*/}
                        {/*</a>*/}
                        <div className="product-info">
                            <p className="product-name">لوبیا سبز باغ عرفان</p>
                            <p className="product-price">12500</p>
                        </div>
                        <img className="product-image" src='http://maxproapp.com/files/farsi-6262586802384.png' />
                    </li>






                    {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    {/*    <ListItem button key={text}>*/}
                    {/*        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                    {/*        <ListItemText primary={text} />*/}
                    {/*    </ListItem>*/}
                    {/*))}*/}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );



        return (
            <div>
                {/*//   <Button onClick={this.toggleDrawer(true)}>Open Right</Button>*/}
                <IconButton  color="default" aria-label="Open drawer">
                    <ShoppingCartIcon onClick={this.toggleDrawer(true)}/>
                </IconButton>

                <Drawer anchor="left" open={this.state.status} onClose={this.toggleDrawer( false)}>
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

export default withStyles(styles)(Basket);