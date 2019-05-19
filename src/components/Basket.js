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


const styles = {
    list: {
        width: 250,
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
            totalAmount:this.props.total
        };
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.handleBasketData=this.handleBasketData.bind(this);
    }
    toggleDrawer = (status) => () => {
        this.setState({
            status: status,
        });
    };

    handleBasketData(){
        this.setState( {         totalCount:this.props.cart.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0),
            totalAmount:this.props.total})
    }
    handleRemoveProduct(id, e) {
        let cart = this.state.cart;
        let index = cart.findIndex(x => x.id === id);
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        Dm.removeProductFromBasket(id);
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
                            removeProduct={this.handleRemoveProduct}

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
                        <ListItemText primary={6000} />
                        <ListItemText primary={deliveryFee} />
                    </ListItem>
                    <ListItem>

                            <ListItemText primary={6000} />
                            <ListItemText primary={this.state.totalAmount} />

                    <Button variant="contained" color="primary" className={classes.button}>
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