import React, { Component } from "react";
import Category from "./Category";
import axios from "axios/index";
import Urls from "../utils/URLs"
import Loading from "./Loading";
import Dm from "../utils/DataManager";
import { detect } from "detect-browser";
import CloseIcon from "../assets/close.svg";
import LogoIcon from "../assets/icon-152x152.png";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import BackIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import IOSTutorial from "./IOSTutorial";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
        this.setState({open:true});
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
//(browser.name==='ios'|| browser.name=== 'safari' )

        return <div>{(this.state.loaded)?<div className="products-wrapper">
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
                {(this.state.isFirst==='true' && (browser.name==='ios'|| browser.name=== 'safari' ))
            ?<div className="iosAlarm" >
                    <button onClick={()=>this.handleOpen()}>
                            نصب
                    </button>
                    <div className="text">
                        <h5>وب اپلیکیشن هایپرجت</h5>
                        <h6 style={{color:"grey"}}>تجربه کاربری بهتر</h6>
                    </div>
                    <div className="img-logo">
                        <img src={LogoIcon}/>
                    </div>
                    <div  className="img-logo" onClick={()=>this.closeIOSDialog()}>
                        <img style={{height:"25px",width:"25px"}} src={CloseIcon}/>
                    </div>
            </div>:
            ''}
            <div className="categories">{categoriesData}</div></div>:<Loading />}</div>;
    }
}
export default Categories;