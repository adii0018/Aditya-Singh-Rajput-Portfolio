"use client";

import { useState, useEffect, useMemo } from "react";
import initialData from "@/lib/github-contributions-cache.json";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubCalendarProps {
  username: string;
  onTotalChange?: (total: number) => void;
}

const LEVEL_COLORS: Record<number, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function GitHubContributionCalendar({
  username,
  onTotalChange,
}: GitHubCalendarProps) {
  const [data, setData] = useState<ContributionDay[]>(
    (initialData as { contributions?: ContributionDay[] }).contributions || []
  );
  const [totalCount, setTotalCount] = useState<number>(
    (initialData as { total?: { lastYear?: number } }).total?.lastYear || 1080
  );
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.contributions && Array.isArray(json.contributions)) {
          setData(json.contributions);
        }
        if (typeof json?.total?.lastYear === "number") {
          setTotalCount(json.total.lastYear);
          onTotalChange?.(json.total.lastYear);
        }
      })
      .catch(() => {});
  }, [username, onTotalChange]);

  // Group into weeks (53 columns x 7 rows)
  const { weeks, monthLabels } = useMemo(() => {
    if (!data.length) return { weeks: [], monthLabels: [] };

    const firstDayOfWeek = new Date(data[0].date).getDay();
    const weekList: Array<Array<ContributionDay | null>> = [];
    let currentWeek: Array<ContributionDay | null> = [];

    // Pad beginning of first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    data.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weekList.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weekList.push(currentWeek);
    }

    // Determine month label positions
    const months: Array<{ month: string; colIndex: number }> = [];
    let lastMonth = -1;
    weekList.forEach((week, colIdx) => {
      const firstValid = week.find((d) => d !== null);
      if (firstValid) {
        const m = new Date(firstValid.date).getMonth();
        if (m !== lastMonth) {
          months.push({ month: MONTH_NAMES[m], colIndex: colIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: weekList, monthLabels: months };
  }, [data]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-[#e6edf3] text-base sm:text-lg tracking-tight">
            {totalCount.toLocaleString()} contributions in the last year
          </h3>
          <p className="text-[#7d8590] text-xs font-mono mt-0.5">
            Verified public activity from github.com/{username}
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#7d8590] hover:text-[#e6edf3] text-xs font-mono hover:border-[#8b949e] transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>Contribution settings</span>
          <span className="text-[10px]">▼</span>
        </a>
      </div>

      {/* Dark Grid Box */}
      <div className="border border-[#30363d] rounded-xl bg-[#0d1117] p-4 sm:p-5 relative overflow-hidden">
        {/* SVG Container */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
          <svg
            viewBox="0 0 735 118"
            className="w-full min-w-[690px] h-auto select-none"
            style={{ shapeRendering: "geometricPrecision" }}
          >
            {/* Month Labels */}
            {monthLabels.map((lbl, idx) => (
              <text
                key={idx}
                x={32 + lbl.colIndex * 13}
                y={10}
                fill="#7d8590"
                fontSize="10"
                fontFamily="inherit"
              >
                {lbl.month}
              </text>
            ))}

            {/* Weekday Labels (Mon, Wed, Fri) */}
            <text x={0} y={42} fill="#7d8590" fontSize="9" fontFamily="inherit">
              Mon
            </text>
            <text x={0} y={68} fill="#7d8590" fontSize="9" fontFamily="inherit">
              Wed
            </text>
            <text x={0} y={94} fill="#7d8590" fontSize="9" fontFamily="inherit">
              Fri
            </text>

            {/* Squares Grid */}
            {weeks.map((week, colIdx) =>
              week.map((day, rowIdx) => {
                if (!day) return null;
                const x = 32 + colIdx * 13;
                const y = 18 + rowIdx * 13;
                const fillColor = LEVEL_COLORS[day.level] || "#161b22";

                return (
                  <rect
                    key={`${colIdx}-${rowIdx}`}
                    x={x}
                    y={y}
                    width={10}
                    height={10}
                    rx={2}
                    fill={fillColor}
                    stroke={day.level === 0 ? "rgba(255, 255, 255, 0.04)" : "none"}
                    strokeWidth={0.5}
                    className="cursor-pointer transition-all hover:stroke-[#e6edf3] hover:stroke-1"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parent = e.currentTarget.closest(".relative")?.getBoundingClientRect();
                      if (parent) {
                        setHoveredDay({
                          date: day.date,
                          count: day.count,
                          x: rect.left - parent.left + 5,
                          y: rect.top - parent.top - 8,
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                );
              })
            )}
          </svg>
        </div>

        {/* Hover Tooltip */}
        {hoveredDay && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-[#161b22] text-[#e6edf3] text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-[#30363d] shadow-xl whitespace-nowrap"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y}px`,
            }}
          >
            <span className="font-semibold text-[#39d353]">
              {hoveredDay.count === 0 ? "No" : hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"}
            </span>{" "}
            on {formatDate(hoveredDay.date)}
          </div>
        )}

        {/* Bottom Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-[#21262d] text-xs text-[#7d8590]">
          <a
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#58a6ff] transition-colors"
          >
            Learn how we count contributions
          </a>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-[#30363d]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
