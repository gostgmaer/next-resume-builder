"use client";
import Features from "@/components/Pages/HomePage/Feature";
import HeroSection from "@/components/Pages/HomePage/Hero";
import Testimonials from "@/components/Pages/HomePage/Testimonials";
import RepeatableBlock from "@/components/resue";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" bg-black">
      <HeroSection />
      <Features />
      <Testimonials />
    </main>
  );
}
