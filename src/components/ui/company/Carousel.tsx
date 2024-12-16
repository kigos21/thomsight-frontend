// import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
// import Button from "../Button";
import { useCarousel } from "../../../hooks/useCarousel";
import styles from "./Carousel.module.scss";
import PaddedContainer from "../../layout/PaddedContainer";
import Button from "../Button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";

interface CarouselProps {
  images: string[];
  interval?: number;
}

export function Carousel({ images, interval = 3000 }: CarouselProps) {
  const { currentIndex, nextSlide, prevSlide } = useCarousel(images, interval);
  const [imageLoadError, setImageLoadError] = useState<boolean[]>(() =>
    new Array(images.length).fill(false)
  );

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.imagesWrapper}>
          <div
            className={styles.imageContainer}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${images.length * 100}%`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className={styles.imageInnerContainer}>
                {!imageLoadError[index] ? (
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    height={340}
                    className={styles.carouselImage}
                    onError={() => {
                      setImageLoadError((prev) => {
                        const updatedErrors = [...prev];
                        updatedErrors[index] = true;
                        return updatedErrors;
                      });
                    }}
                    style={{ width: `${(1 / images.length) * 100}%` }}
                  />
                ) : (
                  <div
                    className={styles.carouselImage}
                    style={{
                      width: `${(1 / images.length) * 100}%`,
                      height: "340px",
                    }}
                  >
                    <p>Image Failed to Load</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 

          Uncomment if you want to show the buttons

        */}

        <Button classNames={styles.leftCarouselBtn} onClick={prevSlide}>
          <IconChevronLeft style={{ width: "16px", height: "16px" }} />
        </Button>
        <Button classNames={styles.rightCarouselBtn} onClick={nextSlide}>
          <IconChevronRight style={{ width: "16px", height: "16px" }} />
        </Button>

        <div className={styles.positionIndicator}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : styles.inactive
              }`}
            />
          ))}
        </div>
      </div>
    </PaddedContainer>
  );
}
