export interface Reference {
  id: string;
  title: string;
  author: string;
  category: string;
  url: string;
  imageUrl?: string;
  description?: string;
  isDefault: boolean;
}

import historyModernImg from "../image/history-modern.jpeg";

export const defaultReferences: Reference[] = [
  {
    id: "def-1",
    title: "تاريخ الكنيسة القبطية",
    author: "القس منسى يوحنا",
    category: "تاريخ الكنيسة",
    url: "https://coptic-treasures.com/book/%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE-%D8%A7%D9%84%D9%83%D9%86%D9%8A%D8%B3%D8%A9-%D8%A7%D9%84%D9%82%D8%A8%D8%B7%D9%8A%D8%A9-%D8%A7%D9%84%D9%82%D8%B3-%D9%85%D9%86%D8%B3%D9%89-%D9%8A%D9%88%D8%AD%D9%86%D8%A7/",
    imageUrl: "https://eadn-wc05-6472364.nxedge.io/wp-content/uploads/2019/06/%D8%BA%D9%84%D8%A7%D9%81-%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE-%D8%A7%D9%84%D9%83%D9%86%D9%8A%D8%B3%D8%A9-%D8%A7%D9%84%D9%82%D8%A8%D8%B7%D9%8A%D8%A9-%D8%A7%D9%84%D9%82%D8%B3-%D9%85%D9%86%D8%B3%D9%89-%D9%8A%D9%88%D8%AD%D9%86%D8%A7.jpg",
    description: "كتاب شامل يوثق تاريخ الكنيسة القبطية منذ نشأتها وحتى العصر الحديث.",
    isDefault: true,
  },
  {
    id: "def-2",
    title: "لاهوت المسيح",
    author: "البابا شنودة الثالث",
    category: "اللاهوت والعقيدة",
    url: "https://coptic-treasures.com/book/%D9%84%D8%A7%D9%87%D9%88%D8%AA-%D8%A7%D9%84%D9%85%D8%B3%D9%8A%D8%AD-%D8%A7%D9%84%D8%A8%D8%A7%D8%A8%D8%A7-%D8%B4%D9%86%D9%88%D8%AF%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB/",
    imageUrl: "https://eadn-wc05-6472364.nxedge.io/wp-content/uploads/2018/08/%D8%BA%D9%84%D8%A7%D9%81-%D9%84%D8%A7%D9%87%D9%88%D8%AA-%D8%A7%D9%84%D9%85%D8%B3%D9%8A%D8%AD-%D8%A7%D9%84%D8%A8%D8%A7%D8%A8%D8%A7-%D8%B4%D9%86%D9%88%D8%AF%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB.jpg",
    description: "كتاب يشرح لاهوت السيد المسيح بالأدلة والبراهين من الكتاب المقدس.",
    isDefault: true,
  },
  {
    id: "def-3",
    title: "كنيستي الأرثوذكسية ما أجملك",
    author: "القس بيشوي حلمي",
    category: "الكنيسة القبطية الأرثوذكسية",
    url: "https://coptic-treasures.com/book/%D9%83%D9%86%D9%8A%D8%B3%D8%AA%D9%89-%D8%A7%D9%84%D8%A7%D8%B1%D8%AB%D9%88%D8%B0%D9%83%D8%B3%D9%8A%D8%A9-%D9%85%D8%A7-%D8%A7%D8%AC%D9%85%D8%A7%D9%84%D9%83-%D8%A7%D9%84%D9%82%D8%B3-%D8%A8%D9%8A%D8%B4/",
    imageUrl: "https://eadn-wc05-6472364.nxedge.io/wp-content/uploads/2019/07/%D8%BA%D9%84%D8%A7%D9%81-%D9%83%D9%86%D9%8A%D8%B3%D8%AA%D9%89-%D8%A7%D9%84%D8%A7%D8%B1%D8%AB%D9%88%D8%B0%D9%83%D8%B3%D9%8A%D8%A9-%D9%85%D8%A7-%D8%A7%D8%AC%D9%85%D8%A7%D9%84%D9%83-%D8%A7%D9%84%D9%82%D8%B3-%D8%A8%D9%8A%D8%B4%D9%88%D9%8A-%D8%AD%D9%84%D9%85%D9%8A.jpg",
    description: "شرح مبسط وجميل لعقائد وطقوس الكنيسة القبطية الأرثوذكسية.",
    isDefault: true,
  },
  {
    id: "def-4",
    title: "دراسات للخدام والخادمات",
    author: "إصدار المجمع المقدس",
    category: "دراسات كنسية",
    url: "https://coptic-treasures.com/book/%D8%AF%D8%B1%D8%A7%D8%B3%D8%A7%D8%AA-%D9%84%D9%84%D8%AE%D8%AF%D8%A7%D9%85-%D9%88-%D8%A7%D9%84%D8%AE%D8%A7%D8%AF%D9%85%D8%A7%D8%AA-%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%A7%D9%84%D9%85%D8%AC%D9%85%D8%B9-5/",
    imageUrl: "https://eadn-wc05-6472364.nxedge.io/wp-content/uploads/2023/03/%D8%BA%D9%84%D8%A7%D9%81-%D8%AF%D8%B1%D8%A7%D8%B3%D8%A7%D8%AA-%D9%84%D9%84%D8%AE%D8%AF%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%AE%D8%A7%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%88%D9%89-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A-K-%D8%AF%D8%B1%D8%A7%D8%B3%D8%A7%D8%AA-%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE%D9%8A%D8%A9.jpg",
    description: "مناهج ودراسات لإعداد خدام الكنيسة.",
    isDefault: true,
  },
  {
    id: "def-5",
    title: "تاريخ الكنيسة فى سطور",
    author: "مؤلفون مختلفون",
    category: "تاريخ الكنيسة",
    url: "https://www.scribd.com/document/969237599/%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE-%D8%A7%D9%84%D9%83%D9%86%D9%8A%D8%B3%D8%A9-%D9%81%D9%89-%D8%B3%D8%B7%D9%88%D8%B1",
    imageUrl: historyModernImg,
    description: "ملخص لتاريخ الكنيسة القبطية في سطور.",
    isDefault: true,
  },
  {
    id: "def-6",
    title: "علم الباترولوجي",
    author: "مرجع دراسي",
    category: "دراسات كنسية",
    url: "https://www.scribd.com/document/1016935202/%D9%83%D8%AA%D8%A7%D8%A8-%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A8%D8%A7%D8%AA%D8%B1%D9%88%D9%84%D9%88%D8%AC%D9%89",
    description: "كتاب في علم الباترولوجي ودراسة التراث الآبائي.",
    isDefault: true,
  },
  {
    id: "def-7",
    title: "تاريخ علم الآثار: الكتاب المقدس وعلماؤه",
    author: "القس مكسيموس صموئيل",
    category: "دراسات كنسية",
    url: "https://www.scribd.com/document/872877246/%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE-%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A2%D8%AB%D8%A7%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%A7%D8%A8-%D8%A7%D9%84%D9%85%D9%82%D8%AF%D8%B3-%D9%88%D8%B9%D9%84%D9%85%D8%A7%D8%A6%D9%87-%D8%A7%D9%84%D9%82%D8%B3-%D9%85%D9%83%D8%B3%D9%8A%D9%85%D9%88%D8%B3-%D8%B5%D9%85%D9%88%D8%A6%D9%8A%D9%84",
    description: "مرجع عن علم الآثار وعلاقته بالكتاب المقدس.",
    isDefault: true,
  },
  {
    id: "def-8",
    title: "خلفيات العهد القديم الحضارية والتاريخية والجغرافية الدينية والأثرية",
    author: "القس مكسيموس صموئيل",
    category: "دراسات كنسية",
    url: "https://www.scribd.com/document/701748581/%D8%AE%D9%84%D9%81%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%87%D8%AF-%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85-%D8%A7%D9%84%D8%AD%D8%B6%D8%A7%D8%B1%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%AC%D8%BA%D8%B1%D8%A7%D9%81%D9%8A%D8%A9-%D8%A7%D9%84%D8%AF%D9%86%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A3%D8%AB%D8%B1%D9%8A%D8%A9-%D8%A7%D9%84%D9%82%D8%B3-%D9%85%D9%83%D8%B3%D9%8A%D9%85%D9%88%D8%B3-%D8%B5%D9%85%D9%88%D8%A6%D9%8A%D9%84",
    description: "دراسة لخلفيات العهد القديم الحضارية والتاريخية والجغرافية والأثرية.",
    isDefault: true,
  },
  {
    id: "def-9",
    title: "الدليل المبسط في علم الآباء",
    author: "الأب تادرس يعقوب",
    category: "دراسات كنسية",
    url: "https://www.scribd.com/doc/100860497/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D9%85%D8%A8%D8%B3%D8%B7-%D9%81%D9%89-%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A2%D8%A8%D8%A7%D8%A1-%D9%83%D8%AA%D8%A7%D8%A8-%D9%84%D8%A3%D8%A8%D9%88%D9%86%D8%A7-%D8%AA%D8%A7%D8%AF%D8%B1%D8%B3-%D9%8A%D8%B9%D9%82%D9%88%D8%A8",
    description: "مدخل مبسط إلى علم الآباء وتراث الكنيسة الآبائي.",
    isDefault: true,
  },
];

const REFERENCES_KEY = "church-history-references";
const DELETED_DEFAULTS_KEY = "church-history-deleted-references";

export function getDeletedDefaultIds(): string[] {
  try {
    const deletedStr = localStorage.getItem(DELETED_DEFAULTS_KEY);
    if (deletedStr) {
      return JSON.parse(deletedStr);
    }
  } catch (e) {
    console.error("Error reading deleted defaults from localStorage", e);
  }
  return [];
}

export function saveDeletedDefaultIds(ids: string[]) {
  try {
    localStorage.setItem(DELETED_DEFAULTS_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error("Error saving deleted defaults to localStorage", e);
  }
}

export function loadReferences(): Reference[] {
  try {
    const dataStr = localStorage.getItem(REFERENCES_KEY);
    const deletedIds = getDeletedDefaultIds();

    let savedRefs: Reference[] = [];
    if (dataStr) {
      const parsed = JSON.parse(dataStr);
      if (Array.isArray(parsed)) {
        savedRefs = parsed;
      }
    }

    // Filter out old defaults from savedRefs so we always use the latest hardcoded ones
    savedRefs = savedRefs.filter(r => !r.isDefault);

    const allRefs = [...savedRefs];

    defaultReferences.forEach((defRef) => {
      if (!deletedIds.includes(defRef.id)) {
        allRefs.push(defRef);
      }
    });

    return allRefs;
  } catch (e) {
    console.error("Error loading references from localStorage", e);
    // Fallback to default
    return defaultReferences;
  }
}

export function saveReferences(references: Reference[]) {
  try {
    localStorage.setItem(REFERENCES_KEY, JSON.stringify(references));
  } catch (e) {
    console.error("Error saving references to localStorage", e);
  }
}

export function restoreDefaultReferences(): Reference[] {
  try {
    localStorage.removeItem(DELETED_DEFAULTS_KEY);

    const currentRefs = loadReferences();
    const newRefs = [...currentRefs];

    defaultReferences.forEach((defRef) => {
      const exists = newRefs.some(r => r.id === defRef.id);
      if (!exists) {
        newRefs.push(defRef);
      }
    });

    saveReferences(newRefs);
    return newRefs;
  } catch (e) {
    console.error("Error restoring defaults", e);
    return loadReferences(); // Try to return at least what we have
  }
}
