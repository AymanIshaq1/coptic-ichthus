import { useState, useEffect, useMemo } from "react";
import { buildSearchIndex, searchContent, SearchItem } from "./SearchIndex";

// A simple custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const debouncedQuery = useDebounce(query, 300);

  // Build the index once when the hook is first used
  const index = useMemo(() => buildSearchIndex(), []);

  // Perform search whenever the debounced query changes
  const results = useMemo(() => {
    return searchContent(debouncedQuery, index);
  }, [debouncedQuery, index]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("coptic_recent_searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  const addRecentSearch = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((t) => t !== term)].slice(0, 10);
      localStorage.setItem("coptic_recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("coptic_recent_searches");
  };

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  };
}
