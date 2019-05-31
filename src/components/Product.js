import React, { Component } from "react";
import { CartContext } from "./CartContext";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import AddtoCart from "@material-ui/icons/AddShoppingCart";
import AddtoCartIcon from "../assets/addToCart.png";
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
                        <h2 className="product-price">{price + ' تومان'}</h2>
                        <div className="product-action">
                            {(cart.items.filter(item=>item.id===id).map(item=>item.quantity)<1)?
                                ( <div className="add-to-cart"

                                    onClick={() => cart.addToCart(
                                        {
                                            image,
                                            name,
                                            price,
                                            id,
                                            quantity
                                        }
                                    )}
                                >

                                    <IconButton color="secondary" aria-label="Add to shopping cart">
                                        <AddtoCart />
                                    </IconButton>
                                </div>):(

                                    <div className="cart-operation">
                                        <IconButton className="minus" color="inherit"  onClick={() =>cart.removeProduct(id)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <h3 className="cart-quantity">{cart.items.filter(item=>item.id===id).map(item=>item.quantity)}</h3>
                                        <IconButton className="plus" color="inherit" onClick= {()=>cart.addToCart(
                                            {
                                                image,
                                                name,
                                                price,
                                                id,
                                                quantity
                                            }
                                        )}>
                                            <AddIcon  />

                                        </IconButton>
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