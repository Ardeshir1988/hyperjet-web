import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
import queryString from 'query-string';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Types from "./Types";
import Urls from "../utils/URLs";

class Products extends Component {


    state = {

        productList: []
    };


    componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        if (values.typeid===undefined) {
            console.log('createProductsPageWithTypes');
            this.createProductsPageWithTypes(values.catid);
            this.setState({typeid:0});
            this.setState({catid:values.catid});

        }
        else {
            console.log('createProductsPageWithoutTypes');
            this.createProductsPageWithoutTypes(values.typeid);
            this.setState({typeid:values.typeid});
            this.setState({catid:0});
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            this.componentDidMount();
        }
    }

    createProductsPageWithTypes(catid){

        let url = Urls.baseUrl()+"product/productbycat?catid="+catid;
        axios.get(url, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const productList=response.data;
                this.setState({productList});
            });
        this.setState({catid:catid})
    }
    createProductsPageWithoutTypes(typeid){
        console.log('typeid======'+typeid);
        let url = Urls.baseUrl()+"/product/productbytype?typeid="+typeid;
        axios.get(url, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const productList=response.data;
                this.setState({productList});
            });
        this.setState({typeid:typeid})
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

        function searchingFor(term) {
            return function(x) {
                return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
            };
        }

        productsData=   this.state.productList.map(product => {
                //        "categoryId": 23,
                //         "categoryName": "محصولات جدید",
                //         "categoryPic": "new-product-category.png",
                //         "position": 1
                return (
                    <div>
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
                    </div>
                );
            });
        let view;
        if (productsData.length <= 0 && !term) {

        } else if (productsData.length <= 0 && term) {
            view = <NoResults />;
        } else {
            if (this.state.typeid === 0) {
                view = (

                    <CSSTransitionGroup
                        transitionName="fadeIn"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        component="div"
                        className="products"
                    >
                        <Types         {...this.props} catid={this.state.catid}/>
                        {productsData}
                    </CSSTransitionGroup>
                );
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
        }

        return <div className="products-wrapper">{view}</div>;
    }
}
export default Products;