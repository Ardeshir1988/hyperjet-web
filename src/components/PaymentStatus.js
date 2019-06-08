import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Urls from "../utils/URLs";
import Dm from "../utils/DataManager";
import Logo from '../assets/icon-152x152.png';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        direction: 'rtl'
    },
});


class UserAccount extends React.Component {

    state={loaded:false,
        status: false};
    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let ref=params.get('ref');
        console.log(ref);

        axios.post(Urls.baseUrl()+"order/bankstatus",{key:'',message:ref,token:''},{headers:{'Authorization': Urls.getAuthToken()}})
            .then(response=>{
                    const data=response.data;
                    console.log(data.token);
                    console.log(data.message);
                    console.log(data.key);

                    if (data !== undefined)
                        if (data.message!=='null')
                        this.setState({
                            status:true,
                            username:data.token,
                            amount:data.message,
                            loc:data.key
                        });

                this.setState({loaded:true});
                }
            );
    }
    backToHyperjet(){
        let location=this.state.loc;
        (location.startsWith('web'))? window.location.href='/':
        window.location.href='HyperJet://';
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="payment-container">
                <div className="payment-logo">
                <img style={{height:'100px'}} src={Logo}/>

                </div>

                <Paper  elevation={1}>
                    {(this.state.loaded)?
                    <div className="payment-content">
                    {(this.state.status)?(
                        <div style={{marginTop:"25px"}}>
                            {(this.state.username!=='')?this.state.username+' عزیز':'کاربر عزیز'}
                        <div className="success">
                        پرداخت شما با موفقیت انجام شد
                    </div>
                            <div style={{marginTop:"25px"}}>
                                مبلغ {this.state.amount} ریال پرداخت گردید
                            </div>
                            <div style={{marginTop:"25px"}}>
                                با سپاس فراوان از شما
                            </div>
                            <div style={{marginTop:"25px",marginBottom:"25px"}}>
                                <Button variant="contained" color="secondary" onClick={()=>this.backToHyperjet()}>
                                     بازگشت به هایپرجت
                                </Button>
                            </div>
                        </div>):(
                            <div>
                                <div style={{marginTop:"25px"}}>
                                    {(this.state.username!==null && this.state.username!==undefined)?this.state.username+' عزیز':'کاربر عزیز'}

                        <div className="failed">
                            پرداخت شما ناموفق است
                        </div>
                                </div>
                                <div style={{marginTop:"25px"}}>
                                    با سپاس فراوان از شما
                                </div>
                                <div style={{marginTop:"25px",marginBottom:"25px"}}>
                                    <Button variant="contained" color="secondary" onClick={()=>this.backToHyperjet()}>
                                        بازگشت به هایپرجت
                                    </Button>
                                </div>
                            </div>)
                    }
                    </div>:(
                        <div style={{textAlign:"center",height:"200px",paddingTop:"80px"}}>
                            <CircularProgress className={classes.progress} color="secondary" />
                        </div>
                        )
                    }
                </Paper>
            </div>
        );
    }
}
UserAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAccount);