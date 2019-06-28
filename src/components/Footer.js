import React from 'react';
import appleIcon from "../assets/app-apple.png";
import androidIcon from "../assets/app-google.png";
import Dm from "../utils/DataManager";
import BackIcon from '@material-ui/icons/Close';
import IOSTutorial from "./IOSTutorial";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Footer extends React.Component {

    state = {
        isFirst:Dm.isFirstTime()
    };

    handleOpen() {
        Dm.setSecondTime();
        this.setState({isFirst: 'false'})
        this.setState({open: true});
    }

    handleURL() {
        Dm.setSecondTime();
        this.setState({isFirst: 'false'})
        window.location.href = 'https://play.google.com/store/apps/details?id=ir.mobile.hyper&hl';
    }
    handleClose() {
        this.setState({open:false});
    }

    render() {

        return (
            <div className="App">

                <Dialog style={{direction:'rtl'}} fullScreen open={this.state.open} onClose={()=>this.handleClose()} TransitionComponent={Transition}>
                    <div className="ios-guide">
                        <div className="ios-dialog-top">

                            <div className="page-title">راهنما</div>

                            <div style={{marginTop:"9px",marginLeft:"9px"}} onClick={()=>this.handleClose()}>
                                <BackIcon />
                            </div>
                        </div>

                        <div className="ios-dialog-content">
                            <IOSTutorial />
                        </div>
                    </div>
                </Dialog>

                <footer>


                    <div className="downloadApp">
                        <div className="downloadApp-main">
                            <div className="downloadApp-title">
                                <div className="appTitle"><span>دانلود اپلیکیشن </span></div>
                            </div>
                            <div className="downloadApp-text"><span> </span>
                            </div>
                            <div className="icons">
                                <div className="download-icon" onClick={() => this.handleOpen()}>
                                    <img className="download-icon" src={appleIcon}/>
                                </div>
                                <div className="download-icon" onClick={() => this.handleURL()}>
                                    <img className="download-icon" src={androidIcon}/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div
                        className={
                            this.state.isFirst==='false'? "container" : "container-first "
                        }>

                        <div className='row'>
                            <img className="img-namad"
                                 src="https://trustseal.enamad.ir/logo.aspx?id=45299&amp;p=btgu8urloClvVIdv" alt=""
                                 onClick="window.open(&quot;https://trustseal.enamad.ir/Verify.aspx?id=45299&amp;p=btgu8urloClvVIdv&quot;, &quot;Popup&quot;,&quot;toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30&quot;)"
                                 style={{cursor: "pointer"}} id="btgu8urloClvVIdv"/>

                            <div className='col-sm-6'>
                                <p className='wow fadeInLeft' data-wow-delay='.2s'>
                                    کپی رایت تمامی حقوق مادی و معنوی این وب سایت و اپلیکیشن های موبایل متعلق به شرکت
                                    شتاب گستر آژمان است
                                </p>

                            </div>
                        </div>
                    </div>
                </footer>

            </div>

        );
    }
}
export default Footer;