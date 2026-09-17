export interface PhotoSource {
  platform: string;
  photographer: string;
  sourcePage: string;
  licenseNote: string;
}

export interface Photo {
  id: string;
  category: 'Wedding' | 'Birthday' | 'Anniversary' | 'Couple' | 'Portrait' | 'Family' | 'Events' | 'Nature' | 'Behind the Scenes' | 'Studio';
  src: string;
  thumbnail: string;
  alt: string;
  featured: boolean;
  order: number;
  width?: number;
  height?: number;
  source?: PhotoSource;
}

export interface GalleryConfig {
  categories: string[];
  photos: Photo[];
}

export interface SiteConfig {
  siteName: string;
  ownerName: string;
  role: string;
  tagline: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  whatsapp: string;
  bio: string;
  philosophy: string;
}

export interface ThemeConfig {
  colors: {
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    accent: string;
    accentHover: string;
    overlay: string;
  };
  typography: {
    serifFont: string;
    sansFont: string;
  };
  layout: {
    maxWidth: string;
    borderRadius: string;
    imageRadius: string;
  };
}

export interface SectionConfig {
  enabled: boolean;
  order: number;
  featuredLimit?: number;
}

export interface SectionsConfig {
  [key: string]: SectionConfig;
}

export interface ContactConfig {
  enabled: boolean;
  retentionDays: number;
  duplicateWindowDays: number;
  maxStoredContacts: number;
  services: string[];
  messages: {
    success: string;
    duplicate: string;
    validationError: string;
    serverError: string;
    honeypotTriggered: string;
  };
  limits: {
    nameMax: number;
    emailMax: number;
    phoneMax: number;
    serviceMax: number;
    dateMax: number;
    messageMax: number;
  };
  turnstile: {
    enabled: boolean;
    siteKey: string;
  };
  rateLimit: {
    enabled: boolean;
    windowSeconds: number;
    maxRequestsPerWindow: number;
  };
}

export interface AnimationConfig {
  smoothScroll: boolean;
  parallax: boolean;
  textReveal: boolean;
  imageReveal: boolean;
  cursorEffects: boolean;
  hoverEffects: boolean;
  animationIntensity: number;
}

export interface FooterConfig {
  copyrightText: string;
  backToTopText: string;
  links: Array<{ label: string; href: string }>;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  date?: string;
  message: string;
  honeypot?: string;
  turnstileToken?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  code?: 'SUCCESS' | 'DUPLICATE' | 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'SERVER_ERROR';
}
