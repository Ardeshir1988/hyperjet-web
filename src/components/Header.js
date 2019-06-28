import React, { Component } from "react";
import "../scss/style.scss";
import RightSideMenu from './SideMenu';
import Basket from "./Basket";
import Search from "../assets/searchicon.svg";
import BackIcon from "../assets/go-back-left-arrow.svg";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false,
            mobileSearch: false,
            keyword:''
        };

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("before handele search");

            window.location.href='/searched_products?keyword=' + this.state.keyword;
            console.log("after handele search");

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

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    render() {


        return (

            <header>

                <div className="container">

                <Basket/>

                    <div className="search">
                        <div className="mobile-search" onClick={this.handleMobileSearch.bind(this)}>
                            <img src={Search}/>
                        </div>

                        <form
                            action="#"
                            method="get"
                            className={
                                this.state.mobileSearch ? "search-form active" : "search-form"
                            }
                        >
                            <div className="back-button" onClick={this.handleSearchNav.bind(this)}>
                                <img src={BackIcon}/>
                            </div>

                            <input
                                type="search"
                                ref="searchBox"
                                placeholder="جستجو کالا"
                                className="search-keyword"
                                onChange= {this.handleChange('keyword')}
                                value={this.state.keyword}
                            />

                            <div className="search-button" type="submit" onClick={this.handleSubmit.bind(this)}>
                                <img src={Search}/>
                            </div>

                        </form>
                    </div>

                    <h4   className="companyName">
                        هایپرجت
                    </h4>
                    <RightSideMenu />

                </div>
            </header>

        );
    }
}

export default Header;