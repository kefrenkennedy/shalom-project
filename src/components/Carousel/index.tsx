import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import carrossel1 from '../../../public/assets/Carrossel1.jpg';
import carrossel2 from '../../../public/assets/Carrossel2.jpg';
import carrossel3 from '../../../public/assets/Carrossel3.jpg';
import carrossel4 from '../../../public/assets/Carrossel4.jpg';
import carrossel5 from '../../../public/assets/Carrossel5.jpg';

const handleDragStart = (e: any) => e.preventDefault();

const items = [
  <img
    alt="image-carousel-01"
    key={carrossel1.src}
    src="assets/Carrossel1.jpg"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    alt="image-carousel-02"
    key="image-carousel-02"
    src={carrossel2.src}
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    alt="image-carousel-03"
    key="image-carousel-03"
    src={carrossel3.src}
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    alt="image-carousel-04"
    key="image-carousel-04"
    src={carrossel4.src}
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    alt="image-carousel-05"
    key="image-carousel-05"
    src={carrossel5.src}
    onDragStart={handleDragStart}
    role="presentation"
  />,
];

export const Carousel = () => {
  return <AliceCarousel mouseTracking items={items} disableButtonsControls />;
};
