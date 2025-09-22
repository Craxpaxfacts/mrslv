// src/components/ProjectCarousel.jsx (ФИНАЛЬНАЯ ВЕРСИЯ)

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
// Убираем ElectricCard для унификации стиля всех карточек
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import GlowCard from './GlowCard';
import ElasticSlider from './ElasticSlider';
import { setVolume01, getVolume01 } from '../lib/audioController';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './ProjectCarousel.css';

// Компоненты иконок и карточки с оверлеем и слайдером громкости
const NormalCard = ({ track, isPlaying, isActive, onClick }) => (
  <div className={`normal-card ${isActive ? 'is-active' : ''}`} onClick={onClick}>
    <img src={track.cover} alt="Album Cover" />
    <div className="overlay">
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
      <div style={{ position: 'absolute', bottom: 10 }} onClick={(e) => e.stopPropagation()}>
        <ElasticSlider
          startingValue={0}
          defaultValue={Math.round(getVolume01() * 100)}
          maxValue={100}
          isStepped
          stepSize={1}
          onChange={(val) => setVolume01(val / 100)}
        />
      </div>
    </div>
  </div>
);
const PlayIcon = () => <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M8 5V19L19 12L8 5Z" /></svg>;
const PauseIcon = () => <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" /></svg>;


const ProjectCarousel = ({ tracks, projectId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const { isPlaying, currentIndex, playAt } = useAudioPlayer(`carousel-${projectId}`);

  // --- 👇 УМНАЯ ЛОГИКА ДЛЯ LOOP 👇 ---
  const isLoopEnabled = tracks.length > 3;

  return (
    <div className="project-carousel-container">
      <div className="carousel-viewport">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={isLoopEnabled}
        initialSlide={1}
        noSwipingSelector={'.swiper-no-swiping'}
        coverflowEffect={{ rotate: 35, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
        breakpoints={{
          // Mobile-first: немного мягче перспектива на узких экранах
          0: {
            coverflowEffect: { rotate: 18, stretch: 0, depth: 70, modifier: 1, slideShadows: false },
          },
          768: {
            coverflowEffect: { rotate: 35, stretch: 0, depth: 100, modifier: 1, slideShadows: false },
          },
        }}
        // pagination={{ clickable: true }} //  <-- ОТКЛЮЧАЕМ ТОЧКИ, ЧТОБЫ НЕ МЕШАЛИ
        navigation={true}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Этот хак решает проблему с первоначальным позиционированием в loop-режиме
          setTimeout(() => {
            if (swiper && !swiper.destroyed) {
              swiper.slideToLoop(0, 0); 
              setActiveIndex(swiper.realIndex);
            }
          }, 50);
        }}
        onSlideChange={(swiper) => {
          if (swiper && !swiper.destroyed) {
            setActiveIndex(swiper.realIndex);
            // После смены активного слайда инициируем обновление glow у всех карточек
            // Высылаем искусственное событие pointermove c текущими координатами курсора
            if (typeof window !== 'undefined' && 'MouseEvent' in window) {
              try {
                const e = new MouseEvent('pointermove', {
                  clientX: window.__lastPointerX || 0,
                  clientY: window.__lastPointerY || 0,
                });
                document.dispatchEvent(e);
              } catch {}
            }
          }
        }}
      >
        {tracks.map((track, index) => (
          <SwiperSlide key={index}>
            {/* ... (логика выбора карточки остаётся без изменений) ... */}
            {projectId === 'cognesthetic' ? (
              <GlowCard glowColor="purple" className="normal-card-wrapper">
                <NormalCard
                  track={track}
                  isPlaying={isPlaying && currentIndex === index}
                  isActive={activeIndex === index}
                  onClick={() => {
                    if (activeIndex === index) {
                      const src = tracks[index].audio;
                      playAt(src, index);
                    }
                  }}
                />
              </GlowCard>
            ) : (
              <GlowCard glowColor="purple" className="normal-card-wrapper">
                <NormalCard
                  track={track}
                  isPlaying={isPlaying && currentIndex === index}
                  isActive={activeIndex === index}
                  onClick={() => {
                    if (activeIndex === index) {
                      const src = tracks[index].audio;
                      playAt(src, index);
                    }
                  }}
                />
              </GlowCard>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default ProjectCarousel;