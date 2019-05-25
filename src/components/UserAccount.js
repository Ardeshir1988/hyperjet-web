import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
        direction: 'rtl'
    },
});


class UserAccount extends React.Component {
    state={
        open: false,
        suburbs:[],
        token:Dm.getUserData().token,
        addressId:0,
        addressDetail:"",
        addressArea:1,
        mobile:Dm.getUserData().mobile,
        tel:'',
        suburb: 1,
        username:'',
        phone:'',
        email: ''
    };
    componentDidMount() {

        axios.get(Urls.baseUrl()+"user/getusersetting", {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const suburbs=response.data.suburblist;
                this.setState({suburbs});
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
                axios.post(Urls.baseUrl()+"user/getuserinfo",{key:'',message:'',token:Dm.getUserData().token},{headers:{'Authorization': Urls.getAuthToken()}})
                    .then(response=>{
                            const userInfo=response.data;
                            if (userInfo !== undefined)
                                this.setState({
                                    username:userInfo.name,
                                    phone:userInfo.phone,
                                    email:userInfo.email
                                })
                        }
                    );
            });
    }

    editUserInfo(){
        let userAddress={token:this.state.token,
            addressId:parseInt(this.state.addressId),
            addressCity:"تهران",
            addressArea: this.state.suburbs.filter(s=>s.tblsuburbId===parseInt(this.state.suburb)).map(s=>s.tblsuburbName).toString(),
            addressDetail:this.state.addressDetail,
            addressName:''};
        axios.post(Urls.baseUrl()+"user/addaddress",userAddress,{headers:{'Authorization': Urls.getAuthToken()}})
            .then(response=>{
                    const useraddress=response.data;
                console.log("======useraddress=="+useraddress)
                }
            );
        let userInfo={token:this.state.token,
            email:this.state.email,
            name:this.state.username,phone:this.state.phone,message:''};
        axios.post(Urls.baseUrl()+"user/edituser",userInfo,{headers:{'Authorization': Urls.getAuthToken()}})
            .then(response=>{
                    const userInfo=response.data;
                    console.log("======ResUSERINFO=="+userInfo)

                window.location.href=('/user/account');
                }
            );
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    render() {
        const { classes } = this.props;

        return (
            <div className="products">


            <Paper className={classes.root} elevation={1}>
                <Paper elevation={5} style={{marginBottom:"20px"}}>
                    <div style={{background:'#b81aec',color:"#ffffff",fontSize:"22px",textAlign:"center"}}>
                        <div>
                        حساب کاربری
                        </div>
                    </div>
                </Paper>
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
                <Grid container spacing={24}>

                    <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    نام
                </Typography>
                    </Grid>
                <Grid item xs={6} style={{marginBottom:"15px"}} >
                    <TextField
                        required
                        id="username"
                        name="username"
                        onChange= {this.handleChange('username')}
                        value={this.state.username}
                        fullWidth />
                </Grid>
                    <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    تلفن
                </Typography>
                    </Grid>
                <Grid item xs={6} style={{marginBottom:"15px"}} >
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        onChange= {this.handleChange('phone')}
                        value={this.state.phone}
                        fullWidth />
                </Grid>
                    <Grid item xs={12} style={{marginBottom:"15px"}} >
                    <Typography variant="h6" gutterBottom>
                        ایمیل
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{marginBottom:"15px"}} >
                    <TextField
                        required
                        id="email"
                        name="email"
                        onChange= {this.handleChange('email')}
                        value={this.state.email}
                        fullWidth />
                </Grid>
                    <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    موبایل
                </Typography>
                    </Grid>
                <Grid item xs={6} style={{marginBottom:"15px"}} >
                    <TextField
                        disabled
                        id="mobile"
                        name="mobile"
                        value={this.state.mobile}
                        fullWidth />
                </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                           آدرس
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
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
                    <Grid item xs={12} >
                        <Divider />
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs={6} style={{textAlign:"center",paddingBottom:20}}>
                            <Button onClick={()=>this.editUserInfo()}  variant="contained" color="primary">ثبت</Button>
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
UserAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAccount);