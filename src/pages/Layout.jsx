import React from "react";
import TopSection from "../Components/TopSection";
import Section2 from "../Components/Section2";
import Section3 from "../Components/Section3";
import Section4 from "../Components/Section4";
import Section5 from "../Components/Section5";
import { FaqContainer } from "../Components/FaqContainer";
import MovieCard from "../Components/MovieCard";
import Footer from "../Components/Footer";

export const Layout = () => {
  return (
    <>
      <TopSection />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <FaqContainer />
      <MovieCard />
      <Footer />
    </>
  );
};
