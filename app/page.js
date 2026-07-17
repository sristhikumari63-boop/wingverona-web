'use client';
import React, { useState } from 'react';

const COLORS = {
  bg: '#F8F9FA',
  secondary: '#E8F1F2',
  accent: '#7A4B71',
  text: '#3D3A3F',
  textMuted: '#6B6870',
  border: '#E2E5E1',
};

export default function Home() {
  const [chatInput, setChatInput] = useState('');
  const [showHomeScreenTip, setShowHomeScreenTip] = useState(false);
  const c = COLORS;

  return (
    <div style={{ minHeight: '100vh', background: c.bg, color: c.text, fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: `0.5px solid ${c.border}` }}>
        <span style={{ fontWeight: 700, fontSize: '17px', color: c.accent }}>WingVerona</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="/pricing" style={{ fontSize: '13px', color: c.text, border: `0.5px solid ${c.border}`, padding: '7px 16px', borderRadius: '8px', textDecoration: 'none' }}>Pricing</a>
          <a href="/login" style={{ fontSize: '13px', color: c.text, border: `0.5px solid ${c.border}`, padding: '7px 16px', borderRadius: '8px', textDecoration: 'none' }}>Log
