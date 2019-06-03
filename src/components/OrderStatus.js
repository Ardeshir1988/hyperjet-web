import React from 'react';
import PropTypes from 'prop-types/prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dm from "../utils/DataManager";
import Urls from "../utils/URLs";
import axios from "axios";
import OrderCart from "./OrderCart";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({

    layout: {
        width: 'auto',
        height:'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
});


class OrderStatus extends React.Component {

    state={orders:[]};
    componentDidMount() {
        axios.post(Urls.baseUrl()+"order/getuseronproccessorders",{token:Dm.getUserData().token,message:'',key:''}, {headers:{'Authorization': Urls.getAuthToken()}})
            .then(response => {
                const orders=response.data;
                this.setState({orders:orders})
            });
    }


    render() {
        const { classes } = this.props;


        return (
            <div>
                <div className="page-title-bar">
                    <Typography variant="h6" gutterBottom className="page-title">وضعیت سفارش</Typography>
                </div>
                <CssBaseline />

                <main className={classes.layout}>

                    {this.state.orders.map(order=><OrderCart order={order} />)}
                </main>
            </div>
        );
    }
}

OrderStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OrderStatus);