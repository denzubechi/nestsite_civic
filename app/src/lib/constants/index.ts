export const GLOBAL = {
  APP_NAME: "Nestsite",
  APP_TITLE: "Nestsite Dashboard",
  APP_LOGIN_TITLE: "Login",
  LOGIN_TEXT: "JOIN THE NESTSITE COMMUNITY",
  APP_SIGN_UP_TITLE: "Get started",
  SIGN_UP_TEXT:
    "Welcome to Nestsite! Let's get started by creating your account.",
  AUTH_SUBTEXT: "Create, connect, and thrive in the decentralized web.",
  AUTH_GREETING: "Have a great day doing this with us!     ",
  RECOVER_PASSWORD_TEXT: "Recover your Password",
  APP_DESC: "Your Nestsite Dashboard",
  API_V1_URL: "https://nestsite.onrender.com/api/v1",
};

export const ROUTE = {
  HOME: "/dashboard",
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  SECURITY: "/dashboard/security",
  ANALYTICS: "/dashboard/analytics",
  PAYMENT: "/dashboard/payment-link",
  WITHDRAWALS: "/dashboard/withdrawals",
  REVIEWS: "/dashboard/reviews",
  HASHED: "#",
  PORTFOLIO: {
    INDEX: "/dashboard/portfolio",
    CUSTOMIZE: "/dashboard/customize-portfolio",
    PROJECTS: "/dashboard/projects",
  },
  STOREFRONT: {
    INDEX: "/dashboard/storefront",
    CUSTOMIZE: "/dashboard/storefront-portfolio",
    PRODUCTS: "/dashboard/products",
    CATEGORY: "/dashboard/category",
  },
  //UPDATES
  UPDATES: "/dashboard/updates",
  PUBLISH_NEW_POST: "/dashboard/updates/new-post",
  APP_BUILDER: "/dashboard/app-builder",
  LIST_BUILDERS: {
    INDEX: "/list-builders",
    TASKER_TITLE: "/list-builders/tasker-title",
    FAMILY: "/list-builders/family",
    VEHICLES: "/list-builders/vehicles",
    COUNTRIES: "/list-builders/countries",
  },
  TERMS_OF_USE: "/pages/terms-of-use",
  PRIVACY_POLICY: "/pages/privacy-policy",

  AUTH: {
    LOGIN: "/",
    RECOVER_PASSWORD: "/recover-password/",
  },
};

export const STATUS = {
  ACTIVE: { TEXT: "ACTIVE", COLOR: "cyan" },
  COMPLETED: { TEXT: "COMPLETED", COLOR: "green" },
  PAID: { TEXT: "PAID", COLOR: "green" },
  PUBLISHED: { TEXT: "PUBLISHED", COLOR: "green" },
  DRAFT: { TEXT: "DRAFT", COLOR: "green" },
  NEW: { TEXT: "NEW", COLOR: "green" },
  VERIFIED: { TEXT: "VERIFIED", COLOR: "rose" },
  UNVERIFIED: { TEXT: "UNVERIFIED", COLOR: "rose" },
  PENDING: { TEXT: "PENDING", COLOR: "amber" },
  RESTRICTED: { TEXT: "RESTRICTED", COLOR: "amber" },
  DOWNGRADE: { TEXT: "DOWNGRADE", COLOR: "rose" },
  UPGRADE: { TEXT: "UPGRADE", COLOR: "green" },
  CANCEL: { TEXT: "CANCEL", COLOR: "red" },
  CANCELLED: { TEXT: "CANCELLED", COLOR: "red" },
  REJECTED: { TEXT: "REJECTED", COLOR: "red" },
  BANNED: { TEXT: "BANNED", COLOR: "red" },
  RENEW: { TEXT: "RENEW", COLOR: "green" },
} as const;

export type StatusType = keyof typeof STATUS;
