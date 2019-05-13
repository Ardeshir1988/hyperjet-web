import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Dm from "../utils/DataManager";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
        Dm.setConfirmCode(  event.target.value )
    }


    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>

                    <Typography component="h1" variant="h6">
                      ثبت کد تایید
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">کد تایید</InputLabel>
                            <Input  id="mobile" name="mobile" onChange={event => this.handleChange(event)} autoComplete="موبایل" autoFocus/>
                        </FormControl>
                        <div >
                            {/*<Button*/}
                            {/*    onClick={()=>this.setMobileAndRedirect()}*/}
                            {/*    fullWidth*/}
                            {/*    variant="contained"*/}
                            {/*    color="primary"*/}
                            {/*    className={classes.submit}>*/}
                            {/*    تایید*/}
                            {/*</Button>*/}
                        </div>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);