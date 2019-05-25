import React, { Component } from "react";

class Type extends Component{

    redirectToTarget = () => {
        console.log(this.props.typeid);
        this.props.history.push(`/type_products?typeid=`+this.props.typeId)
    };

    render() {
        let image = 'https://maxproapp.com/files/'+this.props.typePic;
        let name = this.props.typeName;
        let id=this.props.typeId;

        return(
            <div className="type">
            <div className="type-image" >
            <img onClick={()=>this.redirectToTarget()} src={image} alt={name}/>
            </div>
            <h4 className="type-name">{name}</h4>
        </div>)
    }
}
export default Type