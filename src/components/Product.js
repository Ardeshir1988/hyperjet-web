import React, { Component } from "react";
import { CartContext } from "./CartContext";

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
                    <div className="product">

                        <div className="product-image">
                            <img
                                src={image}
                                alt={name}
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
                        <h2 className="product-price">{price}</h2>
                        <h2 className="product-price">{cart.items.filter(item=>item.id===id).map(item=>item.quantity)}</h2>
                        <div className="product-action">
                            {/*<Counter*/}
                            {/*    productQuantity={quantity}*/}
                            {/*    updateQuantity={this.props.updateQuantity}*/}
                            {/*    resetQuantity={this.resetQuantity}*/}
                            {/*/>*/}
                            <button
                                className={!this.state.isAdded ? "" : "added"}
                                type="button"
                                onClick={()=>cart.addToCart(
                                    {
                                        image,
                                        name,
                                        price,
                                        id,
                                        quantity
                                    }
                                )}
                            >
                                {!this.state.isAdded ? "ADD" : "✔ ADDED"}
                            </button>


                        </div>

                    </div>
                    )}
            </CartContext.Consumer>
        );
    }
}
export default Product;