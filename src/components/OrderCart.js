import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Confirm from '../assets/confirm_grey.png';
import ConfirmPassed from '../assets/confirm-purple.png';
import Packing from '../assets/packaging_grey.png';
import PackingPassed from '../assets/packaging_purple.png';
import Delivery from '../assets/delivery_grey.png';
import DeliveryPassed from '../assets/delivery_purple.png';
import Transport from '../assets/transport_grey.png';
import TransportPassed from '../assets/transport_purple.png';
import Chip from '@material-ui/core/Chip';
import Divider from "@material-ui/core/Divider";
import NumberFormat from "react-number-format";
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from "@material-ui/icons/Done";


const styles = {

    card: {

        margin:'15px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 0',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 10,
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 0',
    },

};
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

class OrderCart extends React.Component {
    redirectToBank(){
        window.location.href='https://maxproapp.com/payment/pay?orderid='+this.props.order.orderId;
    }


    render() {

        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
            <Card className={classes.card}>
                <CardContent style={{paddingBottom:"0"}}>
                    <Grid container spacing={24}>
                        <Grid item xs={6} style={{textAlign: "center"}}>
                            تاریخ ثبت
                        </Grid>
                        <Grid item xs={6} style={{textAlign: "center"}}>
                            شماره سفارش
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={6} style={{textAlign: "center"}}>
                            <div className="date">{this.props.order.orderRegTime}</div>
                        </Grid>
                        <Grid item xs={6} style={{textAlign: "center"}}>
                            <div className="date">{this.props.order.orderId}</div>
                        </Grid>
                    </Grid>
                    <Divider />
                    <List component="nav" style={{margin:'0'}}>
                        <div className="order-step">
                            {(this.props.order.step1.startsWith('2000'))?(
                        <ListItem style={{textAlign: "right", paddingTop: "4px", paddingBottom: "4px"}}>
                                <ListItemText primary="تایید گردید" secondary='در انتظار'/>
                                <img style={{height:'40px'}} src={Confirm}/>
                        </ListItem>
                                ):(
                                <ListItem style={{textAlign: "right", paddingTop: "4px", paddingBottom: "4px"}}>

                                    <ListItemText primary="تایید گردید"  secondary={<div className="date">{this.props.order.step1}</div>}/>
                                        <img style={{height:'40px'}} src={ConfirmPassed}/>
                                 </ListItem>
                            )
                            }
                        </div>
                        <div className="order-step">
                            {(this.props.order.step2.startsWith('2000')) ? (
                                <ListItem style={{textAlign: "right", paddingTop: "4px", paddingBottom: "4px"}}>
                                    <ListItemText primary="آماده و بسته بندی شد" secondary='در انتظار'/>
                                    <img style={{height: '40px'}} src={Packing}/>
                                </ListItem>

                            ) : (
                                <ListItem style={{textAlign: "right", paddingTop: "4px", paddingBottom: "4px"}}>
                                    <ListItemText primary="آماده و بسته بندی شد" secondary={<div className="date">{this.props.order.step2}</div>}/>
                                    <img style={{height: '40px'}} src={PackingPassed}/>
                                </ListItem>
                            )
                            }
                                </div>
                        <div className="order-step">
                            {(this.props.order.step3.startsWith('2000')) ? (
                        <ListItem style={{textAlign: "right"}}>
                            <ListItemText primary="ارسال گردید و در راه میباشد" secondary='در انتظار'/>
                            <img style={{height: '40px'}} src={Transport}/>
                        </ListItem>):(
                                <ListItem style={{textAlign: "right", paddingTop: "4px", paddingBottom: "4px"}}>
                                    <ListItemText primary="ارسال گردید و در راه میباشد" secondary={<div className="date">{this.props.order.step3}</div>}/>
                                    <img style={{height: '40px'}} src={TransportPassed}/>
                                </ListItem>
                            )}
                        </div>
                        <div className="order-step">
                            {(this.props.order.step4.startsWith('2000')) ? (
                        <ListItem style={{textAlign: "right", paddingTop: "4px", paddingBottom: "4px"}}>
                            <ListItemText primary="تحویل گردید" secondary='در انتظار'/>
                            <img style={{height: '40px'}} src={Delivery}/>

                        </ListItem>):(
                                <ListItem style={{textAlign: "right", paddingTop: "4px", paddingBottom: "4px"}}>
                                    <ListItemText primary="تحویل گردید" secondary={<div className="date">{this.props.order.step4}</div>}/>
                                    <img style={{height: '40px'}} src={DeliveryPassed}/>
                                </ListItem>
                            )
                            }
                        </div>
                    </List>
                </CardContent>
                <CardActions style={{paddingBottom:"15px", paddingTop:"0px"}}>
                    <Grid container spacing={24}>
                        {(this.props.order.paymentStatus===1)?
                            (
                        <Grid item xs={6} style={{textAlign: "center"}}>

                        <Button variant="contained" color="secondary" size="large" onClick={()=>this.redirectToBank()}>پرداخت آنلاین</Button>

                        </Grid>):(

                        <Grid item xs={6} style={{textAlign: "center"}}>
                            <Chip
                                avatar={
                                    <Avatar>
                                        <DoneIcon />
                                    </Avatar>
                                }
                                label="      پرداخت شده      "
                                color="secondary"
                                variant="outlined"
                            />
                            </Grid>
                        )}
                        <Grid item xs={6} style={{textAlign: "center", direction: 'rtl', display: '-webkit-flex'}}>
                            <NumberFormat value={this.props.order.orderTotalDiscount} displayType={'text'}
                                          thousandSeparator={true} renderText={value =>  <h3 style={{margin: 'auto auto'}}>{value + ' تومان'}</h3>} />
                        </Grid>

                    </Grid>
                </CardActions>
            </Card>
            </MuiThemeProvider>
        );
    }
}
OrderCart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderCart);