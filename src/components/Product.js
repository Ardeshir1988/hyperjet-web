
import React, { Component } from "react";
import Counter from "./Counter";

class Product extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // state = {
    //     redirect: false
    // };
    //
    // setRedirect = () => {
    //     this.setState({
    //         redirect: true
    //     })
    // };
    //
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         return <Redirect to='/products' />
    //     }
    // };

    // {
    //         "productId": 4420,
    //         "productName": "کراکر کراکس سبزیجات و پنیرشیرین عسل",
    //         "productDetails": "",
    //         "productParentTypeId": 0,
    //         "measure": "70 گرمی",
    //         "productTypeName": "کیک و بیسکوئیت",
    //         "productCatName": "بستنی و تنقلات",
    //         "product_pic1": "shirinasal-6261149014110.png",
    //         "product_pic2": null,
    //         "product_pic3": null,
    //         "product_price": 700,
    //         "product_price_discount": 700,
    //         "productBrand": "شیرین عسل",
    //         "priceid": 700,
    //         "productPosition": 0,
    //         "productStatus": "t",
    //         "product_min_quantity": null,
    //         "product_max_quantity": null,
    //         "product_priority": null,
    //         "productStepDiscount": 0
    //     }

    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            isAdded: false
        };
    }
    addToCart(image, name, price, id, quantity) {
        this.setState(
            {
                selectedProduct: {
                    image: image,
                    name: name,
                    price: price,
                    id: id,
                    quantity: quantity
                }
            },
            function() {
                this.props.addToCart(this.state.selectedProduct);
            }
        );
        this.setState(
            {
                isAdded: true
            },
            function() {
                setTimeout(() => {
                    this.setState({
                        isAdded: false,
                        selectedProduct: {}
                    });
                }, 3500);
            }
        );
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
        let image = 'http://maxproapp.com/files/'+this.props.productImage;
        let name = this.props.productName;
        let price = this.props.productPrice;
        let id = this.props.productId;
        let quantity = this.props.productQuantity;
        console.log('id='+id+'-name='+quantity);
        return (
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
                <h4 className="product-price">{price}</h4>
                <div className="product-action">
                    <Counter
                        productQuantity={quantity}
                        updateQuantity={this.props.updateQuantity}
                        resetQuantity={this.resetQuantity}
                    />
                    <button
                        className={!this.state.isAdded ? "" : "added"}
                        type="button"
                        onClick={this.addToCart.bind(
                            this,
                            image,
                            name,
                            price,
                            id,
                            quantity
                        )}
                    >
                        {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
                    </button>
                </div>
            </div>
        );
    }
}
export default Product;