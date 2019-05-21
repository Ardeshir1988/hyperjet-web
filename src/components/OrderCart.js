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
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class OrderCart extends React.Component {


    state={step1:'   12:20 25/2/1398',step2:'   12:20 25/2/1398',step3:'',step4:''};
    //this.state({step1:'',step2:'',step3:'',step4:''});
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
                            {this.props.order.orderRegTime}
                        </Grid>
                        <Grid item xs={6} style={{textAlign: "center"}}>
                            {this.props.order.orderId}
                        </Grid>
                    </Grid>
                    <List component="nav">
                        <ListItem style={{textAlign: "right"}}>
                            <ListItemText primary="تایید گردید" secondary={this.props.order.step1}/>
                            <Avatar>
                                <AssignmentTurnedIn/>
                            </Avatar>

                        </ListItem>
                        <ListItem style={{textAlign: "right"}}>
                            <ListItemText primary="آماده و بسته بندی شد" secondary={this.props.order.step2}/>
                            <Avatar>
                                <Packing/>
                            </Avatar>

                        </ListItem>
                        <ListItem style={{textAlign: "right"}}>
                            <ListItemText primary="ارسال گردید و در راه میباشد" secondary={this.props.order.step3}/>
                            <Avatar>
                                <Delivery/>
                            </Avatar>

                        </ListItem>
                        <ListItem style={{textAlign: "right"}}>
                            <ListItemText primary="تحویل گردید" secondary={this.props.order.step4}/>
                            <Avatar>
                                <Delivered/>
                            </Avatar>

                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Grid container spacing={24}>
                        <Grid item xs={7} style={{textAlign: "center"}}>
                    <Button variant="contained" color="secondary" size="large">پرداخت آنلاین</Button>
                        </Grid>
                        <Grid item xs={5} style={{textAlign: "center"}}>
                            <Button size={"large"}>{this.props.order.orderTotalAmount}</Button>

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