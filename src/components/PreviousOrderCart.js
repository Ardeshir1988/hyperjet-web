import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import NumberFormat from "react-number-format";

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
        marginBottom:"10px"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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

class PreviousOrderCart extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <Card className={classes.card}>
                <ListItem button>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <div style={{textAlign: "left",color:"limegreen"}} >
                                {this.props.order.orderId}
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                شماره سفارش
                            </div>
                        </Grid>

                        <Grid item xs={6}>
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
                                <NumberFormat value={this.props.order.orderTotalAmount-this.props.order.orderTotalDiscount} displayType={'text'} thousandSeparator={true} renderText={value =>  <h4 className="product-price">{value + ' تومان'}</h4>} />
                            </div>
                        </Grid>

                        <Grid item xs={6}  className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                تخفیف
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div style={{textAlign: "left"}}>
                                <NumberFormat value={this.props.order.orderTotalDiscount+this.props.order.deliveryFee} displayType={'text'} thousandSeparator={true} renderText={value =>  <h4 className="product-price">{value + ' تومان'}</h4>} />
                            </div>
                        </Grid>
                        <Grid item xs={6}  className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                مبلغ قابل پرداخت
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div style={{textAlign: "left"}}>
                                <NumberFormat value={this.props.order.debt_amount} displayType={'text'} thousandSeparator={true} renderText={value =>  <h4 className="product-price">{value + ' تومان'}</h4>} />
                            </div>
                        </Grid>
                        <Grid item xs={6}  className={classes.grid}>
                            <div style={{textAlign: "right"}}>
                                مبلغ باقیمانده
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth={true} >
                                نمایش جزئیات
                            </Button>
                        </Grid>
                    </Grid>
                </ListItem>
            </Card>
            </MuiThemeProvider>
        );
    }
}
PreviousOrderCart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviousOrderCart);