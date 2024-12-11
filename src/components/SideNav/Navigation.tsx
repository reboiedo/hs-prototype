import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavigationMenu } from "./NavigationMenu";
import { NavigationProvider } from "./context/NavigationContext";
import { Banner } from "./components/Banner/Banner";
import type { NavigationProps } from "./types/navigation";
import "./Navigation.css";

const Navigation = ({ showBanner = true }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(showBanner);
  const [isWhiteVariant, setIsWhiteVariant] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      lastScrollY.current = window.scrollY;
      // Add styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${lastScrollY.current}px`;
      document.body.style.width = "100%";
    } else {
      // Remove styles and restore scroll position
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, lastScrollY.current);
    }
  }, [isOpen]);

  const handleScroll = useCallback(() => {
    if (!ticking.current && !isOpen) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const shouldHide = currentScroll > 40;
        const shouldBeWhite = currentScroll > window.innerHeight - 40; // Adjust this threshold as needed

        if (shouldHide !== !isVisible) {
          setIsVisible(!shouldHide);
        }
        if (shouldBeWhite !== isWhiteVariant) {
          setIsWhiteVariant(shouldBeWhite);
        }

        lastScrollY.current = currentScroll;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [isVisible, isWhiteVariant, isOpen]);

  useEffect(() => {
    // Handle resize with debounce
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
      }, 100);
    };

    // Initial setup
    setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(resizeTimer);
    };
  }, [handleScroll]);

  return (
    <NavigationProvider isOpen={isOpen} isMobile={isMobile}>
      {showBanner && <Banner className={!isVisible ? "banner-hidden" : ""} />}
      <header
        className={`header ${!isVisible ? "banner-hidden" : ""} ${
          isWhiteVariant ? "white-variant" : ""
        } ${isOpen ? "menu-open" : ""}`}
      >
        <div className="header-content">
          <div className="logo">
            <a href="/">
              <img
                src={
                  isOpen || !isWhiteVariant
                    ? "/src/icons/logo--white.svg"
                    : "/src/icons/logo--purple.svg"
                }
                alt="Harbour.Space"
              />
            </a>
          </div>
          <button
            className="menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
          <NavigationMenu isOpen={isOpen} isMobile={isMobile} />
        </div>
      </header>
    </NavigationProvider>
  );
};

export default Navigation;
