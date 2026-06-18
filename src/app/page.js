import Hero from "@/component/HeroSection/HeroSection";
import ProcessSection from "@/component/TrainingSection/TrainingSection";
import AboutSection from "@/component/TransformSection/TransformSection";

export default function Home() {
  return (
   <div>
    <Hero></Hero>
    <AboutSection></AboutSection>
    <ProcessSection></ProcessSection>
   </div>
  );
}
