import React, { Component } from "react";

class Type extends Component{

    redirectToTarget = () => {
        console.log(this.props.typeid);
        this.props.history.push(`/products?typeid=`+this.props.typeId)
    };

    render() {
        let image = 'http://maxproapp.com/files/'+this.props.typePic;
        let name = this.props.typeName;
        let id=this.props.typeId;
        return(      <div className="product">
            <div >
            <img onClick={()=>this.redirectToTarget()} src={image} alt={name}/>
            </div>
            <h4 className="product-name">{name}</h4>
        </div>)
    }
}
export default Type