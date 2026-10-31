import { Children, type ReactNode } from "react";

interface StackedSectionsProps {
  children: ReactNode;
}

interface CardConfig {
  bgColor: string;
  roundedTop: boolean;
  shadowClass: string;
  borderClass: string;
  overflowClass: string;
}

const oneCardConfigs: CardConfig[] = [
  // 0: Projects (Featured Systems) - luxury dark #07080a
  {
    bgColor: "#07080a",
    roundedTop: true,
    shadowClass: "shadow-[0_-30px_80px_rgba(0,0,0,0.8)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-visible",
  },
];

const twoCardConfigs: CardConfig[] = [
  // 0: Skills (Tech Stack) - light #ebeff5
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.18)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 1: Projects (Featured Systems) - luxury dark #07080a
  {
    bgColor: "#07080a",
    roundedTop: true,
    shadowClass: "shadow-[0_-30px_80px_rgba(0,0,0,0.8)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-visible",
  },
];

const threeCardConfigs: CardConfig[] = [
  // 0: About (Cosmic Guns.lol) - dark #0a0a0c
  {
    bgColor: "#0a0a0c",
    roundedTop: true,
    shadowClass: "shadow-[0_-30px_70px_rgba(0,0,0,0.8)]",
    borderClass: "border-t border-[#ffffff20]",
    overflowClass: "overflow-hidden",
  },
  // 1: Skills (Tech Stack) - light #ebeff5
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.18)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 2: Projects (Featured Systems) - luxury dark #07080a
  {
    bgColor: "#07080a",
    roundedTop: true,
    shadowClass: "shadow-[0_-30px_80px_rgba(0,0,0,0.8)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-visible",
  },
];

export default function StackedSections({ children }: StackedSectionsProps) {
  const childArray = Children.toArray(children);
  const configs =
    childArray.length === 1
      ? oneCardConfigs
      : childArray.length === 2
      ? twoCardConfigs
      : threeCardConfigs;

  return (
    <div className="relative w-full">
      {childArray.map((child, index) => {
        const config = configs[index] ?? {
          bgColor: "#07080a",
          roundedTop: true,
          shadowClass: "shadow-[0_-30px_80px_rgba(0,0,0,0.8)]",
          borderClass: "border-t border-[#ffffff15]",
          overflowClass: "overflow-visible",
        };

        const zIndex = 10 + index * 10;

        return (
          <div
            key={index}
            data-section-index={index}
            className={`stacked-card-wrapper relative w-full ${config.overflowClass}${
              config.roundedTop
                ? ` rounded-t-[32px] sm:rounded-t-[44px] ${config.shadowClass} ${config.borderClass}`
                : ""
            }${index > 0 ? " -mt-6 sm:-mt-10" : " -mt-6 sm:-mt-10"}`}
            style={{
              zIndex,
              backgroundColor: config.bgColor,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
