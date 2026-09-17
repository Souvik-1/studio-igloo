import React, { useState } from 'react';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/hero/Hero';
import { IntroSection } from '@/components/sections/IntroSection';
import { FeaturedWork } from '@/components/gallery/FeaturedWork';
import { Categories } from '@/components/gallery/Categories';
import { FullGallery } from '@/components/gallery/FullGallery';
import { Lightbox } from '@/components/lightbox/Lightbox';
import { StorySection } from '@/components/sections/StorySection';
import { PhotographerSection } from '@/components/sections/PhotographerSection';
import { ContactForm } from '@/components/contact/ContactForm';
import { Footer } from '@/components/layout/Footer';
import photosData from '@/data/photos.json';
import { Photo } from '@/types';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<Photo | null>(null);

  const handleOpenLightbox = (photo: Photo) => {
    setActiveLightboxPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxPhoto(null);
  };

  const handleNavigateLightbox = (index: number) => {
    const currentList =
      selectedCategory === 'All'
        ? photosData.photos
        : photosData.photos.filter((p) => p.category === selectedCategory);
    if (index >= 0 && index < currentList.length) {
      setActiveLightboxPhoto(currentList[index] as Photo);
    }
  };

  const currentGalleryPhotos =
    selectedCategory === 'All'
      ? (photosData.photos as Photo[])
      : (photosData.photos.filter((p) => p.category === selectedCategory) as Photo[]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-sans">
      <CustomCursor />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <IntroSection />
        <FeaturedWork onOpenLightbox={handleOpenLightbox} />
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <FullGallery
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenLightbox={handleOpenLightbox}
        />
        <StorySection />
        <PhotographerSection />
        <ContactForm />
      </main>

      <Footer />

      <Lightbox
        photo={activeLightboxPhoto}
        photos={currentGalleryPhotos}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
};

export default App;
