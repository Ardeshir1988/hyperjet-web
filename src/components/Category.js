
import React, { Component } from "react";
import { Redirect } from 'react-router-dom'


class Category extends Component {


    redirectToTarget = () => {
        this.props.history.push(`/products?catid=`+this.props.categoryId)
    };


    render() {
        let categoryName = this.props.categoryName;
        let categoryPic = this.props.categoryPic;

        return (
             <div >

                <div >
                    <img onClick={()=>this.redirectToTarget()} src={'http://5.9.250.180/files/'+categoryPic} alt={''}/>
                </div>
                <h4>{categoryName}</h4>
            </div>
        );
    }
}
export default Category;