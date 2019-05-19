import React , { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import Dm from "../utils/DataManager";


class BasketProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.quantity,
            remove:this.props.removeProduct
        };

    }

    addCount(id){
        this.setState({ count: this.state.count + 1 });
        Dm.saveProductToBasket(id,'','','');
    }
    removeCount(e,id){
        if (this.state.count === 1)
        {
            this.state.remove(id)
        }else {
            this.setState({count: this.state.count - 1});
            Dm.decreaseQuantity(id);
        }
    }
    render() {



        return(
            <div className="cart-item" >


                <div className="product-total">
                    <p className="quantity">
                        {this.state.count}
                    </p>
                    <p className="amount">{this.props.price}</p>
                </div>
                <div className="product-info">
                    <p className="product-name">{this.props.name}</p>
                    <p className="product-price">{this.props.price}</p>
                </div>
                <img className="product-image" src={this.props.image} />
                <div>
                    <IconButton color="primary" aria-label="Add to shopping cart">
                        <AddIcon onClick={() => this.addCount(this.props.id)} />

                    </IconButton>

                    <IconButton color="primary" aria-label="Add to shopping cart">
                    <RemoveIcon onClick={() =>this.removeCount(this,this.props.id)}/>
                    </IconButton>
                </div>
            </div>
        );
    }
}
export default BasketProduct