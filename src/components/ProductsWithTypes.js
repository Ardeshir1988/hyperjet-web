import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
import queryString from 'query-string';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Types from "./Types";
import Urls from "../utils/URLs";
import InfiniteScroll from "react-infinite-scroll-component";


class ProductsWithTypes extends Component {



    state = {
        items: [],
        hasMore: true,

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
                items: this.state.items.concat(this.state.productList.slice(this.state.page*25,(this.state.page*25)+25))
            });
        }, 500);
    };

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        let url = Urls.baseUrl()+"product/productbycat?catid="+values.catid;
        axios.get(url, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const productList=response.data;
                this.setState({productList});
                this.setState({items:productList.slice(0,25)})

            });
        this.setState({catid:values.catid});
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
                                productId={i.productId}
                                addToCart={this.props.addToCart}
                                productQuantity={this.props.productQuantity}
                                updateQuantity={this.props.updateQuantity}
                                openModal={this.props.openModal}
                            />
                ));


        //     this.state.productList.map(product => {
        //     //        "categoryId": 23,
        //     //         "categoryName": "محصولات جدید",
        //     //         "categoryPic": "new-product-category.png",
        //     //         "position": 1
        //     return (
        //         <Product
        //             key={product.productId}
        //             productName={product.productName}
        //             productImage={product.product_pic1}
        //             productPrice={product.product_price}
        //             productId={product.productId}
        //             addToCart={this.props.addToCart}
        //             productQuantity={this.props.productQuantity}
        //             updateQuantity={this.props.updateQuantity}
        //             openModal={this.props.openModal}
        //         />
        //     );
        // });
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
                        <Types         {...this.props} catid={this.state.catid}/>
                        <InfiniteScroll
                            className="products"
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                        {productsData}
                        </InfiniteScroll>
                    </CSSTransitionGroup>
                );

        }

        return <div className="products-wrapper"><div className="products">{view}</div></div>;
    }
}
export default ProductsWithTypes;