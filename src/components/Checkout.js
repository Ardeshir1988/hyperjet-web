import React from 'react';
import Dm from "../utils/DataManager";
import Registration from "./Registration";
import ReviewCheckout from "./ReviewCheckout"


class Checkout extends React.Component{


    constructor(props) {
        super(props);
        let user=Dm.getUserData();
        let valid=!!(user);
        this.state={
            valid:valid
        }


    }

    render() {
     return   <div className="products">
         {(this.state.valid) ? <ReviewCheckout /> : <Registration />}
        </div>
    }
}

export default Checkout