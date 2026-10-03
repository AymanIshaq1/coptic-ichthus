import { eras, globalTimeline } from "@/app/components/pages/HistoryPage";
import { saintsData, martyrsData } from "@/app/components/pages/SaintsPage";
import { artForms, symbolism } from "@/app/components/pages/ArtPage";
import { chapterOne, chapterTwo, chapterFour, buildingSections, sacraments } from "@/app/components/pages/LiturgyPage";
import { oldTestament, newTestament, copticContributions } from "@/app/components/pages/BiblePage";
import { section1, section2, section3, section4 } from "@/app/components/pages/TeachingsPage";

export type SearchResultType = "era" | "figure" | "event" | "article" | "art" | "liturgy" | "bible" | "teaching" | "saint" | "martyr" | "symbol";

export interface SearchItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  path: string;
  keywords: string[];
}

export const buildSearchIndex = (): SearchItem[] => {
  const index: SearchItem[] = [];
  let idCounter = 1;

  const generateId = (prefix: string) => `${prefix}_${idCounter++}`;

  // 1. History - Eras
  eras.forEach((era) => {
    // Index the Era itself
    index.push({
      id: generateId("era"),
      type: "era",
      title: era.title,
      description: era.intro + " " + era.overview,
      path: `/history#${era.id}`,
      keywords: [era.dates, ...era.highlights, era.challenges, era.impact],
    });

    // Index Figures in the Era
    if (era.figures) {
      era.figures.forEach((figure) => {
        index.push({
          id: generateId("figure"),
          type: "figure",
          title: figure.name,
          description: figure.desc,
          path: `/history#${era.id}`,
          keywords: [era.title],
        });
      });
    }

    // Index Events in the Era
    if (era.events) {
      era.events.forEach((event) => {
        index.push({
          id: generateId("event"),
          type: "event",
          title: event.text,
          description: event.year,
          path: `/history#${era.id}`,
          keywords: [era.title],
        });
      });
    }
  });

  // History - Global Timeline
  globalTimeline.forEach((tl) => {
    index.push({
      id: generateId("event"),
      type: "event",
      title: tl.event,
      description: tl.year,
      path: `/history#${tl.id}`,
      keywords: [],
    });
  });

  // 2. Saints
  saintsData.forEach((saint) => {
    index.push({
      id: generateId("saint"),
      type: "saint",
      title: saint.name,
      description: saint.title + " - " + saint.description,
      path: `/saints#${saint.id}`,
      keywords: [saint.period, ...saint.contributions],
    });
  });

  martyrsData.forEach((martyr) => {
    index.push({
      id: generateId("martyr"),
      type: "martyr",
      title: martyr.name,
      description: martyr.story,
      path: `/saints#${martyr.id}`,
      keywords: [martyr.date],
    });
  });

  // 3. Art
  artForms.forEach((art) => {
    index.push({
      id: generateId("art"),
      type: "art",
      title: art.title,
      description: art.description,
      path: `/art#${art.id}`,
      keywords: [...art.features],
    });
  });

  symbolism.forEach((sym) => {
    index.push({
      id: generateId("symbol"),
      type: "symbol",
      title: sym.name,
      description: sym.meaning,
      path: `/art#${sym.id}`,
      keywords: [sym.symbol],
    });
  });

  // 4. Liturgy
  const indexLiturgyStringArray = (arr: any[], title: string) => {
    arr.forEach((item) => {
      index.push({
        id: generateId("liturgy"),
        type: "liturgy",
        title: title,
        description: item.text,
        path: `/liturgy#${item.id}`,
        keywords: [],
      });
    });
  };

  indexLiturgyStringArray(chapterOne, "معنى الكنيسة ورموزها");
  indexLiturgyStringArray(chapterTwo, "الطقوس الكنسية");
  indexLiturgyStringArray(chapterFour, "الرموز والطقوس العامة");

  buildingSections.forEach((section) => {
    index.push({
      id: generateId("liturgy"),
      type: "liturgy",
      title: section.title || "مبنى الكنيسة",
      description: section.items.join(" "),
      path: `/liturgy#${section.id}`,
      keywords: [],
    });
  });

  sacraments.forEach((sacrament) => {
    index.push({
      id: generateId("liturgy"),
      type: "liturgy",
      title: sacrament.title || "أسرار الكنيسة",
      description: sacrament.items.join(" "),
      path: `/liturgy#${sacrament.id}`,
      keywords: [],
    });
  });

  // 5. Bible
  oldTestament.forEach((book) => {
    index.push({
      id: generateId("bible"),
      type: "bible",
      title: book.name,
      description: `سفر من ${book.category} - ${book.chapters} أصحاح`,
      path: `/bible#${book.id}`,
      keywords: [book.category, "العهد القديم"],
    });
  });

  newTestament.forEach((book) => {
    index.push({
      id: generateId("bible"),
      type: "bible",
      title: book.name,
      description: `سفر من ${book.category} - ${book.chapters} أصحاح`,
      path: `/bible#${book.id}`,
      keywords: [book.category, "العهد الجديد"],
    });
  });

  copticContributions.forEach((contrib) => {
    index.push({
      id: generateId("article"),
      type: "article",
      title: contrib.title,
      description: contrib.description,
      path: `/bible#${contrib.id}`,
      keywords: [...contrib.details],
    });
  });

  // 6. Teachings
  const indexTeachings = (arr: any[], titlePrefix: string) => {
    arr.forEach((item) => {
      const desc = item.desc || item.text || (item.points ? item.points.join(" ") : "");
      index.push({
        id: generateId("teaching"),
        type: "teaching",
        title: item.title || titlePrefix,
        description: desc,
        path: `/teachings#${item.id}`,
        keywords: [item.ref || ""],
      });
    });
  };

  indexTeachings(section1, "لاهوت المسيح");
  indexTeachings(section2, "صفات الله في المسيح");
  indexTeachings(section3, "سلطان المسيح");
  indexTeachings(section4, "أدلة كتابية");

  return index;
};

// Simple fuzzy matching search
export const searchContent = (query: string, index: SearchItem[]): SearchItem[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const tokens = lowerQuery.split(/\s+/).filter(t => t.length > 0);

  return index
    .map((item) => {
      let score = 0;
      
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      const keywords = item.keywords.join(" ").toLowerCase();

      // Exact title match gets highest score
      if (title === lowerQuery) score += 100;
      else if (title.includes(lowerQuery)) score += 50;
      
      // Keyword exact match
      if (keywords.includes(lowerQuery)) score += 30;

      // Description match
      if (desc.includes(lowerQuery)) score += 10;

      // Token based matching
      let tokenMatches = 0;
      tokens.forEach((token) => {
        if (title.includes(token)) tokenMatches += 5;
        if (keywords.includes(token)) tokenMatches += 3;
        if (desc.includes(token)) tokenMatches += 1;
      });

      score += tokenMatches;

      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
};
