import React from "react";
import "./Banner.css";

interface BannerProps {
  className?: string;
}

export const Banner = ({ className = "" }: BannerProps) => (
  <div className={`announcement-banner ${className}`}>
    <p>This is a banner announcement</p>
  </div>
);
