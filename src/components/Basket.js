import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import BasketProduct from "./BasketProduct";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';


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
        const quantity='تعداد';

        const totalAmount='مجموع خرید';
        const deliveryFee='هزینه تحویل';
        const checkout='خرید';
        const toman='تومان';

        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    {this.props.cart.map(p=> {
                        return (<BasketProduct
                        id={p.id}
                        name={p.name}
                        price={p.price}
                        quantity={p.quantity}
                        image={p.image}/>);
                        }
                    )}

                    {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    {/*    <ListItem button key={text}>*/}
                    {/*        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                    {/*        <ListItemText primary={text} />*/}
                    {/*    </ListItem>*/}
                    {/*))}*/}
                </List>
                <Divider />
                <List>

                        <ListItem>
                            <ListItemText primary={this.props.cart.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0) } />
                            <ListItemText primary={quantity} />

                        </ListItem>

                    <ListItem>
                        <ListItemText primary={this.props.total} />
                        <ListItemText primary={totalAmount} />

                    </ListItem>
                    <ListItem>
                        <ListItemText primary={6000} />
                        <ListItemText primary={deliveryFee} />
                    </ListItem>
                    <ListItem>

                            <ListItemText primary={6000} />
                            <ListItemText primary={this.props.total} />

                    <Button variant="contained" color="primary" className={classes.button}>
                        {checkout}
                    </Button>
                    </ListItem>
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