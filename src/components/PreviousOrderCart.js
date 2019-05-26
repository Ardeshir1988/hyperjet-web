import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Packing from '@material-ui/icons/Layers';
import Delivery from '@material-ui/icons/DirectionsBike';
import Delivered from '@material-ui/icons/Beenhere';

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