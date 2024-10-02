import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ImageCarousel.module.scss";

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          <div>
            <img
              src="https://cdn.motor1.com/images/mgl/mrz1e/s1/coolest-cars-feature.webp"
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              src="https://cdn.motor1.com/images/mgl/mrz1e/s1/coolest-cars-feature.webp"
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              src="https://cdn.motor1.com/images/mgl/mrz1e/s1/coolest-cars-feature.webp"
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
