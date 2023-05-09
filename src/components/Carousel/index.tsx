import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import carrossel1 from '../../../public/assets/carrossel1.jpg';
import carrossel2 from '../../../public/assets/carrossel2.jpg';
import carrossel3 from '../../../public/assets/carrossel3.jpg';
import carrossel4 from '../../../public/assets/carrossel4.jpg';
import carrossel5 from '../../../public/assets/carrossel5.jpg';

const handleDragStart = (e: any) => e.preventDefault();

const items = [
  <img
    alt="image-carousel-01"
    key={carrossel1.src}
    src="assets/Carrossel1.jpg"
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-02"
    key="image-carousel-02"
    src={carrossel2.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-03"
    key="image-carousel-03"
    src={carrossel3.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-04"
    key="image-carousel-04"
    src={carrossel4.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
  <img
    alt="image-carousel-05"
    key="image-carousel-05"
    src={carrossel5.src}
    onDragStart={handleDragStart}
    role="presentation"
    width="100%"
  />,
];

export const Carousel = () => {
  return <AliceCarousel mouseTracking items={items} disableButtonsControls />;
};
