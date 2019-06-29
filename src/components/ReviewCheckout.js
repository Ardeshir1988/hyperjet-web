import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Urls from "../utils/URLs";
import axios from "axios";
import Dm from "../utils/DataManager";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NumberFormat from "react-number-format";
import Success from "../assets/checkbox-marked.svg";
import Fail from "../assets/close-circle.svg";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        direction: 'rtl'
    }

});
const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        // Use the system font.
        fontFamily:
            'iran-sans',

    },
    palette: {
        width:'90%',
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
            contrastText: '#ffffff',
        },
        // error: will us the default color
    },

})
class ReviewCheckout extends React.Component {
    state={
        open: false,
        orderStatus:false,
        orderid:0,
        suburbs:[],
        token:Dm.getUserData().token,
        addressId:0,
        addressDetail:"",
        addressArea:1,
        orderPhoneNumber:Dm.getUserData().mobile,
        orderInstruction:'',
        orderPaymentType:'cash-pos',
        productlist:[],
        suburb: 1,
        orderArrivalNoticeType:'',
        orderDate: '',
        sentRequest: true
    };
    componentDidMount() {

        axios.get(Urls.baseUrl()+"user/getusersetting", {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const suburbs=response.data.suburblist;
                this.setState({suburbs});
                this.setState({threshold:response.data.threshold});
                this.setState({cost:response.data.deliveryCost});
                axios.post(Urls.baseUrl()+"user/getuseraddress",{key:'',message:'',token:Dm.getUserData().token},{headers:{'Authorization': Urls.getAuthToken()}})
                    .then(response=>{
                            const address=response.data[0];
                            if (address.addressDetail !== undefined)
                                this.setState({
                                    addressDetail:address.addressDetail,
                                    suburb:this.state.suburbs.filter(s=>s.tblsuburbName===address.addressArea).map(s=>s.tblsuburbId),
                                    addressId:address.addressId,
                                    addressArea:address.addressArea
                                })
                        this.setState({sentRequest : false});
                    });
            });
        let basket=Dm.getBasketData();
        if (basket.length === 0)
            this.setState({ open: true });
        else {
            let CartProduct;
            let productlist=basket.map(s=> CartProduct={productId:s.id,quantity:s.quantity});
            this.setState({productlist: productlist});
        }
        this.handleBasketData(basket);
    }
    handleBasketData(cart){
        let total=0;
        let totalDiscount=0;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
            totalDiscount += cart[i].priceDiscount * parseInt(cart[i].quantity);
        }
        this.setState({
            totalAmount: total,
            totalDiscount:total-totalDiscount
        });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    backHome(){
        window.location.replace("/");
    }
    orderStatus(){
        if(this.state.orderid!==0)
        window.location.replace("/user/orderstatus");
        else
            window.location.href="/";
    }
    sendOrder(){
       if(this.state.sentRequest === false) {
           this.setState({sentRequest : false});
           let order = {
               token: this.state.token,
               productlist: this.state.productlist,
               addressId: parseInt(this.state.addressId),
               addressCity: "تهران",
               addressArea: this.state.suburbs.filter(s => s.tblsuburbId === parseInt(this.state.suburb)).map(s => s.tblsuburbName).toString(),
               addressDetail: this.state.addressDetail,
               addressName: '',
               orderArrivalNoticeType: this.state.orderArrivalNoticeType,
               orderPhoneNumber: this.state.orderPhoneNumber,
               orderInstruction: this.state.orderInstruction,
               orderSubTotal: "",
               orderPaymentType: this.state.orderPaymentType,
               orderDeliveryCost: 0
           };

           let successOrderMsg = 'با تشکر';
           let error = 'سفارش شما ثبت نگردید!';
           axios.post(Urls.baseUrl() + "order/ordercheck", order, {headers: {'Authorization': Urls.getAuthToken()}})
               .then(response => {
                       const orderResponse = response.data;
                       if (orderResponse.orderId === 0) {
                           this.setState({orderid: 0});
                           this.setState({titleMsg: error, textMsg: orderResponse.message});
                           this.setState({orderStatus: true});
                           this.setState({sentRequest : false});
                       } else {
                           Dm.setEmptyBasket();
                           if (order.orderPaymentType === 'online') {
                               window.location.href = 'https://maxproapp.com/payment/pay?orderid=' + orderResponse.orderId;
                               this.state.sentRequest = false;
                           }

                               this.setState({orderid: orderResponse.orderId});
                               this.setState({titleMsg: successOrderMsg,
                                   orderDate: orderResponse.detail});
                               this.setState({orderStatus: true});
                               this.setState({sentRequest : false});

                       }
                   }
               );
       }
    };
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <div>
            <div className="page-title-bar">
                <Typography variant="h6" gutterBottom className="page-title">بررسی خرید</Typography>
            </div>
            <Paper className={classes.root} elevation={1}>

                <Dialog maxWidth ={'80%'}
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                            <div className= "dialog-header-success">
                                    <div className="img-logo">
                                        <img src={Fail}/>
                                    </div>
                                <h4> بررسی خرید بدون کالا</h4>
                            </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className= "dialog-empty-cart">
                            سبد کالا شما خالی است
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                             <Button variant="contained" onClick={()=>this.backHome()} color="secondary" fullWidth={true} size={"large"}>
                                  خرید
                            </Button>
                    </DialogActions>
                </Dialog>

                <Dialog fullWidth={'80%'}
                    style={{direction:'rtl'}}
                    open={this.state.orderStatus}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        <div className= "dialog-header-success">
                            {(this.state.orderid !== 0)
                                ?<div className="img-logo">
                                    <img src={Success}/>
                                </div>
                             :
                                <div className="img-logo">
                                    <img src={Fail}/>
                                </div>
                            }
                        </div>
                        <div className= "dialog-header">
                            <h4> {this.state.titleMsg} </h4>
                        </div>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            {(this.state.orderid !== 0)
                                ?
                                <div className= "dialog-header">
                                    <Grid container spacing={24}>
                                        <Grid item xs={6} className={classes.grid}>
                                            <div style={{textAlign: "left"}}>
                                                شماره سفارش
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div style={{textAlign: "center",color:"limegreen"}} >
                                                <h3> {this.state.orderid} </h3>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}  className={classes.grid}>
                                            <div style={{textAlign: "left"}}>
                                                تاریخ ثبت سفارش
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div style={{textAlign: "center"}}>
                                                {this.state.orderDate}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}  className={classes.grid}>
                                            <div style={{textAlign: "right", fontSize:"14px"}}>
                                                جهت کسب اطلاعات بیشتر در مورد سفارش خود به قسمت وضعیت سفارش مراجعه نمایید.
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <div>
                                    </div>
                                </div>
                                :
                                <div className= "dialog-header">
                                    {this.state.textMsg}
                                </div>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={()=>this.orderStatus()} color="secondary"  fullWidth={true} size={"large"}>
                            { (this.state.orderid!==0)?'وضعیت سفارش':'بازگشت'}
                        </Button>
                        <div className= "dialog-header">

                       </div>
                        <Button variant="contained" onClick={()=>this.backHome()} color="primary"  fullWidth={true} size={"large"}>
                            صفحه اصلی
                        </Button>
                    </DialogActions>
                </Dialog>

                <Typography variant="h6" gutterBottom color="textSecondary">
                    آدرس محل تحویل
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <FormControl>
                            <Select
                                native
                                value={10}>
                                <option value={10}>تهران</option>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={this.state.suburb}
                                onChange={this.handleChange('suburb')}
                                native>
                                { this.state.suburbs.map(s=><option value={s.tblsuburbId}>{s.tblsuburbName}</option>)}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <Typography gutterBottom color="textSecondary">
                            آدرس
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"1vh"}}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            onChange= {this.handleChange('addressDetail')}
                            value={this.state.addressDetail}
                            fullWidth />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <Typography variant="h6" gutterBottom color="textSecondary">
                            تلفن همراه
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <TextField
                            required
                            type="number"
                            id="mobile"
                            name="mobile"
                            onChange= {this.handleChange('orderPhoneNumber')}
                            value={this.state.orderPhoneNumber}
                            fullWidth />
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h6" gutterBottom style={{marginTop:"3vh"}} color="textSecondary">
                            دستورالعمل خاص
                        </Typography>

                        <Typography  gutterBottom style={{marginTop:".5vh"}} color="textSecondary">
                            مانند نام تحویل گیرنده
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            fullWidth
                            value={this.state.orderInstruction}
                            onChange= {this.handleChange('orderInstruction')}
                        />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"3vh"}}>
                        <Typography variant="h6" gutterBottom color="textSecondary">
                            نحوه ی تحویل کالا
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup
                            row
                            name="orderArrivalNoticeType"
                            aria-label="orderArrivalNoticeType">
                            <FormControlLabel onChange={this.handleChange('orderArrivalNoticeType')} value="تماس تلفنی" control={<Radio />} label="تماس تلفنی" />
                            <FormControlLabel onChange={this.handleChange('orderArrivalNoticeType')} value="زنگ در" control={<Radio />} label="زنگ در" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <Typography variant="h6" gutterBottom color="textSecondary">
                            نحوه ی پرداخت
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <RadioGroup
                            row
                            name="paymentType"
                            aria-label="paymentType">
                            <FormControlLabel   onChange={this.handleChange('orderPaymentType')} value="online" control={<Radio />} label="پرداخت آنلاین" />
                            <FormControlLabel onChange={this.handleChange('orderPaymentType')} value="cash-pos" control={<Radio />} label="نقد یا کارت" />
                        </RadioGroup>
                    </Grid>
                    <div className="break" />


                    <div className="checkout-details">

                        <div  className="checkout-details-item" >
                            مجموع خرید
                        </div>
                        <NumberFormat value= {this.state.totalAmount} displayType={'text'} thousandSeparator={true} renderText={value => <div> {value + ' تومان'}</div>} />
                    </div>
                    <div className="checkout-details">
                        <div  className="checkout-details-item" >
                            تخفیف
                        </div>
                        <NumberFormat value= {this.state.totalDiscount} displayType={'text'} thousandSeparator={true} renderText={value => <div className="lowColor"> {value + ' تومان'}</div>} />

                    </div>

                    <div className="checkout-details">
                        <div  className="checkout-details-item" >
                            هزینه ارسال
                        </div>
                            <NumberFormat value= {(this.state.totalAmount>=this.state.threshold) ? 0 : this.state.cost} displayType={'text'} thousandSeparator={true} renderText={value => <div className="highColor"> {value + ' تومان'}</div>} />
                    </div>

                    <div className="checkout-details">
                        <div  className="checkout-details-item" >
                            مبلغ قابل پرداخت
                        </div>
                        <NumberFormat value= {(this.state.totalAmount>=this.state.threshold) ?
                            this.state.totalAmount-this.state.totalDiscount :this.state.totalAmount-this.state.totalDiscount+this.state.cost }
                                      displayType={'text'} thousandSeparator={true} renderText={value => <div> {value + ' تومان'}</div>} />

                    </div>
                    <Grid container spacing={24}>
                        <Grid item xs>
                        </Grid>
                        <Grid  item xs={12} style={{textAlign:"center",paddingBottom:5 , marginTop:".5vh"}}>
                            <button onClick={()=>this.sendOrder()}   className="basket-button">خرید خود را نهایی کنید</button>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            </div>
            </MuiThemeProvider>
        );
    }
}
ReviewCheckout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewCheckout);