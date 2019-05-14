import React  from "react";


class BasketProduct extends React.Component{
    render() {
        return(
            <div className="cart-item" >


                <div className="product-total">
                    <p className="quantity">
                        {this.props.quantity}
                    </p>
                    <p className="amount">{this.props.price}</p>
                </div>
                {/*<a*/}
                {/*    className="product-remove"*/}
                {/*    href="#"*/}

                {/*>*/}
                {/*    ×*/}
                {/*</a>*/}
                <div className="product-info">
                    <p className="product-name">{this.props.name}</p>
                    <p className="product-price">{this.props.price}</p>
                </div>
                <img className="product-image" src={this.props.image} />
            </div>
        );
    }
}
export default BasketProduct