import Features from "@/components/Pages/HomePage/Feature";
import HeroSection from "@/components/Pages/HomePage/Hero";
import Testimonials from "@/components/Pages/HomePage/Testimonials";


export default function Home() {

  return (
    <div className=" bg-gray-50 px-10">
      <HeroSection />
      <Features />
      <Testimonials />
    </div>
  );
}
