import React from 'react';
import PropTypes from 'prop-types/prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dm from "../utils/DataManager";
import Urls from "../utils/URLs";
import axios from "axios";
import PreviousOrderCart from "./PreviousOrderCart";
import BackIcon from '@material-ui/icons/ArrowBack';
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


const styles = theme => ({

    layout: {
        width: 'auto',
        height:'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    }
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PreviousOrders extends React.Component {


    state={orders:[],open:false,products:[],openAlarm: false};



    handleClickOpen(orderid) {
        axios.post(Urls.baseUrl()+"order/getorderproducts",{token:Dm.getUserData().token,message:'',key:orderid}, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const products=response.data;
                this.setState({products:products})
            });
        this.setState({open:true});
    }

    handleClose() {
        this.setState({open:false});
        this.setState({products:[]})
    }


    componentDidMount() {
        if (Dm.getUserData() !== undefined)
        axios.post(Urls.baseUrl()+"order/getuserorders",{token:Dm.getUserData().token,message:'',key:''}, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const orders=response.data;
                this.setState({orders:orders})
            });
        else
            this.setState({openAlarm:true});
    }
    redirectTo(path){
        window.location.href=(path);
    }
    render() {
        const { classes } = this.props;


        return (
            <div>
                <Dialog
                    open={this.state.openAlarm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"کاربر معتبر نیست"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            کاربر مهمان لطفا ثبت نام کنید
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" onClick={()=>this.redirectTo("/user/registration")} color="secondary" autoFocus>
                            ثبت نام
                        </Button>
                        <Button variant="contained" onClick={()=>this.redirectTo("/")} color="primary" >
                            بازگشت
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog style={{direction:'rtl'}} fullScreen open={this.state.open} onClose={()=>this.handleClose()} TransitionComponent={Transition}>
                    <div>
                        <Grid container spacing={24} style={{background:'#b81aec',color:"#ffffff"}}>
                            <Grid item xs={7} >
                                <div style={{textAlign:'left'}}>
                                <Typography variant="h6">
                                    کالاها
                                </Typography>
                                    </div>
                            </Grid>
                            <Grid item xs={5} >
                                <div style={{textAlign:'left'}}>
                                <Button color="inherit" onClick={()=>this.handleClose()}>
                                    <BackIcon />
                                </Button>
                                </div>
                            </Grid>

                        </Grid>
                        <div >
                        </div>
                    </div>

                    <List >
                        {this.state.products.map(p=>
                            <div>
                                <ListItem button>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12}>
                                            <div style={{textAlign: "right",fontSize:'15px'}}>

                                                    {p.productName}

                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div style={{textAlign: "right"}}>
                                                {p.quantity}عدد
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div style={{textAlign: "right"}}>
                                                 {p.price}تومان
                                            </div>
                                        </Grid>

                                    </Grid>
                                </ListItem>
                                <Divider />
                            </div>
                        )}
                    </List>
                </Dialog>
                <main className={classes.layout}>
                    {this.state.orders.map(order=><div onClick={()=>this.handleClickOpen(order.orderId)}><PreviousOrderCart order={order} /></div>)}
                </main>
            </div>
        );
    }
}

PreviousOrders.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PreviousOrders);