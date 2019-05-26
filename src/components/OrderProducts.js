import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


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


class OrderProducts extends React.Component {

    render() {

        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div>
                    {this.props.product.name}
                </div>
            </Card>
        );
    }
}
OrderProducts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderProducts);