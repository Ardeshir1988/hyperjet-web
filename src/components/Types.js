import React, { Component } from "react";
import axios from "axios";
import Type from "./Type";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Category from "./Category";
import Urls from "../utils/URLs";

class Types extends Component{


    //    {
    //         "typeId": 79,
    //         "typeName": "نان وغلات",
    //         "parentTypeId": null,
    //         "tblcategoryCategoryId": 1,
    //         "typePosition": 1,
    //         "typePic": "nan-typ.png"
    //     }


    state = {
        typesList: []
    };

    componentDidMount() {

        let url = Urls.baseUrl()+"product/typebycat?catid="+this.props.catid;
        axios.get(url, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const typesList=response.data;
                this.setState({typesList});
            });

    }

    render() {
        let typesData;
        console.log('=====TpeRender===');
        console.log(this.state.typesList);
        typesData=   this.state.typesList.map(type => {
            return (
                <div>
                    <div>

                    </div>
                    <Type
                        key={type.typeId}
                        typeId={type.typeId}
                        typeName={type.typeName}
                        typePic={type.typePic}
                        {...this.props}
                    />
                </div>
            );
        });
        let view;
            view = (
                <CSSTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="div"
                    className="products">
                    {typesData}
                </CSSTransitionGroup>
            );

        return <div className="products-wrapper">{view}</div>;
    }

}
export default Types