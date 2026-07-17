// lib/pricing.js
export const PRICING_PLANS = {
  INDIA: {
    weekly: {
      symbol: '₹', price: '149', period: '/week',
      questions: 120, screenshots: 30, liveDateMinutesPerDay: 15,
    },
    monthly: {
      symbol: '₹', price: '549', period: '/month',
      questions: 500, screenshots: 120, liveDateMinutesPerDay: 30,
    },
  },
  INTERNATIONAL: {
    weekly: {
      symbol: '$', price: '4.99', period: '/week',
      questions: 120, screenshots: 30, liveDateMinutesPerDay: 15,
    },
    monthly: {
      symbol: '$', price: '13.99', period: '/month',
      questions: 500, screenshots: 120, liveDateMinutesPerDay: 30,
    },
  },
};
