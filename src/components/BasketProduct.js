import React from "react";

import AddIcon from "../assets/add-button-purple.svg";
import RemoveIcon from "../assets/remove-button-purple.svg";
import {CartContext} from "./CartContext";
import Divider from "@material-ui/core/Divider";


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
                    <div>
                        <p className="product-name-basket">{this.props.name}</p>
            <div className="cart-item" >
                <div className="product-info">

                    <p className={(this.props.price!==this.props.priceDiscount)?
                        "product-price-af-discount":
                        "product-price"}>
                        {this.props.priceDiscount}
                    </p>
                    <p className="product-price">
                        {this.props.priceDiscount*cart.items
                            .filter(item=>item.id===id)
                            .map(item=>item.quantity)}
                    </p>

                </div>
                <div className="product-info">
                    {(this.props.price!==this.props.priceDiscount)?<p className="product-price-bf-discount">{this.props.price}</p>:<p />}
                </div>

                <img className="product-image" src={this.props.image} />

                <div className="basketProductOperations">

                        <div className="operand" onClick= {()=>cart.addToCart(
                            {
                                image,
                                name,
                                price,
                                id,
                                quantity
                            }
                        )} >
                            <img src={AddIcon}/>
                        </div>
                    <div className="counter">
                    <p>
                        {cart.items.filter(item=>item.id===id).map(item=>item.quantity)}
                    </p>
                </div>
                    <div className="operand" onClick={() =>cart.removeProduct(id)}>
                        <img src={RemoveIcon}/>
                    </div>

                </div>

            </div>
                        <Divider />
                    </div>

         )}
            </CartContext.Consumer>
        );
    }
}
export default BasketProduct