import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import CategorySlider from '../components/home/CategorySlider';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import PopularDishes from '../components/home/PopularDishes';
import OffersSection from '../components/home/OffersSection';
import Testimonials from '../components/home/Testimonials';
import HowItWorks from '../components/home/HowItWorks';

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Hero />
      <CategorySlider />
      <FeaturedRestaurants />
      <HowItWorks />
      <PopularDishes />
      <OffersSection />
      <Testimonials />
    </motion.div>
  );
}
