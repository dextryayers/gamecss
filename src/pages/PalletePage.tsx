import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy, Check, Search, Palette, Pipette, X, Sun, Moon, Droplets, Contrast } from 'lucide-react';
import toast from 'react-hot-toast';

type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hwb';
type Tab = 'palettes' | 'named' | 'websafe' | 'wheel' | 'harmonies' | 'gradients' | 'custom';

interface ColorSwatch { name: string; hex: string; rgb: string; hsl: string; category: string; }
interface GradientSwatch { name: string; css: string; }
interface PaletteSet { name: string; colors: { shade: string; hex: string }[]; }

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

function hexToHwb(h: string) { const { r, g, b } = hexToRgb(h); const w = Math.min(r, g, b) / 255 * 100; const bl = 100 - Math.max(r, g, b) / 255 * 100; return `${Math.round(w)}%, ${Math.round(bl)}%`; }

function formatRgb(hex: string) { const { r, g, b } = hexToRgb(hex); return `${r}, ${g}, ${b}`; }
function formatHsl(hex: string) { const { r, g, b } = hexToRgb(hex); const { h, s, l } = rgbToHsl(r, g, b); return `${h}, ${s}%, ${l}%`; }
function isDark(hex: string) { const { r, g, b } = hexToRgb(hex); return (r * 299 + g * 587 + b * 114) / 1000 < 128; }
function contrastRatio(h1: string, h2: string) {
  const l1 = getLuminance(h1), l2 = getLuminance(h2);
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
}
function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const [R, G, B] = [r, g, b].map(v => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function generateHarmonies(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const { h } = rgbToHsl(r, g, b);
  const s = 70, l = 55;
  const make = (deg: number) => hslToHex((h + deg + 360) % 360, s, l);
  const names = ['Complementary', 'Split 1', 'Split 2', 'Triadic 1', 'Triadic 2', 'Analogous 1', 'Analogous 2', 'Analogous 3', 'Analogous 4', 'Monochromatic S-20', 'Monochromatic S+20', 'Monochromatic L-20', 'Monochromatic L+20'];
  const degs = [180, 150, 210, 120, 240, 30, 60, -30, -60, 0, 0, 0, 0];
  const mods = degs.map((d, i) => {
    if (i < 9) return make(d);
    const { r: r2, g: g2, b: b2 } = hexToRgb(hex);
    const hsl = rgbToHsl(r2, g2, b2);
    if (i === 9) return hslToHex(hsl.h, Math.max(0, hsl.s - 20), hsl.l);
    if (i === 10) return hslToHex(hsl.h, Math.min(100, hsl.s + 20), hsl.l);
    if (i === 11) return hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20));
    return hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20));
  });
  return names.map((n, i) => ({ name: n, hex: mods[i] }));
}

function genWebSafe(): ColorSwatch[] {
  const safe: ColorSwatch[] = [];
  const vals = ['00', '33', '66', '99', 'CC', 'FF'];
  for (const r of vals) for (const g of vals) for (const b of vals) {
    const hex = `#${r}${g}${b}`;
    safe.push({ name: `#${r}${g}${b}`, hex, rgb: `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`, hsl: `hsl(${formatHsl(hex)})`, category: 'Web Safe' });
  }
  return safe;
}
const webSafeColors = genWebSafe();

function genWheel(): ColorSwatch[] {
  const wheel: ColorSwatch[] = [];
  const names = ['Red', 'Orange', 'Yellow', 'Lime', 'Green', 'Teal', 'Cyan', 'Azure', 'Blue', 'Indigo', 'Purple', 'Magenta'];
  for (let i = 0; i < 12; i++) {
    const h = i * 30;
    for (const sat of [40, 60, 80, 100]) {
      for (const lit of [30, 45, 60, 75]) {
        const hex = hslToHex(h, sat, lit);
        wheel.push({ name: `${names[i]} ${sat}s${lit}l`, hex, rgb: `rgb(${formatRgb(hex)})`, hsl: `hsl(${h}, ${sat}%, ${lit}%)`, category: names[i] });
      }
    }
  }
  return wheel;
}
const wheelColors = genWheel();

// ==== NAMED COLORS ====
const namedColors: ColorSwatch[] = [
  { name: 'Crimson', hex: '#DC143C', rgb: '220,20,60', hsl: '348,83%,47%', category: 'Red' },
  { name: 'Firebrick', hex: '#B22222', rgb: '178,34,34', hsl: '0,68%,42%', category: 'Red' },
  { name: 'Indian Red', hex: '#CD5C5C', rgb: '205,92,92', hsl: '0,53%,58%', category: 'Red' },
  { name: 'Light Coral', hex: '#F08080', rgb: '240,128,128', hsl: '0,79%,72%', category: 'Red' },
  { name: 'Salmon', hex: '#FA8072', rgb: '250,128,114', hsl: '6,93%,71%', category: 'Red' },
  { name: 'Dark Salmon', hex: '#E9967A', rgb: '233,150,122', hsl: '15,72%,70%', category: 'Red' },
  { name: 'Light Salmon', hex: '#FFA07A', rgb: '255,160,122', hsl: '17,100%,74%', category: 'Red' },
  { name: 'Tomato', hex: '#FF6347', rgb: '255,99,71', hsl: '9,100%,64%', category: 'Red' },
  { name: 'Orange Red', hex: '#FF4500', rgb: '255,69,0', hsl: '16,100%,50%', category: 'Orange' },
  { name: 'Dark Orange', hex: '#FF8C00', rgb: '255,140,0', hsl: '33,100%,50%', category: 'Orange' },
  { name: 'Orange', hex: '#FFA500', rgb: '255,165,0', hsl: '39,100%,50%', category: 'Orange' },
  { name: 'Gold', hex: '#FFD700', rgb: '255,215,0', hsl: '51,100%,50%', category: 'Yellow' },
  { name: 'Yellow', hex: '#FFFF00', rgb: '255,255,0', hsl: '60,100%,50%', category: 'Yellow' },
  { name: 'Light Yellow', hex: '#FFFFE0', rgb: '255,255,224', hsl: '60,100%,94%', category: 'Yellow' },
  { name: 'Lemon Chiffon', hex: '#FFFACD', rgb: '255,250,205', hsl: '54,100%,90%', category: 'Yellow' },
  { name: 'Pale Goldenrod', hex: '#EEE8AA', rgb: '238,232,170', hsl: '55,55%,80%', category: 'Yellow' },
  { name: 'Khaki', hex: '#F0E68C', rgb: '240,230,140', hsl: '54,77%,75%', category: 'Yellow' },
  { name: 'Dark Khaki', hex: '#BDB76B', rgb: '189,183,107', hsl: '56,38%,58%', category: 'Yellow' },
  { name: 'Chartreuse', hex: '#7FFF00', rgb: '127,255,0', hsl: '90,100%,50%', category: 'Green' },
  { name: 'Lime Green', hex: '#32CD32', rgb: '50,205,50', hsl: '120,61%,50%', category: 'Green' },
  { name: 'Lime', hex: '#00FF00', rgb: '0,255,0', hsl: '120,100%,50%', category: 'Green' },
  { name: 'Forest Green', hex: '#228B22', rgb: '34,139,34', hsl: '120,61%,34%', category: 'Green' },
  { name: 'Green', hex: '#008000', rgb: '0,128,0', hsl: '120,100%,25%', category: 'Green' },
  { name: 'Dark Green', hex: '#006400', rgb: '0,100,0', hsl: '120,100%,20%', category: 'Green' },
  { name: 'Medium Sea Green', hex: '#3CB371', rgb: '60,179,113', hsl: '147,50%,47%', category: 'Green' },
  { name: 'Sea Green', hex: '#2E8B57', rgb: '46,139,87', hsl: '146,50%,36%', category: 'Green' },
  { name: 'Olive', hex: '#808000', rgb: '128,128,0', hsl: '60,100%,25%', category: 'Green' },
  { name: 'Olive Drab', hex: '#6B8E23', rgb: '107,142,35', hsl: '80,60%,35%', category: 'Green' },
  { name: 'Dark Olive Green', hex: '#556B2F', rgb: '85,107,47', hsl: '82,39%,30%', category: 'Green' },
  { name: 'Spring Green', hex: '#00FF7F', rgb: '0,255,127', hsl: '150,100%,50%', category: 'Green' },
  { name: 'Medium Spring Green', hex: '#00FA9A', rgb: '0,250,154', hsl: '157,100%,49%', category: 'Green' },
  { name: 'Light Green', hex: '#90EE90', rgb: '144,238,144', hsl: '120,73%,75%', category: 'Green' },
  { name: 'Pale Green', hex: '#98FB98', rgb: '152,251,152', hsl: '120,93%,79%', category: 'Green' },
  { name: 'Aquamarine', hex: '#7FFFD4', rgb: '127,255,212', hsl: '160,100%,75%', category: 'Cyan' },
  { name: 'Teal', hex: '#008080', rgb: '0,128,128', hsl: '180,100%,25%', category: 'Cyan' },
  { name: 'Dark Cyan', hex: '#008B8B', rgb: '0,139,139', hsl: '180,100%,27%', category: 'Cyan' },
  { name: 'Light Sea Green', hex: '#20B2AA', rgb: '32,178,170', hsl: '177,70%,41%', category: 'Cyan' },
  { name: 'Cadet Blue', hex: '#5F9EA0', rgb: '95,158,160', hsl: '182,25%,50%', category: 'Cyan' },
  { name: 'Cyan', hex: '#00FFFF', rgb: '0,255,255', hsl: '180,100%,50%', category: 'Cyan' },
  { name: 'Turquoise', hex: '#40E0D0', rgb: '64,224,208', hsl: '174,72%,56%', category: 'Cyan' },
  { name: 'Medium Turquoise', hex: '#48D1CC', rgb: '72,209,204', hsl: '178,60%,55%', category: 'Cyan' },
  { name: 'Dark Turquoise', hex: '#00CED1', rgb: '0,206,209', hsl: '181,100%,41%', category: 'Cyan' },
  { name: 'Pale Turquoise', hex: '#AFEEEE', rgb: '175,238,238', hsl: '180,65%,81%', category: 'Cyan' },
  { name: 'Powder Blue', hex: '#B0E0E6', rgb: '176,224,230', hsl: '187,52%,80%', category: 'Cyan' },
  { name: 'Deep Sky Blue', hex: '#00BFFF', rgb: '0,191,255', hsl: '195,100%,50%', category: 'Blue' },
  { name: 'Dodger Blue', hex: '#1E90FF', rgb: '30,144,255', hsl: '210,100%,56%', category: 'Blue' },
  { name: 'Cornflower Blue', hex: '#6495ED', rgb: '100,149,237', hsl: '219,79%,66%', category: 'Blue' },
  { name: 'Steel Blue', hex: '#4682B4', rgb: '70,130,180', hsl: '207,44%,49%', category: 'Blue' },
  { name: 'Royal Blue', hex: '#4169E1', rgb: '65,105,225', hsl: '225,73%,57%', category: 'Blue' },
  { name: 'Blue', hex: '#0000FF', rgb: '0,0,255', hsl: '240,100%,50%', category: 'Blue' },
  { name: 'Medium Blue', hex: '#0000CD', rgb: '0,0,205', hsl: '240,100%,40%', category: 'Blue' },
  { name: 'Dark Blue', hex: '#00008B', rgb: '0,0,139', hsl: '240,100%,27%', category: 'Blue' },
  { name: 'Navy', hex: '#000080', rgb: '0,0,128', hsl: '240,100%,25%', category: 'Blue' },
  { name: 'Midnight Blue', hex: '#191970', rgb: '25,25,112', hsl: '240,64%,27%', category: 'Blue' },
  { name: 'Medium Slate Blue', hex: '#7B68EE', rgb: '123,104,238', hsl: '249,80%,67%', category: 'Purple' },
  { name: 'Slate Blue', hex: '#6A5ACD', rgb: '106,90,205', hsl: '248,53%,58%', category: 'Purple' },
  { name: 'Dark Slate Blue', hex: '#483D8B', rgb: '72,61,139', hsl: '248,39%,39%', category: 'Purple' },
  { name: 'Indigo', hex: '#4B0082', rgb: '75,0,130', hsl: '275,100%,25%', category: 'Purple' },
  { name: 'Purple', hex: '#800080', rgb: '128,0,128', hsl: '300,100%,25%', category: 'Purple' },
  { name: 'Dark Magenta', hex: '#8B008B', rgb: '139,0,139', hsl: '300,100%,27%', category: 'Purple' },
  { name: 'Medium Purple', hex: '#9370DB', rgb: '147,112,219', hsl: '260,60%,65%', category: 'Purple' },
  { name: 'Orchid', hex: '#DA70D6', rgb: '218,112,214', hsl: '302,59%,65%', category: 'Purple' },
  { name: 'Plum', hex: '#DDA0DD', rgb: '221,160,221', hsl: '300,47%,75%', category: 'Purple' },
  { name: 'Violet', hex: '#EE82EE', rgb: '238,130,238', hsl: '300,76%,72%', category: 'Purple' },
  { name: 'Magenta', hex: '#FF00FF', rgb: '255,0,255', hsl: '300,100%,50%', category: 'Purple' },
  { name: 'Fuchsia', hex: '#FF00FF', rgb: '255,0,255', hsl: '300,100%,50%', category: 'Purple' },
  { name: 'Medium Violet Red', hex: '#C71585', rgb: '199,21,133', hsl: '322,81%,43%', category: 'Pink' },
  { name: 'Deep Pink', hex: '#FF1493', rgb: '255,20,147', hsl: '328,100%,54%', category: 'Pink' },
  { name: 'Hot Pink', hex: '#FF69B4', rgb: '255,105,180', hsl: '330,100%,71%', category: 'Pink' },
  { name: 'Pale Violet Red', hex: '#DB7093', rgb: '219,112,147', hsl: '340,60%,65%', category: 'Pink' },
  { name: 'Light Pink', hex: '#FFB6C1', rgb: '255,182,193', hsl: '351,100%,86%', category: 'Pink' },
  { name: 'Pink', hex: '#FFC0CB', rgb: '255,192,203', hsl: '350,100%,88%', category: 'Pink' },
  { name: 'Misty Rose', hex: '#FFE4E1', rgb: '255,228,225', hsl: '6,100%,94%', category: 'Pink' },
  { name: 'Bisque', hex: '#FFE4C4', rgb: '255,228,196', hsl: '33,100%,88%', category: 'Brown' },
  { name: 'Navajo White', hex: '#FFDEAD', rgb: '255,222,173', hsl: '36,100%,84%', category: 'Brown' },
  { name: 'Wheat', hex: '#F5DEB3', rgb: '245,222,179', hsl: '39,77%,83%', category: 'Brown' },
  { name: 'Burly Wood', hex: '#DEB887', rgb: '222,184,135', hsl: '34,57%,70%', category: 'Brown' },
  { name: 'Tan', hex: '#D2B48C', rgb: '210,180,140', hsl: '34,44%,69%', category: 'Brown' },
  { name: 'Sandy Brown', hex: '#F4A460', rgb: '244,164,96', hsl: '28,87%,67%', category: 'Brown' },
  { name: 'Peru', hex: '#CD853F', rgb: '205,133,63', hsl: '30,59%,53%', category: 'Brown' },
  { name: 'Chocolate', hex: '#D2691E', rgb: '210,105,30', hsl: '25,75%,47%', category: 'Brown' },
  { name: 'Saddle Brown', hex: '#8B4513', rgb: '139,69,19', hsl: '25,76%,31%', category: 'Brown' },
  { name: 'Sienna', hex: '#A0522D', rgb: '160,82,45', hsl: '19,56%,40%', category: 'Brown' },
  { name: 'Brown', hex: '#A52A2A', rgb: '165,42,42', hsl: '0,59%,41%', category: 'Brown' },
  { name: 'Maroon', hex: '#800000', rgb: '128,0,0', hsl: '0,100%,25%', category: 'Brown' },
  { name: 'Snow', hex: '#FFFAFA', rgb: '255,250,250', hsl: '0,0%,99%', category: 'White' },
  { name: 'Linen', hex: '#FAF0E6', rgb: '250,240,230', hsl: '30,67%,94%', category: 'White' },
  { name: 'Old Lace', hex: '#FDF5E6', rgb: '253,245,230', hsl: '39,82%,95%', category: 'White' },
  { name: 'Antique White', hex: '#FAEBD7', rgb: '250,235,215', hsl: '34,78%,91%', category: 'White' },
  { name: 'Cornsilk', hex: '#FFF8DC', rgb: '255,248,220', hsl: '48,100%,93%', category: 'White' },
  { name: 'Ivory', hex: '#FFFFF0', rgb: '255,255,240', hsl: '60,100%,97%', category: 'White' },
  { name: 'Floral White', hex: '#FFFAF0', rgb: '255,250,240', hsl: '40,100%,97%', category: 'White' },
  { name: 'White Smoke', hex: '#F5F5F5', rgb: '245,245,245', hsl: '0,0%,96%', category: 'White' },
  { name: 'Gainsboro', hex: '#DCDCDC', rgb: '220,220,220', hsl: '0,0%,86%', category: 'Gray' },
  { name: 'Light Gray', hex: '#D3D3D3', rgb: '211,211,211', hsl: '0,0%,83%', category: 'Gray' },
  { name: 'Silver', hex: '#C0C0C0', rgb: '192,192,192', hsl: '0,0%,75%', category: 'Gray' },
  { name: 'Dark Gray', hex: '#A9A9A9', rgb: '169,169,169', hsl: '0,0%,66%', category: 'Gray' },
  { name: 'Gray', hex: '#808080', rgb: '128,128,128', hsl: '0,0%,50%', category: 'Gray' },
  { name: 'Dim Gray', hex: '#696969', rgb: '105,105,105', hsl: '0,0%,41%', category: 'Gray' },
  { name: 'Light Slate Gray', hex: '#778899', rgb: '119,136,153', hsl: '210,14%,53%', category: 'Gray' },
  { name: 'Slate Gray', hex: '#708090', rgb: '112,128,144', hsl: '210,13%,50%', category: 'Gray' },
  { name: 'Dark Slate Gray', hex: '#2F4F4F', rgb: '47,79,79', hsl: '180,25%,25%', category: 'Gray' },
  { name: 'Black', hex: '#000000', rgb: '0,0,0', hsl: '0,0%,0%', category: 'Gray' },
  { name: 'Alice Blue', hex: '#F0F8FF', rgb: '240,248,255', hsl: '208,100%,97%', category: 'Blue' },
  { name: 'Lavender', hex: '#E6E6FA', rgb: '230,230,250', hsl: '240,67%,94%', category: 'Purple' },
  { name: 'Thistle', hex: '#D8BFD8', rgb: '216,191,216', hsl: '300,24%,80%', category: 'Purple' },
  { name: 'Honeydew', hex: '#F0FFF0', rgb: '240,255,240', hsl: '120,100%,97%', category: 'Green' },
  { name: 'Mint Cream', hex: '#F5FFFA', rgb: '245,255,250', hsl: '150,100%,98%', category: 'Green' },
  { name: 'Beige', hex: '#F5F5DC', rgb: '245,245,220', hsl: '60,56%,91%', category: 'White' },
  { name: 'Coral', hex: '#FF7F50', rgb: '255,127,80', hsl: '16,100%,66%', category: 'Orange' },
  { name: 'Papaya Whip', hex: '#FFEFD5', rgb: '255,239,213', hsl: '37,100%,92%', category: 'White' },
  { name: 'Blanched Almond', hex: '#FFEBCD', rgb: '255,235,205', hsl: '36,100%,90%', category: 'White' },
  { name: 'Moccasin', hex: '#FFE4B5', rgb: '255,228,181', hsl: '38,100%,85%', category: 'Brown' },
  { name: 'Peach Puff', hex: '#FFDAB9', rgb: '255,218,185', hsl: '28,100%,86%', category: 'Brown' },
  { name: 'Lavender Blush', hex: '#FFF0F5', rgb: '255,240,245', hsl: '340,100%,97%', category: 'Pink' },
  { name: 'Seashell', hex: '#FFF5EE', rgb: '255,245,238', hsl: '25,100%,97%', category: 'White' },
  { name: 'Rosy Brown', hex: '#BC8F8F', rgb: '188,143,143', hsl: '0,25%,65%', category: 'Brown' },
  { name: 'Sky Blue', hex: '#87CEEB', rgb: '135,206,235', hsl: '197,71%,73%', category: 'Blue' },
  { name: 'Light Sky Blue', hex: '#87CEFA', rgb: '135,206,250', hsl: '203,92%,75%', category: 'Blue' },
  { name: 'Medium Aquamarine', hex: '#66CDAA', rgb: '102,205,170', hsl: '160,51%,60%', category: 'Cyan' },
  { name: 'Lawn Green', hex: '#7CFC00', rgb: '124,252,0', hsl: '90,100%,49%', category: 'Green' },
  { name: 'Yellow Green', hex: '#9ACD32', rgb: '154,205,50', hsl: '80,61%,50%', category: 'Green' },
  { name: 'Cornsilk 2', hex: '#EEE8CD', rgb: '238,232,205', hsl: '55,56%,87%', category: 'White' },
  { name: 'Dark Goldenrod', hex: '#B8860B', rgb: '184,134,11', hsl: '43,89%,38%', category: 'Yellow' },
  { name: 'Goldenrod', hex: '#DAA520', rgb: '218,165,32', hsl: '43,74%,49%', category: 'Yellow' },
  { name: 'Light Goldenrod', hex: '#EEDD82', rgb: '238,221,130', hsl: '50,76%,72%', category: 'Yellow' },
  { name: 'rebeccapurple', hex: '#663399', rgb: '102,51,153', hsl: '270,50%,40%', category: 'Purple' },
  { name: 'Azure', hex: '#F0FFFF', rgb: '240,255,255', hsl: '180,100%,97%', category: 'Cyan' },
  { name: 'Ghost White', hex: '#F8F8FF', rgb: '248,248,255', hsl: '240,100%,99%', category: 'White' },
];

// ==== PALETTES ====
const palettes: PaletteSet[] = [
  {
    name: 'Tailwind Gray', colors: [
      { shade: '50', hex: '#F9FAFB' }, { shade: '100', hex: '#F3F4F6' }, { shade: '200', hex: '#E5E7EB' },
      { shade: '300', hex: '#D1D5DB' }, { shade: '400', hex: '#9CA3AF' }, { shade: '500', hex: '#6B7280' },
      { shade: '600', hex: '#4B5563' }, { shade: '700', hex: '#374151' }, { shade: '800', hex: '#1F2937' },
      { shade: '900', hex: '#111827' }, { shade: '950', hex: '#030712' },
    ] },
  {
    name: 'Tailwind Red', colors: [
      { shade: '50', hex: '#FEF2F2' }, { shade: '100', hex: '#FEE2E2' }, { shade: '200', hex: '#FECACA' },
      { shade: '300', hex: '#FCA5A5' }, { shade: '400', hex: '#F87171' }, { shade: '500', hex: '#EF4444' },
      { shade: '600', hex: '#DC2626' }, { shade: '700', hex: '#B91C1C' }, { shade: '800', hex: '#991B1B' },
      { shade: '900', hex: '#7F1D1D' }, { shade: '950', hex: '#450A0A' },
    ] },
  {
    name: 'Tailwind Orange', colors: [
      { shade: '50', hex: '#FFF7ED' }, { shade: '100', hex: '#FFEDD5' }, { shade: '200', hex: '#FED7AA' },
      { shade: '300', hex: '#FDBA74' }, { shade: '400', hex: '#FB923C' }, { shade: '500', hex: '#F97316' },
      { shade: '600', hex: '#EA580C' }, { shade: '700', hex: '#C2410C' }, { shade: '800', hex: '#9A3412' },
      { shade: '900', hex: '#7C2D12' }, { shade: '950', hex: '#431407' },
    ] },
  {
    name: 'Tailwind Amber', colors: [
      { shade: '50', hex: '#FFFBEB' }, { shade: '100', hex: '#FEF3C7' }, { shade: '200', hex: '#FDE68A' },
      { shade: '300', hex: '#FCD34D' }, { shade: '400', hex: '#FBBF24' }, { shade: '500', hex: '#F59E0B' },
      { shade: '600', hex: '#D97706' }, { shade: '700', hex: '#B45309' }, { shade: '800', hex: '#92400E' },
      { shade: '900', hex: '#78350F' }, { shade: '950', hex: '#451A03' },
    ] },
  {
    name: 'Tailwind Yellow', colors: [
      { shade: '50', hex: '#FEFCE8' }, { shade: '100', hex: '#FEF9C3' }, { shade: '200', hex: '#FEF08A' },
      { shade: '300', hex: '#FDE047' }, { shade: '400', hex: '#FACC15' }, { shade: '500', hex: '#EAB308' },
      { shade: '600', hex: '#CA8A04' }, { shade: '700', hex: '#A16207' }, { shade: '800', hex: '#854D0E' },
      { shade: '900', hex: '#713F12' }, { shade: '950', hex: '#422006' },
    ] },
  {
    name: 'Tailwind Lime', colors: [
      { shade: '50', hex: '#F7FEE7' }, { shade: '100', hex: '#ECFCCB' }, { shade: '200', hex: '#D9F99D' },
      { shade: '300', hex: '#BEF264' }, { shade: '400', hex: '#A3E635' }, { shade: '500', hex: '#84CC16' },
      { shade: '600', hex: '#65A30D' }, { shade: '700', hex: '#4D7C0F' }, { shade: '800', hex: '#3F6212' },
      { shade: '900', hex: '#365314' }, { shade: '950', hex: '#1A2E05' },
    ] },
  {
    name: 'Tailwind Green', colors: [
      { shade: '50', hex: '#F0FDF4' }, { shade: '100', hex: '#DCFCE7' }, { shade: '200', hex: '#BBF7D0' },
      { shade: '300', hex: '#86EFAC' }, { shade: '400', hex: '#4ADE80' }, { shade: '500', hex: '#22C55E' },
      { shade: '600', hex: '#16A34A' }, { shade: '700', hex: '#15803D' }, { shade: '800', hex: '#166534' },
      { shade: '900', hex: '#14532D' }, { shade: '950', hex: '#052E16' },
    ] },
  {
    name: 'Tailwind Emerald', colors: [
      { shade: '50', hex: '#ECFDF5' }, { shade: '100', hex: '#D1FAE5' }, { shade: '200', hex: '#A7F3D0' },
      { shade: '300', hex: '#6EE7B7' }, { shade: '400', hex: '#34D399' }, { shade: '500', hex: '#10B981' },
      { shade: '600', hex: '#059669' }, { shade: '700', hex: '#047857' }, { shade: '800', hex: '#065F46' },
      { shade: '900', hex: '#064E3B' }, { shade: '950', hex: '#022C22' },
    ] },
  {
    name: 'Tailwind Teal', colors: [
      { shade: '50', hex: '#F0FDFA' }, { shade: '100', hex: '#CCFBF1' }, { shade: '200', hex: '#99F6E4' },
      { shade: '300', hex: '#5EEAD4' }, { shade: '400', hex: '#2DD4BF' }, { shade: '500', hex: '#14B8A6' },
      { shade: '600', hex: '#0D9488' }, { shade: '700', hex: '#0F766E' }, { shade: '800', hex: '#115E59' },
      { shade: '900', hex: '#134E4A' }, { shade: '950', hex: '#042F2E' },
    ] },
  {
    name: 'Tailwind Cyan', colors: [
      { shade: '50', hex: '#ECFEFF' }, { shade: '100', hex: '#CFFAFE' }, { shade: '200', hex: '#A5F3FC' },
      { shade: '300', hex: '#67E8F9' }, { shade: '400', hex: '#22D3EE' }, { shade: '500', hex: '#06B6D4' },
      { shade: '600', hex: '#0891B2' }, { shade: '700', hex: '#0E7490' }, { shade: '800', hex: '#155E75' },
      { shade: '900', hex: '#164E63' }, { shade: '950', hex: '#083344' },
    ] },
  {
    name: 'Tailwind Sky', colors: [
      { shade: '50', hex: '#F0F9FF' }, { shade: '100', hex: '#E0F2FE' }, { shade: '200', hex: '#BAE6FD' },
      { shade: '300', hex: '#7DD3FC' }, { shade: '400', hex: '#38BDF8' }, { shade: '500', hex: '#0EA5E9' },
      { shade: '600', hex: '#0284C7' }, { shade: '700', hex: '#0369A1' }, { shade: '800', hex: '#075985' },
      { shade: '900', hex: '#0C4A6E' }, { shade: '950', hex: '#082F49' },
    ] },
  {
    name: 'Tailwind Blue', colors: [
      { shade: '50', hex: '#EFF6FF' }, { shade: '100', hex: '#DBEAFE' }, { shade: '200', hex: '#BFDBFE' },
      { shade: '300', hex: '#93C5FD' }, { shade: '400', hex: '#60A5FA' }, { shade: '500', hex: '#3B82F6' },
      { shade: '600', hex: '#2563EB' }, { shade: '700', hex: '#1D4ED8' }, { shade: '800', hex: '#1E40AF' },
      { shade: '900', hex: '#1E3A8A' }, { shade: '950', hex: '#172554' },
    ] },
  {
    name: 'Tailwind Indigo', colors: [
      { shade: '50', hex: '#EEF2FF' }, { shade: '100', hex: '#E0E7FF' }, { shade: '200', hex: '#C7D2FE' },
      { shade: '300', hex: '#A5B4FC' }, { shade: '400', hex: '#818CF8' }, { shade: '500', hex: '#6366F1' },
      { shade: '600', hex: '#4F46E5' }, { shade: '700', hex: '#4338CA' }, { shade: '800', hex: '#3730A3' },
      { shade: '900', hex: '#312E81' }, { shade: '950', hex: '#1E1B4B' },
    ] },
  {
    name: 'Tailwind Violet', colors: [
      { shade: '50', hex: '#F5F3FF' }, { shade: '100', hex: '#EDE9FE' }, { shade: '200', hex: '#DDD6FE' },
      { shade: '300', hex: '#C4B5FD' }, { shade: '400', hex: '#A78BFA' }, { shade: '500', hex: '#8B5CF6' },
      { shade: '600', hex: '#7C3AED' }, { shade: '700', hex: '#6D28D9' }, { shade: '800', hex: '#5B21B6' },
      { shade: '900', hex: '#4C1D95' }, { shade: '950', hex: '#1E1338' },
    ] },
  {
    name: 'Tailwind Purple', colors: [
      { shade: '50', hex: '#FAF5FF' }, { shade: '100', hex: '#F3E8FF' }, { shade: '200', hex: '#E9D5FF' },
      { shade: '300', hex: '#D8B4FE' }, { shade: '400', hex: '#C084FC' }, { shade: '500', hex: '#A855F7' },
      { shade: '600', hex: '#9333EA' }, { shade: '700', hex: '#7E22CE' }, { shade: '800', hex: '#6B21A8' },
      { shade: '900', hex: '#581C87' }, { shade: '950', hex: '#2D0B3A' },
    ] },
  {
    name: 'Tailwind Pink', colors: [
      { shade: '50', hex: '#FDF2F8' }, { shade: '100', hex: '#FCE7F3' }, { shade: '200', hex: '#FBCFE8' },
      { shade: '300', hex: '#F9A8D4' }, { shade: '400', hex: '#F472B6' }, { shade: '500', hex: '#EC4899' },
      { shade: '600', hex: '#DB2777' }, { shade: '700', hex: '#BE185D' }, { shade: '800', hex: '#9D174D' },
      { shade: '900', hex: '#831843' }, { shade: '950', hex: '#500724' },
    ] },
  {
    name: 'Tailwind Rose', colors: [
      { shade: '50', hex: '#FFF1F2' }, { shade: '100', hex: '#FFE4E6' }, { shade: '200', hex: '#FECDD3' },
      { shade: '300', hex: '#FDA4AF' }, { shade: '400', hex: '#FB7185' }, { shade: '500', hex: '#F43F5E' },
      { shade: '600', hex: '#E11D48' }, { shade: '700', hex: '#BE123C' }, { shade: '800', hex: '#9F1239' },
      { shade: '900', hex: '#881337' }, { shade: '950', hex: '#4C0519' },
    ] },
  {
    name: 'Neon Cyber', colors: [
      { shade: 'Neon Cyan', hex: '#00FFFF' }, { shade: 'Neon Magenta', hex: '#FF00FF' },
      { shade: 'Neon Green', hex: '#39FF14' }, { shade: 'Neon Red', hex: '#FF3131' },
      { shade: 'Neon Yellow', hex: '#DFFF00' }, { shade: 'Neon Blue', hex: '#4D4DFF' },
      { shade: 'Neon Pink', hex: '#FF6EC7' }, { shade: 'Neon Orange', hex: '#FF6600' },
      { shade: 'Cyber Purple', hex: '#8A2BE2' }, { shade: 'Laser Green', hex: '#00FF7F' },
    ] },
  {
    name: 'Pastels', colors: [
      { shade: 'Pastel Pink', hex: '#FFD1DC' }, { shade: 'Pastel Peach', hex: '#FFDAB9' },
      { shade: 'Pastel Yellow', hex: '#FFFDD0' }, { shade: 'Pastel Mint', hex: '#BDFCC9' },
      { shade: 'Pastel Blue', hex: '#AEC6CF' }, { shade: 'Pastel Purple', hex: '#C3B1E1' },
      { shade: 'Pastel Lavender', hex: '#E6E6FA' }, { shade: 'Pastel Coral', hex: '#FBC4AB' },
      { shade: 'Pastel Rose', hex: '#F7CAC9' }, { shade: 'Pastel Lilac', hex: '#DCD0FF' },
    ] },
  {
    name: 'Material 500', colors: [
      { shade: 'Red', hex: '#F44336' }, { shade: 'Pink', hex: '#E91E63' }, { shade: 'Purple', hex: '#9C27B0' },
      { shade: 'Deep Purple', hex: '#673AB7' }, { shade: 'Indigo', hex: '#3F51B5' }, { shade: 'Blue', hex: '#2196F3' },
      { shade: 'Light Blue', hex: '#03A9F4' }, { shade: 'Cyan', hex: '#00BCD4' }, { shade: 'Teal', hex: '#009688' },
      { shade: 'Green', hex: '#4CAF50' }, { shade: 'Light Green', hex: '#8BC34A' }, { shade: 'Lime', hex: '#CDDC39' },
      { shade: 'Yellow', hex: '#FFEB3B' }, { shade: 'Amber', hex: '#FFC107' }, { shade: 'Orange', hex: '#FF9800' },
      { shade: 'Deep Orange', hex: '#FF5722' }, { shade: 'Brown', hex: '#795548' }, { shade: 'Gray', hex: '#9E9E9E' },
      { shade: 'Blue Gray', hex: '#607D8B' },
    ] },
  {
    name: 'Warm Tones', colors: [
      { shade: 'Ember', hex: '#FF6B35' }, { shade: 'Sunset', hex: '#FF4500' }, { shade: 'Coral', hex: '#FF7F50' },
      { shade: 'Peach', hex: '#FFDAB9' }, { shade: 'Apricot', hex: '#FBCEB1' }, { shade: 'Tangerine', hex: '#FF9966' },
      { shade: 'Pumpkin', hex: '#FF7518' }, { shade: 'Rust', hex: '#B7410E' }, { shade: 'Cinnabar', hex: '#E34234' },
      { shade: 'Terracotta', hex: '#E2725B' },
    ] },
  {
    name: 'Cool Tones', colors: [
      { shade: 'Iceberg', hex: '#71A6D2' }, { shade: 'Frost', hex: '#D0E4F5' }, { shade: 'Arctic', hex: '#82EEFD' },
      { shade: 'Glacier', hex: '#A5C9FF' }, { shade: 'Lapis', hex: '#26619C' }, { shade: 'Sapphire', hex: '#0F52BA' },
      { shade: 'Azure', hex: '#007FFF' }, { shade: 'Cobalt', hex: '#0047AB' }, { shade: 'Denim', hex: '#1560BD' },
      { shade: 'Ocean', hex: '#005477' },
    ] },
  {
    name: 'Earth Tones', colors: [
      { shade: 'Sand', hex: '#C2B280' }, { shade: 'Clay', hex: '#B36D5E' }, { shade: 'Mud', hex: '#70543E' },
      { shade: 'Soil', hex: '#4B3621' }, { shade: 'Moss', hex: '#8A9A5B' }, { shade: 'Fern', hex: '#4F7942' },
      { shade: 'Pine', hex: '#01796F' }, { shade: 'Stone', hex: '#928E85' }, { shade: 'Slate', hex: '#708090' },
      { shade: 'Charcoal', hex: '#36454F' },
    ] },
  {
    name: 'Monochromatic Dark', colors: [
      { shade: '950', hex: '#0a0a0a' }, { shade: '900', hex: '#0f0f0f' }, { shade: '800', hex: '#1a1a1a' },
      { shade: '700', hex: '#2a2a2a' }, { shade: '600', hex: '#3a3a3a' }, { shade: '500', hex: '#4a4a4a' },
      { shade: '400', hex: '#5a5a5a' }, { shade: '300', hex: '#6a6a6a' }, { shade: '200', hex: '#7a7a7a' },
      { shade: '100', hex: '#8a8a8a' }, { shade: '50', hex: '#9a9a9a' },
    ] },
  {
    name: 'Dracula Theme', colors: [
      { shade: 'Background', hex: '#282a36' }, { shade: 'Current Line', hex: '#44475a' },
      { shade: 'Selection', hex: '#44475a' }, { shade: 'Foreground', hex: '#f8f8f2' },
      { shade: 'Comment', hex: '#6272a4' }, { shade: 'Cyan', hex: '#8be9fd' },
      { shade: 'Green', hex: '#50fa7b' }, { shade: 'Orange', hex: '#ffb86c' },
      { shade: 'Pink', hex: '#ff79c6' }, { shade: 'Purple', hex: '#bd93f9' },
      { shade: 'Red', hex: '#ff5555' }, { shade: 'Yellow', hex: '#f1fa8c' },
    ] },
  {
    name: 'Nord Theme', colors: [
      { shade: 'Polar 1', hex: '#2e3440' }, { shade: 'Polar 2', hex: '#3b4252' },
      { shade: 'Polar 3', hex: '#434c5e' }, { shade: 'Polar 4', hex: '#4c566a' },
      { shade: 'Snow 1', hex: '#d8dee9' }, { shade: 'Snow 2', hex: '#e5e9f0' },
      { shade: 'Snow 3', hex: '#eceff4' }, { shade: 'Frost 1', hex: '#8fbcbb' },
      { shade: 'Frost 2', hex: '#88c0d0' }, { shade: 'Frost 3', hex: '#81a1c1' },
      { shade: 'Frost 4', hex: '#5e81ac' }, { shade: 'Red', hex: '#bf616a' },
      { shade: 'Orange', hex: '#d08770' }, { shade: 'Yellow', hex: '#ebcb8b' },
      { shade: 'Green', hex: '#a3be8c' }, { shade: 'Purple', hex: '#b48ead' },
    ] },
  {
    name: 'Tokyo Night', colors: [
      { shade: 'Night', hex: '#1a1b26' }, { shade: 'Dark', hex: '#16161e' },
      { shade: 'Comment', hex: '#565f89' }, { shade: 'Light', hex: '#a9b1d6' },
      { shade: 'White', hex: '#c0caf5' }, { shade: 'Cyan', hex: '#7dcfff' },
      { shade: 'Blue', hex: '#7aa2f7' }, { shade: 'Purple', hex: '#bb9af7' },
      { shade: 'Green', hex: '#9ece6a' }, { shade: 'Yellow', hex: '#e0af68' },
      { shade: 'Orange', hex: '#ff9e64' }, { shade: 'Red', hex: '#f7768e' },
      { shade: 'Teal', hex: '#1abc9c' }, { shade: 'Pink', hex: '#ff007c' },
    ] },
  {
    name: 'Catppuccin Mocha', colors: [
      { shade: 'Base', hex: '#1e1e2e' }, { shade: 'Mantle', hex: '#181825' },
      { shade: 'Crust', hex: '#11111b' }, { shade: 'Surface 0', hex: '#313244' },
      { shade: 'Surface 1', hex: '#45475a' }, { shade: 'Surface 2', hex: '#585b70' },
      { shade: 'Text', hex: '#cdd6f4' }, { shade: 'Subtext 0', hex: '#a6adc8' },
      { shade: 'Blue', hex: '#89b4fa' }, { shade: 'Lavender', hex: '#b4befe' },
      { shade: 'Green', hex: '#a6e3a1' }, { shade: 'Teal', hex: '#94e2d5' },
      { shade: 'Yellow', hex: '#f9e2af' }, { shade: 'Peach', hex: '#fab387' },
      { shade: 'Maroon', hex: '#eba0ac' }, { shade: 'Red', hex: '#f38ba8' },
      { shade: 'Pink', hex: '#f5c2e7' }, { shade: 'Rosewater', hex: '#f5e0dc' },
    ] },
  {
    name: 'Solarized', colors: [
      { shade: 'Base 03', hex: '#002b36' }, { shade: 'Base 02', hex: '#073642' },
      { shade: 'Base 01', hex: '#586e75' }, { shade: 'Base 00', hex: '#657b83' },
      { shade: 'Base 0', hex: '#839496' }, { shade: 'Base 1', hex: '#93a1a1' },
      { shade: 'Base 2', hex: '#eee8d5' }, { shade: 'Base 3', hex: '#fdf6e3' },
      { shade: 'Yellow', hex: '#b58900' }, { shade: 'Orange', hex: '#cb4b16' },
      { shade: 'Red', hex: '#dc322f' }, { shade: 'Magenta', hex: '#d33682' },
      { shade: 'Violet', hex: '#6c71c4' }, { shade: 'Blue', hex: '#268bd2' },
      { shade: 'Cyan', hex: '#2aa198' }, { shade: 'Green', hex: '#859900' },
    ] },
  {
    name: 'Monokai Pro', colors: [
      { shade: 'Bg Dark', hex: '#2d2a2e' }, { shade: 'Bg', hex: '#403e41' },
      { shade: 'Fg', hex: '#fcfcfa' }, { shade: 'Comment', hex: '#727072' },
      { shade: 'Red', hex: '#ff6188' }, { shade: 'Orange', hex: '#fc9867' },
      { shade: 'Yellow', hex: '#ffd866' }, { shade: 'Green', hex: '#a9dc76' },
      { shade: 'Cyan', hex: '#78dce8' }, { shade: 'Blue', hex: '#ab9df2' },
      { shade: 'Purple', hex: '#9b6b9b' }, { shade: 'Pink', hex: '#ff79c6' },
    ] },
  {
    name: 'IBM Carbon', colors: [
      { shade: 'Red 60', hex: '#da1e28' }, { shade: 'Magenta 60', hex: '#d12765' },
      { shade: 'Purple 60', hex: '#8a3ffc' }, { shade: 'Blue 60', hex: '#0f62fe' },
      { shade: 'Cyan 60', hex: '#009d9a' }, { shade: 'Teal 60', hex: '#005d5d' },
      { shade: 'Green 60', hex: '#24a148' }, { shade: 'Yellow 30', hex: '#f1c21b' },
      { shade: 'Orange 40', hex: '#ff832b' }, { shade: 'Red 50', hex: '#fa4d56' },
      { shade: 'Magenta 50', hex: '#ee5396' }, { shade: 'Purple 50', hex: '#a56eff' },
      { shade: 'Blue 50', hex: '#4589ff' }, { shade: 'Cyan 50', hex: '#0098a1' },
      { shade: 'Teal 50', hex: '#00836e' }, { shade: 'Green 50', hex: '#42be65' },
    ] },
  {
    name: 'Flat UI', colors: [
      { shade: 'Turquoise', hex: '#1abc9c' }, { shade: 'Emerald', hex: '#2ecc71' },
      { shade: 'Peter River', hex: '#3498db' }, { shade: 'Amethyst', hex: '#9b59b6' },
      { shade: 'Wet Asphalt', hex: '#34495e' }, { shade: 'Green Sea', hex: '#16a085' },
      { shade: 'Nephritis', hex: '#27ae60' }, { shade: 'Belize Hole', hex: '#2980b9' },
      { shade: 'Wisteria', hex: '#8e44ad' }, { shade: 'Midnight Blue', hex: '#2c3e50' },
      { shade: 'Sun Flower', hex: '#f1c40f' }, { shade: 'Carrot', hex: '#e67e22' },
      { shade: 'Alizarin', hex: '#e74c3c' }, { shade: 'Clouds', hex: '#ecf0f1' },
      { shade: 'Concrete', hex: '#95a5a6' }, { shade: 'Pumpkin', hex: '#d35400' },
      { shade: 'Pomegranate', hex: '#c0392b' }, { shade: 'Silver', hex: '#bdc3c7' },
      { shade: 'Asbestos', hex: '#7f8c8d' },
    ] },
  {
    name: 'Ant Design', colors: [
      { shade: 'Red 5', hex: '#f5222d' }, { shade: 'Volcano 5', hex: '#fa541c' },
      { shade: 'Orange 5', hex: '#fa8c16' }, { shade: 'Gold 5', hex: '#faad14' },
      { shade: 'Yellow 5', hex: '#fadb14' }, { shade: 'Lime 5', hex: '#a0d911' },
      { shade: 'Green 5', hex: '#52c41a' }, { shade: 'Cyan 5', hex: '#13c2c2' },
      { shade: 'Blue 5', hex: '#1890ff' }, { shade: 'Geek Blue 5', hex: '#2f54eb' },
      { shade: 'Purple 5', hex: '#722ed1' }, { shade: 'Magenta 5', hex: '#eb2f96' },
    ] },
  {
    name: 'Windows 95', colors: [
      { shade: 'Teal', hex: '#008080' }, { shade: 'Navy', hex: '#000080' },
      { shade: 'Maroon', hex: '#800000' }, { shade: 'Green', hex: '#008000' },
      { shade: 'Olive', hex: '#808000' }, { shade: 'Purple', hex: '#800080' },
      { shade: 'Gray', hex: '#808080' }, { shade: 'Silver', hex: '#c0c0c0' },
      { shade: 'Blue', hex: '#0000ff' }, { shade: 'Lime', hex: '#00ff00' },
      { shade: 'Red', hex: '#ff0000' }, { shade: 'Yellow', hex: '#ffff00' },
      { shade: 'Fuchsia', hex: '#ff00ff' }, { shade: 'Aqua', hex: '#00ffff' },
      { shade: 'White', hex: '#ffffff' }, { shade: 'Black', hex: '#000000' },
    ] },
  {
    name: 'Retro 8-bit', colors: [
      { shade: 'Blk', hex: '#000000' }, { shade: 'Dk Gry', hex: '#555555' },
      { shade: 'Lt Gry', hex: '#aaaaaa' }, { shade: 'Wht', hex: '#ffffff' },
      { shade: 'Red', hex: '#ff0000' }, { shade: 'Dk Red', hex: '#880000' },
      { shade: 'Grn', hex: '#00ff00' }, { shade: 'Dk Grn', hex: '#008800' },
      { shade: 'Blu', hex: '#0000ff' }, { shade: 'Dk Blu', hex: '#000088' },
      { shade: 'Ylw', hex: '#ffff00' }, { shade: 'Dk Ylw', hex: '#888800' },
      { shade: 'Cyn', hex: '#00ffff' }, { shade: 'Dk Cyn', hex: '#008888' },
      { shade: 'Pnk', hex: '#ff00ff' }, { shade: 'Dk Pnk', hex: '#880088' },
    ] },
  {
    name: 'GameBoy', colors: [
      { shade: 'Light', hex: '#e0f8d0' }, { shade: 'Mid Light', hex: '#88c070' },
      { shade: 'Mid Dark', hex: '#346856' }, { shade: 'Dark', hex: '#081820' },
    ] },
  {
    name: 'Synthwave', colors: [
      { shade: 'Bg', hex: '#2b213a' }, { shade: 'Sun', hex: '#f92aad' },
      { shade: 'Cyan', hex: '#36f9f6' }, { shade: 'Pink', hex: '#ff7edb' },
      { shade: 'Purple', hex: '#b693f9' }, { shade: 'Yellow', hex: '#f4e4a1' },
      { shade: 'Blue', hex: '#6d77f7' }, { shade: 'Red', hex: '#fc6171' },
    ] },
  {
    name: 'Ghibli Pastels', colors: [
      { shade: 'Sky', hex: '#c6e2e9' }, { shade: 'Mint', hex: '#c5e0d8' },
      { shade: 'Lavender', hex: '#d9d0de' }, { shade: 'Rose', hex: '#e8c7c8' },
      { shade: 'Peach', hex: '#f0cfc0' }, { shade: 'Cream', hex: '#f5e4c3' },
      { shade: 'Sage', hex: '#b8c9a5' }, { shade: 'Powder', hex: '#c8d7e3' },
    ] },
  {
    name: 'Vaporwave', colors: [
      { shade: 'Pink', hex: '#ff71ce' }, { shade: 'Blue', hex: '#01cdfe' },
      { shade: 'Purple', hex: '#b967ff' }, { shade: 'Cyan', hex: '#05ffa1' },
      { shade: 'Yellow', hex: '#fff200' }, { shade: 'Magenta', hex: '#ff00ff' },
      { shade: 'Hot Pink', hex: '#ff1493' }, { shade: 'Aqua', hex: '#00ffff' },
    ] },
  {
    name: 'Japanese (Washi)', colors: [
      { shade: 'Sumi', hex: '#1c1c1c' }, { shade: 'Beni', hex: '#bc5a4c' },
      { shade: 'Momo', hex: '#f4a7a7' }, { shade: 'Sakura', hex: '#fce4ec' },
      { shade: 'Fuji', hex: '#8e7db5' }, { shade: 'Ai', hex: '#2e4b7a' },
      { shade: 'Mizu', hex: '#8cb8d4' }, { shade: 'Wasurenagusa', hex: '#7bb8d4' },
      { shade: 'Moegi', hex: '#5b8c5a' }, { shade: 'Wakatake', hex: '#76a363' },
      { shade: 'Kuchiba', hex: '#c4844b' }, { shade: 'Kaki', hex: '#d7643d' },
      { shade: 'Tsuchi', hex: '#b67b5b' }, { shade: 'Cha', hex: '#6d4c2a' },
    ] },
];

// ==== GRADIENTS ====
const gradients: GradientSwatch[] = [
  { name: 'Ocean Blue', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Sunset', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Mojave', css: 'linear-gradient(135deg, #FFD700, #FF8C00)' },
  { name: 'Night Sky', css: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { name: 'Neon Glow', css: 'linear-gradient(135deg, #00f260, #0575e6)' },
  { name: 'Aurora', css: 'linear-gradient(135deg, #00b4db, #0083b0)' },
  { name: 'Peacock', css: 'linear-gradient(135deg, #02aab0, #00cdac)' },
  { name: 'Fire', css: 'linear-gradient(135deg, #f12711, #f5af19)' },
  { name: 'Pink Rose', css: 'linear-gradient(135deg, #fc6076, #ff9a44)' },
  { name: 'Purple Rain', css: 'linear-gradient(135deg, #7303c0, #ec38bc)' },
  { name: 'Mint', css: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { name: 'Bloody Mary', css: 'linear-gradient(135deg, #ff512f, #dd2476)' },
  { name: 'Emerald', css: 'linear-gradient(135deg, #348f50, #56ab2f)' },
  { name: 'Cosmic', css: 'linear-gradient(135deg, #ff00cc, #333399)' },
  { name: 'Frost', css: 'linear-gradient(135deg, #000428, #004e92)' },
  { name: 'Lemon', css: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { name: 'Rose Water', css: 'linear-gradient(135deg, #e55d87, #5fc3e4)' },
  { name: 'Candy', css: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { name: 'Deep Space', css: 'linear-gradient(135deg, #000000, #434343)' },
  { name: 'Lavender', css: 'linear-gradient(135deg, #c471f5, #fa71cd)' },
  { name: 'Cyberpunk', css: 'linear-gradient(135deg, #f77062, #fe5196)' },
  { name: 'Tropical', css: 'linear-gradient(135deg, #f12711, #f5af19, #00c9ff)' },
  { name: 'Forest', css: 'linear-gradient(135deg, #134e5e, #71b280)' },
  { name: 'Golden Hour', css: 'linear-gradient(135deg, #f5af19, #f12711)' },
  { name: 'Toxic', css: 'linear-gradient(135deg, #00ff87, #60efff)' },
  { name: 'Mauve', css: 'linear-gradient(135deg, #42275a, #734b6d)' },
  { name: 'Aqua Splash', css: 'linear-gradient(135deg, #13547a, #80d0c7)' },
  { name: 'Violet', css: 'linear-gradient(135deg, #4776e6, #8e54e9)' },
  { name: 'Juicy', css: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)' },
  { name: 'Crimson Tide', css: 'linear-gradient(135deg, #642b73, #c6426e)' },
  { name: 'Mojito', css: 'linear-gradient(135deg, #1d976c, #93f9b9)' },
  { name: 'Twilight', css: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { name: 'Sublime', css: 'linear-gradient(135deg, #fc5c7d, #6a82fb)' },
  { name: 'Mango', css: 'linear-gradient(135deg, #feda75, #fa7e1e)' },
  { name: 'Oceanic', css: 'linear-gradient(135deg, #1cb5e0, #000851)' },
  { name: 'Pumpkin', css: 'linear-gradient(135deg, #e96443, #904e95)' },
  { name: 'Jungle', css: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { name: 'Dracula', css: 'linear-gradient(135deg, #ff007f, #7000ff)' },
  { name: 'Nord', css: 'linear-gradient(135deg, #5e81ac, #88c0d0, #d8dee9)' },
  { name: 'Tokyo', css: 'linear-gradient(135deg, #1a1b26, #7aa2f7, #bb9af7)' },
  { name: 'Sunrise', css: 'linear-gradient(135deg, #ff512f, #f09819, #ffd34e)' },
  { name: 'Galaxy', css: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { name: 'Flare', css: 'linear-gradient(135deg, #f00000, #dc281e)' },
  { name: 'Rainbow', css: 'linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)' },
  { name: 'Honey', css: 'linear-gradient(135deg, #f9d423, #ff4e50)' },
  { name: 'Ice', css: 'linear-gradient(135deg, #00c6fb, #005bea)' },
  { name: 'Cherry', css: 'linear-gradient(135deg, #eb3349, #f45c43)' },
  { name: 'Moonlight', css: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
  { name: 'Candy Shop', css: 'linear-gradient(135deg, #ffecd2, #fcb69f, #a18cd1)' },
  { name: 'Neon Nights', css: 'linear-gradient(135deg, #ff00cc, #3600ff, #00ffcc)' },
];

function SwatchCard({ hex, name, subText, onClick }: { hex: string; name: string; subText?: string; onClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => { e.stopPropagation(); navigator.clipboard.writeText(hex).then(() => { setCopied(true); toast.success(`Copied ${hex}!`); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.97 }} onClick={onClick} className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 transition-all shadow-lg">
      <div className="h-24 w-full relative" style={{ backgroundColor: hex }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button onClick={handleCopy} className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white transition-all" title="Copy hex">{copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}</button>
        </div>
      </div>
      <div className={`p-2.5 ${isDark(hex) ? 'bg-[#1a1a2e]' : 'bg-white'}`}>
        <p className={`font-bold text-xs font-mono truncate ${isDark(hex) ? 'text-white' : 'text-slate-900'}`}>{name}</p>
        <p className={`text-[10px] font-mono truncate ${isDark(hex) ? 'text-slate-400' : 'text-slate-500'}`}>{subText || hex}</p>
      </div>
    </motion.div>
  );
}

function GradientCard({ gradient, onClick }: { gradient: GradientSwatch; onClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => { e.stopPropagation(); navigator.clipboard.writeText(gradient.css).then(() => { setCopied(true); toast.success('Gradient CSS copied!'); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <motion.div whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }} onClick={onClick} className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/20 transition-all shadow-lg">
      <div className="h-28 w-full" style={{ background: gradient.css }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white transition-all" title="Copy CSS">{copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}</button>
        </div>
      </div>
      <div className="p-2.5 bg-[#1a1a2e]">
        <p className="font-bold text-xs font-mono text-white truncate">{gradient.name}</p>
        <p className="text-[10px] font-mono text-slate-400 truncate">{gradient.css.slice(0, 40)}...</p>
      </div>
    </motion.div>
  );
}

export default function PalletePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('palettes');
  const [format, setFormat] = useState<ColorFormat>('hex');
  const [search, setSearch] = useState('');
  const [customColor, setCustomColor] = useState('#00E5FF');
  const [hue, setHue] = useState(180);
  const [sat, setSat] = useState(80);
  const [lit, setLit] = useState(55);
  const [copied, setCopied] = useState(false);
  const [harmonyBase, setHarmonyBase] = useState('#00E5FF');

  const filteredNamed = useMemo(() => {
    if (!search) return namedColors;
    const q = search.toLowerCase();
    return namedColors.filter(c => c.name.toLowerCase().includes(q) || c.hex.includes(q) || c.category.toLowerCase().includes(q));
  }, [search]);

  const filteredWebSafe = useMemo(() => {
    if (!search) return webSafeColors;
    const q = search.toLowerCase();
    return webSafeColors.filter(c => c.name.includes(q.toUpperCase()) || c.category.toLowerCase().includes(q));
  }, [search]);

  const filteredWheel = useMemo(() => {
    if (!search) return wheelColors;
    const q = search.toLowerCase();
    return wheelColors.filter(c => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [search]);

  const displayFormat = (color: ColorSwatch) => {
    switch (format) {
      case 'rgb': return `rgb(${color.rgb})`;
      case 'hsl': return color.hsl;
      case 'hwb': return `hwb(${hexToHwb(color.hex)})`;
      default: return color.hex;
    }
  };

  const handleCopyCode = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); toast.success('Copied!'); setTimeout(() => setCopied(false), 1500); });
  }, []);

  const copyAllPalette = (pal: PaletteSet) => {
    const text = pal.colors.map(c => `${c.shade}: ${c.hex}`).join('\n');
    navigator.clipboard.writeText(text).then(() => toast.success(`${pal.name} colors copied!`));
  };

  const customHsl = useMemo(() => {
    const { r, g, b } = hexToRgb(customColor); const hsl = rgbToHsl(r, g, b);
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }, [customColor]);

  const harmonies = useMemo(() => generateHarmonies(harmonyBase), [harmonyBase]);

  const handleHueChange = (v: number) => { setHue(v); setCustomColor(hslToHex(v, sat, lit)); };
  const handleSatChange = (v: number) => { setSat(v); setCustomColor(hslToHex(hue, v, lit)); };
  const handleLitChange = (v: number) => { setLit(v); setCustomColor(hslToHex(hue, sat, v)); };

  const contrastWithWhite = useMemo(() => contrastRatio(customColor, '#ffffff'), [customColor]);
  const contrastWithBlack = useMemo(() => contrastRatio(customColor, '#000000'), [customColor]);

  const wheelCategories = [...new Set(wheelColors.map(c => c.category))];

  return (
    <div className="h-full w-full flex flex-col overflow-hidden relative z-10">
      {/* Terminal chrome bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0a0a1a] border-b border-white/5 flex items-center px-3 gap-2 z-20">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-[8px] font-mono text-slate-600 ml-2">css-maze@v1.0 — palette</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/5 shrink-0"
        style={{ background: '#0a0a1a' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}
            className="p-2 rounded-lg transition-colors text-slate-400 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg border text-cyan-400"
              style={{ background: 'rgba(0,229,255,0.08)', borderColor: 'rgba(0,229,255,0.25)' }}><Palette size={18} /></div>
            <h1 className="text-lg md:text-xl font-bold text-white font-pixel">CSS Pallete</h1>
          </div>
        </div>
        <div className="hidden sm:flex rounded-lg p-0.5 border"
          style={{ background: 'rgba(0,229,255,0.04)', borderColor: 'rgba(0,229,255,0.12)' }}>
          {(['hex', 'rgb', 'hsl', 'hwb'] as ColorFormat[]).map(f => (
            <button key={f} onClick={() => setFormat(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${format === f ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}
              style={format === f ? { background: '#00e5ff', color: '#070714' } : {}}>{f}</button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 md:px-6 py-2 border-b border-white/5 shrink-0 overflow-x-auto custom-scrollbar"
        style={{ background: '#070714' }}>
        {[
          { id: 'palettes' as Tab, label: 'Palettes', icon: <Palette size={14} /> },
          { id: 'named' as Tab, label: 'Named', icon: <Palette size={14} /> },
          { id: 'websafe' as Tab, label: 'Web Safe', icon: <Sun size={14} /> },
          { id: 'wheel' as Tab, label: 'Color Wheel', icon: <Droplets size={14} /> },
          { id: 'harmonies' as Tab, label: 'Harmonies', icon: <Contrast size={14} /> },
          { id: 'gradients' as Tab, label: 'Gradients', icon: <Moon size={14} /> },
          { id: 'custom' as Tab, label: 'Custom', icon: <Pipette size={14} /> },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
            style={activeTab === tab.id
              ? { background: 'rgba(0,229,255,0.1)', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.25)' }
              : { color: '#64748b', border: '1px solid transparent' }}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6">
        {/* ============ PALETTES ============ */}
        {activeTab === 'palettes' && (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-mono text-slate-500 self-center">Total: {palettes.reduce((a, p) => a + p.colors.length, 0)} colors in {palettes.length} palettes</span>
            </div>
            {palettes.map(palette => (
              <div key={palette.name} className="group">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-slate-300">{palette.name}</h2>
                  <button onClick={() => copyAllPalette(palette)} className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"><Copy size={10} /> Copy All</button>
                </div>
                <div className={`grid gap-1.5 ${palette.colors.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' : palette.colors.length <= 8 ? 'grid-cols-4 sm:grid-cols-8' : 'grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11'}`}>
                  {palette.colors.map(c => (
                    <motion.div key={c.shade} whileHover={{ scale: 1.1, zIndex: 10 }} className="relative group/swatch cursor-pointer" onClick={() => handleCopyCode(c.hex)} title={`${c.shade}: ${c.hex}`}>
                      <div className="h-10 md:h-12 rounded-lg border border-white/10 hover:border-white/30 transition-all" style={{ backgroundColor: c.hex }} />
                      <p className="text-[9px] text-slate-500 text-center mt-0.5 font-mono truncate">{c.shade}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============ NAMED COLORS ============ */}
        {activeTab === 'named' && (
          <div>
            <div className="relative mb-3 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search colors..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-8 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={14} /></button>}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['All', 'Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple', 'Pink', 'Brown', 'White', 'Gray'].map(cat => (
                <button key={cat} onClick={() => setSearch(cat === 'All' ? '' : cat)} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors ${(cat === 'All' && !search) || search?.toLowerCase() === cat.toLowerCase() ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white bg-white/5 border border-white/5 hover:border-white/20'}`}>{cat}</button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mb-3">{filteredNamed.length} colors found</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredNamed.map((color, i) => (
                <div key={color.hex + color.name + i}>
                  <SwatchCard hex={color.hex} name={color.name} subText={displayFormat(color)} onClick={() => handleCopyCode(displayFormat(color))} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ WEB SAFE ============ */}
        {activeTab === 'websafe' && (
          <div>
            <p className="text-xs text-slate-500 mb-3 font-mono">216 Web Safe Colors — guaranteed to display consistently across all browsers.</p>
            <div className="relative mb-3 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search hex..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-8 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={14} /></button>}
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-18 gap-1">
              {filteredWebSafe.map(c => (
                <motion.div key={c.hex} whileHover={{ scale: 1.3, zIndex: 10 }} onClick={() => handleCopyCode(c.hex)} className="cursor-pointer group/safe" title={c.hex}>
                  <div className="h-6 sm:h-8 rounded border border-white/5 hover:border-white/30 transition-all" style={{ backgroundColor: c.hex }} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ============ COLOR WHEEL ============ */}
        {activeTab === 'wheel' && (
          <div>
            <p className="text-xs text-slate-500 mb-3 font-mono">HSL Color Wheel — {wheelColors.length} colors across the spectrum at different saturation & lightness levels.</p>
            <div className="relative mb-3 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search colors..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-8 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={14} /></button>}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['All', ...wheelCategories].map(cat => (
                <button key={cat} onClick={() => setSearch(cat === 'All' ? '' : cat)} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors ${(cat === 'All' && !search) || search?.toLowerCase() === cat.toLowerCase() ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white bg-white/5 border border-white/5 hover:border-white/20'}`}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {filteredWheel.map((c, i) => (
                <div key={c.hex + c.name + i}>
                  <SwatchCard hex={c.hex} name={c.name.replace(/\d+s\d+l/g, '')} subText={displayFormat(c)} onClick={() => handleCopyCode(displayFormat(c))} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ HARMONIES ============ */}
        {activeTab === 'harmonies' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#15152a] border border-white/10 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Contrast size={16} className="text-cyan-400" /> Color Harmonies</h2>
              <div className="flex items-center gap-3 mb-6">
                <input type="color" value={harmonyBase} onChange={e => setHarmonyBase(e.target.value)} className="w-12 h-12 rounded-xl border-2 border-white/10 cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none" />
                <input type="text" value={harmonyBase} onChange={e => /^#[0-9A-Fa-f]{0,6}$/.test(e.target.value) && setHarmonyBase(e.target.value)} className="bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-cyan-500/50 w-32" />
                <span className="text-xs text-slate-500 font-mono">Base color</span>
              </div>
              <div className="grid gap-4">
                <p className="text-[10px] font-mono text-slate-500">Complementary & Split Complementary</p>
                <div className="grid grid-cols-5 gap-2">
                  {harmonies.slice(0, 3).map(h => (
                    <div key={h.name} onClick={() => handleCopyCode(h.hex)} className="cursor-pointer group">
                      <div className="h-16 rounded-xl border border-white/10 group-hover:border-white/30 transition-all" style={{ backgroundColor: h.hex }} />
                      <p className="text-[9px] text-slate-500 text-center mt-1 font-mono truncate">{h.name}</p>
                      <p className="text-[8px] text-slate-600 text-center font-mono">{h.hex}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-2">Triadic</p>
                <div className="grid grid-cols-3 gap-2">
                  {harmonies.slice(3, 6).map(h => (
                    <div key={h.name} onClick={() => handleCopyCode(h.hex)} className="cursor-pointer group">
                      <div className="h-16 rounded-xl border border-white/10 group-hover:border-white/30 transition-all" style={{ backgroundColor: h.hex }} />
                      <p className="text-[9px] text-slate-500 text-center mt-1 font-mono truncate">{h.name}</p>
                      <p className="text-[8px] text-slate-600 text-center font-mono">{h.hex}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-2">Analogous</p>
                <div className="grid grid-cols-4 gap-2">
                  {harmonies.slice(6, 10).map(h => (
                    <div key={h.name} onClick={() => handleCopyCode(h.hex)} className="cursor-pointer group">
                      <div className="h-16 rounded-xl border border-white/10 group-hover:border-white/30 transition-all" style={{ backgroundColor: h.hex }} />
                      <p className="text-[9px] text-slate-500 text-center mt-1 font-mono truncate">{h.name}</p>
                      <p className="text-[8px] text-slate-600 text-center font-mono">{h.hex}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-2">Monochromatic</p>
                <div className="grid grid-cols-4 gap-2">
                  {harmonies.slice(10).map(h => (
                    <div key={h.name} onClick={() => handleCopyCode(h.hex)} className="cursor-pointer group">
                      <div className="h-16 rounded-xl border border-white/10 group-hover:border-white/30 transition-all" style={{ backgroundColor: h.hex }} />
                      <p className="text-[9px] text-slate-500 text-center mt-1 font-mono truncate">{h.name}</p>
                      <p className="text-[8px] text-slate-600 text-center font-mono">{h.hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ GRADIENTS ============ */}
        {activeTab === 'gradients' && (
          <div>
            <p className="text-xs text-slate-500 mb-4 font-mono">{gradients.length} gradients — click to copy CSS code.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {gradients.map((g, i) => (<div key={g.name + i}><GradientCard gradient={g} onClick={() => handleCopyCode(g.css)} /></div>))}
            </div>
          </div>
        )}

        {/* ============ CUSTOM ============ */}
        {activeTab === 'custom' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Color Picker & Sliders */}
            <div className="bg-[#15152a] border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Pipette size={18} className="text-cyan-400" /> Custom Color Studio</h2>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Preview + Pickers */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-4">
                    <input type="color" value={customColor} onChange={e => { setCustomColor(e.target.value); const { r, g, b } = hexToRgb(e.target.value); const hsl = rgbToHsl(r, g, b); setHue(hsl.h); setSat(hsl.s); setLit(hsl.l); }} className="w-16 h-16 rounded-xl border-2 border-white/10 cursor-pointer bg-transparent shrink-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none" />
                    <div className="flex-1">
                      <input type="text" value={customColor} onChange={e => /^#[0-9A-Fa-f]{0,6}$/.test(e.target.value) && setCustomColor(e.target.value.toUpperCase())} className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-cyan-500/50" />
                    </div>
                    <button onClick={() => handleCopyCode(customColor)} className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors border border-cyan-500/30 shrink-0">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
                  </div>

                  {/* HSL Sliders */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-1"><span className="text-slate-400">Hue</span><span className="text-cyan-300">{hue}°</span></div>
                      <input type="range" min={0} max={360} value={hue} onChange={e => handleHueChange(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-cyan-400 [&::-webkit-slider-thumb]:shadow-lg" style={{ background: `linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)` }} />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-1"><span className="text-slate-400">Saturation</span><span className="text-cyan-300">{sat}%</span></div>
                      <input type="range" min={0} max={100} value={sat} onChange={e => handleSatChange(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-cyan-400 [&::-webkit-slider-thumb]:shadow-lg" style={{ background: `linear-gradient(to right, ${hslToHex(hue, 0, lit)}, ${hslToHex(hue, 100, lit)})` }} />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-1"><span className="text-slate-400">Lightness</span><span className="text-cyan-300">{lit}%</span></div>
                      <input type="range" min={0} max={100} value={lit} onChange={e => handleLitChange(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-cyan-400 [&::-webkit-slider-thumb]:shadow-lg" style={{ background: `linear-gradient(to right, #000000, ${hslToHex(hue, sat, 50)}, #ffffff)` }} />
                    </div>
                  </div>

                  {/* Large Preview */}
                  <div className="h-24 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-200" style={{ backgroundColor: customColor }}>
                    <span className={`text-sm font-bold font-mono ${isDark(customColor) ? 'text-white/80' : 'text-black/80'}`} style={{ textShadow: isDark(customColor) ? '0 1px 4px rgba(0,0,0,0.5)' : '0 1px 4px rgba(255,255,255,0.5)' }}>{customColor}</span>
                  </div>
                </div>

                {/* Right: Format Display */}
                <div className="lg:w-64 space-y-2">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Color Values</p>
                  {[
                    { label: 'HEX', value: customColor },
                    { label: 'RGB', value: `rgb(${formatRgb(customColor)})` },
                    { label: 'HSL', value: customHsl },
                    { label: 'HWB', value: `hwb(${hexToHwb(customColor)})` },
                    { label: 'Luminance', value: getLuminance(customColor).toFixed(3) },
                  ].map(item => (
                    <div key={item.label} onClick={() => handleCopyCode(item.value)} className="bg-[#0a0a1a] border border-white/5 rounded-lg px-3 py-1.5 hover:border-cyan-500/30 cursor-pointer transition-all group/val">
                      <p className="text-[9px] text-slate-500 font-mono">{item.label}</p>
                      <p className="text-xs font-mono text-cyan-300 truncate">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WCAG Contrast Checker */}
            <div className="bg-[#15152a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Contrast size={16} className="text-cyan-400" /> WCAG Contrast Checker</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { bg: customColor, fg: '#ffffff', label: 'White Text' },
                  { bg: customColor, fg: '#000000', label: 'Black Text' },
                ].map(({ bg, fg, label }) => {
                  const ratio = contrastRatio(bg, fg);
                  const aa = ratio >= 4.5; const aaa = ratio >= 7;
                  return (
                    <div key={label} className="bg-[#0a0a1a] border border-white/5 rounded-xl p-4">
                      <p className="text-[10px] text-slate-500 font-mono mb-2">{label} on your color</p>
                      <div className="h-16 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: bg, color: fg }}>
                        <span className="font-bold text-lg" style={{ fontFamily: 'monospace' }}>Aa</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Ratio: <span className="text-white font-bold">{ratio.toFixed(2)}</span>:1</span>
                        <div className="flex gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${aa ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>AA {aa ? '✓' : '✗'}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${aaa ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>AAA {aaa ? '✓' : '✗'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Color Harmonies Preview */}
            <div className="bg-[#15152a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Contrast size={16} className="text-cyan-400" /> Live Harmonies</h3>
              <p className="text-[10px] text-slate-500 font-mono mb-3">Based on your current color</p>
              <div className="grid grid-cols-5 gap-2">
                {generateHarmonies(customColor).slice(0, 5).map(h => (
                  <div key={h.name} onClick={() => handleCopyCode(h.hex)} className="cursor-pointer group">
                    <div className="h-14 rounded-lg border border-white/10 group-hover:border-white/30 transition-all" style={{ backgroundColor: h.hex }} />
                    <p className="text-[8px] text-slate-500 text-center mt-0.5 font-mono truncate">{h.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Snippets */}
            <div className="bg-[#15152a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-3">CSS Code Snippets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: 'Background Color', code: `background-color: ${customColor};` },
                  { label: 'Text Color', code: `color: ${customColor};` },
                  { label: 'Border', code: `border: 2px solid ${customColor};` },
                  { label: 'Box Shadow', code: `box-shadow: 0 4px 14px ${customColor}40;` },
                  { label: 'Outline', code: `outline: 2px solid ${customColor};` },
                  { label: 'Accent Color', code: `accent-color: ${customColor};` },
                  { label: 'Caret Color', code: `caret-color: ${customColor};` },
                  { label: 'Text Decoration', code: `text-decoration-color: ${customColor};` },
                  { label: 'Scrollbar Color', code: `scrollbar-color: ${customColor} #1a1a2e;` },
                  { label: 'Selection Color', code: `::selection { background: ${customColor}40; }` },
                  { label: 'Placeholder Color', code: `::placeholder { color: ${customColor}; }` },
                  { label: 'Gradient (to right)', code: `background: linear-gradient(90deg, ${customColor}, #000000);` },
                ].map(snippet => (
                  <div key={snippet.label} onClick={() => handleCopyCode(snippet.code)} className="flex items-center justify-between bg-[#0a0a1a] border border-white/5 rounded-lg px-3 py-2 hover:border-cyan-500/30 cursor-pointer group/code transition-all">
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-500 font-medium">{snippet.label}</p>
                      <code className="text-[10px] font-mono text-cyan-300 truncate block">{snippet.code}</code>
                    </div>
                    <Copy size={12} className="text-slate-600 shrink-0 opacity-0 group-hover/code:opacity-100 transition-opacity ml-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
