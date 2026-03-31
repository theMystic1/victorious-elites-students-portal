"use client";

import Admissions from "./admissions";
import Footer from "./footer";
import HeroSection from "./hero";
import Nav from "./nav";
import News from "./news";
import Program from "./programs";
import Reveal from "./reveal";
import TobBar from "./tob-bar";
import WhyUs from "./why-us";

const HomeScreen = () => {
  return (
    <div>
      <Reveal from="up" delayMs={90}>
        <HeroSection />
      </Reveal>

      <Reveal from="left" delayMs={90}>
        <Program />
      </Reveal>

      <Reveal from="left" delayMs={120}>
        <WhyUs />
      </Reveal>

      <Reveal from="right" delayMs={200}>
        <Admissions />
      </Reveal>
      <Reveal from="left" delayMs={200}>
        <News />
      </Reveal>
      <Reveal from="right" delayMs={200}>
        <Footer />
      </Reveal>
    </div>
  );
};

export default HomeScreen;
