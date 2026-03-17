
import { useState, useEffect, useRef } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
`;

const styles = `
  :root {
    --amber: #C8701A;
    --amber-light: #E8932A;
    --amber-pale: #FBF0E0;
    --green: #2A5C3F;
    --green-light: #3D7A55;
    --green-pale: #EEF5F0;
    --dark: #150F06;
    --dark2: #261A0C;
    --cream: #F8F1E7;
    --cream2: #F0E6D3;
    --gold: #D4A853;
    --text: #2C1D0A;
    --text2: #6B5240;
    --white: #FDFAF5;
    --radius: 20px;
    --radius-sm: 12px;
    --shadow: 0 4px 24px rgba(21,15,6,0.18);
    --shadow-lg: 0 12px 48px rgba(21,15,6,0.26);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  .apri-root {
    font-family: 'DM Sans', sans-serif;
    background: #1A1108;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .apri-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 30%, rgba(200,112,26,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 70%, rgba(42,92,63,0.2) 0%, transparent 60%);
    pointer-events: none;
  }

  .phone-wrap {
    position: relative;
    width: 390px;
    max-width: 100%;
  }

  .phone-frame {
    width: 390px;
    height: 844px;
    max-width: 100%;
    background: var(--dark);
    border-radius: 52px;
    overflow: hidden;
    position: relative;
    box-shadow: 
      0 0 0 1px rgba(255,255,255,0.08),
      0 0 0 8px #0A0704,
      0 0 0 10px rgba(255,255,255,0.04),
      0 40px 80px rgba(0,0,0,0.8),
      inset 0 0 60px rgba(200,112,26,0.04);
  }

  .phone-notch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 126px;
    height: 34px;
    background: var(--dark);
    border-radius: 0 0 20px 20px;
    z-index: 100;
  }

  .screen {
    width: 100%;
    height: 100%;
    background: var(--cream);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* STATUS BAR */
  .status-bar {
    height: 54px;
    background: transparent;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 24px 8px;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }

  .status-time {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }

  .status-icons {
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 12px;
    color: var(--text2);
  }

  /* SCREENS */
  .page {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: relative;
  }
  .page::-webkit-scrollbar { display: none; }

  /* ── SPLASH ─────────────────────── */
  .splash {
    background: var(--dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .splash-bg {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 50% 0%, rgba(200,112,26,0.35) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 100%, rgba(42,92,63,0.3) 0%, transparent 50%);
  }

  .splash-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .splash-logo-ring {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 1px solid rgba(200,112,26,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 32px;
    animation: ringPulse 3s ease-in-out infinite;
  }

  .splash-logo-ring::before {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    border: 1px solid rgba(200,112,26,0.25);
  }

  .splash-logo-inner {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--amber) 0%, #8B4A10 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    color: white;
    letter-spacing: -1px;
    box-shadow: 0 8px 32px rgba(200,112,26,0.5);
  }

  @keyframes ringPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.04); opacity: 0.85; }
  }

  .splash-title {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 400;
    color: var(--white);
    letter-spacing: 8px;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
  }

  .splash-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-top: 8px;
    position: relative;
    z-index: 1;
  }

  .splash-divider {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--amber-light), transparent);
    margin: 28px auto;
    position: relative;
    z-index: 1;
  }

  .splash-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-style: italic;
    color: rgba(255,255,255,0.55);
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 40px;
  }

  .splash-btn {
    margin-top: 52px;
    padding: 18px 52px;
    background: linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%);
    border: none;
    border-radius: 50px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    z-index: 1;
    box-shadow: 0 8px 32px rgba(200,112,26,0.45);
    transition: all 0.3s ease;
  }

  .splash-btn:active { transform: scale(0.97); }

  .splash-leaf1, .splash-leaf2 {
    position: absolute;
    opacity: 0.12;
    font-size: 120px;
    pointer-events: none;
  }
  .splash-leaf1 { top: 80px; right: -20px; transform: rotate(20deg); }
  .splash-leaf2 { bottom: 120px; left: -20px; transform: rotate(-30deg); }

  .splash-credits {
    position: absolute;
    bottom: 28px;
    text-align: center;
    z-index: 1;
  }
  .splash-credits p {
    font-size: 10px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 1px;
    font-family: 'DM Sans', sans-serif;
    line-height: 1.6;
  }

  /* ── HOME ─────────────────────── */
  .home-hero {
    height: 300px;
    background: var(--dark2);
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .hero-bg-pattern {
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(160deg, rgba(200,112,26,0.8) 0%, rgba(42,92,63,0.9) 100%);
  }

  .hero-emoji-bg {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 1fr);
    opacity: 0.06;
    font-size: 36px;
    overflow: hidden;
  }

  .hero-emoji-bg span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(21,15,6,0.2) 0%, rgba(21,15,6,0.7) 100%);
  }

  .hero-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50px;
    padding: 6px 14px;
    font-size: 11px;
    color: rgba(255,255,255,0.9);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 400;
    color: white;
    line-height: 1.15;
    margin-bottom: 8px;
  }

  .hero-title em {
    font-style: italic;
    color: var(--gold);
  }

  .hero-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.65);
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  .home-body {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    background: var(--cream);
    padding-bottom: 90px;
  }
  .home-body::-webkit-scrollbar { display: none; }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 20px 14px;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--text);
  }

  .section-link {
    font-size: 13px;
    color: var(--amber);
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.3px;
  }

  /* CATEGORIES */
  .categories-scroll {
    display: flex;
    gap: 10px;
    padding: 0 20px 4px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .categories-scroll::-webkit-scrollbar { display: none; }

  .cat-chip {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 18px;
    border-radius: 50px;
    white-space: nowrap;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.25s;
    border: 1.5px solid transparent;
  }

  .cat-chip.active {
    background: var(--green);
    color: white;
    border-color: var(--green);
    box-shadow: 0 4px 16px rgba(42,92,63,0.3);
  }

  .cat-chip.inactive {
    background: white;
    color: var(--text2);
    border-color: rgba(0,0,0,0.08);
  }

  .cat-chip span { font-size: 16px; }

  /* FEATURED CARDS */
  .featured-scroll {
    display: flex;
    gap: 14px;
    padding: 4px 20px 8px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .featured-scroll::-webkit-scrollbar { display: none; }

  .featured-card {
    flex-shrink: 0;
    width: 200px;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: transform 0.2s;
  }

  .featured-card:active { transform: scale(0.97); }

  .featured-img {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    position: relative;
  }

  .featured-img-label {
    position: absolute;
    top: 10px;
    left: 10px;
    background: var(--amber);
    color: white;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 4px 9px;
    border-radius: 50px;
  }

  .featured-heart {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .featured-info {
    padding: 12px 14px 14px;
  }

  .featured-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
    line-height: 1.3;
  }

  .featured-desc {
    font-size: 11px;
    color: var(--text2);
    line-height: 1.4;
    margin-bottom: 8px;
  }

  .featured-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .featured-price {
    font-weight: 700;
    font-size: 16px;
    color: var(--amber);
  }

  .featured-stars {
    font-size: 10px;
    color: var(--gold);
  }

  /* QUICK ACTIONS */
  .quick-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    padding: 0 20px 4px;
  }

  .qa-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .qa-icon {
    width: 56px;
    height: 56px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    transition: transform 0.2s;
  }

  .qa-icon:active { transform: scale(0.92); }

  .qa-label {
    font-size: 11px;
    color: var(--text2);
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
  }

  /* PROMO BANNER */
  .promo-banner {
    margin: 8px 20px;
    background: linear-gradient(135deg, var(--green) 0%, var(--green-light) 100%);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .promo-banner::before {
    content: '🌿';
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 80px;
    opacity: 0.12;
    transform: rotate(20deg);
  }

  .promo-left h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    color: white;
    margin-bottom: 4px;
  }

  .promo-left p {
    font-size: 12px;
    color: rgba(255,255,255,0.75);
    line-height: 1.4;
  }

  .promo-badge {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 14px;
    padding: 10px 16px;
    text-align: center;
    flex-shrink: 0;
  }

  .promo-badge-pct {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--gold);
    display: block;
  }

  .promo-badge-text {
    font-size: 10px;
    color: rgba(255,255,255,0.8);
    letter-spacing: 0.5px;
  }

  /* ── MENU ─────────────────────── */
  .menu-header {
    background: var(--dark);
    padding: 16px 20px 20px;
    position: relative;
    flex-shrink: 0;
  }

  .menu-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--amber), transparent);
  }

  .menu-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 400;
    color: white;
    margin-bottom: 4px;
  }

  .menu-header-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    letter-spacing: 1px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    padding: 12px 16px;
    gap: 10px;
    margin-top: 16px;
  }

  .search-bar input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    font-family: 'DM Sans', sans-serif;
    placeholder-color: rgba(255,255,255,0.35);
  }

  .search-bar input::placeholder { color: rgba(255,255,255,0.35); }

  .menu-body {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    padding-bottom: 90px;
    background: var(--cream);
  }
  .menu-body::-webkit-scrollbar { display: none; }

  .menu-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    font-weight: 600;
    color: var(--text);
    padding: 20px 20px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .menu-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(0,0,0,0.08);
  }

  .menu-item {
    display: flex;
    gap: 14px;
    padding: 14px 20px;
    cursor: pointer;
    transition: background 0.2s;
    align-items: center;
  }

  .menu-item:active { background: rgba(200,112,26,0.05); }

  .menu-item-emoji {
    width: 68px;
    height: 68px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    flex-shrink: 0;
    background: var(--cream2);
  }

  .menu-item-info {
    flex: 1;
    min-width: 0;
  }

  .menu-item-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .menu-item-desc {
    font-size: 11px;
    color: var(--text2);
    line-height: 1.4;
    margin-bottom: 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .menu-item-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  .tag {
    padding: 2px 8px;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 500;
  }

  .tag-organic { background: #E8F5EE; color: var(--green); }
  .tag-new { background: #FEF0E0; color: var(--amber); }
  .tag-vegan { background: #F0F8E8; color: #5A7A2A; }
  .tag-hot { background: #FEEEE8; color: #C0421A; }

  .menu-item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex-shrink: 0;
  }

  .menu-price {
    font-weight: 700;
    font-size: 16px;
    color: var(--amber);
  }

  .add-btn {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background: var(--dark);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .add-btn:active { background: var(--amber); }

  .menu-divider {
    height: 1px;
    background: rgba(0,0,0,0.06);
    margin: 0 20px;
  }

  /* ── RESERVE ─────────────────────── */
  .reserve-hero {
    height: 180px;
    background: linear-gradient(135deg, var(--dark) 0%, var(--dark2) 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    flex-shrink: 0;
  }

  .reserve-hero::before {
    content: '🕯️';
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 100px;
    opacity: 0.08;
  }

  .reserve-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 400;
    color: white;
  }

  .reserve-title em {
    font-style: italic;
    color: var(--gold);
  }

  .reserve-body {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 20px 20px 100px;
    background: var(--cream);
  }
  .reserve-body::-webkit-scrollbar { display: none; }

  .form-card {
    background: white;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 14px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .form-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .form-group {
    margin-bottom: 14px;
  }

  .form-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text2);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 7px;
    display: block;
  }

  .form-input {
    width: 100%;
    padding: 13px 15px;
    border-radius: 12px;
    border: 1.5px solid rgba(0,0,0,0.1);
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
  }

  .form-input:focus { border-color: var(--amber); }

  .date-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .date-chip {
    padding: 10px 4px;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    border: 1.5px solid rgba(0,0,0,0.08);
    background: var(--cream);
  }

  .date-chip.selected {
    background: var(--dark);
    border-color: var(--dark);
    color: white;
  }

  .date-chip-day { font-size: 10px; color: inherit; opacity: 0.7; }
  .date-chip-num { font-size: 17px; font-weight: 700; color: inherit; font-family: 'Playfair Display', serif; }

  .time-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .time-chip {
    padding: 11px 8px;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s;
    border: 1.5px solid rgba(0,0,0,0.08);
    background: var(--cream);
    color: var(--text);
  }

  .time-chip.selected {
    background: var(--amber);
    border-color: var(--amber);
    color: white;
  }

  .guest-selector {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .guest-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: 1.5px solid rgba(0,0,0,0.1);
    background: var(--cream);
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    transition: all 0.2s;
    line-height: 1;
  }

  .guest-btn:active { background: var(--amber); color: white; border-color: var(--amber); }

  .guest-count {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--text);
    min-width: 40px;
    text-align: center;
  }

  .reserve-submit {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%);
    border: none;
    border-radius: 16px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 6px 24px rgba(200,112,26,0.35);
    transition: all 0.2s;
    margin-top: 4px;
  }

  .reserve-submit:active { transform: scale(0.98); }

  /* LOCATION SELECTOR */
  .location-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .location-card {
    padding: 14px;
    border-radius: 14px;
    border: 2px solid rgba(0,0,0,0.08);
    background: var(--cream);
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .location-card.selected {
    border-color: var(--green);
    background: var(--green-pale);
  }

  .location-card-flag { font-size: 26px; margin-bottom: 6px; }
  .location-card-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .location-card-city { font-size: 11px; color: var(--text2); margin-top: 2px; }

  /* ── ABOUT ─────────────────────── */
  .about-hero {
    height: 220px;
    background: var(--dark);
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: flex-end;
    padding: 24px;
  }

  .about-hero-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(42,92,63,0.7) 0%, rgba(21,15,6,0.9) 100%);
  }

  .about-hero-pattern {
    position: absolute;
    inset: 0;
    font-size: 80px;
    opacity: 0.05;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .about-hero-content { position: relative; z-index: 1; }

  .about-eyebrow {
    font-size: 11px;
    color: var(--gold);
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .about-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 400;
    color: white;
    line-height: 1.2;
  }

  .about-title em { color: var(--gold); font-style: italic; }

  .about-body {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 0 0 100px;
    background: var(--cream);
  }
  .about-body::-webkit-scrollbar { display: none; }

  .about-story {
    padding: 24px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  .about-story p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    line-height: 1.75;
    color: var(--text);
    font-weight: 400;
  }

  .about-story p em { color: var(--amber); font-style: italic; }

  .values-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 20px;
  }

  .value-card {
    background: white;
    border-radius: 18px;
    padding: 18px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .value-icon { font-size: 28px; margin-bottom: 10px; }

  .value-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 5px;
  }

  .value-desc {
    font-size: 11.5px;
    color: var(--text2);
    line-height: 1.5;
  }

  .locations-section {
    padding: 8px 20px 20px;
  }

  .location-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    background: white;
    border-radius: 16px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .location-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: var(--cream2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }

  .location-info { flex: 1; }

  .location-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--text);
    margin-bottom: 2px;
  }

  .location-address {
    font-size: 12px;
    color: var(--text2);
    line-height: 1.4;
  }

  .location-tag {
    font-size: 10px;
    padding: 4px 10px;
    border-radius: 50px;
    font-weight: 600;
  }

  .tag-open { background: #E8F5EE; color: var(--green); }
  .tag-soon { background: #FEF0E0; color: var(--amber); }

  /* ── PROFILE ─────────────────────── */
  .profile-header {
    background: var(--dark);
    padding: 16px 20px 28px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .profile-header-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(200,112,26,0.25) 0%, transparent 70%);
  }

  .profile-avatar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    margin-bottom: 12px;
    border: 3px solid rgba(255,255,255,0.1);
    box-shadow: 0 6px 24px rgba(200,112,26,0.4);
  }

  .profile-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: white;
    margin-bottom: 4px;
  }

  .profile-level {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(212,168,83,0.2);
    border: 1px solid rgba(212,168,83,0.4);
    border-radius: 50px;
    padding: 4px 12px;
    font-size: 11px;
    color: var(--gold);
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .profile-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 16px 20px;
    background: var(--cream2);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    flex-shrink: 0;
  }

  .stat-item { text-align: center; }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--amber);
    display: block;
  }

  .stat-label { font-size: 11px; color: var(--text2); margin-top: 2px; }

  .profile-body {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    padding-bottom: 100px;
    background: var(--cream);
  }
  .profile-body::-webkit-scrollbar { display: none; }

  .menu-list-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    cursor: pointer;
    transition: background 0.15s;
    border-bottom: 1px solid rgba(0,0,0,0.04);
  }

  .menu-list-item:active { background: rgba(200,112,26,0.05); }

  .mli-icon {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .mli-label {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
  }

  .mli-badge {
    background: var(--amber);
    color: white;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 50px;
  }

  .mli-arrow { color: var(--text2); font-size: 18px; }

  .profile-section-header {
    padding: 18px 20px 8px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text2);
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  /* ── BOTTOM NAV ─────────────────────── */
  .bottom-nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 82px;
    background: rgba(248,241,231,0.9);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 8px 16px;
    z-index: 50;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 14px;
    transition: all 0.2s;
    min-width: 56px;
  }

  .nav-item.active {
    background: rgba(200,112,26,0.12);
  }

  .nav-icon { font-size: 22px; transition: transform 0.2s; }
  .nav-item.active .nav-icon { transform: scale(1.1); }

  .nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3px;
    transition: color 0.2s;
  }

  .nav-item.active .nav-label { color: var(--amber); }
  .nav-item:not(.active) .nav-label { color: var(--text2); }

  /* ── SUCCESS MODAL ─────────────────────── */
  .modal-overlay {
    position: absolute;
    inset: 0;
    background: rgba(21,15,6,0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 200;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-sheet {
    width: 100%;
    background: var(--white);
    border-radius: 28px 28px 0 0;
    padding: 28px 24px 44px;
    text-align: center;
    animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

  .modal-handle {
    width: 40px;
    height: 4px;
    background: rgba(0,0,0,0.12);
    border-radius: 2px;
    margin: 0 auto 24px;
  }

  .modal-icon { font-size: 64px; margin-bottom: 16px; }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }

  .modal-desc {
    font-size: 14px;
    color: var(--text2);
    line-height: 1.6;
    margin-bottom: 28px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
  }

  .modal-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%);
    border: none;
    border-radius: 14px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── ANIMATIONS ─────────────────────── */
  .fade-in { animation: fadeIn 0.4s ease; }
  .slide-up { animation: slideUp 0.4s cubic-bezier(0.34, 1.2, 0.64, 1); }

  /* CART BADGE */
  .cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    background: var(--amber);
    border-radius: 50%;
    font-size: 10px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* LANG TOGGLE */
  .lang-toggle {
    position: absolute;
    top: 14px;
    right: 20px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50px;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    z-index: 10;
    letter-spacing: 0.5px;
    transition: all 0.2s;
  }

  .lang-toggle:active { background: rgba(255,255,255,0.25); }

  /* TOAST */
  .toast {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
    background: var(--dark);
    color: white;
    padding: 13px 18px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 300;
    box-shadow: var(--shadow-lg);
    animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes toastIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* HEADER TOP NAV */
  .top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 20px 16px;
    flex-shrink: 0;
  }

  .top-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 2px;
  }

  .top-logo span { color: var(--amber); }

  .top-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .icon-btn {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    position: relative;
    transition: transform 0.15s;
  }

  .icon-btn:active { transform: scale(0.93); }

  /* RECIPE CARD LARGE */
  .hero-dish-card {
    margin: 0 20px;
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow);
    margin-bottom: 4px;
  }

  .hero-dish-img {
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    background: linear-gradient(135deg, #FEF0E0 0%, #F0E6D3 100%);
    position: relative;
  }

  .hero-dish-ribbon {
    position: absolute;
    top: 14px;
    left: 0;
    background: var(--amber);
    color: white;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 14px 5px 14px;
    border-radius: 0 50px 50px 0;
    box-shadow: 0 2px 8px rgba(200,112,26,0.4);
  }

  .hero-dish-body {
    padding: 16px 18px 18px;
  }

  .hero-dish-name {
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 5px;
  }

  .hero-dish-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hero-dish-price { color: var(--amber); font-weight: 700; font-size: 20px; }

  .hero-dish-btn {
    padding: 9px 22px;
    background: var(--dark);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
  }

  .hero-dish-btn:active { background: var(--amber); }

  /* SCROLLBAR NAV TOP */
  .scroll-nav {
    display: flex;
    gap: 8px;
    padding: 8px 20px 16px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .scroll-nav::-webkit-scrollbar { display: none; }

  .scroll-nav-item {
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s;
  }

  .scroll-nav-item.active { background: var(--dark); color: white; }
  .scroll-nav-item.inactive { background: white; color: var(--text2); border: 1px solid rgba(0,0,0,0.08); }

  /* CART FLOATING BUTTON */
  .cart-fab {
    position: absolute;
    bottom: 90px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 18px;
    background: linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(200,112,26,0.5);
    z-index: 40;
    transition: transform 0.2s;
  }

  .cart-fab:active { transform: scale(0.93); }

  .cart-fab-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 22px;
    height: 22px;
    background: var(--dark);
    border-radius: 50%;
    font-size: 11px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--cream);
  }
`;

// ── DATA ──────────────────────────────
const dishes = [
  { id:1, emoji:"🍝", name:"Pasta San Miguel", desc:"Fettuccine, pine nuts, chicken, pesto sauce", price:"89", weight:"320g", cat:"Pasta", tags:["organic","new"], bg:"#FEF3E8" },
  { id:2, emoji:"🍝", name:"Pasta Pomodoro", desc:"Spaghetti, cherry tomatoes, basil, parmesan", price:"79", weight:"370g", cat:"Pasta", tags:["vegan","organic"], bg:"#FEF3E8" },
  { id:3, emoji:"🥗", name:"Salad Monguel", desc:"Grilled tomatoes, spinach, basil, olive oil", price:"65", weight:"220g", cat:"Salads", tags:["vegan","organic"], bg:"#EEF8E8" },
  { id:4, emoji:"🥩", name:"Veal Steak", desc:"Veal steak, baked potatoes, red wine sauce", price:"145", weight:"320g", cat:"Mains", tags:["hot"], bg:"#FEE8E8" },
  { id:5, emoji:"🦆", name:"Duck Confit Poutine", desc:"Pickled cabbage, peas, caramelized onions", price:"135", weight:"380g", cat:"Chef's Special", tags:["new","hot"], bg:"#F8EEE8" },
  { id:6, emoji:"🧀", name:"Warm Goat Cheese Salad", desc:"Mixed greens, cranberries, pan-fried cheese", price:"85", weight:"200g", cat:"Salads", tags:["organic"], bg:"#FFF8E8" },
  { id:7, emoji:"🍖", name:"Beef Tartare", desc:"Beef filet, fermented cabbage, cashew purée", price:"125", weight:"280g", cat:"Mains", tags:["hot"], bg:"#FEE8E8" },
  { id:8, emoji:"🍲", name:"Mac & Cheese", desc:"Homemade pasta, fresh creamy cheese sauce", price:"75", weight:"300g", cat:"Pasta", tags:["new"], bg:"#FFF8E8" },
  { id:9, emoji:"🍗", name:"Chicken A La King", desc:"Poached chicken, mushrooms, garlic cream", price:"110", weight:"340g", cat:"Mains", tags:["organic"], bg:"#FFF3E8" },
];

const categories = ["All","Pasta","Salads","Mains","Chef's Special"];

const DATES = [
  {day:"Mon",num:"17"},{day:"Tue",num:"18"},{day:"Wed",num:"19"},{day:"Thu",num:"20"},
  {day:"Fri",num:"21"},{day:"Sat",num:"22"},{day:"Sun",num:"23"},{day:"Mon",num:"24"},
];

const TIMES = ["7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"];

// ── COMPONENT ─────────────────────────
export default function ApriApp() {
  const [screen, setScreen] = useState("splash");
  const [lang, setLang] = useState("EN");
  const [activeTab, setActiveTab] = useState("home");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [date, setDate] = useState("17");
  const [time, setTime] = useState("8:00 PM");
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState("cairo");
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const [favs, setFavs] = useState([1,4]);
  const [liked, setLiked] = useState(false);
  const [scrollNavActive, setScrollNavActive] = useState("Featured");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (dish) => {
    setCart(c => {
      const existing = c.find(x => x.id === dish.id);
      if (existing) return c.map(x => x.id === dish.id ? {...x, qty: x.qty+1} : x);
      return [...c, {...dish, qty:1}];
    });
    showToast(`🛒 ${dish.name} added to cart`);
  };

  const toggleFav = (id) => {
    setFavs(f => f.includes(id) ? f.filter(x=>x!==id) : [...f,id]);
    showToast(favs.includes(id) ? "Removed from favourites" : "❤️ Added to favourites");
  };

  const filteredDishes = category === "All" ? dishes : dishes.filter(d => d.cat === category);

  const T = {
    EN: {
      tagline: "Directly from our farms to your table",
      welcome: "Welcome to",
      explore: "Explore Menu",
      enter: "ENTER THE EXPERIENCE",
      reserve_title: "Reserve a Table",
      reservation: "Reservation",
      menu: "Menu",
      home: "Home",
      about: "About",
      profile: "Profile",
    },
    AR: {
      tagline: "مباشرةً من مزارعنا إلى مائدتك",
      welcome: "مرحباً في",
      explore: "استكشف القائمة",
      enter: "ابدأ التجربة",
      reserve_title: "احجز طاولتك",
      reservation: "الحجز",
      menu: "القائمة",
      home: "الرئيسية",
      about: "عنا",
      profile: "حسابي",
    }
  }[lang];

  // ── SPLASH SCREEN
  if (screen === "splash") {
    return (
      <>
        <style>{FONTS}{styles}</style>
        <div className="apri-root">
          <div className="phone-wrap">
            <div className="phone-frame">
              <div className="phone-notch"/>
              <div className="screen">
                <div className="splash">
                  <div className="splash-bg"/>
                  <div className="splash-grain"/>
                  <div className="splash-leaf1">🌿</div>
                  <div className="splash-leaf2">🍃</div>
                  <div className="splash-logo-ring">
                    <div className="splash-logo-inner">A</div>
                  </div>
                  <div className="splash-title" style={{position:"relative",zIndex:1}}>APRI</div>
                  <div className="splash-subtitle">CAFÉ & RESTAURANT</div>
                  <div className="splash-divider"/>
                  <div className="splash-tagline">{T.tagline}</div>
                  <button className="splash-btn" onClick={() => setScreen("main")}>
                    {T.enter}
                  </button>
                  <div className="splash-credits">
                    <p>© {new Date().getFullYear()} APRI — ALL RIGHTS RESERVED</p>
                    <p>DEVELOPED BY MOHAB EMAD IBRAHIM HASSAN</p>
                    <p>JOKER EGYPT ViB ABOYOUSSEF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── MAIN APP
  return (
    <>
      <style>{FONTS}{styles}</style>
      <div className="apri-root">
        <div className="phone-wrap">
          <div className="phone-frame">
            <div className="phone-notch"/>
            <div className="screen">
              {/* STATUS BAR */}
              <div className="status-bar" style={{background: activeTab==="home" ? "var(--cream)" : activeTab==="menu" ? "var(--dark)" : activeTab==="reserve" ? "var(--cream)" : activeTab==="about" ? "var(--cream)" : "var(--cream)"}}>
                <span className="status-time" style={{color: activeTab==="menu" ? "white" : "var(--text)"}}>9:41</span>
                <div className="status-icons" style={{color: activeTab==="menu" ? "rgba(255,255,255,0.6)" : "var(--text2)"}}>
                  <span>●●●●</span>
                  <span>WiFi</span>
                  <span>▶</span>
                </div>
              </div>

              {/* TOAST */}
              {toast && <div className="toast"><span>✓</span><span>{toast}</span></div>}

              {/* ── HOME ── */}
              {activeTab === "home" && (
                <div className="page fade-in" style={{background:"var(--cream)"}}>
                  {/* Top header */}
                  <div className="top-header">
                    <div>
                      <div style={{fontSize:"11px",color:"var(--text2)",letterSpacing:"0.5px",marginBottom:"2px"}}>Good Evening 👋</div>
                      <div className="top-logo">A<span>P</span>RI</div>
                    </div>
                    <div className="top-actions">
                      <button className="icon-btn" onClick={() => setLang(l => l==="EN"?"AR":"EN")} style={{fontSize:"14px",fontWeight:"700",letterSpacing:"0.5px"}}>
                        {lang==="EN"?"AR":"EN"}
                      </button>
                      <button className="icon-btn" style={{position:"relative"}} onClick={() => showToast("Notification centre — coming soon")}>
                        🔔
                        <span style={{position:"absolute",top:6,right:6,width:8,height:8,background:"var(--amber)",borderRadius:"50%",border:"1.5px solid var(--cream)"}}/>
                      </button>
                    </div>
                  </div>

                  {/* Hero */}
                  <div className="home-hero">
                    <div className="hero-bg-pattern"/>
                    <div className="hero-emoji-bg">
                      {Array(20).fill(0).map((_,i) => <span key={i}>{["🌿","🍋","🌾","🫒","🍃","🌱","🫙","🌻"][i%8]}</span>)}
                    </div>
                    <div className="hero-overlay"/>
                    <div className="hero-content">
                      <div className="hero-badge">🌿 Farm to Table</div>
                      <div className="hero-title">
                        Fresh from our<br/><em>organic farms</em>
                      </div>
                      <div className="hero-subtitle">Cairo · Riyadh · Worldwide</div>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="section-header" style={{paddingBottom:0}}>
                    <span className="section-title">Quick Actions</span>
                  </div>
                  <div style={{padding:"12px 20px 4px"}}>
                    <div className="quick-actions">
                      {[
                        {icon:"🍽️",label:"Reserve Table",color:"#FEF0E0",tab:"reserve"},
                        {icon:"🛒",label:"Order Now",color:"#EEF5F0",tab:"menu"},
                        {icon:"🎉",label:"Catering",color:"#FEF8E8",tab:"about"},
                        {icon:"📍",label:"Locations",color:"#F0E8FE",tab:"about"},
                      ].map((qa,i) => (
                        <div className="qa-item" key={i} onClick={() => { if(qa.tab) setActiveTab(qa.tab); }}>
                          <div className="qa-icon" style={{background:qa.color}}>{qa.icon}</div>
                          <div className="qa-label">{qa.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promo */}
                  <div className="promo-banner" onClick={() => setActiveTab("menu")}>
                    <div className="promo-left">
                      <h3>Chef's Special Today</h3>
                      <p>Duck Confit Poutine — Limited availability</p>
                    </div>
                    <div className="promo-badge">
                      <span className="promo-badge-pct">15%</span>
                      <span className="promo-badge-text">OFF TODAY</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="section-header">
                    <span className="section-title">Categories</span>
                    <span className="section-link" onClick={() => setActiveTab("menu")}>See all →</span>
                  </div>
                  <div className="categories-scroll">
                    {[{e:"🌿",l:"All"},{e:"🍝",l:"Pasta"},{e:"🥗",l:"Salads"},{e:"🥩",l:"Mains"},{e:"⭐",l:"Specials"}].map(c => (
                      <div key={c.l} className={`cat-chip ${category===c.l?"active":"inactive"}`} onClick={() => setCategory(c.l)}>
                        <span>{c.e}</span>{c.l}
                      </div>
                    ))}
                  </div>

                  {/* Featured */}
                  <div className="section-header" style={{paddingTop:"20px"}}>
                    <span className="section-title">Featured Dishes</span>
                    <span className="section-link" onClick={() => setActiveTab("menu")}>View all →</span>
                  </div>
                  <div className="featured-scroll">
                    {dishes.slice(0,5).map(d => (
                      <div key={d.id} className="featured-card" onClick={() => { addToCart(d); }}>
                        <div className="featured-img" style={{background:d.bg}}>
                          <span style={{fontSize:"58px"}}>{d.emoji}</span>
                          <span className="featured-img-label">{d.cat}</span>
                          <div className="featured-heart" onClick={e => {e.stopPropagation(); toggleFav(d.id);}}>
                            {favs.includes(d.id) ? "❤️" : "🤍"}
                          </div>
                        </div>
                        <div className="featured-info">
                          <div className="featured-name">{d.name}</div>
                          <div className="featured-desc">{d.desc}</div>
                          <div className="featured-row">
                            <span className="featured-price">SAR {d.price}</span>
                            <span className="featured-stars">★★★★★</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{height:"90px"}}/>
                </div>
              )}

              {/* ── MENU ── */}
              {activeTab === "menu" && (
                <div className="page fade-in" style={{background:"var(--dark)"}}>
                  <div className="menu-header">
                    <div className="menu-header-title">Our Menu</div>
                    <div className="menu-header-sub">SEASONAL · ORGANIC · FARM TO TABLE</div>
                    <div className="search-bar">
                      <span style={{fontSize:"16px",opacity:0.5}}>🔍</span>
                      <input placeholder="Search dishes..." readOnly onClick={() => showToast("Search — coming soon")}/>
                    </div>
                    <div style={{display:"flex",gap:"8px",marginTop:"12px",overflowX:"auto",paddingBottom:"2px",scrollbarWidth:"none"}}>
                      {categories.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                          style={{padding:"7px 16px",borderRadius:"50px",border:"none",
                            background: category===c ? "var(--amber)" : "rgba(255,255,255,0.1)",
                            color: "white",fontSize:"12px",fontWeight:"600",whiteSpace:"nowrap",
                            cursor:"pointer",fontFamily:"'DM Sans', sans-serif",
                            transition:"all 0.2s",letterSpacing:"0.3px"
                          }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="menu-body" style={{background:"var(--cream)"}}>
                    {["Pasta","Salads","Mains","Chef's Special"].filter(sec =>
                      category==="All" || category===sec
                    ).map(section => {
                      const items = dishes.filter(d => d.cat === section);
                      if (!items.length) return null;
                      return (
                        <div key={section}>
                          <div className="menu-section-title">
                            {{Pasta:"🍝",Salads:"🥗",Mains:"🥩","Chef's Special":"⭐"}[section]} {section}
                          </div>
                          {items.map((d,i) => (
                            <div key={d.id}>
                              <div className="menu-item">
                                <div className="menu-item-emoji" style={{background:d.bg}}>{d.emoji}</div>
                                <div className="menu-item-info">
                                  <div className="menu-item-name">{d.name}</div>
                                  <div className="menu-item-desc">{d.weight} · {d.desc}</div>
                                  <div className="menu-item-tags">
                                    {d.tags.map(t => <span key={t} className={`tag tag-${t}`}>{t}</span>)}
                                  </div>
                                </div>
                                <div className="menu-item-right">
                                  <span className="menu-price">SAR {d.price}</span>
                                  <button className="add-btn" onClick={() => addToCart(d)}>+</button>
                                </div>
                              </div>
                              {i < items.length-1 && <div className="menu-divider"/>}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                    <div style={{height:"10px"}}/>
                  </div>

                  {cart.length > 0 && (
                    <button className="cart-fab" onClick={() => showToast(`🛒 ${cart.reduce((a,c)=>a+c.qty,0)} items — checkout coming soon`)}>
                      🛒
                      <span className="cart-fab-badge">{cart.reduce((a,c)=>a+c.qty,0)}</span>
                    </button>
                  )}
                </div>
              )}

              {/* ── RESERVE ── */}
              {activeTab === "reserve" && (
                <div className="page fade-in" style={{background:"var(--cream)"}}>
                  <div className="reserve-hero">
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg, #1A0D04 0%, #2D1A0A 100%)"}}/>
                    <div style={{position:"absolute",right:20,top:20,fontSize:"90px",opacity:0.07}}>🕯️</div>
                    <div style={{position:"relative",zIndex:1}}>
                      <div style={{fontSize:"11px",color:"var(--gold)",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"8px",fontWeight:"500"}}>Reserve</div>
                      <div className="reserve-title">Book Your<br/><em>Perfect Evening</em></div>
                    </div>
                  </div>

                  <div className="reserve-body">
                    {/* Location */}
                    <div className="form-card">
                      <div className="form-card-title">📍 Choose Location</div>
                      <div className="location-cards">
                        {[
                          {id:"cairo",flag:"🇪🇬",name:"Mivida",city:"Cairo, Egypt"},
                          {id:"riyadh",flag:"🇸🇦",name:"Riyadh",city:"Riyadh, KSA"},
                        ].map(l => (
                          <div key={l.id} className={`location-card ${location===l.id?"selected":""}`}
                            onClick={() => setLocation(l.id)}>
                            <div className="location-card-flag">{l.flag}</div>
                            <div className="location-card-name">{l.name}</div>
                            <div className="location-card-city">{l.city}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="form-card">
                      <div className="form-card-title">📅 Select Date</div>
                      <div className="date-grid">
                        {DATES.map(d => (
                          <div key={d.num} className={`date-chip ${date===d.num?"selected":""}`}
                            onClick={() => setDate(d.num)}>
                            <div className="date-chip-day">{d.day}</div>
                            <div className="date-chip-num">{d.num}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time */}
                    <div className="form-card">
                      <div className="form-card-title">⏰ Select Time</div>
                      <div className="time-grid">
                        {TIMES.map(t => (
                          <div key={t} className={`time-chip ${time===t?"selected":""}`}
                            onClick={() => setTime(t)}>
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="form-card">
                      <div className="form-card-title">👥 Number of Guests</div>
                      <div className="guest-selector">
                        <button className="guest-btn" onClick={() => setGuests(g => Math.max(1,g-1))}>−</button>
                        <span className="guest-count">{guests}</span>
                        <button className="guest-btn" onClick={() => setGuests(g => Math.min(20,g+1))}>+</button>
                        <span style={{fontSize:"12px",color:"var(--text2)",marginLeft:"8px"}}>
                          {guests === 1 ? "Solo dining" : guests <= 4 ? "Intimate dinner" : guests <= 8 ? "Group dining" : "Private event"}
                        </span>
                      </div>
                    </div>

                    {/* Name & contact */}
                    <div className="form-card">
                      <div className="form-card-title">📋 Your Details</div>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input className="form-input" placeholder="Enter your name"/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input className="form-input" placeholder="+20 xxx xxx xxxx" type="tel"/>
                      </div>
                      <div className="form-group" style={{marginBottom:0}}>
                        <label className="form-label">Special Requests (optional)</label>
                        <input className="form-input" placeholder="Allergies, preferences, occasion..."/>
                      </div>
                    </div>

                    {/* Summary */}
                    <div style={{background:"var(--cream2)",borderRadius:"16px",padding:"16px",marginBottom:"14px",fontSize:"13px",color:"var(--text2)",lineHeight:"1.7"}}>
                      <div style={{fontWeight:"600",color:"var(--text)",marginBottom:"6px",fontSize:"14px"}}>Reservation Summary</div>
                      📍 {location === "cairo" ? "Mivida, Cairo" : "Riyadh, KSA"} &nbsp;·&nbsp; 📅 March {date} &nbsp;·&nbsp; ⏰ {time} &nbsp;·&nbsp; 👥 {guests} guests
                    </div>

                    <button className="reserve-submit" onClick={() => setShowSuccess(true)}>
                      Confirm Reservation →
                    </button>
                  </div>

                  {/* Success modal */}
                  {showSuccess && (
                    <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
                      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
                        <div className="modal-handle"/>
                        <div className="modal-icon">🎉</div>
                        <div className="modal-title">Table Reserved!</div>
                        <div className="modal-desc">
                          Your table for <strong>{guests} guests</strong> at <strong>{location==="cairo"?"Mivida, Cairo":"Riyadh, KSA"}</strong> on <strong>March {date} at {time}</strong> is confirmed. We look forward to seeing you!
                        </div>
                        <button className="modal-btn" onClick={() => { setShowSuccess(false); setActiveTab("home"); }}>
                          Back to Home →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── ABOUT ── */}
              {activeTab === "about" && (
                <div className="page fade-in" style={{background:"var(--cream)"}}>
                  <div className="about-hero">
                    <div className="about-hero-bg"/>
                    <div className="about-hero-pattern">
                      {["🌿","🍋","🌾","🫒","🌻","🫙","🌱","🍃"].map((e,i) => <span key={i}>{e}</span>)}
                    </div>
                    <div className="about-hero-content">
                      <div className="about-eyebrow">Our Story</div>
                      <div className="about-title">
                        Passion for<br/><em>Authentic Food</em>
                      </div>
                    </div>
                  </div>

                  <div className="about-body">
                    <div className="about-story">
                      <p>
                        <em>Apri</em> was born from a simple belief: that the finest dining experiences begin long before the kitchen. Our farms cultivate every ingredient with care, bringing nature's best directly from our fields to your table — no shortcuts, no compromises.
                      </p>
                      <br/>
                      <p>
                        From a warm breakfast to an intimate dinner, our diversified menu celebrates authentic flavours, seasonal produce, and the warmth of true hospitality across <em>Cairo</em>, <em>Riyadh</em>, and beyond.
                      </p>
                    </div>

                    <div className="section-header">
                      <span className="section-title">Our Values</span>
                    </div>
                    <div className="values-grid">
                      {[
                        {icon:"🌱",title:"Farm to Table",desc:"Every ingredient is sourced directly from our organic farms"},
                        {icon:"⭐",title:"Exceptional Quality",desc:"Premium ingredients, prepared with skill and passion"},
                        {icon:"🤝",title:"Warm Hospitality",desc:"Attentive, personalized service for every guest"},
                        {icon:"🌍",title:"Global Presence",desc:"Cairo, Riyadh and expanding worldwide"},
                        {icon:"🎉",title:"Any Occasion",desc:"Birthdays, weddings, corporate events — we cater all"},
                        {icon:"🌿",title:"Sustainability",desc:"Organic practices, locally sourced, zero waste mindset"},
                      ].map((v,i) => (
                        <div className="value-card" key={i}>
                          <div className="value-icon">{v.icon}</div>
                          <div className="value-title">{v.title}</div>
                          <div className="value-desc">{v.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="section-header" style={{paddingTop:"8px"}}>
                      <span className="section-title">Our Locations</span>
                    </div>
                    <div className="locations-section">
                      {[
                        {icon:"🇪🇬",name:"Apri Mivida",addr:"Mivida, Cairo, Egypt",status:"open"},
                        {icon:"🇸🇦",name:"Apri Riyadh",addr:"Riyadh, Kingdom of Saudi Arabia",status:"open"},
                        {icon:"🌍",name:"Worldwide",addr:"Expanding globally — stay tuned",status:"soon"},
                      ].map((l,i) => (
                        <div className="location-row" key={i}>
                          <div className="location-icon">{l.icon}</div>
                          <div className="location-info">
                            <div className="location-name">{l.name}</div>
                            <div className="location-address">{l.addr}</div>
                          </div>
                          <span className={`location-tag ${l.status==="open"?"tag-open":"tag-soon"}`}>
                            {l.status==="open"?"● Open":"Coming Soon"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Contact info */}
                    <div style={{margin:"0 20px 20px",background:"var(--dark)",borderRadius:"20px",padding:"20px",color:"white"}}>
                      <div style={{fontFamily:"'Playfair Display', serif",fontSize:"17px",marginBottom:"14px",color:"var(--gold)"}}>Get in Touch</div>
                      {[
                        {icon:"📞",label:"+2 (012) 2227 3331"},
                        {icon:"📧",label:"info@thisisapri.com"},
                        {icon:"🌐",label:"thisisapri.com"},
                        {icon:"📸",label:"@apri_ksa"},
                      ].map((c,i) => (
                        <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
                          <span style={{fontSize:"18px"}}>{c.icon}</span>
                          <span style={{fontSize:"13px",color:"rgba(255,255,255,0.7)"}}>{c.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hours */}
                    <div style={{margin:"0 20px 20px",background:"white",borderRadius:"20px",padding:"18px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
                      <div style={{fontFamily:"'Playfair Display', serif",fontSize:"16px",marginBottom:"12px",color:"var(--text)"}}>⏰ Opening Hours</div>
                      <div style={{fontSize:"13px",color:"var(--text2)",lineHeight:"1.8"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}><span>Monday – Saturday</span><span style={{fontWeight:"600",color:"var(--text)"}}>7:00 AM – 2:00 AM</span></div>
                        <div style={{display:"flex",justifyContent:"space-between"}}><span>Sunday</span><span style={{fontWeight:"600",color:"var(--text)"}}>11:00 AM – 2:00 AM</span></div>
                      </div>
                    </div>

                    {/* Credits */}
                    <div style={{margin:"0 20px 20px",textAlign:"center",padding:"16px",background:"rgba(200,112,26,0.06)",borderRadius:"16px",border:"1px solid rgba(200,112,26,0.15)"}}>
                      <div style={{fontSize:"10px",color:"var(--text2)",lineHeight:"1.8",letterSpacing:"0.5px"}}>
                        <div style={{fontSize:"12px",fontWeight:"600",color:"var(--amber)",marginBottom:"4px"}}>App Development</div>
                        <div>Mohab Emad Ibrahim Hassan</div>
                        <div style={{color:"var(--amber)"}}>Joker Egypt ViB AboYoussef</div>
                        <div style={{marginTop:"6px",color:"rgba(0,0,0,0.35)"}}>© {new Date().getFullYear()} Apri — All Rights Reserved</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PROFILE ── */}
              {activeTab === "profile" && (
                <div className="page fade-in" style={{background:"var(--cream)"}}>
                  <div className="profile-header">
                    <div className="profile-header-bg"/>
                    <div className="profile-avatar-wrap">
                      <div className="profile-avatar">👤</div>
                      <div className="profile-name">Apri Guest</div>
                      <div className="profile-level">🥇 Gold Member</div>
                    </div>
                  </div>

                  <div className="profile-stats">
                    {[
                      {num:"12",label:"Orders"},
                      {num:"5",label:"Reservations"},
                      {num:"340",label:"Points"},
                    ].map((s,i) => (
                      <div className="stat-item" key={i}>
                        <span className="stat-num">{s.num}</span>
                        <span className="stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="profile-body">
                    <div className="profile-section-header">Account</div>
                    {[
                      {icon:"❤️",bg:"#FEE8E8",label:"My Favourites",badge:favs.length},
                      {icon:"🛒",bg:"#FEF0E8",label:"Order History",badge:cart.length||null},
                      {icon:"📅",bg:"#E8F0FE",label:"My Reservations"},
                      {icon:"🏆",bg:"#FFF8E8",label:"Loyalty Points",badge:"340 pts"},
                    ].map((m,i) => (
                      <div key={i} className="menu-list-item" onClick={() => showToast(`${m.label} — coming soon`)}>
                        <div className="mli-icon" style={{background:m.bg}}>{m.icon}</div>
                        <span className="mli-label">{m.label}</span>
                        {m.badge && <span className="mli-badge">{m.badge}</span>}
                        <span className="mli-arrow">›</span>
                      </div>
                    ))}

                    <div className="profile-section-header">Preferences</div>
                    {[
                      {icon:"🌐",bg:"#E8F5EE",label:`Language: ${lang}`,action:() => setLang(l=>l==="EN"?"AR":"EN")},
                      {icon:"🔔",bg:"#FEF0E8",label:"Notifications"},
                      {icon:"🔒",bg:"#F0E8FE",label:"Privacy & Security"},
                      {icon:"📄",bg:"#E8F0FE",label:"Privacy Policy"},
                    ].map((m,i) => (
                      <div key={i} className="menu-list-item" onClick={m.action || (() => showToast(`${m.label} — coming soon`))}>
                        <div className="mli-icon" style={{background:m.bg}}>{m.icon}</div>
                        <span className="mli-label">{m.label}</span>
                        <span className="mli-arrow">›</span>
                      </div>
                    ))}

                    <div className="profile-section-header">About the App</div>
                    {[
                      {icon:"ℹ️",bg:"#F0F0F0",label:"Version 1.1 Pro"},
                      {icon:"👨‍💻",bg:"#FEF0E0",label:"Developer: Joker Egypt ViB AboYoussef"},
                      {icon:"📜",bg:"#F0E8FE",label:"© 2026 All Rights Reserved"},
                    ].map((m,i) => (
                      <div key={i} className="menu-list-item">
                        <div className="mli-icon" style={{background:m.bg}}>{m.icon}</div>
                        <span className="mli-label" style={{fontSize:"12px"}}>{m.label}</span>
                      </div>
                    ))}

                    <div style={{height:"20px"}}/>
                  </div>
                </div>
              )}

              {/* ── BOTTOM NAV ── */}
              <div className="bottom-nav">
                {[
                  {id:"home",icon:"🏠",label:T.home},
                  {id:"menu",icon:"🍽️",label:T.menu},
                  {id:"reserve",icon:"📅",label:T.reservation},
                  {id:"about",icon:"🌿",label:T.about},
                  {id:"profile",icon:"👤",label:T.profile},
                ].map(tab => (
                  <div key={tab.id} className={`nav-item ${activeTab===tab.id?"active":""}`}
                    onClick={() => setActiveTab(tab.id)}>
                    <span className="nav-icon">{tab.icon}</span>
                    <span className="nav-label">{tab.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
