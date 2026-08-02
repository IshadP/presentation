"use client";

import React from "react";
import Image from "next/image";

export interface IndexCardProps {
  title: string;
  subtitle?: string;
  category?: string;
  coverImage?: string;
  slideCount?: number;
  tags?: string[];
  onClick?: () => void;
}

export const IndexCard: React.FC<IndexCardProps> = ({
  title,
  subtitle,
  category,
  coverImage,
  slideCount,
  tags,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex-1 pb-4 md:rounded-2xl flex flex-col justify-start items-start cursor-pointer gap-3 group rounded-2xl overflow-hidden bg-bg-default transition-all duration-300 hover:bg-bg-secondary"
    >
      <div className="w-full flex flex-col gap-3">
        <div className="relative w-full aspect-video bg-bg-tertiary rounded-2xl overflow-hidden">
          {coverImage && (
            <Image
              src={coverImage}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform w-full duration-500 ease-out group-hover:scale-105"
              unoptimized
            />
          )}
          {slideCount !== undefined && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-mono-sm font-semibold">
              {slideCount} Slides
            </div>
          )}
        </div>
        <h3 className="w-full text-text-primary font-h4 px-4">{title}</h3>
      </div>
    </div>
  );
};

export default IndexCard;
