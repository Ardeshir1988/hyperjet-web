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
import Badge from '@material-ui/core/Badge';
import {CartContext} from "./CartContext";


const styles = {
    list: {
        width: 270,
    },
    fullList: {
        width: 'auto',
    }
};

class Basket extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            status:false,
        };

    }
    toggleDrawer = (status) => () => {
        this.setState({
            status: status,
        });

    };


    redirectTo(path){
        window.location.href=(path);
    }


    render() {
        console.log("=======RenderBasket");
        const quantity='تعداد';
        const totalAmount='مجموع خرید';
        const deliveryFee='هزینه تحویل';
        const checkout='خرید';
        const toman='تومان';

        const { classes } = this.props;




        return (
            <CartContext.Consumer>
                {cart=>(
            <div>

                    <Badge badgeContent={cart.items.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0)} color="secondary" >
                    <ShoppingCartIcon style={{color:"white"}} onClick={this.toggleDrawer(true)}/>
                    </Badge>


                <Drawer anchor="left" open={this.state.status} onClose={this.toggleDrawer( false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        // onClick={this.toggleDrawer( false)}
                        // onKeyDown={this.toggleDrawer( false)}
                         >
                        <div className={classes.list}>
                            <List>
                                {cart.items.map(p=> {
                                    return (
                                        <BasketProduct
                                        id={p.id}
                                        name={p.name}
                                        price={p.price}
                                        quantity={p.quantity}
                                        image={p.image}/>);
                                })
                                }
                            </List>
                            <Divider />
                            <List>

                                <ListItem>
                                    <ListItemText primary={cart.items.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0)} />
                                    <ListItemText primary={quantity} />

                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0)} />
                                    <ListItemText primary={totalAmount} />

                                </ListItem>
                                <ListItem>
                                    <ListItemText>{(cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0)>=cart.threshold) ? 0 : cart.deliveryCost} </ListItemText>
                                    <ListItemText primary={deliveryFee} />
                                </ListItem>
                                <ListItem>

                                    <ListItemText primary={(cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0)>=cart.threshold) ?
                                        cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0) :cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0)+cart.deliveryCost } />

                                    <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.redirectTo("/user/checkout")}>
                                        {checkout}
                                    </Button>
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Drawer>
            </div>
                )}
            </CartContext.Consumer>
        );
    }
}

export default withStyles(styles)(Basket);