
import React, { Component } from "react";



class Category extends Component {


    redirectToTarget = () => {
        this.props.history.push(`/cat_products?catid=`+this.props.categoryId)
    };


    render() {
        let categoryName = this.props.categoryName;
        let categoryPic = this.props.categoryPic;

        return (
             <div>
                <div>
                    <img onClick={()=>this.redirectToTarget()} src={'http://maxproapp.com/files/'+categoryPic} alt={''}/>
                </div>
                <h4>{categoryName}</h4>
            </div>
        );
    }
}
export default Category;