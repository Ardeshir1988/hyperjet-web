import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

const styles = {

    card: {
        maxWidth: 'auto',
        margin:'5px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class OrderCart extends React.Component {

    render() {

        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
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
                    <List component="nav">
                        <div className="order-step">
                            {(this.props.order.step1.startsWith('2000'))?(
                        <ListItem style={{textAlign: "right"}}>
                                <ListItemText primary="تایید گردید" secondary='در انتظار'/>
                                <img style={{height:'50px'}} src={Confirm}/>
                        </ListItem>
                                ):(
                                <ListItem style={{textAlign: "right"}}>

                                    <ListItemText primary="تایید گردید"  secondary={<div className="date">{this.props.order.step1}</div>}/>
                                        <img style={{height:'50px'}} src={ConfirmPassed}/>
                                 </ListItem>
                            )
                            }
                        </div>
                        <div className="order-step">
                            {(this.props.order.step2.startsWith('2000')) ? (
                                <ListItem style={{textAlign: "right"}}>
                                    <ListItemText primary="آماده و بسته بندی شد" secondary='در انتظار'/>
                                    <img style={{height: '50px'}} src={Packing}/>
                                </ListItem>

                            ) : (
                                <ListItem style={{textAlign: "right"}}>
                                    <ListItemText primary="آماده و بسته بندی شد" secondary={<div className="date">{this.props.order.step2}</div>}/>
                                    <img style={{height: '50px'}} src={PackingPassed}/>
                                </ListItem>
                            )
                            }
                                </div>
                        <div className="order-step">
                            {(this.props.order.step3.startsWith('2000')) ? (
                        <ListItem style={{textAlign: "right"}}>
                            <ListItemText primary="ارسال گردید و در راه میباشد" secondary='در انتظار'/>
                            <img style={{height: '50px'}} src={Transport}/>
                        </ListItem>):(
                                <ListItem style={{textAlign: "right"}}>
                                    <ListItemText primary="ارسال گردید و در راه میباشد" secondary={<div className="date">{this.props.order.step3}</div>}/>
                                    <img style={{height: '50px'}} src={TransportPassed}/>
                                </ListItem>
                            )}
                        </div>
                        <div className="order-step">
                            {(this.props.order.step4.startsWith('2000')) ? (
                        <ListItem style={{textAlign: "right"}}>
                            <ListItemText primary="تحویل گردید" secondary='در انتظار'/>
                            <img style={{height: '50px'}} src={Delivery}/>

                        </ListItem>):(
                                <ListItem style={{textAlign: "right"}}>
                                    <ListItemText primary="تحویل گردید" secondary={<div className="date">{this.props.order.step4}</div>}/>
                                    <img style={{height: '50px'}} src={DeliveryPassed}/>
                                </ListItem>
                            )
                            }
                        </div>
                    </List>
                </CardContent>
                <CardActions>
                    <Grid container spacing={24}>
                        {(this.props.order.paymentStatus===1)?

                            (<Grid item xs={7} style={{textAlign: "center"}}>

                        <Button variant="contained" color="secondary" size="medium">پرداخت آنلاین</Button>

                        </Grid>):(<Grid item xs={7} style={{textAlign: "center"}}>

                                <Chip
                                    label="پرداخت شده"
                                    color="secondary"
                                    variant="outlined"
                                />
                            </Grid>)}
                        <Grid item xs={5} style={{textAlign: "center"}}>
                            <Button style={{direction:'rtl'}} size={"large"}>{this.props.order.orderTotalDiscount+' تومان'}</Button>

                        </Grid>

                    </Grid>
                </CardActions>
            </Card>
        );
    }
}
OrderCart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderCart);