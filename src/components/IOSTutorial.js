import React, { Component } from "react";
import LogoIcon from "../assets/icon-152x152.png";
import ShareIcon from "../assets/share-arrow.svg";
import ScreenShot from "../assets/screenshot.png";
import DownArrow from "../assets/downward.svg";

class IOSTutorial extends Component {

    render() {
        return (
            <div className="ios-tutorial-container">
                <div className="step1">
                    <div>
                    <img src={LogoIcon}/>
                    </div>
                    <div className="title">
                        <h5>راهنمای نصب وب اپلیکیشن IOS هایپرجت</h5>
                    </div>
                </div>
                <div className="step2">

                    <div className="line-ins">
                        <h5 style={{marginRight:"3px"}}>1.روی دکمه </h5>
                        <div>
                            <img style={{marginTop:"-11px"}} src={ShareIcon}/>
                        </div>
                        <h5 style={{color:"blue"}}>(share)</h5>
                        <h5 style={{marginRight:"4px"}}>کلیک کنید.</h5>
                    </div>
                </div>
                <div className="step3">
                    <div className="step3-content">
                    <div className="line-ins">
                        <h5 style={{marginRight:"3px"}}>2.در منوی باز شده روی دکمه </h5>
                        <h5 style={{color:"blue"}}>add to home</h5>
                        <h5 style={{marginRight:"4px"}}>کلیک کنید.</h5>
                    </div>
                    <div>
                        <img style={{marginTop:"-11px"}} src={ScreenShot}/>
                    </div>
                    </div>
                </div>
                <div className="step2">

                    <div className="line-ins">
                        <h5 style={{marginRight:"3px"}}>3.در بالای صفحه روی گزینه </h5>
                        <h5 style={{color:"blue"}}>add</h5>
                        <h5 style={{marginRight:"4px"}}> کلیک کنید.</h5>
                    </div>
                </div>
                <div className="start">
                    <div>
                    <h5  style={{color:"blue"}}>شروع</h5>
                    </div>
                    <div>
                    <img src={DownArrow}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default IOSTutorial;