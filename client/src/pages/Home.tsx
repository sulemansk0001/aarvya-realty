import React, { useState, useEffect } from 'react';
import { HeroEntryView } from '../components/hero/HeroEntryView';
import { TrustMetricsTicker } from '../components/trust/TrustMetricsTicker';
import { InteractivePropertyCategory } from '../components/home/InteractivePropertyCategory';
import { CuratedListingsGrid } from '../components/listings/CuratedListingsGrid';
import { StackedPropertyCards } from '../components/properties/StackedPropertyCards';
import { MaharashtraParallaxGallery } from '../components/home/MaharashtraParallaxGallery';
import { CommunitySpotlight } from '../components/community/CommunitySpotlight';
import { ExecutiveProfile } from '../components/community/ExecutiveProfile';
import { ServiceCard } from '../components/home/ServiceCard';
import { MortgageCalculator } from '../components/home/MortgageCalculator';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { BlogInsightsSection } from '../components/home/BlogInsightsSection';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { AnimatedHeading } from '../components/typography/AnimatedHeading';
import { PropertyService } from '../services/api';
import { Property } from '../types';

export const Home: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const all = await PropertyService.getAll();
        setProperties(all);
      } catch (err) {
        console.error('Failed to load properties for home showcase', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, []);

  return (
    <div className="w-full">
      {/* 1. HERO ENTRY VIEW: Ken Burns scale, masked typography, shimmer CTA & floating card */}
      <HeroEntryView />

      {/* 2. TRUST METRICS TICKER: Animated counters + continuous partner logo marquee */}
      <TrustMetricsTicker />

      {/* 3. INTERACTIVE PROPERTY CATEGORIES */}
      <InteractivePropertyCategory />

      {/* 4. CURATED LISTINGS GRID: Filter tabs, card lift, ambient shadow, quick view */}
      <CuratedListingsGrid properties={properties} loading={loading} />

      {/* 4.5 STACKED PROPERTY CARDS: CSS-only sticky stacking showcase of premier Pune developments */}
      <StackedPropertyCards />

      {/* 5. COMMUNITY SPOTLIGHT: Pune micro-markets with rental yields and capital benchmarks */}
      <CommunitySpotlight />

      {/* 6. REAL ESTATE SERVICES */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedHeading
            eyebrow="COMPREHENSIVE ADVISORY"
            title="How Can We Assist Your Property Search?"
            subtitle="Whether you are buying a primary home, expanding corporate offices, or selling a property in Pune, we guide you at every step."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal variant="fade-up" delay={0} duration={650}>
              <ServiceCard
                title="Buying a Property"
                description="Discover verified ready-to-move and under-construction residences with clear title documentation, competitive pricing, and curated site visit arrangements in Pune."
                image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                link="/buy"
                badge="Buy With Confidence"
              />
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={120} duration={650}>
              <ServiceCard
                title="Renting a Property"
                description="Find quality rental apartments, furnished flats, and corporate offices in prime IT hubs such as Hinjawadi, Kharadi, Baner, and Wakad with seamless lease assistance."
                image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                link="/rent"
                badge="Verified Rentals"
              />
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={240} duration={650}>
              <ServiceCard
                title="Selling a Property"
                description="List your residential flat, villa, or commercial property with Aarvya Realty to reach genuine Pune buyers, receive fair market valuation, and ensure fast closure."
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                link="/sell"
                badge="Maximum Value"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE PROFILE & ETHOS */}
      <ExecutiveProfile />

      {/* 8. HOME LOAN / EMI CALCULATOR */}
      <MortgageCalculator />

      {/* 9. EXPLORE MAHARASHTRA LOCATIONS: Touch-safe horizontal parallax destination showcase */}
      <MaharashtraParallaxGallery />

      {/* 10. WHY CHOOSE AARVYA REALTY */}
      <WhyChooseUs />

      {/* 11. TESTIMONIALS (CLIENT REVIEWS) */}
      <TestimonialsSection />

      {/* 12. BLOG / REAL ESTATE INSIGHTS */}
      <BlogInsightsSection />
    </div>
  );
};
