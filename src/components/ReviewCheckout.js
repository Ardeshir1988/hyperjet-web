import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        direction: 'rtl'
    }
});

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
        orderPaymentType:'web-cash-pos',
        productlist:[],
        suburb: 1,
        orderArrivalNoticeType:''
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
                            console.log('=========='+address.addressDetail);
                            if (address.addressDetail !== undefined)
                                this.setState({
                                    addressDetail:address.addressDetail,
                                    suburb:this.state.suburbs.filter(s=>s.tblsuburbName===address.addressArea).map(s=>s.tblsuburbId),
                                    addressId:address.addressId,
                                    addressArea:address.addressArea
                                })
                        }
                    );
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

        let order={token:this.state.token,productlist:this.state.productlist,
            addressId:parseInt(this.state.addressId), addressCity:"تهران",
            addressArea:this.state.suburbs.filter(s=>s.tblsuburbId===parseInt(this.state.suburb)).map(s=>s.tblsuburbName).toString(),
            addressDetail:this.state.addressDetail,addressName:'',
            orderArrivalNoticeType:this.state.orderArrivalNoticeType,orderPhoneNumber:this.state.orderPhoneNumber,
            orderInstruction:this.state.orderInstruction,orderSubTotal:"",orderPaymentType:this.state.orderPaymentType,orderDeliveryCost:0
        };

        console.log(order);
        let successOrderMsg='سفارش شما ثبت شد';
        let orderDecs='شماره شفارش شما ';
        let error='خطا';
        axios.post(Urls.baseUrl()+"order/ordercheck",order,{headers:{'Authorization': Urls.getAuthToken()}})
            .then(response=>{
                    const orderResponse=response.data;
                    if(orderResponse.orderId===0){
                        this.setState({orderid: 0});
                        this.setState({titleMsg:error,textMsg:orderResponse.message});
                        this.setState({orderStatus: true});
                    }
                    else {
                        this.setState({orderid: orderResponse.orderId});
                        this.setState({titleMsg:successOrderMsg,textMsg:orderDecs+orderResponse.orderId});
                        this.setState({orderStatus: true});
                            Dm.setEmptyBasket();
                    }
                }
            );


    };
    render() {
        const { classes } = this.props;

        return (
            <div>
            <div className="page-title-bar">
                <Typography variant="h6" gutterBottom className="page-title">بررسی خرید</Typography>
            </div>
            <Paper className={classes.root} elevation={1}>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"بررسی خرید بدون کالا"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            سبد کالا شما خالی است
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" onClick={()=>this.backHome()} color="secondary" autoFocus>
                            خرید
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    style={{direction:'rtl'}}
                    open={this.state.orderStatus}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{this.state.titleMsg}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.textMsg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" onClick={()=>this.orderStatus()} color="secondary" autoFocus>
                            { (this.state.orderid!==0)?'وضعیت سفارش':'بازگشت'}
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
                        {/*<FormControl className={classes.formControl}>*/}
                        {/*    <Select*/}
                        {/*        value={this.state.suburb}*/}
                        {/*        onChange={this.handleChange('suburb')}*/}
                        {/*        native>*/}
                        {/*        { this.state.suburbs.map(s=><option value={s.tblsuburbId}>{s.tblsuburbName}</option>)}*/}
                        {/*    </Select>*/}
                        {/*</FormControl>*/}
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <TextField
                            required
                            type="number"
                            id="mobile"
                            name="mobile"
                            label="تلفن همراه"
                            onChange= {this.handleChange('orderPhoneNumber')}
                            value={this.state.orderPhoneNumber}
                            fullWidth />
                    </Grid>
                    <Grid item xs={8} >

                    </Grid>
                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="آدرس"
                            onChange= {this.handleChange('addressDetail')}
                            value={this.state.addressDetail}
                            fullWidth />
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h6" gutterBottom style={{marginTop:"3vh"}} color="textSecondary">
                            دستورالعمل خاص
                        </Typography>


                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="مانند نام تحویل گیرنده"
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
                            <FormControlLabel   onChange={this.handleChange('orderPaymentType')} value="web-online" control={<Radio />} label="پرداخت آنلاین" />
                            <FormControlLabel onChange={this.handleChange('orderPaymentType')} value="web-cash-pos" control={<Radio />} label="نقد یا کارت" />
                        </RadioGroup>
                    </Grid>
                    <div className="break" />


                    <div className="checkout-details">

                        <div  className="checkout-details-item" >
                            مجموع خرید
                        </div>
                        <div>
                            {this.state.totalAmount}
                        </div>
                    </div>
                    <div className="checkout-details">
                        <div  className="checkout-details-item" >
                            تخفیف
                        </div>
                        <div className="lowColor">
                            {this.state.totalDiscount}-
                        </div>
                    </div>

                    <div className="checkout-details">
                        <div  className="checkout-details-item" >
                            هزینه ارسال
                        </div>
                        <div className="highColor">
                            {(this.state.totalAmount>=this.state.threshold) ? 0 : this.state.cost}+
                        </div>
                    </div>

                    <div className="checkout-details">
                        <div  className="checkout-details-item" >
                            مبلغ قابل پرداخت
                        </div>
                        <div>
                                   {(this.state.totalAmount>=this.state.threshold) ?
                            this.state.totalAmount-this.state.totalDiscount :this.state.totalAmount-this.state.totalDiscount+this.state.cost }
                            </div>
                    </div>
                    <Grid container spacing={24}>
                        <Grid item xs>
                        </Grid>
                        <Grid  item xs={12} style={{textAlign:"center",paddingBottom:20 , marginTop:"2vh"}}>
                            <button onClick={()=>this.sendOrder()}   className="basket-button">خرید خود را نهایی کنید</button>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            </div>
        );
    }
}
ReviewCheckout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewCheckout);