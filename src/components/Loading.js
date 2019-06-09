import React, { Component } from "react";
import "../scss/style.scss";
import LinearProgress from '@material-ui/core/LinearProgress';

import Logo from "../assets/icon-152x152.png";
import { makeStyles, withStyles } from '@material-ui/core/styles';

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#fffbf9',
    },
    barColorPrimary: {
        backgroundColor: '#b81aec',
    },
})(LinearProgress);

class Loading extends Component {


    render() {


        return (

                <div className="loding-container">

                    <ColorLinearProgress />
                    <img src={Logo}/>
                    <div className="text-hyper">هایپرجت یار همیشه همراه</div>
                </div>
        );
    }
}

export default Loading;