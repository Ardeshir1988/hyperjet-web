import React, { Component } from "react";
import axios from "axios";
import Type from "./Type";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Urls from "../utils/URLs";
import queryString from "query-string";

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

        const values = queryString.parse(this.props.location.search);
        let url = Urls.baseUrl()+"product/typebycat?catid="+values.catid;
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

        return(<div className="types-wrapper">

                <div className="top-types">
                <div className="types">
            {typesData}

                </div>
            </div>
            </div>
                );
    }

}
export default Types