"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ABOUT_ME_SLIDES, TOPICS, Slide } from "../data/slides";

type ViewMode = "intro" | "index" | "topic";

export default function PresentationViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>("intro");
  const [introIndex, setIntroIndex] = useState(0);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("printhub");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isThankYou, setIsThankYou] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === "Escape" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        handleGoToIndex();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, handleGoToIndex]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
        setIsFullscreen(false);
      }
    }
  };

  const progressPercentage =
    viewMode === "intro"
      ? ((introIndex + 1) / ABOUT_ME_SLIDES.length) * 100
      : viewMode === "topic"
        ? isThankYou
          ? 100
          : ((currentSlideIndex + 1) / activeTopic.slides.length) * 100
        : 0;

  return (
    <div className="flex flex-col w-full h-screen bg-bg-default text-text-primary font-sans overflow-hidden select-none relative">
      {/* 1. TOP PROGRESS BAR FIXED AT VERY TOP OF PAGE */}
      <div className="fixed top-0 left-0 right-0 w-full h-1 bg-bg-tertiary z-50">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* 2. TOP-LEFT EXPANDED NAVIGATION PILLS (ABOUT ME & INDEX) */}
      <div className="fixed top-4 left-4 z-50 flex items-center bg-bg-default/90 backdrop-blur-md p-1 rounded-full border border-outline shadow-xs text-xs font-nav">
        <button
          onClick={() => {
            setViewMode("intro");
            setIntroIndex(0);
          }}
          className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === "intro"
            ? "bg-primary-muted text-primary font-semibold shadow-xs"
            : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
        >
          ABOUT ME
        </button>
        <button
          onClick={handleGoToIndex}
          className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === "index"
            ? "bg-primary-muted text-primary font-semibold shadow-xs"
            : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
        >
          INDEX
        </button>
      </div>

      {/* 3. TOP-RIGHT FLOATING ACTION BUTTON (FULLSCREEN FAB) */}
      {/* <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-bg-default aspect-square hover:bg-bg-secondary backdrop-blur-md border border-outline shadow-xs text-text-secondary hover:text-text-primary transition-all cursor-pointer"
          title="Toggle Fullscreen"
        >
          <span className="material-symbols-rounded">
            {isFullscreen ? "fullscreen_exit" : "fullscreen"}
          </span>
        </button>
      </div> */}

      {/* MAIN CANVAS SURFACE */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto scrollable-element bg-bg-default pt-16">
        {/* ==================== 1. INTRO / ABOUT ME VIEW ==================== */}
        {viewMode === "intro" && (
          <div className="w-full max-w-5xl flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-mono-md text-text-secondary">
                Hello, I'm Ishad
              </span>

              <h1 className="font-h1 text-text-primary text-4xl md:text-5xl font-bold tracking-tight">
                {ABOUT_ME_SLIDES[introIndex].title}
              </h1>

              <p className="font-body-lg text-text-secondary">
                {ABOUT_ME_SLIDES[introIndex].subtitle}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center border-t border-outline pt-8">
              <div className="flex-1 flex flex-col gap-4">
                <p className="font-mono-md text-text-secondary leading-relaxed">
                  {ABOUT_ME_SLIDES[introIndex].bio}
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  {ABOUT_ME_SLIDES[introIndex].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-text-primary">
                      <span className="material-symbols-rounded text-primary text-base">check_circle</span>
                      <span className="font-body-sm">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline">
                  {ABOUT_ME_SLIDES[introIndex].stats.map((s, i) => (
                    <div key={i} className="flex flex-col p-4 bg-bg-secondary rounded-2xl border border-outline">
                      <span className="font-h2 text-primary">{s.value}</span>
                      <span className="font-mono-sm text-xs text-text-secondary">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-[360px] h-[300px] relative rounded-2xl overflow-hidden border border-outline bg-bg-tertiary">
                <Image
                  src={ABOUT_ME_SLIDES[introIndex].imageUrl}
                  alt={ABOUT_ME_SLIDES[introIndex].title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. INDEX HUB VIEW ==================== */}
        {viewMode === "index" && (
          <div className="w-full max-w-5xl flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono-md text-text-secondary">
                &gt; Case Studies & Topic Decks
              </span>
              <h1 className="font-h1 text-text-primary">Presentation Index</h1>
              <p className="font-body-md text-text-secondary max-w-2xl">
                Click any topic below to jump directly into its full presentation deck (15-20 slides per topic with visual breakdowns).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {TOPICS.map((topic, index) => (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  className="group flex flex-col bg-bg-default border border-outline hover:border-primary rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-bg-secondary"
                >
                  <div className="w-full h-[180px] relative overflow-hidden bg-bg-tertiary">
                    <Image
                      src={topic.coverImage}
                      alt={topic.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-mono-sm font-semibold">
                      {topic.slideCount} Slides
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 gap-3">
                    <span className="font-mono-sm text-xs text-primary font-semibold">
                      TOPIC 0{index + 1}
                    </span>
                    <h2 className="font-h3 text-text-primary group-hover:text-primary transition-colors">
                      {topic.title}
                    </h2>
                    <p className="font-body-sm text-text-secondary leading-relaxed flex-1">
                      {topic.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-outline mt-2">
                      <span className="font-mono-sm text-xs text-text-tertiary">
                        {topic.category}
                      </span>
                      <span className="font-body-sm-bold text-xs text-primary group-hover:translate-x-1 transition-transform">
                        Open Deck →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 3. TOPIC SLIDE VIEW (EDGE-TO-EDGE IN BG-PRIMARY) ==================== */}
        {viewMode === "topic" && !isThankYou && activeSlide && (
          selectedTopicId === "printhub" || selectedTopicId === "youtube" || selectedTopicId === "wellplayed" ? (
            /* Full-screen Edge-to-Edge Image for Image Case Study Decks */
            <div className="w-full h-full relative rounded-2xl overflow-hidden">
              <Image
                src={activeSlide.imageUrl}
                alt={activeSlide.imageAlt || activeSlide.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          ) : (
            /* Standard Split Layout for other topic decks */
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[500px]">
              {/* Left Column: Image Display */}
              <div className="w-full md:w-[50%] flex flex-col items-center justify-center">
                <div className="w-full h-[280px] sm:h-[360px] md:h-[440px] relative rounded-2xl overflow-hidden border border-outline bg-bg-secondary">
                  <Image
                    src={activeSlide.imageUrl}
                    alt={activeSlide.imageAlt || activeSlide.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {activeSlide.imageCaption && (
                  <p className="font-mono-sm text-xs text-text-secondary pt-3 text-center">
                    {activeSlide.imageCaption}
                  </p>
                )}
              </div>

              {/* Right Column: Slide Text & Content */}
              <div className="w-full md:w-[50%] flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-sm text-xs px-3 py-1 rounded-full bg-primary-muted text-primary font-semibold">
                      {activeTopic.title}
                    </span>
                  </div>

                  <h1 className="font-h1 text-text-primary">
                    {activeSlide.title}
                  </h1>

                  {activeSlide.subtitle && (
                    <p className="font-mono-md text-primary font-medium">
                      {activeSlide.subtitle}
                    </p>
                  )}

                  <p className="font-body-md text-text-secondary leading-relaxed">
                    {activeSlide.description}
                  </p>

                  {activeSlide.highlights && activeSlide.highlights.length > 0 && (
                    <div className="flex flex-col gap-2 pt-3 bg-bg-secondary p-4 rounded-2xl border border-outline">
                      <span className="font-mono-sm text-xs text-text-secondary font-semibold uppercase tracking-wider">
                        Key Takeaways
                      </span>
                      {activeSlide.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-text-primary">
                          <span className="material-symbols-rounded text-primary text-base">check_circle</span>
                          <span className="font-body-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}

        {/* ==================== 4. THANK YOU PAGE (END OF TOPIC) ==================== */}
        {viewMode === "topic" && isThankYou && (
          <div className="w-full max-w-3xl flex flex-col items-center text-center gap-6 py-8">
            <div className="w-16 h-16 rounded-full bg-primary-muted flex items-center justify-center text-primary">
              <span className="material-symbols-rounded text-3xl">task_alt</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono-sm text-xs px-3 py-1 rounded-full bg-success-bg text-success-fg font-semibold w-fit mx-auto">
                Topic Complete
              </span>
              <h1 className="font-h1 text-text-primary">Thank You!</h1>
              <p className="font-h3 text-primary">
                {activeTopic.thankYouMessage}
              </p>
            </div>

            <p className="font-body-md text-text-secondary max-w-lg">
              You have completed all {activeTopic.slides.length} slides for this topic. Click below to return to the presentation index page.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={handleGoToIndex}
                className="px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-text-inverse font-body-sm-bold flex items-center gap-2 transition-all cursor-pointer text-base"
              >
                <span className="material-symbols-rounded text-xl">grid_view</span>
                ← Return to Presentation Index
              </button>

              <button
                onClick={() => {
                  const currentIndex = TOPICS.findIndex((t) => t.id === selectedTopicId);
                  const nextIndex = (currentIndex + 1) % TOPICS.length;
                  handleSelectTopic(TOPICS[nextIndex].id);
                }}
                className="px-6 py-3.5 rounded-full bg-bg-tertiary hover:bg-bg-secondary text-text-primary font-body-sm-bold transition-colors cursor-pointer text-base"
              >
                Next Topic →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MINIMAL FLOATING NEXT & BACK CONTROLS AT BOTTOM RIGHT */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-bg-default/90 backdrop-blur-md p-1.5 rounded-full border border-outline shadow-sm">
        <button
          onClick={handlePrevSlide}
          className="w-9 h-9 rounded-full bg-bg-default  text-text-tertiary hover:bg-bg-tertiary flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          title="Previous Slide (←)"
        >
          <span className="material-symbols-rounded text-xl">arrow_back</span>
        </button>

        <button
          onClick={handleNextSlide}
          className="w-9 h-9 rounded-full bg-bg-default text-text-tertiary hover:bg-bg-tertiary flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          title="Next Slide (→)"
        >
          <span className="material-symbols-rounded text-xl">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
