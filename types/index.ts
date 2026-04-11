export interface Article {
  id: number;
  title: string;
  author: string;
  category: string;
  status: "Published" | "Draft";
  publishDate: string | null;
  coverImage: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendValue?: string;
  iconColor?: string;
  borderLeft?: boolean;
}

export interface User {
  name: string;
  avatar: string;
}
