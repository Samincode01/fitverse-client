import FeaturedClasses from "@/component/FeaturedSection/FeaturedSection";
import Hero from "@/component/HeroSection/HeroSection";
import ProcessSection from "@/component/TrainingSection/TrainingSection";
import AboutSection from "@/component/TransformSection/TransformSection";
import UserReviews from "@/component/UserReviewSection/UserReviewSection";

export default function Home() {
  return (
   <div>
    <Hero></Hero>
    <AboutSection></AboutSection>
    <FeaturedClasses></FeaturedClasses>
    <ProcessSection></ProcessSection>
    <UserReviews></UserReviews>
   </div>
  );
}
