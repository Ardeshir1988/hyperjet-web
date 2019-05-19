import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
import queryString from 'query-string';
import Urls from "../utils/URLs";


class Products extends Component {


    state = {

        productList: []

    };


    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        let typeid=values.typeid;
        console.log('typeid======'+typeid);
        let url = Urls.baseUrl()+"product/productbytype?typeid="+typeid;
        axios.get(url, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const productList=response.data;
                this.setState({productList});
            });
        this.setState({typeid:typeid})
    }


    render() {
        console.log("=====ProductsRender=====");
        let productsData;
        let term = this.props.searchTerm;
        let x;

        function searchingFor(term) {
            return function(x) {
                return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
            };
        }

     return (

         this.state.productList.map(product => {
                return (
                    <Product
                        key={product.productId}
                        productName={product.productName}
                        productImage={product.product_pic1}
                        productPrice={product.product_price}
                        productId={product.productId}
                        addToCart={this.props.addToCart}
                        productQuantity={this.props.productQuantity}
                        updateQuantity={this.props.updateQuantity}
                        openModal={this.props.openModal}
                    />
                );
            })

     )




    }
}
export default Products;