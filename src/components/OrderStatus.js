import React from 'react';
import PropTypes from 'prop-types/prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SingInForm from './SignIn';
import ConfrimForm from './Confirmation';
import Dm from "../utils/DataManager";
import Snackbar from '@material-ui/core/Snackbar';
import { Route, Redirect } from 'react-router'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Urls from "../utils/URLs";
import axios from "axios";
import OrderCart from "./OrderCart";


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