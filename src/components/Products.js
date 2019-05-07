import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
import queryString from 'query-string';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Products extends Component {

    state = {
        productList: []
    };

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(values.catid);

        let url = "http://5.9.250.180/service/product/productbycat?catid="+values.catid;
        let sz='Basic dXNlcjE6MXVzZXI=';
        axios.get(url, {headers:{'Authorization': sz}})
            .then(response => {
                const productList=response.data;
                this.setState({productList});
            });

    }

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

    render() {

        let productsData;
        let term = this.props.searchTerm;
        let x;

        productsData=   this.state.productList.map(product => {
                //        "categoryId": 23,
                //         "categoryName": "محصولات جدید",
                //         "categoryPic": "new-product-category.png",
                //         "position": 1
                return (
                    <Product
                        key={product.productId}
                        productName={product.productName}
                        productImage={product.product_pic1}
                        productPrice={product.product_price}
                        productId={product.productId}
                    />
                );
            });
        let view;
        if (productsData.length <= 0 && !term) {

        } else if (productsData.length <= 0 && term) {
            view = <NoResults />;
        } else {
            view = (
                <CSSTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="div"
                    className="products"
                >
                    {productsData}
                </CSSTransitionGroup>
            );
        }
        return <div className="products-wrapper">{view}</div>;
    }
}
export default Products;