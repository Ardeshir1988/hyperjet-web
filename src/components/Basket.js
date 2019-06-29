import React from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import BasketProduct from "./BasketProduct";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {CartContext} from "./CartContext";
import Snackbar from "@material-ui/core/Snackbar";
import NumberFormat from "react-number-format";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";
import Transport from "../assets/transport_purple.png";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TimeIcon from "@material-ui/icons/AccessTime"
import MoneyIcon from "@material-ui/icons/AttachMoney"
import ReceiptIcon from "@material-ui/icons/Receipt"


const styles = {
    list: {
        width: 270,
    },
    fullList: {
        width: 'auto',
    }
};
const theme = createMuiTheme({

    typography: {
        // Use the system font.
        fontFamily:
            'iran-sans',

    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#9929ef',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contast with palette.primary.main
        },
        secondary: {
            light: '#1ab91d',
            main: '#1ab91d',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will us the default color
    },


})

const Snack = withStyles({
    root: {
            direction:"rtl"
    }
})(Snackbar);

class Basket extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            status:false,
            msg:false,
            open:false
        };
    }
    toggleDrawer = (status) => () => {
        this.setState({
            status: status,
        });

    };

    redirectTo(path){
        window.location.href=(path);
    }

    handleClose=()=>{
        this.setState({msg:false})
    };

    handleOpen=()=>{
        this.setState({msg:true})
    };
    closeDrawer=()=>{
        this.toggleDrawer(false);
        return false
    };
    openDialog(){
        this.setState({open:true});
    }
    closeDialog(){
        this.setState({open:false});
    }
    render() {
        console.log("=======RenderBasket");
        const quantity='تعداد';
        const totalAmount='مجموع خرید';
        const deliveryFee='هزینه ارسال';
        const deliveryFree=' (رایگان)';
        const checkout='ادامه خرید';
        const finalAmount='مبلغ قابل پرداخت';
        const discount='تخفیف';
        const { classes } = this.props;

        return (

            <CartContext.Consumer>
                {cart=>(

                <div>

                <Snack
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.msg}
                autoHideDuration={2000}
                onClose={this.handleClose}
                message={<h4>سبد شما خالی است</h4>}/>
                    <Badge badgeContent={cart.items.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0)} color="secondary" >
                    <ShoppingCartIcon  style={{color:"white"}} onClick={(cart.items.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0)>=1)?this.toggleDrawer(true):this.handleOpen}/>
                    </Badge>
                    <MuiThemeProvider theme={theme}>
                    <Dialog
                        open={this.state.open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            <div className= "dialog-header-success">
                              <div className="img-logo">
                                    <img src={Transport}/>
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogContent style={{padding:"0"}}>
                            <DialogContentText>

                                <Grid container spacing={24} className="delivery-detail">
                                    <Grid item xs={4} >
                                        <div style={{textAlign: "center"}}>
                                            <TimeIcon />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center"}}>
                                            <MoneyIcon />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center"}}>
                                            <ReceiptIcon />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center"}} >
                                             ۷ الی ۲۴
                                        </div>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center"}} >
                                             ۳۰ هزار تومان
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center", color:"#1ab91d"}} >
                                             رایگان
                                        </div>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center"}} >
                                             ۲۴ الی ۷
                                        </div>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center"}} >
                                             تمامی سفارشات
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{textAlign: "center"}} >
                                              شامل هزینه
                                        </div>
                                    </Grid>
                                </Grid>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={()=>this.closeDialog()} color="primary" fullWidth={true} size={"large"}>
                                بستن
                            </Button>
                        </DialogActions>
                    </Dialog>



                <Drawer anchor="left" open={(cart.items.length>0)?this.state.status:this.closeDrawer()}  onClose={this.toggleDrawer( false)}>
                    <div
                        tabIndex={0}
                        role="button">

                        <div className={classes.list}>
                            <List>
                                {cart.items.map(p=> {
                                    return (
                                        <BasketProduct
                                        id={p.id}
                                        name={p.name}
                                        price={p.price}
                                        quantity={p.quantity}
                                        image={p.image}
                                        priceDiscount={p.priceDiscount}
                                        stepDiscount={p.stepDiscount}
                                        />);
                                })
                                }
                            </List>


                            <div className="basketListDetail">

                                <div className="basketDetail">
                                    <NumberFormat value={cart.items.map(c=>c.quantity).reduce((partial_sum, a) => partial_sum + a,0)} displayType={'text'} thousandSeparator={true} renderText={value => <div className="data"> {value}</div>} />
                                    <div className="title"> {quantity}</div>
                                </div>

                                <div className="basketDetail">
                                    <NumberFormat value={cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0)} displayType={'text'} thousandSeparator={true} renderText={value => <div className="data"> {value}</div>} />
                                    <div className="title">{totalAmount}</div>
                                </div>

                                <div className="basketDetail">
                                    <NumberFormat value={cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0)-
                                    cart.items.map(c=>c.quantity*c.priceDiscount).reduce((partial_sum, a) => partial_sum + a,0)} displayType={'text'} thousandSeparator={true} renderText={value => <div className="data"  style={{color:"limegreen"}}> -{value}</div>} />
                                    <div className="title">{discount}</div>
                                </div>
                                <div className="basketDetail">
                                    <NumberFormat value={(cart.items.map(c=>c.quantity*c.price).reduce((partial_sum, a) => partial_sum + a,0)>=cart.threshold)
                                            ? 0 : cart.deliveryCost} displayType={'text'} thousandSeparator={true} renderText={value => <div className="data"  style={{color:"red"}}> +{value}</div>} />
                                    <div className="title">{deliveryFee} <Link color={"secondary"}  onClick={()=>this.openDialog()} > {deliveryFree} </Link></div>
                                </div>

                                <div className="basketDetail">
                                    <NumberFormat value={(cart.items.map(c=>c.quantity*c.priceDiscount).reduce((partial_sum, a) => partial_sum + a,0)>=cart.threshold) ?
                                        cart.items.map(c=>c.quantity*c.priceDiscount).reduce((partial_sum, a) => partial_sum + a,0) :cart.items.map(c=>c.quantity*c.priceDiscount).reduce((partial_sum, a) => partial_sum + a,0)+cart.deliveryCost } displayType={'text'} thousandSeparator={true} renderText={value => <div className="data"> {value}</div>} />
                                        <div className="title">{finalAmount}</div>
                                </div>
                            </div>
                            <div className="basketListDetail" style={{padding:"0", margin:"0", maxHeight:"65px"}}>
                            <button className="basket-button"  style={{height:"42px"}} onClick={()=>this.redirectTo("/user/checkout")}>
                                <h4>{checkout}</h4>
                            </button>
                            </div>
                        {/*  end list  */}
                        </div>
                    </div>
                </Drawer>
                    </MuiThemeProvider>
            </div>
                )}
            </CartContext.Consumer>

        );
    }
}

export default withStyles(styles)(Basket);