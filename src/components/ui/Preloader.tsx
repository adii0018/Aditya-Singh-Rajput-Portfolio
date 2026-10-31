"use client";

import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If user has already visited in this session, skip preloader immediately for instant component loading
    if (prefersReducedMotion || sessionStorage.getItem("portfolio-preloader-done")) {
      const skipFrame = window.requestAnimationFrame(() => {
        setIsDone(true);
        setIsRemoved(true);
      });
      return () => window.cancelAnimationFrame(skipFrame);
    }

    // Lock scroll on mount
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const HOLD = 120; // Swift hold time after name finishes (ms)

    const finishPreloader = () => {
      if (timerRef.current) return;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("portfolio-preloader-done", "true");
      }
      timerRef.current = setTimeout(() => {
        setIsDone(true);
        document.body.style.overflow = originalOverflow;
        setTimeout(() => {
          setIsRemoved(true);
        }, 500);
      }, HOLD);
    };

    // Listen for name animation completion
    const nameEl = nameRef.current;
    if (nameEl) {
      nameEl.addEventListener("animationend", finishPreloader);
    }

    // Fast safety fallback timer (max 1.1s) so components load without any delay
    const fallback = setTimeout(() => {
      finishPreloader();
    }, 1100);

    return () => {
      if (nameEl) {
        nameEl.removeEventListener("animationend", finishPreloader);
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(fallback);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleClickSkip = () => {
    if (!isDone) {
      setIsDone(true);
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        sessionStorage.setItem("portfolio-preloader-done", "true");
      }
      setTimeout(() => {
        setIsRemoved(true);
      }, 300);
    }
  };

  if (isRemoved) return null;

  return (
    <>
      <style>{`
        :root {
          --pl-bg: #0d1117;
          --pl-ink: #ffffff;
        }

        #preloader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          user-select: none;
          cursor: pointer;
        }

        #preloader .half {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          background: var(--pl-bg);
          transition: transform .5s cubic-bezier(.77,0,.18,1);
          will-change: transform;
        }

        #preloader .top {
          top: 0;
        }

        #preloader .bottom {
          bottom: 0;
        }

        #preloader.done .top {
          transform: translateY(-100%);
        }

        #preloader.done .bottom {
          transform: translateY(100%);
        }

        #preloader .content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 2.5vw, 24px);
          transition: opacity .3s ease, transform .4s ease;
          pointer-events: none;
        }

        #preloader.done .content {
          opacity: 0;
          transform: scale(.94);
        }

        #preloader svg {
          width: min(420px, 75vw);
          max-height: 38vh;
          height: auto;
          overflow: visible;
        }

        #preloader .logo {
          fill: none;
          stroke: var(--pl-ink);
          stroke-width: 9;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1 2;
          stroke-dashoffset: 1.02;
          animation: pl-draw .38s cubic-bezier(.65,0,.35,1) .05s forwards;
        }

        #preloader .l2 {
          animation-duration: .32s;
          animation-delay: .2s;
        }

        #preloader .l3 {
          animation-duration: .32s;
          animation-delay: .38s;
        }

        #preloader .name {
          margin: 0;
          color: var(--pl-ink);
          font: 500 clamp(0.85rem, 2.2vw, 1.2rem)/1.4 system-ui, -apple-system, 'Segoe UI', sans-serif;
          letter-spacing: .32em;
          text-indent: .32em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          animation: pl-name .35s ease 0.6s forwards;
          text-align: center;
        }

        @keyframes pl-name {
          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes pl-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #preloader .logo, #preloader .name {
            animation-duration: .01s;
            animation-delay: 0s;
          }
          #preloader .half, #preloader .content {
            transition-duration: .01s;
          }
        }
      `}</style>

      <div
        id="preloader"
        ref={preloaderRef}
        className={isDone ? "done" : ""}
        aria-label="Loading"
        onClick={handleClickSkip}
        title="Click to enter immediately"
      >
        <div className="half top" />
        <div className="half bottom" />
        <div className="content">
          <svg viewBox="320 125 930 370" role="img" aria-label="ASR">
            <path
              className="logo l1"
              pathLength={1}
              d="M487 147 C 472 151, 466 158, 461 170 L 410 296 L 447 311 L 500 183 L 590 420 L 498 385 C 486 381, 472 380, 458 382 C 432 384, 418 398, 408 422 L 388 467 L 345 467 C 356 436, 364 410, 384 384 C 404 358, 432 343, 460 343 C 490 343, 515 358, 545 380 L 582 458 C 590 468, 606 472, 620 464 C 636 454, 642 438, 636 418 L 541 172"
            />
            <path
              className="logo l2"
              pathLength={1}
              d="M924.3 213.7 L917.6 200.4 L909.2 188.6 L900.0 178.9 L889.2 170.1 L877.6 163.0 L865.4 157.3 L852.8 153.2 L839.4 150.3 L823.7 148.9 L810.2 149.2 L793.5 151.2 L781.0 154.1 L766.7 159.2 L755.6 164.7 L743.6 173.0 L734.6 181.5 L725.8 192.8 L719.9 204.1 L715.5 218.1 L713.8 230.1 L713.8 243.5 L715.9 256.5 L719.9 268.0 L723.0 274.0 L727.2 280.5 L734.5 289.1 L742.6 296.6 L751.6 303.3 L763.0 310.3 L774.9 316.3 L786.6 321.5 L836.3 341.0 L850.2 347.7 L859.3 353.2 L867.9 360.1 L873.5 366.7 L875.6 370.5 L877.0 374.5 L877.9 382.5 L876.5 391.2 L873.2 398.6 L867.3 405.5 L860.5 410.3 L851.8 414.3 L841.6 417.1 L830.1 418.8 L815.6 419.1 L803.1 418.1 L791.4 415.9 L780.7 412.5 L771.0 408.1 L760.6 401.3 L753.0 394.6 L746.2 386.7 L740.2 377.5 L703.8 398.5 L709.0 406.9 L714.8 414.7 L721.1 422.0 L727.9 428.7 L737.4 436.4 L745.8 442.0 L756.6 447.8 L768.4 452.7 L778.2 455.8 L791.1 458.7 L803.9 460.5 L817.2 461.2 L830.7 460.9 L843.3 459.5 L853.6 457.5 L865.7 453.9 L875.6 449.8 L884.5 444.9 L892.9 438.9 L900.5 431.7 L908.6 421.1 L913.8 411.4 L917.8 399.6 L919.7 386.9 L919.6 374.9 L917.6 363.5 L913.7 352.8 L906.8 341.0 L899.8 332.6 L891.8 325.2 L882.6 318.3 L870.5 310.9 L849.5 300.9 L795.3 279.4 L783.4 273.6 L773.1 267.1 L765.0 260.2 L761.4 256.0 L758.7 251.8 L756.9 247.3 L755.9 242.4 L755.8 231.3 L757.4 223.7 L760.3 217.0 L765.7 209.7 L771.5 204.5 L778.8 199.9 L787.7 196.0 L798.0 193.2 L806.6 191.7 L820.3 190.8 L833.1 191.8 L845.8 194.9 L855.7 199.0 L866.6 205.6 L874.3 212.4 L880.6 220.5 L885.7 230.3 L924.3 213.7Z"
            />
            <path
              className="logo l3"
              pathLength={1}
              d="M1075.7 194.3 L1091.6 193.8 L1107.8 194.5 L1123.4 196.6 L1137.7 200.2 L1147.1 203.9 L1157.6 209.9 L1165.3 217.0 L1168.2 221.0 L1170.6 225.5 L1173.1 233.3 L1174.0 239.4 L1174.0 245.1 L1173.0 252.4 L1171.7 256.5 L1169.1 261.8 L1165.5 266.4 L1160.9 270.6 L1154.9 274.4 L1147.8 277.8 L1139.5 280.8 L1130.2 283.1 L1109.7 286.1 L1087.9 287.0 L1088.1 329.0 L1102.5 328.7 L1191.0 450.4 L1225.0 425.6 L1149.3 321.6 L1159.4 318.4 L1167.3 315.2 L1175.0 311.3 L1182.4 306.8 L1189.3 301.6 L1195.8 295.5 L1201.6 288.5 L1205.0 283.6 L1209.4 275.3 L1212.3 267.6 L1215.5 253.1 L1216.1 242.8 L1215.9 235.7 L1213.0 219.7 L1208.7 207.7 L1204.2 199.3 L1200.4 193.6 L1190.7 182.9 L1178.5 173.3 L1165.1 165.9 L1150.2 160.2 L1131.4 155.4 L1111.2 152.7 L1096.9 151.9 L1082.5 151.9 L1055.4 154.2 L1051.2 155.1 L1047.2 157.0 L1043.8 159.6 L1040.9 162.8 L1038.8 166.6 L1037.4 170.7 L982.4 433.7 L1023.6 442.3 L1075.7 194.3Z"
            />
          </svg>
          <p ref={nameRef} className="name">
            Aditya Singh Rajput
          </p>
        </div>
      </div>
    </>
  );
}
