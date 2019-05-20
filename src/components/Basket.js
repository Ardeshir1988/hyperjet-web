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
import Dm from "../utils/DataManager";
import axios from "axios";
import Urls from "../utils/URLs";


const styles = {
    list: {
        width: 270,
    },
    fullList: {
        width: 'auto',
    },
};

class Basket extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            status:false,
            cart: this.props.cart,
            totalCount:this.props.cart.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0),
            totalAmount:this.props.total,
            setting:{"cost":0,"threshold":0}
        };
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.handleBasketData=this.handleBasketData.bind(this);
    }
    toggleDrawer = (status) => () => {
        this.setState({
            status: status,
        });
        let cart=Dm.getBasketData();
        this.setState({cart:cart});
        this.setState({setting:Dm.getDeliveryThreshold()});
        this.handleBasketData(cart);
    };

    handleBasketData(cart){
        this.setState({totalCount:cart.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0)});
        let total=0;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
        this.setState({
            totalAmount: total
        });
    }
    handleRemoveProduct(id) {
        let cart = this.state.cart;
        let index = cart.findIndex(x => x.id === id);
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        Dm.removeProductFromBasket(id);
    }

    redirectTo(path){
        window.location.href=(path);
    }

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
                    {this.state.cart.map(p=> {
                        return (<BasketProduct
                            addToCart={this.props.addToCart}
                            removeProduct={this.handleRemoveProduct}
                            handleBasketData={this.handleBasketData}
                        id={p.id}
                        name={p.name}
                        price={p.price}
                        quantity={p.quantity}
                        image={p.image}/>);
                        }
                    )}
                </List>
                <Divider />
                <List>

                        <ListItem>
                            <ListItemText primary={this.state.totalCount} />
                            <ListItemText primary={quantity} />

                        </ListItem>

                    <ListItem>
                        <ListItemText primary={this.state.totalAmount} />
                        <ListItemText primary={totalAmount} />

                    </ListItem>
                    <ListItem>
                        <ListItemText>{(this.state.totalAmount>=this.state.setting.threshold) ? 0 : this.state.setting.cost} </ListItemText>
                        <ListItemText primary={deliveryFee} />
                    </ListItem>
                    <ListItem>

                            <ListItemText primary={(this.state.totalAmount>=this.state.setting.threshold) ?
                                this.state.totalAmount :this.state.totalAmount+this.state.setting.cost } />

                    <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.redirectTo("/checkout")}>
                        {checkout}
                    </Button>
                    </ListItem>
                </List>
            </div>
        );



        return (
            <div>
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