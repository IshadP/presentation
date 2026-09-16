"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ABOUT_ME_SLIDES, TOPICS, Slide } from "../data/slides";
import IndexCard from "./IndexCard";

type ViewMode = "intro" | "index" | "topic";

export default function PresentationViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>("index");
  const [introIndex, setIntroIndex] = useState(0);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("printhub");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isThankYou, setIsThankYou] = useState(false);
  const [hideUI, setHideUI] = useState(false);
  const [focusedTopicIndex, setFocusedTopicIndex] = useState(0);

  const shouldReduceMotion = useReducedMotion();
  const activeTopic = TOPICS.find((t) => t.id === selectedTopicId) || TOPICS[0];
  const activeSlide: Slide | undefined = activeTopic.slides[currentSlideIndex];

  // Navigation handlers
  const handleGoToIndex = useCallback(() => {
    setViewMode("index");
    setIsThankYou(false);
  }, []);

  const handleSelectTopic = useCallback((topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentSlideIndex(0);
    setIsThankYou(false);
    setViewMode("topic");
  }, []);

  const handleNextSlide = useCallback(() => {
    if (viewMode === "index") {
      setFocusedTopicIndex((prev) => Math.min(prev + 1, TOPICS.length - 1));
      return;
    }
    if (viewMode === "intro") {
      if (introIndex < ABOUT_ME_SLIDES.length - 1) {
        setIntroIndex((prev) => prev + 1);
      } else {
        setViewMode("index");
      }
    } else if (viewMode === "topic") {
      if (isThankYou) {
        const currentIndex = TOPICS.findIndex((t) => t.id === selectedTopicId);
        if (currentIndex < TOPICS.length - 1) {
          handleSelectTopic(TOPICS[currentIndex + 1].id);
        } else {
          handleGoToIndex();
        }
      } else if (currentSlideIndex < activeTopic.slides.length - 1) {
        setCurrentSlideIndex((prev) => prev + 1);
      } else {
        setIsThankYou(true);
      }
    }
  }, [viewMode, introIndex, isThankYou, currentSlideIndex, activeTopic.slides.length, selectedTopicId, handleSelectTopic, handleGoToIndex]);

  const handlePrevSlide = useCallback(() => {
    if (viewMode === "index") {
      setFocusedTopicIndex((prev) => Math.max(prev - 1, 0));
      return;
    }
    if (viewMode === "intro") {
      if (introIndex > 0) {
        setIntroIndex((prev) => prev - 1);
      }
    } else if (viewMode === "topic") {
      if (isThankYou) {
        setIsThankYou(false);
        setCurrentSlideIndex(activeTopic.slides.length - 1);
      } else if (currentSlideIndex > 0) {
        setCurrentSlideIndex((prev) => prev - 1);
      } else {
        setViewMode("index");
      }
    }
  }, [viewMode, introIndex, isThankYou, currentSlideIndex, activeTopic.slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || (e.key === " " && viewMode !== "index")) {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === "Enter" && viewMode === "index") {
        e.preventDefault();
        handleSelectTopic(TOPICS[focusedTopicIndex].id);
      } else if (e.key === "Escape" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        handleGoToIndex();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, handleGoToIndex, handleSelectTopic, viewMode, focusedTopicIndex]);

  const progressPercentage =
    viewMode === "intro"
      ? ((introIndex + 1) / ABOUT_ME_SLIDES.length) * 100
      : viewMode === "topic"
        ? isThankYou
          ? 100
          : ((currentSlideIndex + 1) / activeTopic.slides.length) * 100
        : 0;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-bg-default text-text-primary overflow-x-hidden antialiased relative">
      {/* 1. TOP PROGRESS BAR */}
      {!hideUI && (
        <div className="fixed top-0 left-0 right-0 w-full h-1 bg-bg-tertiary z-50">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      {/* 2. TOP NAVIGATION PILLS */}
      {!hideUI && (
        <header className="fixed top-4 left-4 md:left-8 z-50 flex items-center bg-bg-default/90 backdrop-blur-md p-1 rounded-full border border-outline shadow-xs text-xs font-nav">
          <button
            onClick={() => {
              setViewMode("intro");
              setIntroIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === "intro"
                ? "bg-primary-muted text-primary font-semibold shadow-xs"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
          >
            ABOUT ME
          </button>
          <button
            onClick={handleGoToIndex}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === "index"
                ? "bg-primary-muted text-primary font-semibold shadow-xs"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
          >
            INDEX
          </button>
        </header>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="w-full flex-1 flex flex-col items-center justify-center relative">
        {/* ==================== 1. INTRO / ABOUT ME VIEW ==================== */}
        {viewMode === "intro" && (
          <div className="w-full max-w-[45rem] mx-auto px-4 md:px-0 text-left pt-20 pb-28">
            <div className="flex items-center gap-1.5 w-full py-2 font-mono-sm text-text-tertiary">
              <span>&gt;</span>
              <span>ABOUT THE DESIGNER</span>
            </div>

            <h1 className="font-hero-h1 mt-4">
              {ABOUT_ME_SLIDES[introIndex].title}
            </h1>

            <p className="font-cs-body mt-4 text-lg md:text-xl text-text-secondary">
              {ABOUT_ME_SLIDES[introIndex].subtitle}
            </p>

            {/* Media Breakout */}
            <div className="w-[50rem] max-w-[calc(100vw-2rem)] relative left-1/2 -translate-x-1/2 rounded-xl overflow-hidden bg-bg-tertiary border border-outline my-10 aspect-video md:aspect-[16/9]">
              <Image
                src={ABOUT_ME_SLIDES[introIndex].imageUrl}
                alt={ABOUT_ME_SLIDES[introIndex].title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>

            {/* Overview & Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-10 md:mt-14 pb-8 mb-12 border-b border-outline">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="font-mono-sm text-text-tertiary block">ROLE</span>
                  <span className="font-sans text-[0.9375rem] font-medium text-text-primary mt-1 block">
                    {ABOUT_ME_SLIDES[introIndex].role}
                  </span>
                </div>
                <div>
                  <span className="font-mono-sm text-text-tertiary block">STATUS</span>
                  <span className="font-sans text-[0.9375rem] font-medium text-text-primary mt-1 block">
                    Open to Senior / Lead Roles
                  </span>
                </div>
                <div>
                  <span className="font-mono-sm text-text-tertiary block">SLIDE</span>
                  <span className="font-sans text-[0.9375rem] font-medium text-text-primary mt-1 block">
                    0{introIndex + 1} / 0{ABOUT_ME_SLIDES.length}
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-4">
                <h2 className="font-cs-h2 text-text-primary">
                  Craft, Precision, & Engineering
                </h2>
                <p className="font-cs-body text-base leading-7">
                  {ABOUT_ME_SLIDES[introIndex].bio}
                </p>
              </div>
            </div>

            {/* Highlights and Metrics */}
            <div className="flex items-center gap-1.5 w-full py-2 font-mono-sm text-text-tertiary mt-8">
              <span>&gt;</span>
              <span>CORE CAPABILITIES</span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {ABOUT_ME_SLIDES[introIndex].highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-text-primary py-1">
                  <span className="material-symbols-rounded text-primary text-xl select-none mt-0.5">
                    check_circle
                  </span>
                  <span className="font-cs-body text-neutral-800 font-medium">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {ABOUT_ME_SLIDES[introIndex].stats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col p-5 bg-bg-secondary rounded-xl border border-outline"
                >
                  <span className="font-hero-h1 text-primary text-3xl md:text-4xl">
                    {s.value}
                  </span>
                  <span className="font-mono-sm text-text-secondary mt-1">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-0 border-t border-outline my-12" />

            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevSlide}
                disabled={introIndex === 0}
                className="px-5 py-2.5 rounded-full border border-outline bg-bg-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed font-nav text-sm text-text-primary transition-colors cursor-pointer"
              >
                ← Previous
              </button>

              <button
                onClick={handleNextSlide}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-text-inverse font-nav text-sm transition-colors cursor-pointer"
              >
                {introIndex < ABOUT_ME_SLIDES.length - 1 ? "Next Slide →" : "View Index →"}
              </button>
            </div>
          </div>
        )}

        {/* ==================== 2. INDEX HUB VIEW ==================== */}
        {viewMode === "index" && (
          <div className="w-full flex flex-col justify-center min-h-screen overflow-hidden pl-6 md:pl-16 pt-16 pb-20">
            <div className="flex flex-col gap-3 mb-10 max-w-2xl">
              <div className="flex items-center gap-1.5 font-mono-sm text-text-tertiary">
                <span>&gt;</span>
                <span>SELECTED WORKS & TOPIC DECKS</span>
              </div>
              <h1 className="font-hero-h1 text-text-primary">
                Presentation Index
              </h1>
              <p className="font-cs-body text-text-secondary text-base md:text-lg">
                Use <span className="font-jet text-[0.875em] bg-bg-tertiary px-1.5 py-0.5 rounded border border-outline text-text-primary">←</span> <span className="font-jet text-[0.875em] bg-bg-tertiary px-1.5 py-0.5 rounded border border-outline text-text-primary">→</span> to browse, and <span className="font-jet text-[0.875em] bg-bg-tertiary px-1.5 py-0.5 rounded border border-outline text-text-primary">Enter</span> to open a deck.
              </p>
            </div>

            {/* Carousel track */}
            <div className="relative w-full overflow-visible">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(calc(-${focusedTopicIndex} * (min(880px, 80vw) + 1.5rem)))`,
                }}
              >
                {TOPICS.map((topic, index) => {
                  const isFocused = index === focusedTopicIndex;
                  return (
                    <div
                      key={topic.id}
                      className={`w-[80vw] md:w-[880px] shrink-0 transition-all duration-500 ease-out ${
                        isFocused
                          ? "scale-100 opacity-100"
                          : "scale-[0.96] opacity-50 hover:opacity-75"
                      }`}
                    >
                      <IndexCard
                        title={topic.title}
                        subtitle={topic.subtitle}
                        category={topic.category}
                        coverImage={topic.coverImage}
                        slideCount={topic.slideCount}
                        onClick={() => {
                          if (isFocused) {
                            handleSelectTopic(topic.id);
                          } else {
                            setFocusedTopicIndex(index);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination / dot indicators */}
            <div className="flex items-center gap-2 mt-8">
              {TOPICS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFocusedTopicIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === focusedTopicIndex
                      ? "bg-primary w-8"
                      : "bg-outline hover:bg-text-tertiary w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
              <span className="ml-4 font-mono-sm text-text-tertiary">
                0{focusedTopicIndex + 1} / 0{TOPICS.length}
              </span>
            </div>
          </div>
        )}

        {/* ==================== 3. TOPIC SLIDE VIEW ==================== */}
        {viewMode === "topic" && !isThankYou && activeSlide && (
          selectedTopicId === "printhub" ||
          selectedTopicId === "youtube" ||
          selectedTopicId === "wellplayed" ||
          selectedTopicId === "zoop" ||
          selectedTopicId === "grid-insight" ? (
            /* Full-screen Edge-to-Edge Image Presentation with Subtle Floating Header */
            <div className="w-full h-screen relative overflow-hidden bg-bg-default flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={activeSlide.imageUrl}
                    alt={activeSlide.imageAlt || activeSlide.title || `${activeTopic.title} slide ${currentSlideIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating slide indicator at top-right */}
              {!hideUI && (
                <div className="fixed top-4 right-4 z-40 flex items-center gap-2 bg-bg-default/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-outline shadow-xs">
                  <span className="font-mono-sm text-text-primary">
                    {activeTopic.title}
                  </span>
                  <span className="text-text-tertiary">/</span>
                  <span className="font-mono-sm text-primary font-semibold">
                    {currentSlideIndex + 1} of {activeTopic.slides.length}
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Split layout for editorial slides */
            <div className="w-full max-w-[50rem] mx-auto px-4 md:px-0 text-left pt-20 pb-28">
              <div className="flex items-center gap-1.5 w-full py-2 font-mono-sm text-text-tertiary">
                <span>&gt;</span>
                <span>{activeTopic.category || activeTopic.title}</span>
              </div>

              <h1 className="font-cs-h1 text-left mt-4">
                {activeSlide.title}
              </h1>

              {activeSlide.subtitle && (
                <p className="font-cs-h5 mt-2 text-primary font-medium">
                  {activeSlide.subtitle}
                </p>
              )}

              {/* Breakout Media */}
              <div className="w-[50rem] max-w-[calc(100vw-2rem)] relative left-1/2 -translate-x-1/2 rounded-xl overflow-hidden bg-bg-tertiary border border-outline my-10 aspect-video">
                <Image
                  src={activeSlide.imageUrl}
                  alt={activeSlide.imageAlt || activeSlide.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {activeSlide.imageCaption && (
                <p className="font-mono-sm text-center text-text-secondary -mt-6 mb-8">
                  {activeSlide.imageCaption}
                </p>
              )}

              <p className="font-cs-body text-lg leading-8 mt-6">
                {activeSlide.description}
              </p>

              {activeSlide.highlights && activeSlide.highlights.length > 0 && (
                <div className="mt-8 bg-bg-secondary p-6 rounded-xl border border-outline">
                  <span className="font-mono-sm text-text-secondary uppercase tracking-wider block mb-3">
                    Key Highlights
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {activeSlide.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-text-primary">
                        <span className="material-symbols-rounded text-primary text-lg mt-0.5">
                          check_circle
                        </span>
                        <span className="font-cs-body text-neutral-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}

        {/* ==================== 4. UPCOMING CASE STUDY VIEW ==================== */}
        {viewMode === "topic" && isThankYou && (() => {
          const currentIndex = TOPICS.findIndex((t) => t.id === selectedTopicId);
          const nextIndex = (currentIndex + 1) % TOPICS.length;
          const nextTopic = TOPICS[nextIndex];

          return (
            <div className="w-full max-w-[50rem] mx-auto px-6 text-center flex flex-col items-center justify-center py-16 md:py-24">
              {/* Section Eyebrow Centered */}
              <div className="inline-flex items-center justify-center gap-1.5 font-mono-sm text-text-tertiary mx-auto">
                <span>&gt;</span>
                <span>UPCOMING CASE STUDY</span>
              </div>

              {/* Editorial Heading Centered */}
              <h1 className="font-hero-h1 text-text-primary text-3xl md:text-5xl mt-4 text-center">
                {nextTopic.title}
              </h1>

              <p className="font-cs-body text-text-secondary text-base md:text-lg max-w-lg mt-3 text-center mx-auto">
                {nextTopic.subtitle}
              </p>

              {/* Photo Breakout Container - Clean centered container without negative left transform shift */}
              <div
                onClick={() => handleSelectTopic(nextTopic.id)}
                className="w-full max-w-[50rem] relative rounded-2xl overflow-hidden bg-bg-tertiary border border-outline mt-8 mb-8 aspect-video group cursor-pointer shadow-xs hover:border-primary/40 transition-all duration-300 mx-auto"
              >
                {nextTopic.coverImage && (
                  <Image
                    src={nextTopic.coverImage}
                    alt={`${nextTopic.title} preview`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    unoptimized
                    priority
                  />
                )}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-bg-default/90 backdrop-blur-md text-primary text-xs font-mono-sm font-semibold border border-outline shadow-xs">
                  {nextTopic.slideCount} Slides
                </div>
              </div>

              {/* Action Buttons Centered */}
              <div className="flex items-center justify-center gap-4 mx-auto">
                <button
                  onClick={() => handleSelectTopic(nextTopic.id)}
                  className="px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-text-inverse font-nav text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <span className="material-symbols-rounded text-xl">play_arrow</span>
                  Start Case Study
                </button>

                <button
                  onClick={handleGoToIndex}
                  className="px-6 py-3.5 rounded-full bg-bg-secondary hover:bg-bg-tertiary text-text-primary font-nav text-sm border border-outline transition-colors cursor-pointer"
                >
                  Index
                </button>
              </div>
            </div>
          );
        })()}


      </main>

      {/* FLOATING CONTROLS AT BOTTOM RIGHT */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-bg-default/90 backdrop-blur-md p-1.5 rounded-full border border-outline shadow-sm">
        <button
          onClick={() => setHideUI((prev) => !prev)}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            hideUI
              ? "bg-text-secondary text-text-inverse"
              : "bg-bg-default text-text-tertiary hover:text-text-primary hover:bg-bg-secondary"
          }`}
          title={hideUI ? "Show UI" : "Hide UI"}
          aria-label={hideUI ? "Show UI" : "Hide UI"}
        >
          <span className="material-symbols-rounded text-xl">
            {hideUI ? "visibility_off" : "visibility"}
          </span>
        </button>

        <button
          onClick={handlePrevSlide}
          className="w-9 h-9 rounded-full bg-bg-default text-text-tertiary hover:bg-bg-secondary hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
          title="Previous Slide (←)"
          aria-label="Previous Slide"
        >
          <span className="material-symbols-rounded text-xl">arrow_back</span>
        </button>

        <button
          onClick={handleNextSlide}
          className="w-9 h-9 rounded-full bg-bg-default text-text-tertiary hover:bg-bg-secondary hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
          title="Next Slide (→)"
          aria-label="Next Slide"
        >
          <span className="material-symbols-rounded text-xl">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

