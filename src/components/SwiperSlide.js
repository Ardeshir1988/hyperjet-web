import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class SwiperSlide extends Component {
    render() {
        return (
            <Carousel className="banner"
                      autoPlay={true}
                      stopOnHover={true}
                      interval={3000}
                      transitionTime={300}
                      showIndicators={false}
                      showThumbs={false}
                      showStatus={false}
            >
                { this.props.banners.map(banner=>
               <div >
                 <img  src={'https://maxproapp.com/files/'+banner} />
                </div>
                )}
            </Carousel>
        );
    }
}
export default SwiperSlide