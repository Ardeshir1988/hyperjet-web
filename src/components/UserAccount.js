import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Urls from "../utils/URLs";
import axios from "axios";
import Dm from "../utils/DataManager";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        direction: 'rtl'
    },
});
const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        // Use the system font.
        fontFamily:
            'iran-sans',
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#1ab91d',
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

class UserAccount extends React.Component {
    state={
        open: false,
        suburbs:[],
        token:'',
        addressId:0,
        addressDetail:"",
        addressArea:1,
        mobile:'',
        tel:'',
        suburb: 1,
        username:'',
        phone:'',
        email: '',
        sentRequest: true
    };
    componentDidMount() {
        if (Dm.getUserData()===undefined)
            window.location.href='/user/registration';
        else {
            this.setState({token:Dm.getUserData().token,mobile:Dm.getUserData().mobile})
        }

        axios.get(Urls.baseUrl()+"user/getusersetting", {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const suburbs=response.data.suburblist;
                this.setState({suburbs});
                axios.post(Urls.baseUrl()+"user/getuseraddress",{key:'',message:'',token:Dm.getUserData().token},{headers:{'Authorization': Urls.getAuthToken()}})
                    .then(response=>{
                            const address=response.data[0];
                            if (response.data[0] !== undefined) {
                                this.setState({
                                    addressDetail:address.addressDetail,
                                    suburb:this.state.suburbs.filter(s=>s.tblsuburbName===address.addressArea).map(s=>s.tblsuburbId),
                                    addressId:address.addressId,
                                    addressArea:address.addressArea
                                })
                            }
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
                        this.setState({sentRequest : false});
                        }
                    );
            });
    }

    editUserInfo(){
        if(this.state.sentRequest === false) {
            this.setState({sentRequest : true});
        let userAddress={token:this.state.token,
            addressId:parseInt(this.state.addressId),
            addressCity:"تهران",
            addressArea: this.state.suburbs.filter(s=>s.tblsuburbId===parseInt(this.state.suburb)).map(s=>s.tblsuburbName).toString(),
            addressDetail:this.state.addressDetail,
            addressName:'Default'};
        axios.post(Urls.baseUrl()+"user/addaddress",userAddress,{headers:{'Authorization': Urls.getAuthToken()}})
            .then(response=>{
                    const useraddress=response.data;
                }
            );
        let userInfo={token:this.state.token,
            email:this.state.email,
            name:this.state.username,phone:this.state.phone,message:''};
        axios.post(Urls.baseUrl()+"user/edituser",userInfo,{headers:{'Authorization': Urls.getAuthToken()}})
            .then(response=>{
                    const userInfo=response.data;
                    this.setState({sentRequest : false});
                window.location.href=('/user/account');

                }
            );
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
            <div className="products">
                <div className="page-title-bar">
                    <Typography variant="h6" gutterBottom className="page-title">حساب کاربری</Typography>
                </div>

            <Paper className={classes.root} elevation={1}>

                <Grid container spacing={24}>

                    <Grid item xs={12}>
                <Typography variant="h6" gutterBottom  color="textSecondary">
                    نام
                </Typography>
                    </Grid>
                <Grid item xs={12} style={{marginBottom:"15px"}} >
                    <TextField
                        required
                        id="username"
                        name="username"
                        onChange= {this.handleChange('username')}
                        value={this.state.username}
                        fullWidth />
                </Grid>
                    <Grid item xs={12}>
                <Typography variant="h6" gutterBottom  color="textSecondary">
                    تلفن
                </Typography>
                    </Grid>
                <Grid item xs={12} style={{marginBottom:"15px"}} >
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        onChange= {this.handleChange('phone')}
                        value={this.state.phone}
                        fullWidth />
                </Grid>
                    <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom  color="textSecondary">
                        ایمیل
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginBottom:"15px"}} >
                    <TextField
                        required
                        id="email"
                        name="email"
                        onChange= {this.handleChange('email')}
                        value={this.state.email}
                        fullWidth />
                </Grid>
                    <Grid item xs={12}>
                <Typography variant="h6" gutterBottom  color="textSecondary">
                    موبایل
                </Typography>
                    </Grid>
                <Grid item xs={12} style={{marginBottom:"15px"}} >
                    <TextField
                        disabled
                        id="mobile"
                        name="mobile"
                        value={this.state.mobile}
                        fullWidth />
                </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom  color="textSecondary">
                           آدرس
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl >
                            <Select
                                style={{width:'100%'}}
                                native
                                value={10}>

                                <option value={10}>تهران</option>
                            </Select>
                        </FormControl>
                        <FormControl >
                            <Select
                                value={this.state.suburb}
                                style={{width:'100%'}}
                                onChange={this.handleChange('suburb')}
                                native>
                                { this.state.suburbs.map(s=><option value={s.tblsuburbId}>{s.tblsuburbName}</option>)}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{marginTop:"2vh"}}>
                        <TextField
                            required
                            id="address"
                            name="address"
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
                        <Grid  item xs={8} style={{textAlign:"center",paddingBottom:20 , marginTop:"3vh"}}>
                            <button onClick={()=>this.editUserInfo()}  className="basket-button">ویرایش</button>
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
UserAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAccount);