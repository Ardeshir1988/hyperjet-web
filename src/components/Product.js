import React, { Component } from "react";
import { CartContext } from "./CartContext";

import AddIcon from "../assets/add-button.svg";
import RemoveIcon from "../assets/remove-button.svg";
import AddtoCart from "../assets/add_shopping_cart.svg";
import NumberFormat from 'react-number-format';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            isAdded: false
        };
    }

    quickView(id, name, image, price , priceDiscount,detail,measure) {
        this.setState(
            {
                quickViewProdcut: {

                    id: id,
                    name: name,
                    image: image,
                    price: price,
                    priceDiscount:priceDiscount,
                    detail:detail,
                    measure:measure
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
        let measure=this.props.productMeasure;
        let detail=this.props.productDetails;

        return (
            <CartContext.Consumer>
                {cart=>(
                    <div className={(cart.items.filter(item=>item.id===id).map(item=>item.quantity)<1) ? "product" : "product-selected"}>

                        <div className="product-image">
                            <img
                                src={image}
                                onClick={this.quickView.bind(
                                    this,

                                    id,
                                    name,
                                    image,
                                    price,
                                    priceDiscount,
                                    detail,
                                    measure
                                )}
                            />
                        </div>
                        <h4 className="product-name">{name}</h4>
                        {(priceDiscount!==price)?
                            ( <div>
                                <NumberFormat value={price} displayType={'text'} thousandSeparator={true} renderText={value => <h2 className="product-price-bf-discount"> {value + ' تومان'}</h2>} />
                                {/*<h2 className="product-price-bf-discount">{price + ' تومان'}</h2>*/}
                                {/*<h2 className="product-price-af-discount">{priceDiscount + ' تومان'}</h2>*/}
                                <NumberFormat value={priceDiscount} displayType={'text'} thousandSeparator={true} renderText={value => <h2 className="product-price-af-discount"> {value + ' تومان'}</h2>} />
                            </div>):(
                                <NumberFormat value={price} displayType={'text'} thousandSeparator={true} renderText={value =>  <h2 className="product-price">{value + ' تومان'}</h2>} />
                                )

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