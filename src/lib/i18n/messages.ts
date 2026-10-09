export interface LocaleMessages {
  theme: {
    light: string;
    dark: string;
    currentTheme: string;
  };
  home: {
    news: string;
    selectedPublications: string;
    viewAll: string;
  };
  publications: {
    searchPlaceholder: string;
    noResults: string;
    abstract: string;
    code: string;
    paper: string;
    website: string;
  };
}

const en: LocaleMessages = {
  theme: {
    light: 'Light',
    dark: 'Dark',
    currentTheme: 'Current theme',
  },
  home: {
    news: 'News',
    selectedPublications: 'Selected Publications',
    viewAll: 'View All',
  },
  publications: {
    searchPlaceholder: 'Search publications...',
    noResults: 'No publications found matching your criteria.',
    abstract: 'Abstract',
    code: 'Code',
    paper: 'Paper',
    website: 'Project Page',
  },
};

const zh: LocaleMessages = {
  theme: {
    light: '浅色',
    dark: '深色',
    currentTheme: '当前主题',
  },
  home: {
    news: '新闻',
    selectedPublications: '代表论文',
    viewAll: '查看全部',
  },
  publications: {
    searchPlaceholder: '搜索论文...',
    noResults: '没有找到符合条件的论文。',
    abstract: '摘要',
    code: '代码',
    paper: '论文',
    website: '项目主页',
  },
};

export const messages: Record<string, LocaleMessages> = {
  en,
  zh,
};

export function getMessages(locale: string): LocaleMessages {
  return messages[locale] || en;
}
