import React , { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import Dm from "../utils/DataManager";
import {CartContext} from "./CartContext";


class BasketProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.quantity,
            remove:this.props.removeProduct,
            update:this.props.update
        };

    }



    render() {

        let price=this.props.price;
        let name=this.props.name;
        let id=this.props.id;
        let image=this.props.image;
        let quantity=1;


        return(
            <CartContext.Consumer>
                {cart=>(
            <div className="cart-item" >


                <div className="product-total">
                    <p className="quantity">
                        {cart.items.filter(item=>item.id===id).map(item=>item.quantity)}
                    </p>
                    <p className="amount">{this.props.price}</p>
                </div>
                <div className="product-info">
                    <p className="product-name">{this.props.name}</p>
                    <p className="product-price">{this.props.price}</p>
                </div>
                <img className="product-image" src={this.props.image} />
                <div>
                    <IconButton color="primary" aria-label="Add to shopping cart">
                        <AddIcon onClick= {()=>cart.addToCart(
                            {
                                image,
                                name,
                                price,
                                id,
                                quantity
                            }
                        )} />

                    </IconButton>

                    <IconButton color="primary" aria-label="Add to shopping cart">
                    <RemoveIcon onClick={() =>cart.removeProduct(id)}/>
                    </IconButton>
                </div>
            </div>
         )}
            </CartContext.Consumer>
        );
    }
}
export default BasketProduct