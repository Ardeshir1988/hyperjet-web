import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
import queryString from 'query-string';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import Urls from "../utils/URLs";
import InfiniteScroll from "react-infinite-scroll-component";
import Type from "./Type";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

class ProductsWithTypes extends Component {



    state = {
        items: [],
        hasMore: true,
        typesList: [],
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

        let typsUrl = Urls.baseUrl()+"product/typebycat?catid="+values.catid;
        axios.get(typsUrl, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const typesList=response.data;
                this.setState({typesList});
            });


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
        const { classes } = this.props;


        let typesData=   this.state.typesList.map(type => {
            return (
                    <Type
                        key={type.typeId}
                        typeId={type.typeId}
                        typeName={type.typeName}
                        typePic={type.typePic}
                        {...this.props}
                    />
            );
        });
        productsData=

                this.state.items.map((i, index) => (
                    <Product
                                key={i.productId}
                                productName={i.productName}
                                productImage={i.product_pic1}
                                productPrice={i.product_price}
                                productId={i.productId}
                                productDiscountPrice={i.product_price_discount}
                                productStepDiscount={i.productStepDiscount}
                                addToCart={this.props.addToCart}
                                productQuantity={this.props.productQuantity}
                                updateQuantity={this.props.updateQuantity}
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
                        {/*<div className="types">*/}
                        {/*{typesData}*/}
                        {/*</div>*/}
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

        return <div className="products-wrapper"><div className="products">{view}</div></div>;
    }
}
export default ProductsWithTypes;