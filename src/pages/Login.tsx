import { useState } from "react";

/* ─── SCENE PHOTO: real editorial photograph ────────────────────────────── */
function SceneSVG() {
  return (
    <img
      src="https://images.unsplash.com/photo-1779905694837-e8f0f75bb0e9?w=800&q=88&fit=crop&crop=bottom"
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center bottom",
        display: "block",
      }}
    />
  );
}

/* ─── (unused SVG kept for reference) ──────────────────────────────────── */
function _SceneSVGLegacy() {
  return (
    <svg
      viewBox="0 0 380 560"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        {/* ── TEXTURE FILTERS ── */}
        {/* Stone/marble texture via turbulence */}
        <filter id="sc-stone" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="turbulence" baseFrequency="0.028 0.012" numOctaves="5" seed="7" result="t" />
          <feColorMatrix type="matrix" values="0.15 0 0 0 0.06  0.1 0 0 0 0.04  0.08 0 0 0 0.03  0 0 0 7 -2" in="t" result="dark" />
          <feBlend in="SourceGraphic" in2="dark" mode="overlay" result="bl" />
          <feComposite in="bl" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Paper grain for book spines */}
        <filter id="sc-paper" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" seed="3" stitchTiles="stitch" result="n" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.94  0 0 0 0 0.84  0 0 0 0.065 0" in="n" result="g" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="g" /></feMerge>
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        {/* Ceramic texture for vase */}
        <filter id="sc-ceramic" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.36 0.22" numOctaves="3" seed="11" result="n" />
          <feColorMatrix values="0 0 0 0 0.48  0 0 0 0 0.34  0 0 0 0 0.20  0 0 0 0.10 0" in="n" result="g" />
          <feBlend in="SourceGraphic" in2="g" mode="overlay" result="bl" />
          <feComposite in="bl" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Organic leaf texture */}
        <filter id="sc-lftex" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.48 0.32" numOctaves="3" seed="5" result="n" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0.07  0 0 0 0 0  0 0 0 0.11 0" in="n" result="g" />
          <feBlend in="SourceGraphic" in2="g" mode="multiply" result="bl" />
          <feComposite in="bl" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Soft blur for DOF on far leaves */}
        <filter id="sc-dof">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        {/* Contact/drop shadow for books */}
        <filter id="sc-bksh" x="-10%" y="-5%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.55)" />
        </filter>
        {/* Drop shadow for vase */}
        <filter id="sc-vash" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="1" dy="5" stdDeviation="7" floodColor="rgba(0,0,0,0.42)" />
        </filter>
        {/* Ellipse blur for contact shadows */}
        <filter id="sc-blur">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        {/* ── GRADIENTS ── */}
        {/* Marble base — very dark warm brown-black */}
        <linearGradient id="sc-mbl" x1="0.1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C2018" />
          <stop offset="40%" stopColor="#1A1210" />
          <stop offset="100%" stopColor="#090508" />
        </linearGradient>
        {/* Book 1 (LIBERDADE) */}
        <linearGradient id="sc-b1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#AE9E84" />
          <stop offset="8%" stopColor="#D6CAB8" />
          <stop offset="18%" stopColor="#ECE4D4" />
          <stop offset="55%" stopColor="#F4EAD8" />
          <stop offset="88%" stopColor="#E0D4C0" />
          <stop offset="100%" stopColor="#B6A888" />
        </linearGradient>
        {/* Book 2 (EQUILÍBRIO) */}
        <linearGradient id="sc-b2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A69678" />
          <stop offset="10%" stopColor="#C9BDA6" />
          <stop offset="22%" stopColor="#DED2BC" />
          <stop offset="55%" stopColor="#E8DCCA" />
          <stop offset="90%" stopColor="#CCC0A8" />
          <stop offset="100%" stopColor="#A28E70" />
        </linearGradient>
        {/* Book 3 (LONGEVIDADE) */}
        <linearGradient id="sc-b3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#BAAE96" />
          <stop offset="12%" stopColor="#D6CAB8" />
          <stop offset="25%" stopColor="#EAE4D0" />
          <stop offset="58%" stopColor="#F2E8D6" />
          <stop offset="90%" stopColor="#DDD0BC" />
          <stop offset="100%" stopColor="#B2A290" />
        </linearGradient>
        {/* Book 4 (SAÚDE) */}
        <linearGradient id="sc-b4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B6A88A" />
          <stop offset="10%" stopColor="#DEDAD4" />
          <stop offset="20%" stopColor="#FAF0DE" />
          <stop offset="52%" stopColor="#FEFAF0" />
          <stop offset="90%" stopColor="#EADFCB" />
          <stop offset="100%" stopColor="#BAAA8E" />
        </linearGradient>
        {/* Vase — ceramic stone */}
        <radialGradient id="sc-vg" cx="30%" cy="24%" r="72%" fx="30%" fy="24%">
          <stop offset="0%" stopColor="#D6B484" />
          <stop offset="25%" stopColor="#B28860" />
          <stop offset="58%" stopColor="#7C5A3C" />
          <stop offset="85%" stopColor="#523828" />
          <stop offset="100%" stopColor="#3C2818" />
        </radialGradient>
        {/* Vase rim */}
        <linearGradient id="sc-vrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#543A22" />
          <stop offset="28%" stopColor="#987248" />
          <stop offset="50%" stopColor="#C29860" />
          <stop offset="72%" stopColor="#987248" />
          <stop offset="100%" stopColor="#543A22" />
        </linearGradient>
        {/* Leaf gradients — 4 variants for variety */}
        <linearGradient id="sc-l1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A8040" />
          <stop offset="55%" stopColor="#4A6028" />
          <stop offset="100%" stopColor="#2C3E18" />
        </linearGradient>
        <linearGradient id="sc-l2" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#587035" />
          <stop offset="100%" stopColor="#2E4418" />
        </linearGradient>
        <linearGradient id="sc-l3" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#507040" />
          <stop offset="100%" stopColor="#304825" />
        </linearGradient>
        <linearGradient id="sc-l4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#627838" />
          <stop offset="100%" stopColor="#384A22" />
        </linearGradient>
        {/* Warm ambient glow */}
        <radialGradient id="sc-glow" cx="50%" cy="78%" r="48%">
          <stop offset="0%" stopColor="rgba(215,148,62,0.14)" />
          <stop offset="100%" stopColor="rgba(215,148,62,0)" />
        </radialGradient>
      </defs>

      {/* ══ MARBLE SURFACE ══ */}
      <rect x="0" y="488" width="380" height="72" fill="url(#sc-mbl)" />
      {/* Stone texture overlay */}
      <rect x="0" y="488" width="380" height="72" fill="rgba(22,14,10,1)" filter="url(#sc-stone)" opacity="0.80" />
      {/* Marble veins — subtle light paths */}
      <path d="M12,502 Q62,496 118,500 Q172,504 228,497 Q278,491 334,497 Q358,499 378,495"
        stroke="rgba(152,136,112,0.11)" strokeWidth="0.7" fill="none" />
      <path d="M38,511 Q88,505 148,509 Q202,513 258,506 Q304,501 352,507"
        stroke="rgba(142,126,104,0.08)" strokeWidth="0.5" fill="none" />
      <path d="M78,496 Q132,490 192,494 Q244,498 296,491"
        stroke="rgba(162,146,122,0.09)" strokeWidth="0.6" fill="none" />
      <path d="M55,521 Q108,516 162,519 Q214,522 264,516 Q306,512 348,518"
        stroke="rgba(138,120,98,0.07)" strokeWidth="0.4" fill="none" />
      {/* Marble top edge subtle highlight */}
      <rect x="0" y="486" width="380" height="2.5" fill="rgba(215,185,140,0.07)" />

      {/* ══ BOOK STACK CONTACT SHADOW ON MARBLE ══ */}
      <ellipse cx="188" cy="493" rx="108" ry="8" fill="rgba(0,0,0,0.62)" filter="url(#sc-blur)" />

      {/* ══ BOOK STACK ══ */}
      <g filter="url(#sc-bksh)">
        {/* LIBERDADE — bottom */}
        <rect x="52" y="452" width="272" height="38" rx="1.5" fill="url(#sc-b1)" filter="url(#sc-paper)" />
        <rect x="52" y="452" width="11" height="38" rx="1" fill="rgba(0,0,0,0.22)" />
        <rect x="313" y="452" width="11" height="38" fill="rgba(0,0,0,0.14)" />
        <rect x="52" y="452" width="272" height="2" fill="rgba(255,246,228,0.45)" />
        <text x="188" y="476" textAnchor="middle" fill="#35210F"
          fontFamily="Georgia,'Times New Roman',serif" fontSize="12" fontWeight="400" letterSpacing="5">LIBERDADE</text>
        <rect x="52" y="452" width="272" height="5" fill="rgba(0,0,0,0.10)" />

        {/* EQUILÍBRIO */}
        <rect x="56" y="414" width="264" height="38" rx="1.5" fill="url(#sc-b2)" filter="url(#sc-paper)" />
        <rect x="56" y="414" width="10" height="38" rx="1" fill="rgba(0,0,0,0.20)" />
        <rect x="310" y="414" width="10" height="38" fill="rgba(0,0,0,0.12)" />
        <rect x="56" y="414" width="264" height="2" fill="rgba(255,244,224,0.40)" />
        <text x="188" y="438" textAnchor="middle" fill="#35210F"
          fontFamily="Georgia,'Times New Roman',serif" fontSize="11.5" fontWeight="400" letterSpacing="4.5">EQUILÍBRIO</text>
        <rect x="56" y="414" width="264" height="4.5" fill="rgba(0,0,0,0.08)" />

        {/* LONGEVIDADE */}
        <rect x="54" y="376" width="268" height="38" rx="1.5" fill="url(#sc-b3)" filter="url(#sc-paper)" />
        <rect x="54" y="376" width="10" height="38" rx="1" fill="rgba(0,0,0,0.19)" />
        <rect x="312" y="376" width="10" height="38" fill="rgba(0,0,0,0.11)" />
        <rect x="54" y="376" width="268" height="2" fill="rgba(255,248,232,0.40)" />
        <text x="188" y="400" textAnchor="middle" fill="#35210F"
          fontFamily="Georgia,'Times New Roman',serif" fontSize="10.5" fontWeight="400" letterSpacing="3.5">LONGEVIDADE</text>
        <rect x="54" y="376" width="268" height="4" fill="rgba(0,0,0,0.07)" />

        {/* SAÚDE — top */}
        <rect x="58" y="340" width="260" height="36" rx="1.5" fill="url(#sc-b4)" filter="url(#sc-paper)" />
        <rect x="58" y="340" width="9" height="36" rx="1" fill="rgba(0,0,0,0.18)" />
        <rect x="309" y="340" width="9" height="36" fill="rgba(0,0,0,0.10)" />
        <rect x="58" y="340" width="260" height="2" fill="rgba(255,252,238,0.52)" />
        <text x="188" y="364" textAnchor="middle" fill="#35210F"
          fontFamily="Georgia,'Times New Roman',serif" fontSize="13.5" fontWeight="400" letterSpacing="6">SAÚDE</text>
        <rect x="58" y="340" width="260" height="4" fill="rgba(0,0,0,0.06)" />
      </g>

      {/* ══ VASE CONTACT SHADOW ON TOP BOOK ══ */}
      <ellipse cx="188" cy="346" rx="60" ry="8.5" fill="rgba(0,0,0,0.42)" filter="url(#sc-blur)" />

      {/* ══ VASE — ceramic/stone ══ */}
      <g filter="url(#sc-vash)">
        {/* Body */}
        <path
          d="M134,345 C132,328 130,310 136,290 C142,268 152,248 156,228 Q160,212 188,210 Q216,212 220,228 C224,248 234,268 240,290 C246,310 244,328 242,345 Z"
          fill="url(#sc-vg)"
          filter="url(#sc-ceramic)"
        />
        {/* Primary highlight — left curved light */}
        <path d="M150,338 C147,318 145,293 151,268 C155,250 161,235 164,220"
          stroke="rgba(255,230,182,0.22)" strokeWidth="11" fill="none" strokeLinecap="round" />
        {/* Secondary narrow highlight */}
        <path d="M152,326 C150,310 148,290 153,270 C157,255 161,240 163,226"
          stroke="rgba(255,238,196,0.13)" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Right-side shadow on vase */}
        <path d="M222,345 C226,328 230,310 234,290 C240,268 238,248 234,228 Q232,217 226,213"
          stroke="rgba(0,0,0,0.20)" strokeWidth="13" fill="none" strokeLinecap="round" />
        {/* Rim shadow */}
        <ellipse cx="188" cy="218" rx="33" ry="9.5" fill="#583C22" />
        {/* Rim lighter surface */}
        <ellipse cx="188" cy="215" rx="31" ry="8" fill="url(#sc-vrim)" />
        {/* Rim opening inner glow */}
        <ellipse cx="178" cy="213" rx="13" ry="3.5" fill="rgba(255,220,172,0.16)" transform="rotate(-8,178,213)" />
      </g>

      {/* ══ PLANT — organic bezier leaves ══ */}
      {/* Stems */}
      <path d="M184,210 C186,184 190,156 196,126 C200,98 212,72 228,48"
        stroke="#2C3E18" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M188,172 C168,154 144,141 116,131 C92,122 66,117 38,115"
        stroke="#2C3E18" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M196,135 C226,117 264,101 300,89 C328,80 355,72 378,67"
        stroke="#2C3E18" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M211,93 C250,74 288,60 324,48 C352,39 374,34 379,31"
        stroke="#2C3E18" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M162,157 C140,149 116,144 90,139 C70,135 50,132 30,131"
        stroke="#2C3E18" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* ── LEAVES — bezier paths for organic look, with mid-rib ── */}
      {/* Leaf template shape (local): M0,0 C3,-4 10,-12 19,-13 C25,-11 27,-4 25,0 C22,4 13,7 0,0 Z */}

      {/* Left branch leaves — near (no blur) */}
      <g filter="url(#sc-lftex)">
        <g transform="translate(148,138) rotate(-22)">
          <path d="M0,0 C3,-4 10,-12 19,-13 C25,-11 27,-4 25,0 C22,5 13,7 0,0 Z" fill="url(#sc-l1)" opacity="0.94" />
          <path d="M0,0 L25,0" stroke="rgba(18,30,8,0.28)" strokeWidth="0.55" fill="none" />
        </g>
        <g transform="translate(128,148) rotate(-12)">
          <path d="M0,0 C3,-3 9,-10 17,-12 C23,-10 24,-4 22,0 C19,4 11,6 0,0 Z" fill="url(#sc-l2)" opacity="0.89" />
          <path d="M0,0 L22,0" stroke="rgba(18,30,8,0.24)" strokeWidth="0.5" fill="none" />
        </g>
        <g transform="translate(106,142) rotate(-5)">
          <path d="M0,0 C3,-4 10,-12 18,-13 C24,-11 26,-4 24,0 C21,4 12,7 0,0 Z" fill="url(#sc-l3)" opacity="0.87" />
          <path d="M0,0 L24,0" stroke="rgba(18,30,8,0.22)" strokeWidth="0.5" fill="none" />
        </g>
        <g transform="translate(86,152) rotate(1)">
          <path d="M0,0 C2,-3 9,-10 17,-11 C22,-9 23,-3 21,0 C18,4 10,6 0,0 Z" fill="url(#sc-l4)" opacity="0.83" />
          <path d="M0,0 L21,0" stroke="rgba(18,30,8,0.20)" strokeWidth="0.5" fill="none" />
        </g>
        <g transform="translate(64,157) rotate(5)">
          <path d="M0,0 C2,-3 8,-10 16,-11 C21,-9 22,-3 20,0 C17,4 9,6 0,0 Z" fill="url(#sc-l1)" opacity="0.78" />
          <path d="M0,0 L20,0" stroke="rgba(18,30,8,0.18)" strokeWidth="0.45" fill="none" />
        </g>
      </g>
      {/* Far left leaves — slight DOF blur */}
      <g filter="url(#sc-dof)" opacity="0.70">
        <g transform="translate(46,162) rotate(7)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 8,-9 15,-10 C20,-8 21,-3 19,0 C16,3 9,5 0,0 Z" fill="url(#sc-l2)" />
        </g>
        <g transform="translate(28,167) rotate(9)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 7,-8 14,-9 C18,-7 19,-2 17,0 C14,3 8,4 0,0 Z" fill="url(#sc-l3)" />
        </g>
      </g>

      {/* Main stem leaves */}
      <g filter="url(#sc-lftex)">
        <g transform="translate(202,168) rotate(14)">
          <path d="M0,0 C3,-5 11,-13 21,-14 C27,-12 29,-5 27,0 C24,5 14,8 0,0 Z" fill="url(#sc-l2)" opacity="0.92" />
          <path d="M0,0 L27,0" stroke="rgba(18,30,8,0.28)" strokeWidth="0.6" fill="none" />
        </g>
        <g transform="translate(190,183) rotate(-9)">
          <path d="M0,0 C3,-4 10,-12 19,-13 C25,-11 27,-4 25,0 C22,5 13,7 0,0 Z" fill="url(#sc-l1)" opacity="0.87" />
          <path d="M0,0 L25,0" stroke="rgba(18,30,8,0.25)" strokeWidth="0.55" fill="none" />
        </g>
        <g transform="translate(209,146) rotate(25)">
          <path d="M0,0 C3,-4 10,-12 19,-13 C25,-11 27,-4 25,0 C22,5 13,7 0,0 Z" fill="url(#sc-l4)" opacity="0.89" />
          <path d="M0,0 L25,0" stroke="rgba(18,30,8,0.26)" strokeWidth="0.55" fill="none" />
        </g>
        <g transform="translate(199,123) rotate(33)">
          <path d="M0,0 C3,-4 10,-11 18,-13 C24,-11 26,-4 24,0 C21,4 12,7 0,0 Z" fill="url(#sc-l3)" opacity="0.86" />
          <path d="M0,0 L24,0" stroke="rgba(18,30,8,0.24)" strokeWidth="0.5" fill="none" />
        </g>
        <g transform="translate(215,103) rotate(41)">
          <path d="M0,0 C3,-3 9,-10 17,-12 C23,-10 24,-4 22,0 C19,4 11,6 0,0 Z" fill="url(#sc-l1)" opacity="0.83" />
          <path d="M0,0 L22,0" stroke="rgba(18,30,8,0.22)" strokeWidth="0.5" fill="none" />
        </g>
      </g>
      <g filter="url(#sc-dof)" opacity="0.75">
        <g transform="translate(225,81) rotate(45)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 9,-10 17,-11 C22,-9 23,-3 21,0 C18,4 10,6 0,0 Z" fill="url(#sc-l2)" />
          <path d="M0,0 L21,0" stroke="rgba(18,30,8,0.18)" strokeWidth="0.45" fill="none" />
        </g>
        <g transform="translate(232,59) rotate(48)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 8,-9 16,-10 C21,-8 22,-3 20,0 C17,3 9,5 0,0 Z" fill="url(#sc-l4)" />
        </g>
      </g>

      {/* Right branch leaves */}
      <g filter="url(#sc-lftex)">
        <g transform="translate(250,103) rotate(21)">
          <path d="M0,0 C3,-4 10,-12 19,-13 C25,-11 27,-4 25,0 C22,5 13,7 0,0 Z" fill="url(#sc-l3)" opacity="0.89" />
          <path d="M0,0 L25,0" stroke="rgba(18,30,8,0.26)" strokeWidth="0.55" fill="none" />
        </g>
        <g transform="translate(271,94) rotate(16)">
          <path d="M0,0 C3,-4 10,-11 18,-12 C24,-10 25,-4 23,0 C20,4 12,7 0,0 Z" fill="url(#sc-l1)" opacity="0.86" />
          <path d="M0,0 L23,0" stroke="rgba(18,30,8,0.24)" strokeWidth="0.5" fill="none" />
        </g>
        <g transform="translate(290,84) rotate(10)">
          <path d="M0,0 C2,-3 9,-10 17,-12 C23,-10 24,-4 22,0 C19,4 11,6 0,0 Z" fill="url(#sc-l4)" opacity="0.83" />
          <path d="M0,0 L22,0" stroke="rgba(18,30,8,0.22)" strokeWidth="0.45" fill="none" />
        </g>
      </g>
      <g filter="url(#sc-dof)" opacity="0.74">
        <g transform="translate(312,75) rotate(6)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 8,-10 16,-11 C21,-9 22,-3 20,0 C17,3 9,5 0,0 Z" fill="url(#sc-l2)" />
          <path d="M0,0 L20,0" stroke="rgba(18,30,8,0.17)" strokeWidth="0.4" fill="none" />
        </g>
        <g transform="translate(332,69) rotate(3)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 7,-9 15,-10 C20,-8 21,-2 19,0 C16,3 9,5 0,0 Z" fill="url(#sc-l3)" />
        </g>
        <g transform="translate(356,63) rotate(1)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 7,-8 14,-10 C18,-8 19,-2 17,0 C14,3 8,5 0,0 Z" fill="url(#sc-l4)" />
        </g>
      </g>

      {/* Upper right branch leaves */}
      <g filter="url(#sc-lftex)">
        <g transform="translate(254,61) rotate(9)">
          <path d="M0,0 C3,-4 10,-11 18,-12 C24,-10 25,-4 23,0 C20,4 12,6 0,0 Z" fill="url(#sc-l1)" opacity="0.83" />
          <path d="M0,0 L23,0" stroke="rgba(18,30,8,0.22)" strokeWidth="0.45" fill="none" />
        </g>
      </g>
      <g filter="url(#sc-dof)" opacity="0.72">
        <g transform="translate(278,51) rotate(5)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 9,-10 17,-12 C22,-10 23,-4 21,0 C18,4 10,6 0,0 Z" fill="url(#sc-l3)" />
          <path d="M0,0 L21,0" stroke="rgba(18,30,8,0.17)" strokeWidth="0.4" fill="none" />
        </g>
        <g transform="translate(304,43) rotate(2)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 8,-9 16,-11 C21,-9 22,-3 20,0 C17,3 9,5 0,0 Z" fill="url(#sc-l2)" />
        </g>
        <g transform="translate(330,36) rotate(-1)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-3 7,-8 14,-10 C18,-8 19,-2 17,0 C14,3 8,5 0,0 Z" fill="url(#sc-l4)" />
        </g>
        <g transform="translate(356,30) rotate(-3)" filter="url(#sc-lftex)">
          <path d="M0,0 C2,-2 7,-8 13,-9 C17,-7 18,-2 16,0 C13,3 7,4 0,0 Z" fill="url(#sc-l1)" />
        </g>
      </g>

      {/* Warm ambient glow */}
      <rect x="0" y="285" width="380" height="275" fill="url(#sc-glow)" />
    </svg>
  );
}

/* ─── LEAF SHADOW SVG for right cream panel (photographic shadow style) ──── */
function LeafShadowTopRight() {
  return (
    <svg
      viewBox="0 0 320 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "320px", height: "400px", display: "block" }}
    >
      <defs>
        {/* Multiple blur passes for depth variation */}
        <filter id="lsb1" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="lsb2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="lsb3" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <filter id="lsb4" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* Deep background shadow layer — very diffuse */}
      <g filter="url(#lsb1)" opacity="0.18">
        <path d="M310 0 C285 55 248 82 210 110 C168 142 140 175 120 218 C105 252 100 290 95 330" fill="none" stroke="#4A5830" strokeWidth="48"/>
        <path d="M295 5 C272 62 238 95 195 125 C155 155 130 195 112 242" fill="none" stroke="#4A5830" strokeWidth="36"/>
      </g>
      {/* Mid shadow layer — leaf blobs */}
      <g filter="url(#lsb2)" opacity="0.22">
        <path d="M255 18 C238 10 215 22 205 40 C195 58 198 78 215 84 C232 90 252 78 260 60 C268 42 264 24 255 18 Z" fill="#3E4C28"/>
        <path d="M235 8 C218 2 198 15 190 34 C182 53 186 72 200 77 C214 82 232 70 238 52 C244 34 242 12 235 8 Z" fill="#4A5830" opacity="0.85"/>
        <path d="M195 52 C175 42 152 56 144 77 C136 98 142 120 158 126 C175 132 196 118 202 97 C208 76 205 58 195 52 Z" fill="#3E4C28"/>
        <path d="M175 38 C158 30 138 44 132 64 C126 84 132 104 146 108 C160 112 178 98 182 78 C186 58 182 44 175 38 Z" fill="#4A5830" opacity="0.80"/>
        <path d="M162 95 C142 84 118 100 110 122 C102 144 110 168 126 173 C142 178 162 162 168 140 C174 118 170 102 162 95 Z" fill="#3E4C28"/>
        <path d="M144 82 C126 74 104 88 98 108 C92 128 98 150 112 154 C126 158 144 144 148 124 C152 104 150 88 144 82 Z" fill="#4A5830" opacity="0.78"/>
        <path d="M142 145 C120 134 95 150 88 174 C81 198 90 224 108 229 C126 234 148 216 154 192 C160 168 155 152 142 145 Z" fill="#3E4C28"/>
        <path d="M128 130 C108 122 86 136 80 158 C74 180 82 204 96 208 C110 212 130 196 134 174 C138 152 136 136 128 130 Z" fill="#4A5830" opacity="0.75"/>
        <path d="M125 198 C104 188 80 205 74 230 C68 255 78 282 96 286 C114 290 136 272 140 247 C144 222 138 205 125 198 Z" fill="#3E4C28" opacity="0.88"/>
      </g>
      {/* Sharper stem lines */}
      <g filter="url(#lsb3)" opacity="0.20">
        <path d="M280 0 C262 48 235 74 205 100 C172 128 150 160 132 200 C118 232 110 268 105 305" fill="none" stroke="#3A4825" strokeWidth="5"/>
        <path d="M265 0 C248 46 222 70 192 96 C162 122 142 155 128 194" fill="none" stroke="#3A4825" strokeWidth="3.5"/>
      </g>
      {/* Sharp detail layer — closest leaves catch hard edge */}
      <g filter="url(#lsb4)" opacity="0.15">
        <path d="M248 22 C238 16 226 24 222 36 C218 48 222 60 230 63 C238 66 248 58 250 46 C252 34 250 26 248 22 Z" fill="#2E3A1C"/>
        <path d="M192 58 C180 50 166 60 162 74 C158 88 164 102 174 104 C184 106 196 96 198 82 C200 68 196 62 192 58 Z" fill="#2E3A1C"/>
        <path d="M155 104 C143 96 130 108 127 122 C124 136 130 150 140 152 C150 154 162 144 163 130 C164 116 158 108 155 104 Z" fill="#2E3A1C"/>
      </g>
    </svg>
  );
}

function LeafShadowBottomRight() {
  return (
    <svg
      viewBox="0 0 260 300"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "260px", height: "300px", display: "block" }}
    >
      <defs>
        <filter id="lsb5" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="lsb6" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="lsb7" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* Deep background */}
      <g filter="url(#lsb5)" opacity="0.16">
        <path d="M240 295 C215 260 188 235 158 208 C124 178 102 148 85 115 C70 86 62 55 58 18" fill="none" stroke="#4A5830" strokeWidth="52"/>
      </g>
      {/* Mid leaf blobs */}
      <g filter="url(#lsb6)" opacity="0.20">
        <path d="M205 285 C190 268 170 262 155 272 C140 282 136 300 148 310 C160 320 180 316 192 302 C200 292 206 286 205 285 Z" fill="#3E4C28"/>
        <path d="M188 268 C172 250 152 244 138 254 C124 264 122 282 135 292 C148 302 168 296 180 282 C190 270 192 266 188 268 Z" fill="#4A5830" opacity="0.82"/>
        <path d="M168 238 C152 218 130 212 116 222 C102 232 100 252 114 264 C128 276 150 268 162 252 C172 238 172 236 168 238 Z" fill="#3E4C28"/>
        <path d="M148 214 C132 194 110 188 97 200 C84 212 84 232 98 242 C112 252 134 242 144 226 C152 212 152 212 148 214 Z" fill="#4A5830" opacity="0.78"/>
        <path d="M128 184 C114 164 94 160 82 172 C70 184 72 204 86 212 C100 220 120 210 128 194 C134 180 132 182 128 184 Z" fill="#3E4C28"/>
        <path d="M108 154 C96 136 78 132 67 144 C56 156 59 176 73 182 C87 188 105 178 112 162 C118 148 112 152 108 154 Z" fill="#4A5830" opacity="0.75"/>
        <path d="M92 122 C82 104 65 100 55 112 C45 124 48 144 61 148 C74 152 90 142 95 126 C100 112 96 120 92 122 Z" fill="#3E4C28" opacity="0.88"/>
      </g>
      {/* Stem */}
      <g filter="url(#lsb7)" opacity="0.18">
        <path d="M228 295 C205 262 180 238 152 212 C122 184 100 155 84 122 C70 92 64 60 60 22" fill="none" stroke="#3A4825" strokeWidth="4"/>
      </g>
    </svg>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        fontFamily: "'Montserrat', system-ui, sans-serif",
        background: "#EAE0CE",
        minWidth: "320px",
      }}
    >
      {/* ═══════════════════════════════════════════════════════
          LEFT PANEL — 60% — dark photo scene + vinho overlay
      ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          width: "60%",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          display: "none",
        }}
        className="lg-left-panel"
      >
        {/* Layer 1: Dark studio background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 60% 75%, #2A1510 0%, #1A0C10 45%, #0E0608 100%)",
          }}
        />

        {/* Layer 2: Photo — right 55% of panel, full height */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "55%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <SceneSVG />
        </div>

        {/* Layer 3: Vinho overlay — diagonal aligned with book-spine line in photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(91,35,51,1) 0%, rgba(87,32,48,1) 40%, rgba(76,22,38,0.97) 56%, rgba(58,14,28,0.70) 68%, rgba(38,8,18,0.22) 80%, rgba(15,3,8,0) 100%)",
            clipPath: "polygon(0 0, 88% 0, 76% 100%, 0 100%)",
            zIndex: 2,
          }}
        />

        {/* Layer 4: Text content — space-between fills full panel height */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2rem 3.2rem 1.5rem 3.2rem",
            overflowY: "hidden",
          }}
        >
          {/* LAPIDAR wordmark */}
          <div>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 2.8vw, 2.6rem)",
                fontWeight: 400,
                color: "#F4EFE7",
                letterSpacing: "0.06em",
              }}
            >
              LAPIDAR
            </span>
          </div>

          {/* Hero headline */}
          <div style={{ maxWidth: "520px" }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(3.4rem, 5.8vw, 5.6rem)",
                lineHeight: 1.12,
                fontWeight: 400,
                color: "#F4EFE7",
                margin: 0,
              }}
            >
              Jornada rumo{" "}
              <br />
              à sua{" "}
              <em style={{ color: "#C6A15B", fontStyle: "italic" }}>
                melhor versão.
              </em>
            </h1>
          </div>

          {/* Body text block */}
          <div style={{ maxWidth: "470px" }}>
            <p
              style={{
                color: "rgba(244,239,231,0.95)",
                fontSize: "1.05rem",
                lineHeight: 1.65,
                marginBottom: "0.6rem",
              }}
            >
              O{" "}
              <strong style={{ color: "#F4EFE7", fontWeight: 600 }}>
                Lapidar
              </strong>{" "}
              começa na consulta, mas acontece todos os dias.
            </p>
            <p
              style={{
                color: "rgba(244,239,231,0.84)",
                fontSize: "0.97rem",
                lineHeight: 1.65,
                marginBottom: "0.9rem",
              }}
            >
              Um acompanhamento contínuo que integra saúde hormonal, hábitos,
              composição corporal e prevenção para cuidar não apenas de onde você
              está hoje, mas da saúde que está construindo para o futuro.
            </p>
            <p
              style={{
                color: "rgba(244,239,231,0.93)",
                fontSize: "1.05rem",
                lineHeight: 1.55,
                marginBottom: "0.1rem",
              }}
            >
              Não buscamos perfeição.
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                color: "#C6A15B",
                fontSize: "1.2rem",
                lineHeight: 1.55,
                marginBottom: "0.9rem",
              }}
            >
              Buscamos constância.
            </p>
            {/* Golden rule */}
            <div
              style={{
                width: "2.6rem",
                height: "1.5px",
                background: "#C6A15B",
                opacity: 0.85,
              }}
            />
          </div>

          {/* 3 features — horizontal row */}
          <div
            style={{
              display: "flex",
              gap: "1.8rem",
              maxWidth: "510px",
            }}
          >
            {[
              {
                label: "SEU PROGRESSO",
                desc: "Acompanhe seus resultados e próximos passos.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                ),
              },
              {
                label: "SEUS MATERIAIS",
                desc: "Orientações, guias e conteúdos sempre por perto.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                ),
              },
              {
                label: "NOSSO CONTATO",
                desc: "Fale com a equipe e tire suas dúvidas quando precisar.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.label} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "3.4rem",
                    height: "3.4rem",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(198,161,91,0.55)",
                    background: "rgba(198,161,91,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <p
                    style={{
                      color: "#F4EFE7",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {f.label}
                  </p>
                  <p
                    style={{
                      color: "rgba(244,239,231,0.78)",
                      fontSize: "0.88rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Doctor credit — last flex child sits at bottom */}
          <div>
            <div
              style={{
                width: "1.8rem",
                height: "1px",
                background: "rgba(198,161,91,0.45)",
                marginBottom: "0.5rem",
              }}
            />
            <p
              style={{
                color: "#C6A15B",
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1.5,
                marginBottom: "0.15rem",
              }}
            >
              DRA. ANDRESSA GOMIDE
            </p>
            <p
              style={{
                color: "rgba(244,239,231,0.65)",
                fontSize: "0.71rem",
                letterSpacing: "0.10em",
                lineHeight: 1.5,
                textTransform: "uppercase",
                marginBottom: "0.1rem",
              }}
            >
              CRM DF 29235 | RQE 24717
            </p>
            <p
              style={{
                color: "rgba(244,239,231,0.58)",
                fontSize: "0.71rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1.4,
              }}
            >
              GINECOLOGISTA ENDÓCRINA
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          RIGHT PANEL — cream/bege with form
      ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          background: "#EAE0CE",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Leaf shadow — top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            pointerEvents: "none",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          <LeafShadowTopRight />
        </div>

        {/* Leaf shadow — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            pointerEvents: "none",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          <LeafShadowBottomRight />
        </div>

        {/* Mobile header — vinho strip shown on mobile only */}
        <div
          className="lg-mobile-logo"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(135deg, #5B2333 0%, #3D1520 100%)",
            padding: "2.2rem 2rem 3rem",
            textAlign: "center",
            zIndex: 5,
          }}
        >
          {/* Leaf decoration on mobile header */}
          <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.18, pointerEvents: "none" }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <path d="M115 5 C95 25 70 45 50 75 C35 98 28 112 20 120" stroke="#C6A15B" strokeWidth="1.5" fill="none"/>
              <path d="M95 0 C80 20 60 40 45 68" stroke="#C6A15B" strokeWidth="1" fill="none"/>
              <ellipse cx="72" cy="38" rx="18" ry="7" fill="#C6A15B" transform="rotate(-42,72,38)" opacity="0.7"/>
              <ellipse cx="58" cy="58" rx="16" ry="6" fill="#C6A15B" transform="rotate(-52,58,58)" opacity="0.6"/>
              <ellipse cx="46" cy="78" rx="14" ry="5.5" fill="#C6A15B" transform="rotate(-58,46,78)" opacity="0.5"/>
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "2.6rem",
              color: "#F4EFE7",
              letterSpacing: "0.14em",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            LAPIDAR
          </span>
          <div style={{ width: "2rem", height: "1.5px", background: "#C6A15B", margin: "0 auto 0.6rem", opacity: 0.8 }} />
          <p
            style={{
              color: "rgba(244,239,231,0.72)",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Jornada rumo à sua melhor versão
          </p>
        </div>

        {/* Form area */}
        <div
          className="login-form-container"
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "400px",
            padding: "0 2rem",
          }}
        >
          {/* Header block */}
          <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
            <p
              style={{
                color: "#8C6428",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              BEM-VINDA AO SEU ESPAÇO
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.8rem, 6vw, 4rem)",
                fontWeight: 700,
                color: "#3D1018",
                letterSpacing: "0.12em",
                lineHeight: 1,
                textTransform: "uppercase",
                margin: "0 0 0.65rem 0",
              }}
            >
              LAPIDAR
            </h2>

            {/* Golden line */}
            <div
              style={{
                width: "2.2rem",
                height: "2px",
                background: "#C6A15B",
                margin: "0 auto 0.75rem",
              }}
            />

            <p
              style={{
                color: "#3D1018",
                fontSize: "0.71rem",
                fontWeight: 700,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                opacity: 0.82,
              }}
            >
              SEU CUIDADO CONTINUA AQUI.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            {/* E-MAIL */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#2A0E16",
                  marginBottom: "0.45rem",
                }}
              >
                E-MAIL
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "1.1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8A6E5A",
                    pointerEvents: "none",
                    lineHeight: 0,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu e-mail"
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    paddingLeft: "2.7rem",
                    paddingRight: "1.1rem",
                    paddingTop: "0.9rem",
                    paddingBottom: "0.9rem",
                    borderRadius: "50px",
                    border: "1.5px solid #C4B0A0",
                    background: "#FFFFFF",
                    color: "#2A0E16",
                    fontSize: "0.95rem",
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                    outline: "none",
                    transition: "border-color 0.18s, box-shadow 0.18s",
                    boxShadow: "0 1px 3px rgba(91,35,51,0.06)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5B2333";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,35,51,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#C4B0A0";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(91,35,51,0.06)";
                  }}
                />
              </div>
            </div>

            {/* SENHA */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#2A0E16",
                  marginBottom: "0.45rem",
                }}
              >
                SENHA
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "1.1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8A6E5A",
                    pointerEvents: "none",
                    lineHeight: 0,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="sua senha"
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    paddingLeft: "2.7rem",
                    paddingRight: "3rem",
                    paddingTop: "0.9rem",
                    paddingBottom: "0.9rem",
                    borderRadius: "50px",
                    border: "1.5px solid #C4B0A0",
                    background: "#FFFFFF",
                    color: "#2A0E16",
                    fontSize: "0.95rem",
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                    outline: "none",
                    transition: "border-color 0.18s, box-shadow 0.18s",
                    boxShadow: "0 1px 3px rgba(91,35,51,0.06)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5B2333";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,35,51,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#C4B0A0";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(91,35,51,0.06)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowSenha((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8A6E5A",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    lineHeight: 0,
                  }}
                >
                  {showSenha ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Esqueci */}
            <div style={{ textAlign: "right", marginTop: "-0.3rem" }}>
              <button
                type="button"
                style={{
                  color: "#6B4830",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', system-ui, sans-serif",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(107,72,48,0.35)",
                  textUnderlineOffset: "3px",
                }}
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Entrar button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #6B2A3C 0%, #5B2333 50%, #4A1C2A 100%)",
                color: "#F4EFE7",
                fontSize: "1.0rem",
                fontWeight: 700,
                fontFamily: "'Montserrat', system-ui, sans-serif",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "opacity 0.18s, transform 0.1s",
                boxShadow: "0 4px 16px rgba(91,35,51,0.30)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.90";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Entrar
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.1rem 0",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "rgba(91,35,51,0.18)" }} />
              <span style={{ color: "#6B4830", fontSize: "0.85rem", fontWeight: 500 }}>ou</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(91,35,51,0.18)" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "0.92rem",
                borderRadius: "50px",
                background: "#FFFFFF",
                border: "1.5px solid #C4B0A0",
                color: "#2A0E16",
                fontSize: "0.95rem",
                fontWeight: 600,
                fontFamily: "'Montserrat', system-ui, sans-serif",
                cursor: "pointer",
                transition: "opacity 0.18s, box-shadow 0.18s",
                boxShadow: "0 1px 4px rgba(91,35,51,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(91,35,51,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(91,35,51,0.08)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Entrar com o Google
            </button>
          </form>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-left-panel { display: block !important; }
          .lg-mobile-logo { display: none !important; }
          .login-form-container { margin-top: 0; }
        }
        @media (max-width: 1023px) {
          .lg-left-panel { display: none !important; }
          .lg-mobile-logo { display: flex !important; flex-direction: column; align-items: center; }
          .login-form-container { margin-top: 11rem; padding-bottom: 2.5rem; }
        }
        @media (max-width: 480px) {
          .login-form-container { margin-top: 10rem; padding: 0 1.4rem 2rem; }
        }
        input::placeholder { color: #A08878; }
      `}</style>
    </div>
  );
}
