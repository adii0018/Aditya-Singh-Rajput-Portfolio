"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";
import { GithubIcon, LinkedinIcon } from "@/components/ui/GithubIcon";
import { personal } from "@/lib/data";
import "./astronaut-card.css";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 25"
      height={size}
      width={size}
    >
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={2}
        stroke="currentColor"
        d="M17.0459 7.5H17.0559M3.0459 12.5C3.0459 9.986 3.0459 8.73 3.3999 7.72C3.71249 6.82657 4.22237 6.01507 4.89167 5.34577C5.56096 4.67647 6.37247 4.16659 7.2659 3.854C8.2759 3.5 9.5329 3.5 12.0459 3.5C14.5599 3.5 15.8159 3.5 16.8269 3.854C17.7202 4.16648 18.5317 4.67621 19.201 5.34533C19.8702 6.01445 20.3802 6.82576 20.6929 7.719C21.0459 8.729 21.0459 9.986 21.0459 12.5C21.0459 15.014 21.0459 16.27 20.6929 17.28C20.3803 18.1734 19.8704 18.9849 19.2011 19.6542C18.5318 20.3235 17.7203 20.8334 16.8269 21.146C15.8169 21.5 14.5599 21.5 12.0469 21.5C9.5329 21.5 8.2759 21.5 7.2659 21.146C6.37268 20.8336 5.56131 20.324 4.89202 19.6551C4.22274 18.9862 3.71274 18.1751 3.3999 17.282C3.0459 16.272 3.0459 15.015 3.0459 12.501V12.5ZM15.8239 11.94C15.9033 12.4387 15.8829 12.9481 15.7641 13.4389C15.6453 13.9296 15.4304 14.392 15.1317 14.7991C14.833 15.2063 14.4566 15.5501 14.0242 15.8108C13.5917 16.0715 13.1119 16.2439 12.6124 16.318C12.1129 16.392 11.6037 16.3663 11.1142 16.2422C10.6248 16.1182 10.1648 15.8983 9.76082 15.5953C9.35688 15.2923 9.01703 14.9123 8.76095 14.4771C8.50486 14.0419 8.33762 13.5602 8.2689 13.06C8.13201 12.0635 8.39375 11.0533 8.99727 10.2487C9.6008 9.44407 10.4974 8.91002 11.4923 8.76252C12.4873 8.61503 13.5002 8.86599 14.3112 9.46091C15.1222 10.0558 15.6658 10.9467 15.8239 11.94Z"
      />
    </svg>
  );
}

export default function AstronautSocialCard({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const babyTravelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isReducedMotion() || !babyTravelRef.current || !containerRef.current) return;

    // Vector calculation from footer dock up to Contact 'Ready to build' anchor
    const getDelta = () => {
      const anchor = document.getElementById("contact-astronaut-anchor");
      const berth = containerRef.current;
      if (!anchor || !berth) return { deltaX: -180, deltaY: -700 };

      const anchorRect = anchor.getBoundingClientRect();
      const berthRect = berth.getBoundingClientRect();

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollX = window.scrollX || window.pageXOffset || 0;

      const anchorCenterX = anchorRect.left + scrollX + anchorRect.width / 2;
      const anchorCenterY = anchorRect.top + scrollY + anchorRect.height / 2;

      const berthCenterX = berthRect.left + scrollX + berthRect.width / 2;
      const berthCenterY = berthRect.top + scrollY + berthRect.height / 2;

      return {
        deltaX: anchorCenterX - berthCenterX,
        deltaY: anchorCenterY - berthCenterY,
      };
    };

    const mm = gsap.matchMedia();

    // Desktop & Tablet: Starts parallel to 'Ready to build' on the left side, glides down into footer dock
    mm.add("(min-width: 768px)", () => {
      const anchor = document.getElementById("contact-astronaut-anchor");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: anchor || "#contact",
          start: "top 75%",
          endTrigger: containerRef.current,
          end: "center 85%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        babyTravelRef.current,
        {
          x: () => getDelta().deltaX,
          y: () => getDelta().deltaY,
          rotate: -15,
          scale: 1.2,
          immediateRender: true,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          ease: "power1.inOut",
        }
      );
    });

    // Mobile: Responsive flight path
    mm.add("(max-width: 767px)", () => {
      const anchor = document.getElementById("contact-astronaut-anchor");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: anchor || "#contact",
          start: "top 70%",
          endTrigger: containerRef.current,
          end: "center 88%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        babyTravelRef.current,
        {
          x: () => getDelta().deltaX,
          y: () => getDelta().deltaY,
          rotate: -10,
          scale: 1.08,
          immediateRender: true,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          ease: "power1.inOut",
        }
      );
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => clearTimeout(timer);
  });

  return (
    <div ref={containerRef} className={`astronaut-card ${className}`}>
      {/* Outer wrapper: travels from 'Ready to build' into footer dock on scroll */}
      <div
        ref={babyTravelRef}
        className="relative w-full flex justify-center z-30 cursor-pointer pointer-events-auto"
        style={{ willChange: "transform" }}
      >
        {/* Inner element: keeps ambient continuous floating bob/tilt animation */}
        <Image
          className="image"
          alt="Baby Astronaut"
          src="/astronaut.png"
          width={160}
          height={190}
          style={{ width: "auto", height: "auto" }}
          unoptimized
          priority
        />
      </div>

      <div className="heading">We&apos;re on Social Media</div>
      <div className="icons">
        <a
          className="github-link"
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <GithubIcon size={18} />
        </a>
        <a
          className="linkedin-link"
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <LinkedinIcon size={18} />
        </a>
        <a
          className="instagram-link"
          href="https://www.instagram.com/adii0018"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <InstagramIcon size={18} />
        </a>
      </div>
    </div>
  );
}
