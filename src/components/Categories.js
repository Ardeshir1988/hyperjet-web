import React, { Component } from "react";
import Category from "./Category";
import axios from "axios/index";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Urls from "../utils/URLs"
import Dm from "../utils/DataManager"

class Categories extends Component {


    state = {
        cats: []
    };

    componentDidMount() {
    let url = Urls.baseUrl()+"product/getcats";
    axios.get(url, {headers:{'Authorization': Urls.getAuthToken()}})
        .then(response => {
            const cats=response.data;
        this.setState({cats});
    });

        // axios.get(Urls.baseUrl()+"user/getusersetting", {headers:{'Authorization': Urls.getAuthToken()}})
        //     .then(response => {
        //         const setting=response.data;
        //         Dm.setDeliveryThreshold(setting.deliveryCost,setting.threshold)
        //     });
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
                    className="categories">
                    {categoriesData}
                </CSSTransitionGroup>
            );

        return <div className="products-wrapper">{view}</div>;
    }
}
export default Categories;