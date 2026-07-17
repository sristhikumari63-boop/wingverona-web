// lib/pricing.js — updated
export const PRICING_PLANS = {
  INDIA: {
    weekly: {
      symbol: '₹', price: '149', period: '/week',
      questions: 120, screenshots: 30, liveDateMinutesPerDay: 0,
    },
    monthly: {
      symbol: '₹', price: '549', period: '/month',
      questions: 500, screenshots: 120, liveDateMinutesPerDay: 15,
    },
  },
  INTERNATIONAL: {
    weekly: {
      symbol: '$', price: '4.99', period: '/week',
      questions: 120, screenshots: 30, liveDateMinutesPerDay: 0,
    },
    monthly: {
      symbol: '$', price: '13.99', period: '/month',
      questions: 500, screenshots: 120, liveDateMinutesPerDay: 15,
    },
  },
};

export const FREE_TRIAL_LIMITS = {
  screenshotsPerDay: 1,
  messagesPerDay: 2,
  liveDateMinutesPerDay: 0,
};
