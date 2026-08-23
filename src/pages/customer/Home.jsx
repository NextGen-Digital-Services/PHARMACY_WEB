import React, { useEffect } from 'react';
import HeroSection from '../../components/home/HeroSection';
import TrustStatsBar from '../../components/home/TrustStatsBar';
import CategoryGrid from '../../components/home/CategoryGrid';
import BestSellers from '../../components/home/BestSellers';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import BrandStoryStrip from '../../components/home/BrandStoryStrip';
import Testimonials from '../../components/home/Testimonials';
import NewsletterCTA from '../../components/home/NewsletterCTA';

export default function Home() {
  // Ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page-view">
      <HeroSection />
      <TrustStatsBar />
      <CategoryGrid />
      <BestSellers />
      <WhyChooseUs />
      <BrandStoryStrip />
      <Testimonials />
      <NewsletterCTA />
    </div>
  );
}
