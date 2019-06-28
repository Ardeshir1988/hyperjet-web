import React, { Component } from "react";
import Category from "./Category";
import axios from "axios/index";
import Urls from "../utils/URLs"
import Loading from "./Loading";
import Dm from "../utils/DataManager";
import { detect } from "detect-browser";
import CloseIcon from "../assets/close.svg";
import LogoIcon from "../assets/icon-192x192.png";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import BackIcon from '@material-ui/icons/Close';
import IOSTutorial from "./IOSTutorial";
import Footer from "./Footer";
import SwiperSlide from "./SwiperSlide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const footerStyle = {
    // textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "80px",
    width: "100%",
    boxShadow: "0 0 5px rgba(0, 0, 0, .35)",
    right: "0",
    border: "0",
    zIndex: "99999",
    background:"white"
};

class Categories extends Component {


    state = {
        cats: [],
        loaded:false,
        isFirst:Dm.isFirstTime()
    };

    closeIOSDialog(){
        Dm.setSecondTime();
        this.setState({isFirst:'false'})
    }

    componentDidMount() {
    let url = Urls.baseUrl()+"product/getcats";
    axios.get(url, {headers:{'Authorization': Urls.getAuthToken()}})
        .then(response => {
            const cats=response.data;
        this.setState({cats});
        this.setState({loaded:true})
    });
        const browser = detect();

        if (browser) {
            console.log(browser.name);
            console.log(browser.version);
            console.log(browser.os);
        }
    }
    handleOpen() {
        Dm.setSecondTime();
        this.setState({isFirst:'false'})
        this.setState({open:true});
    }
    handleURL() {
        Dm.setSecondTime();
        this.setState({isFirst:'false'})
        window.location.href='https://play.google.com/store/apps/details?id=ir.mobile.hyper&hl';
    }
    handleClose() {
        this.setState({open:false});
    }
    render() {
        let categoriesData;
        const browser = detect();

            console.log(browser.name);
            console.log(browser.version);
            console.log(browser.os);


        categoriesData=    this.state.cats.map(cat => {
                return (
                    <Category
                        key={cat.categoryId}
                        categoryName={cat.categoryName}
                        categoryPic={cat.categoryPic}
                        categoryId={cat.categoryId}
                        {...this.props}
                    />
                    );
            });

        return <div>

            {(this.state.loaded)?<div className="products-wrapper">
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


            <SwiperSlide/>

            <div className="categories">{categoriesData}</div></div>:<Loading />






            }
            { (window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches)?
            ''
            :<Footer/>}

            {(this.state.isFirst==='true' && (browser.name==='ios'|| browser.name=== 'safari' ))
                ?<div className="iosAlarm" style={footerStyle} >
                    <button className="install-button"  onClick={()=>this.handleOpen()}>
                        <h5>نصب کنید</h5>
                    </button>
                    <div className="text">
                        <h5>وب اپلیکیشن هایپرجت</h5>
                        <h6 style={{color:"grey"}}>یار هوشمند و سریع شما</h6>
                        <h6 style={{color:"grey"}}> تحویل فوق اکسپرس، ۲۴ ساعته</h6>
                    </div>
                    <div className="img-logo">
                        <img src={LogoIcon}/>
                    </div>
                    <div className="img-close" onClick={()=>this.closeIOSDialog()}>
                        <img src={CloseIcon}/>
                    </div>
                </div>:
                ''}
            {(this.state.isFirst==='true' && (browser.name!=='ios'&& browser.name!== 'safari' ))
                ?<div className="iosAlarm" style={footerStyle}>
                    <button className="install-button"  onClick={()=>this.handleURL()}>
                        <h5>نصب کنید</h5>
                    </button>

                    <div className="text">
                        <h5>اپلیکیشن اندروید هایپرجت</h5>
                        <h6 style={{color:"grey"}}>یار هوشمند و سریع شما</h6>
                        <h6 style={{color:"grey"}}> تحویل فوق اکسپرس، ۲۴ ساعته</h6>
                    </div>
                    <div className="img-logo">
                        <img src={LogoIcon}/>
                    </div>
                    <div className="img-close" onClick={()=>this.closeIOSDialog()}>
                        <img src={CloseIcon}/>
                    </div>
                </div>:
                ''}
        </div>
            ;

    }
}
export default Categories;