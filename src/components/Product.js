
import React, { Component } from "react";


class Product extends Component {
    constructor(props) {
        super(props);
    }

    // state = {
    //     redirect: false
    // };
    //
    // setRedirect = () => {
    //     this.setState({
    //         redirect: true
    //     })
    // };
    //
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         return <Redirect to='/products' />
    //     }
    // };



    // {
    //         "productId": 4420,
    //         "productName": "کراکر کراکس سبزیجات و پنیرشیرین عسل",
    //         "productDetails": "",
    //         "productParentTypeId": 0,
    //         "measure": "70 گرمی",
    //         "productTypeName": "کیک و بیسکوئیت",
    //         "productCatName": "بستنی و تنقلات",
    //         "product_pic1": "shirinasal-6261149014110.png",
    //         "product_pic2": null,
    //         "product_pic3": null,
    //         "product_price": 700,
    //         "product_price_discount": 700,
    //         "productBrand": "شیرین عسل",
    //         "priceid": 700,
    //         "productPosition": 0,
    //         "productStatus": "t",
    //         "product_min_quantity": null,
    //         "product_max_quantity": null,
    //         "product_priority": null,
    //         "productStepDiscount": 0
    //     }
    render() {
        return (
            <div>
                    <img src={'http://5.9.250.180/files/'+this.props.productImage} alt={'product_pic1'}/>
                <h4>{this.props.productName}</h4>
                <h4>{this.props.productPrice}</h4>
            </div>
        );
    }
}
export default Product;