import React from "react";

import AddIcon from "../assets/add-button-purple.svg";
import RemoveIcon from "../assets/remove-button-purple.svg";
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
                <div className="product-info">
                    <p className="product-name">{this.props.name}</p>
                    <p className="product-price">{this.props.price}</p>
                    <p className="product-price">{this.props.price*cart.items.filter(item=>item.id===id).map(item=>item.quantity)}</p>

                </div>
                <div className="product-info">
                    <p className="product-name">{this.props.price}</p>
                </div>
                <img className="product-image" src={this.props.image} />
                <div>
                        <div onClick= {()=>cart.addToCart(
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
                    <p>
                        {cart.items.filter(item=>item.id===id).map(item=>item.quantity)}
                    </p>
                    <div onClick={() =>cart.removeProduct(id)}>
                        <img src={RemoveIcon}/>
                    </div>
                </div>
            </div>
         )}
            </CartContext.Consumer>
        );
    }
}
export default BasketProduct