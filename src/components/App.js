import React from 'react';
import logo from '../logo.svg';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Header from "./Header";
import Footer from "./Footer";
import Categories from "./Categories";
import Products from "./Products";
import QuickView from "./QuickView";
import Dm from "../utils/DataManager";
import ProductsWithTypes from "./ProductsWithTypes";
import Checkout from "./Checkout";
import OrderStatus from "./OrderStatus"
import Urls from "../utils/URLs";
import axios from "axios/index";
import UserAccount from "./UserAccount";
import Registration from "./Registration";
import PreviousOrders from "./PreviousOrders";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            products: [],
            cart: this.initialBasket(),
            totalItems: this.initialBasket().length,
            totalAmount: this.intialAmount(),
            term: "",
            category: "",
            cartBounce: false,
            quantity: 1,
            quickViewProduct: {},
            modalActive: false
        };
        this.setThreshold();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleMobileSearch = this.handleMobileSearch.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.sumTotalItems = this.sumTotalItems.bind(this);
        this.sumTotalAmount = this.sumTotalAmount.bind(this);
        this.checkProduct = this.checkProduct.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }
    setThreshold(){
        axios.get(Urls.baseUrl()+"user/getusersetting", {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const setting=response.data;
                Dm.setDeliveryThreshold(setting.deliveryCost,setting.threshold)
            });
    }

    // Search by Keyword
    handleSearch(event) {
        this.setState({ term: event.target.value });
    }
    // Mobile Search Reset
    handleMobileSearch() {
        this.setState({ term: "" });
    }
    // Filter by Category
    handleCategory(event) {
        this.setState({ category: event.target.value });
        console.log(this.state.category);
    }
    // Add to Cart
    handleAddToCart(selectedProducts) {
        let cartItem = this.state.cart;
        let productID = selectedProducts.id;
        let productQty = selectedProducts.quantity;
        if (this.checkProduct(productID)) {

            let index = cartItem.findIndex(x => x.id === productID);
            cartItem[index].quantity =
                Number(cartItem[index].quantity) + Number(productQty);
            this.setState({
                cart: cartItem
            });
        } else {
            cartItem.push(selectedProducts);
        }
        this.setState({
            cart: cartItem,
            cartBounce: true
        });
        setTimeout(
            function() {
                this.setState({
                    cartBounce: false,
                    quantity: 1
                });
                console.log(this.state.quantity);
                console.log(this.state.cart);
            }.bind(this),
            1000
        );
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
    }
    handleRemoveProduct(id, e) {
        let cart = this.state.cart;
        let index = cart.findIndex(x => x.id === id);
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        Dm.removeProductFromBasket(id);
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
        e.preventDefault();
    }
    checkProduct(productID) {
        let cart = this.state.cart;
        return cart.some(function(item) {
            return item.id === productID;
        });
    }
    sumTotalItems() {
        let total = 0;
        let cart = this.state.cart;
        total = cart.length;
        this.setState({
            totalItems: total
        });
    }
    sumTotalAmount() {
        let total = 0;
        let cart = this.state.cart;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
        this.setState({
            totalAmount: total
        });
    }

    //Reset Quantity
    updateQuantity(qty) {
        console.log("quantity added...");
        this.setState({
            quantity: qty
        });
    }
    // Open Modal
    openModal(product) {
        this.setState({
            quickViewProduct: product,
            modalActive: true
        });
    }
    // Close Modal
    closeModal() {
        this.setState({
            modalActive: false
        });
    }

    updateBasket(){
            if (Dm.getBasketData()) {
                if (Dm.getBasketData().length > this.state.cart)
                    this.setState({cart: Dm.getBasketData()});
            }else Dm.setEmptyBasket();
        }
    initialBasket(){
        if (Dm.getBasketData()) {
            return Dm.getBasketData();
        }else
        return [];
        }
     intialAmount(){
            if (Dm.getBasketData()) {
                let cart= Dm.getBasketData();
                let total = 0;

                for (var i = 0; i < cart.length; i++) {
                    total += cart[i].price * parseInt(cart[i].quantity);
                }
                return total;
            }else
                return 0;
        }
    render() {
    this.updateBasket();
         if(window.location.pathname.startsWith('/user')) {
             let path=window.location.pathname.split('/');
             switch (path[2]) {
                 case "checkout":return (<Checkout/>);
                 case "orderstatus":return (<OrderStatus/>);
                 case "account":return (<UserAccount/>);
                 case "registration":return (<Registration />);
                 case "orders":return (<PreviousOrders />);
                 default:return (<Checkout/>);
             }
         }
         else
             return (
             <div className="container">
              <Header
                  cartBounce={this.state.cartBounce}
                  total={this.state.totalAmount}
                  totalItems={this.state.totalItems}
                  cartItems={this.state.cart}
                  removeProduct={this.handleRemoveProduct}
                  handleSearch={this.handleSearch}
                  handleMobileSearch={this.handleMobileSearch}
                  handleCategory={this.handleCategory}
                  categoryTerm={this.state.category}
                  updateQuantity={this.updateQuantity}
                  productQuantity={this.state.moq}
                  addToCart={this.handleAddToCart}/>
            <Switch>
                <Route exact path={'/'} render={ props => <Categories {...props} />}/>
                <Route  path={'/cat_products'}  render={props => <ProductsWithTypes {...props}
                                                                       searchTerm={this.state.term}
                                                                       addToCart={this.handleAddToCart}
                                                                       productQuantity={this.state.quantity}
                                                                       updateQuantity={this.updateQuantity}
                                                                       openModal={this.openModal} />} />
                 <Route path={'/type_products'} render={props => <Products {...props}
                                                                         searchTerm={this.state.term}
                                                                         addToCart={this.handleAddToCart}
                                                                         productQuantity={this.state.quantity}
                                                                         updateQuantity={this.updateQuantity}
                                                                         openModal={this.openModal} />}  />
                <Route path={'/searched_products'} render={props => <Products {...props}
                                                                          searchTerm={this.state.term}
                                                                          addToCart={this.handleAddToCart}
                                                                          productQuantity={this.state.quantity}
                                                                          updateQuantity={this.updateQuantity}
                                                                          openModal={this.openModal} />}  />
            </Switch>

            <Footer/>
           <QuickView
               product={this.state.quickViewProduct}
               openModal={this.state.modalActive}
               closeModal={this.closeModal}
           />
          </div>
    );
  }
}                 {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    {/*    <ListItem button key={text}>*/}
                    {/*        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                    {/*        <ListItemText primary={text} />*/}
                    {/*    </ListItem>*/}
                    {/*))}*/}

export default App;
