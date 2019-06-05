import React from 'react';
import PropTypes from 'prop-types/prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dm from "../utils/DataManager";
import Urls from "../utils/URLs";
import axios from "axios";
import PreviousOrderCart from "./PreviousOrderCart";
import BackIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
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
//        let user=Dm.getUserData();
//         let valid=!!(user);
//         if(valid) {
//             axios.post(Urls.baseUrl() + "order/getuseronproccessorders",
//                 {
//                 token: Dm.getUserData().token,
//                 message: '',
//                 key: ''
//             },
//                 {headers: {'Authorization': Urls.getAuthToken()}})
//                 .then(response => {
//                     const orders = response.data;
//                     if (orders.length === 0) {
//                         this.setState({textMsg: 'هیچ سفارشی در حال انجام وجود ندارد'});
//                         this.setState({open: true})
//                     } else
//                         this.setState({orders: orders})
//                 })
//         }else {
//             this.setState({textMsg: 'لطفا ثبت نام کنید'});
//                 this.setState({open: true});
//         }
//     }
//
//     backHome(){
//         window.location.replace("/");
//     }

    state={orders:[],open:false,products:[],openAlarm: false,textMsg:''};



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

        let user=Dm.getUserData();
        let valid=!!(user);
        if(valid) {
        axios.post(Urls.baseUrl()+"order/getuserorders",{token:Dm.getUserData().token,message:'',key:''}, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const orders=response.data;
                if (orders.length === 0) {
                    this.setState({textMsg: 'هیچ سفارشی ثبت نشده است'});
                    this.setState({openAlarm: true})
                } else
                    this.setState({orders: orders})
            });

        }else {
            this.setState({textMsg: 'کاربر معتبر نیست,لطفا ثبت نام کنید'});
            this.setState({openAlarm:true});
        }
    }
    redirectTo(path){
        window.location.href=(path);
    }
    render() {
        const { classes } = this.props;


        return (
            <div>
                <Dialog
                    style={{direction:'rtl'}}
                    open={this.state.openAlarm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"خطا"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.textMsg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={()=>this.redirectTo("/")} color="secondary" >
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
                <div className="page-title-bar">
                    <Typography variant="h6" gutterBottom className="page-title">خرید های گذشته</Typography>
                </div>
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