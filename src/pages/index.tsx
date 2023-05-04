import Header from "@/components/header";
import { Box, Flex, Image } from "@chakra-ui/react";
import AcampsBeach from "../Assets/AcampsBeach.png";
import AcampsBeachFooter from "../Assets/AcampsBeachFooter.png";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <Image src={AcampsBeach.src} alt="image" />
        </div>
        <div>
          <Image src={AcampsBeach.src} alt="image" />
        </div>
        <div>
          <Image src={AcampsBeach.src} alt="image" />
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
