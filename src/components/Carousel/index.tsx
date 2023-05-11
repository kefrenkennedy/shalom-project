import React from 'react';
import AliceCarousel from 'react-alice-carousel';

import carrosselImage1 from '../../../public/assets/carrossel1.jpg';
import carrosselImage2 from '../../../public/assets/carrossel2.jpg';
import carrosselImage3 from '../../../public/assets/carrossel3.jpg';
import carrosselImage4 from '../../../public/assets/carrossel4.jpg';
import carrosselImage5 from '../../../public/assets/carrossel5.jpg';

import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e: any) => e.preventDefault();

const items = [
  <img
    alt="image-carousel-01"
    key="image-carousel-01"
    src={carrosselImage1.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-02"
    key="image-carousel-02"
    src={carrosselImage2.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-03"
    key="image-carousel-03"
    src={carrosselImage3.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-04"
    key="image-carousel-04"
    src={carrosselImage4.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-05"
    key="image-carousel-05"
    src={carrosselImage5.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
];

export const Carousel = () => {
  return <AliceCarousel mouseTracking items={items} disableButtonsControls />;
};
