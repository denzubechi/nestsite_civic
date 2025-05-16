import React from "react";
import "./globals.css";
import Heroes from "./components/heroes";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Stats from "./components/Stats";
import Newsletter from "./components/newsletter";
import SupportSection from "./components/Support";
import CTA from "./components/CTA";
import TestimonialSection from "./components/Testimonial";
import Globe from "./components/Globe";
export default function Home() {
  return (
    <>
      <Heroes />
      <CTA />
      <Features />
      <Stats />
      <Globe />
      <SupportSection />
      <Newsletter />
      <Footer />
    </>
  );
}
