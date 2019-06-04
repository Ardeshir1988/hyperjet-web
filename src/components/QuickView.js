import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Chip from '@material-ui/core/Chip';


class QuickView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleClickOutside(event) {
    const domNode = findDOMNode(this.refs.modal);
    if (!domNode || !domNode.contains(event.target)) {
      this.props.closeModal();
    }
  }

  handleClose() {
    this.props.closeModal();
  }

  render() {
    return (
      <div
        className={
          this.props.openModal ? "modal-wrapper active" : "modal-wrapper"
        }
      >

        <div className="modal" ref="modal">
          <div className="modal-bar">
            <div className="modal-title">

            </div>
            <button
                type="button"
                className="close"
                onClick={this.handleClose.bind(this)}
            >
              &times;
            </button>

          </div>

          <div className="quick-view">

            <div className="quick-view-image">
              <img
                src={this.props.product.image}
                alt={this.props.product.name}
              />


            </div>
            <div className="product-measure">
              <Chip label={this.props.product.measure}    color="secondary"
                    variant="outlined" />
            </div>
            <div className="quick-view-details">

              <span className="product-name">{this.props.product.name}</span>
              <span className="product-detail">{this.props.product.detail}</span>
              {(this.props.product.price === this.props.product.priceDiscount) ?(
              < span className="product-price">{this.props.product.price}تومان</span>
                  ):(
                      <div className="product-price">
                        <div>
                <span className="product-discount-price-bf">{this.props.product.price}تومان</span>
                        </div>
                        <div>
                <span className="product-discount-price-af">{this.props.product.priceDiscount}تومان</span>
                        </div>
                      </div>
                )
              }

       </div>
          </div>

        </div>
        </div>
    );
  }
}

export default QuickView;
