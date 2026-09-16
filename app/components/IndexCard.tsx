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
      className="flex-1 pb-4 flex flex-col justify-start items-start cursor-pointer gap-3.5 group rounded-2xl overflow-hidden bg-bg-default transition-all duration-300 hover:bg-bg-secondary p-2 border border-transparent hover:border-outline"
    >
      <div className="w-full flex flex-col gap-3">
        <div className="relative w-full aspect-video bg-bg-tertiary rounded-xl overflow-hidden border border-outline">
          {coverImage && (
            <Image
              src={coverImage}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform w-full duration-500 ease-out group-hover:scale-[1.03]"
              unoptimized
            />
          )}
          {slideCount !== undefined && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-mono-sm font-semibold border border-primary/20 backdrop-blur-sm">
              {slideCount} Slides
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 px-2 pb-1">
          {category && (
            <span className="font-mono-sm text-text-tertiary">
              {category}
            </span>
          )}
          <h3 className="w-full text-text-primary font-cs-h4 text-left group-hover:text-primary transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="font-cs-body text-xs text-text-secondary line-clamp-2 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexCard;

