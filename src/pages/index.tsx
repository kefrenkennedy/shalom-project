import Header from "@/components/header";
import { Image } from "@chakra-ui/react";
import AcampsBeach from "../Assets/AcampsBeach.png";
import AcampsBeachFooter from "../Assets/AcampsBeachFooter.png";
import carrossel1 from "../Assets/Carrossel1.jpg";
import carrossel2 from "../Assets/Carrossel2.jpg"
import carrossel3 from "../Assets/Carrossel3.jpg"
import carrossel4 from "../Assets/Carrossel4.jpg"
import carrossel5 from "../Assets/Carrossel5.jpg"
import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <Image src={carrossel1.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel2.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel3.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel4.src} alt="image" h="350px" />
        </div>
        <div>
          <Image src={carrossel5.src} alt="image" h="350px" />
        </div>
      </Carousel>
    );
  }
}
export default function Home() {
  return (
    <>
      <Header />

      <Image src={AcampsBeach.src} alt="Acamps Beach" w="100%" mb="50px"/>

      <DemoCarousel />

      <Image src={AcampsBeachFooter.src} alt="Acamps Beach Info" w="100%" mt="30px"/>
    </>
  );
}
