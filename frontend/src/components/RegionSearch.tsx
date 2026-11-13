import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, MapPin, Globe } from "lucide-react";
import { type RegionInfo, searchRegions } from "../data/regionsData";

interface RegionSearchProps {
  selectedRegion: RegionInfo | null;
  onSelectRegion: (region: RegionInfo | null) => void;
  className?: string;
}

export default function RegionSearch({
  selectedRegion,
  onSelectRegion,
  className = "",
}: RegionSearchProps) {
  const [query, setQuery] = useState(selectedRegion?.name || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input value if selectedRegion is modified externally
  useEffect(() => {
    setQuery(selectedRegion ? selectedRegion.name : "");
  }, [selectedRegion]);

  // Click outside listener to dismiss suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return searchRegions(query);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
    setHighlightedIndex(0);

    // If input is cleared completely, notify parent to reset region
    if (!val.trim() && selectedRegion) {
      onSelectRegion(null);
    }
  };

  const handleSelect = (region: RegionInfo) => {
    setQuery(region.name);
    setIsOpen(false);
    onSelectRegion(region);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    onSelectRegion(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        const indexToSelect =
          highlightedIndex >= 0 && highlightedIndex < suggestions.length
            ? highlightedIndex
            : 0;
        handleSelect(suggestions[indexToSelect]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full max-w-xs sm:max-w-sm ${className}`}
    >
      {/* Search Input Box */}
      <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 transition focus-within:border-cyan-500/60 focus-within:ring-1 focus-within:ring-cyan-500/40">
        <Search size={16} className="shrink-0 text-slate-400" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search country, state, region..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          aria-label="Search region"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Autocomplete Suggestions Dropdown */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full z-[1200] mt-1.5 max-h-72 overflow-y-auto rounded-xl border border-slate-800 bg-[#0d1524] p-1.5 shadow-2xl backdrop-blur-md">
          {suggestions.length > 0 ? (
            <ul className="space-y-1">
              {suggestions.map((item, index) => {
                const isSelected = selectedRegion?.id === item.id;
                const isHighlighted = highlightedIndex === index;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                        isHighlighted
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {item.category === "Country" ? (
                          <Globe size={15} className="shrink-0 text-cyan-400" />
                        ) : (
                          <MapPin size={15} className="shrink-0 text-orange-400" />
                        )}

                        <div className="truncate">
                          <p className="truncate font-medium text-white">
                            {item.name}
                          </p>
                          {item.country && (
                            <p className="text-[11px] text-slate-400">
                              {item.country}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            item.category === "Country"
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                              : item.category === "State"
                              ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {item.category}
                        </span>

                        {isSelected && (
                          <span className="text-[11px] text-cyan-400 font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            /* Helpful message when no matching region is found (Requirement 6) */
            <div className="p-4 text-center">
              <p className="text-xs font-semibold text-slate-300">
                No matching region found for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                Try searching for countries, states, or regions like{" "}
                <span className="text-cyan-400">India</span>,{" "}
                <span className="text-orange-400">Andhra Pradesh</span>,{" "}
                <span className="text-cyan-400">Brazil</span>, or{" "}
                <span className="text-cyan-400">Australia</span>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
