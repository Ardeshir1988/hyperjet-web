import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
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
    },
});

class ReviewCheckout extends React.Component {
state={
    open: false,
    suburbs:[],
    addressDetail:"",
    mobile:Dm.getUserData().mobile
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
                                    suburb:this.state.suburbs.filter(s=>s.tblsuburbName===address.addressArea).map(s=>s.tblsuburbId)
                                })
                        }
                    );
            });
        let basket=Dm.getBasketData();
        if (basket.length === 0)   this.setState({ open: true });
        this.handleBasketData(basket);

    }
    handleBasketData(cart){
        let total=0;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity);
        }
        this.setState({
            totalAmount: total
        });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    backHome(){
        window.location.replace("/")
    }
    render() {

        const { classes } = this.props;

        return (
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

                <Typography variant="h6" gutterBottom>
                    آدرس محل تحویل
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12} >
                    <FormControl className={classes.formControl}>

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

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="آدرس"
                            onChange= {this.handleChange('addressDetail')}
                            value={this.state.addressDetail}
                            fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            نحوه ی تحویل کالا
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >

                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                                label="تماس تلفنی"
                            />
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                            label="زنگ در"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            نحوه ی پرداخت
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <RadioGroup
                            row
                            name="onDelete"
                            aria-label="onDelete">
                            <FormControlLabel value="none" control={<Radio />} label="پرداخت آنلاین" />
                            <FormControlLabel value="default" control={<Radio />} label="نقد یا کارت" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            id="mobile"
                            name="mobile"
                            label="تلفن همراه"
                            onChange= {this.handleChange('mobile')}
                            value={this.state.mobile}
                            fullWidth />
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h6" gutterBottom>
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
                            />
                        </Grid>
                    <Grid item xs={12} >

                        <Typography variant="h6" gutterBottom>
                            مجموع خرید     {this.state.totalAmount}
                        </Typography>

                    </Grid>


                    <Grid item xs={12} >

                        <Typography variant="h6" gutterBottom>
                            تخفیف     0
                        </Typography>

                    </Grid>

                    <Grid item xs={12} >
                        <Typography variant="h6" gutterBottom>
                            هزینه ارسال     {(this.state.totalAmount>=this.state.threshold) ? 0 : this.state.cost}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="h6" gutterBottom>
                            مبلغ قابل پرداخت       {(this.state.totalAmount>=this.state.threshold) ?
                            this.state.totalAmount :this.state.totalAmount+this.state.cost }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Divider />
                    </Grid>
                    <Grid container spacing={24}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={6} style={{textAlign:"center",paddingBottom:20}}>
                        <Button  variant="contained" color="primary">خرید خود را نهایی کنید</Button>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
ReviewCheckout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewCheckout);