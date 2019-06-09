import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
import queryString from 'query-string';
import Urls from "../utils/URLs";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loading from "./Loading";


class Products extends Component {
    state = {
        items: [],
        hasMore: true,
        loaded:false,
        productList: [],
        page:0
    };

    fetchMoreData = () => {
        if (this.state.items.length >= this.state.productList.length) {
            this.setState({ hasMore: false });
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
            let newPage=this.state.page+1;
            this.setState({page:newPage});
            this.setState({
                items: this.state.items.concat(this.state.productList.slice(this.state.page*20,(this.state.page*20)+20))
            });
        }, 500);
    };

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        let typeid=values.typeid;
        let keyword=values.keyword;
        console.log('keyword======'+keyword);
        console.log('typeid======'+typeid);
        if(typeid!==undefined) {
            let url = Urls.baseUrl() + "product/productbytype?typeid=" + typeid;
            axios.get(url, {headers: {'Authorization': Urls.getAuthToken()}})
                .then(response => {
                    const productList = response.data;
                    this.setState({productList});
                    this.setState({items: productList.slice(0, (productList.length>=20)?20:productList.length)});
                    this.setState({loaded:true});
                });
            // this.setState({typeid: typeid})
        }
        if (keyword!==undefined) {
            let url = Urls.baseUrl() + "product/searchname?pname=" + keyword;
            axios.post(url,{} ,{headers: {'Authorization': Urls.getAuthToken()}})
                .then(response => {
                    const productList = response.data;
                    this.setState({productList});
                    this.setState({items: productList.slice(0, (productList.length>=20)?20:productList.length)});
                    this.setState({loaded:true});
                });
            // this.setState({typeid: typeid})

        }

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

        productsData=

            this.state.items.map((i, index) => (

                <Product
                    key={i.productId}
                    productName={i.productName}
                    productImage={i.product_pic1}
                    productPrice={i.product_price}
                    productDiscountPrice={i.product_price_discount}
                    productStepDiscount={i.productStepDiscount}
                    productDetails={i.productDetails}
                    productQuantity={this.props.productQuantity}
                    updateQuantity={this.props.updateQuantity}
                    productMeasure={i.measure}
                    productId={i.productId}
                    openModal={this.props.openModal}
                />

            ));

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
                    <InfiniteScroll
                        className="products"
                        dataLength={this.state.items.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={
                            <div className="loader-end">
                            <CircularProgress color="secondary"  />
                            </div>
                        }
                        endMessage={
                            <div className="loader-end">
                                <b >پایان محصولات این بخش</b>
                            </div>
                        }
                    >
                        {productsData}
                    </InfiniteScroll>
                </CSSTransitionGroup>
            );

        }

        return <div>{(this.state.loaded)?<div className="products-wrapper"><div className="products">{view}</div></div>:<Loading />}</div>;

    }
}
export default Products;