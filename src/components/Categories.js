import React, { Component } from "react";
import Category from "./Category";
import axios from "axios/index";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Categories extends Component {


    state = {
        cats: []
    };

    componentDidMount() {
    let url =
        "http://5.9.250.180/service/product/getcats";
    let sz='Basic '+btoa('user1:1user');
    axios.get(url, {headers:{'Authorization': sz}})
        .then(response => {
            const cats=response.data;
        this.setState({cats});
    });

    }

    render() {
        let categoriesData;
        let term = this.props.searchTerm;

        function searchingFor(term) {
            return function(x) {
                return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
            };
        }

        categoriesData=    this.state.cats.map(cat => {
                return (
                    <Category
                        key={cat.categoryId}
                        categoryName={cat.categoryName}
                        categoryPic={cat.categoryPic}
                        categoryId={cat.categoryId}
                        {...this.props}
                    />
                    );
            });

        //
        let view = (
                <CSSTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="div"
                    className="products">
                    {categoriesData}
                </CSSTransitionGroup>
            );

        return <div className="products-wrapper">{view}</div>;
    }
}
export default Categories;