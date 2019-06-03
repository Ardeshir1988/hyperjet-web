import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';

const styles = {
    card: {
        maxWidth: 'auto',
        margin:'20px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    grid:{
        marginBottom:"20px"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class PreviousOrderCart extends React.Component {


    render() {

        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <ListItem button>

                    <Grid container spacing={24}>

                        <Grid item xs={6}>
                            <div style={{textAlign: "left"}} >
                                {this.props.order.orderId}
                            </div>
                        </Grid>

                        <Grid item xs={6} className={classes.grid} >
                            <div style={{textAlign: "right"}}>
                                شماره سفارش
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div style={{textAlign: "left"}}>
                                {this.props.order.orderRegTime}
                            </div>
                        </Grid>
                        <Grid item xs={6}  className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                تاریخ سفارش
                            </div>
                        </Grid>


                        <Grid item xs={6} >
                            <div style={{textAlign: "left"}}>
                                {this.props.order.orderTotalAmount-this.props.order.orderTotalDiscount}
                            </div>
                        </Grid>

                        <Grid item xs={6}  className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                تخفیف
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div style={{textAlign: "left"}}>
                                {this.props.order.orderTotalDiscount+this.props.order.deliveryFee}
                            </div>
                        </Grid>
                        <Grid item xs={6}  className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                مبلغ قابل پرداخت
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div style={{textAlign: "left"}}>
                                {this.props.order.debt_amount}
                            </div>
                        </Grid>
                        <Grid item xs={6}  className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                مبلغ باقیمانده
                            </div>
                        </Grid>

                    </Grid>
                </ListItem>
            </Card>
        );
    }
}
PreviousOrderCart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviousOrderCart);