import React, { Component } from "react";
import { CartContext } from "./CartContext";

import AddIcon from "../assets/add-button.svg";
import RemoveIcon from "../assets/remove-button.svg";
import AddtoCart from "../assets/add_shopping_cart.svg";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            isAdded: false
        };
    }

    quickView(image, name, price, id) {
        this.setState(
            {
                quickViewProdcut: {
                    image: image,
                    name: name,
                    price: price,
                    id: id
                }
            },
            function() {
                this.props.openModal(this.state.quickViewProdcut);
            }
        );
    }

    render() {
        let image = 'https://maxproapp.com/files/'+this.props.productImage;
        let name = this.props.productName;
        let price = this.props.productPrice;
        let priceDiscount = this.props.productDiscountPrice;
        let stepDiscount=this.props.productStepDiscount;
        let id = this.props.productId;
        let quantity = this.props.productQuantity;

        return (
            <CartContext.Consumer>
                {cart=>(
                    <div className={(cart.items.filter(item=>item.id===id).map(item=>item.quantity)<1) ? "product" : "product-selected"}>

                        <div className="product-image">
                            <img
                                src={image}
                                onClick={this.quickView.bind(
                                    this,
                                    image,
                                    name,
                                    price,
                                    id,
                                    quantity
                                )}
                            />
                        </div>
                        <h4 className="product-name">{name}</h4>
                        {(priceDiscount!==price)?
                            ( <div>
                                <h2 className="product-price-bf-discount">{price + ' تومان'}</h2>
                                <h2 className="product-price-af-discount">{priceDiscount + ' تومان'}</h2>
                            </div>):(
                                 <h2 className="product-price">{price + ' تومان'}</h2>)

                            }
                        <div className="product-action">
                            {(cart.items.filter(item=>item.id===id).map(item=>item.quantity)<1)?
                                ( <div className="add-to-cart"

                                    onClick={() => cart.addToCart(
                                        {
                                            image,
                                            name,
                                            price,
                                            id,
                                            quantity,
                                            priceDiscount,
                                            stepDiscount
                                        }
                                    )}
                                >


                                    <img src={AddtoCart}/>

                                </div>):(

                                    <div className="cart-operation">
                                        <div className="minus" color="inherit"  onClick={() =>cart.removeProduct(id)} >
                                            <img src={RemoveIcon}/>
                                        </div>

                                        <h3 className="cart-quantity">{cart.items.filter(item=>item.id===id).map(item=>item.quantity)}</h3>
                                        <div className="plus" color="inherit" onClick= {()=>cart.addToCart(
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

                                    </div>
                                )
                            }
                        </div>

                    </div>
                    )}
            </CartContext.Consumer>
        );
    }
}
export default Product;