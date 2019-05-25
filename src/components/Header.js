import React, { Component } from "react";

import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "../scss/style.scss";
import Dm from "../utils/DataManager";
import RightSideMenu from './SideMenu';
import Basket from "./Basket";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false,
            keyword:''
        };

    }

    handleSubmit() {
        if (this.state.keyword !== '' && this.state.keyword !== ' ')
            window.location.href=(`/searched_products?keyword=`+this.state.keyword);
    }
    handleMobileSearch(e) {
        e.preventDefault();
        this.setState({
            mobileSearch: true
        });
    }
    handleSearchNav(e) {
        e.preventDefault();
        this.setState(
            {
                mobileSearch: false
            },
            function() {
                this.refs.searchBox.value = "";
                this.props.handleMobileSearch();
            }
        );
    }
    // handleClickOutside(event) {
    //     const cartNode = findDOMNode(this.refs.cartPreview);
    //     const buttonNode = findDOMNode(this.refs.cartButton);
    //     if (cartNode.classList.contains("active")) {
    //         if (!cartNode || !cartNode.contains(event.target)) {
    //             this.setState({
    //                 showCart: false
    //             });
    //             event.stopPropagation();
    //         }
    //     }
    // }
    componentDidMount() {
        // document.addEventListener(
        //     "click",
        //     this.handleClickOutside.bind(this),
        //     true
        // );


    }
    componentWillUnmount() {
        // document.removeEventListener(
        //     "click",
        //     this.handleClickOutside.bind(this),
        //     true
        // );
    }
    updateBasket(){
        if (Dm.getBasketData())
            if (Dm.getBasketData().length > this.state.cart)
                this.setState( {cart:Dm.getBasketData()});
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    render() {

        this.updateBasket();
        let cartItems;
        cartItems = this.state.cart.map(product => {
            return (

                <li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">
                            {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
                        </p>
                        <p className="amount">{product.quantity * product.price}</p>
                    </div>
                    <a
                        className="product-remove"
                        href="#"
                        onClick={this.props.removeProduct.bind(this, product.id)}
                    >
                        ×
                    </a>
                </li>
            );
        });
        let view;
        if (cartItems.length <= 0) {
            view = <EmptyCart />;
        } else {
            view = (
                <CSSTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="ul"
                    className="cart-items"
                >
                    {cartItems}
                </CSSTransitionGroup>
            );
        }
        return (

            <header>

                <div className="container">
           <Basket     addToCart={this.props.addToCart}   cart={this.state.cart} total={this.props.total} removeProductFromCart={this.props.removeProductFromCart}/>

                    <div className="search">
                        <a
                            className="mobile-search"
                            href="#"
                            onClick={this.handleMobileSearch.bind(this)}
                        >
                            <img
                                src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
                                alt="search"
                            />
                        </a>
                        <form
                            action="#"
                            method="get"
                            className={
                                this.state.mobileSearch ? "search-form active" : "search-form"
                            }
                        >
                            <a
                                className="back-button"
                                href="#"
                                onClick={this.handleSearchNav.bind(this)}
                            >
                                <img
                                    src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                                    alt="back"
                                />
                            </a>
                            <input
                                type="search"
                                ref="searchBox"
                                placeholder="Search for Vegetables and Fruits"
                                className="search-keyword"
                                onChange= {this.handleChange('keyword')}
                                value={this.state.keyword}
                            />
                            <button
                                className="search-button"
                                type="submit"
                                onClick={()=>this.handleSubmit()}
                            />
                        </form>
                    </div>

                    <RightSideMenu />
                </div>
            </header>

        );
    }
}

export default Header;