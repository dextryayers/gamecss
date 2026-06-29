import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Code, Sparkles, Move, RotateCw, Maximize, Clock, Box, Layout, Layers, ArrowRight, ArrowDown, FileText, Grid, Hexagon, Palette, Eye, Sliders, Type, Frame, Scan, BoxSelect, Layers3, PanelRight } from 'lucide-react';
import { useGameStore } from '../game/store';

const content: Record<string, { title: string; desc: string; sections: any[] }> = {
  en: {
    title: 'CSS Guidebook',
    desc: 'Master the CSS properties used in the maze. Complete syntax reference with examples.',
    sections: [
      // ─── CSS BASICS ───
      {
        id: 'css-syntax',
        icon: <FileText size={20} />,
        title: 'CSS Syntax Basics',
        desc: 'CSS (Cascading Style Sheets) controls the appearance of HTML elements. Every CSS rule consists of a selector and a declaration block.',
        code: `/* This is a CSS comment */
selector {
  property: value;
}

.player {
  margin-left: 200px;
}

/*
  selector:  targets HTML element(s)
  property:  what to style (color, margin, etc.)
  value:     how to style it (red, 200px, etc.)
*/`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Selector</strong> — picks which element(s) to style. In this game,<br />
            <code className="text-cyan-400">.player</code> targets the player ball.</p>
            <p><strong className="text-cyan-300">Property: Value</strong> — each line inside <code>{'{ }'}</code> is a declaration.<br />
            Always end with a semicolon <code>;</code>. Whitespace and newlines are ignored.</p>
            <p><strong className="text-cyan-300">Comments</strong> — <code>{'/* ... */'}</code> are ignored by the parser. Use them for notes.</p>
          </div>
        )
      },

      // ─── CSS UNITS ───
      {
        id: 'css-units',
        icon: <Ruler size={20} />,
        title: 'CSS Units',
        desc: 'Values in CSS can be specified using various units. The most common are absolute (px) and relative (%, em, rem).',
        code: `/* Absolute units */
width: 200px;       /* pixels — 1px = 1 dot on screen */
margin: 2in;        /* inches */
padding: 5cm;       /* centimeters */
font-size: 10pt;    /* points (1pt = 1/72in) */

/* Relative units */
width: 50%;         /* percentage of parent */
font-size: 1.5em;   /* relative to parent font-size */
font-size: 1.2rem;  /* relative to root font-size */
height: 100vh;      /* 1% of viewport height */
width: 50vw;        /* 1% of viewport width */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Pixel (px)</strong> — most common unit. Fixed size on screen.<br />
            In this game, use <code className="text-cyan-400">px</code> values like <code>margin-left: 200px</code> to move the player.</p>
            <p><strong className="text-cyan-300">Percentage (%)</strong> — relative to the parent element's size.</p>
            <p><strong className="text-cyan-300">em / rem</strong> — relative to font size. 1em = current font size, 1rem = root font size.</p>
            <p><strong className="text-cyan-300">vh / vw</strong> — viewport units. 100vh = full viewport height, 100vw = full width.</p>
          </div>
        )
      },

      // ─── CSS SELECTORS ───
      {
        id: 'css-selectors',
        icon: <BoxSelect size={20} />,
        title: 'CSS Selectors',
        desc: 'Selectors determine which HTML elements your CSS rules apply to. Different selector types let you target elements precisely.',
        code: `/* Element selector */
div { ... }           /* all <div> elements */
p { ... }             /* all <p> elements */

/* Class selector  */
.player { ... }       /* elements with class="player" */
.active { ... }       /* elements with class="active" */

/* ID selector */
#maze { ... }         /* element with id="maze" */
#ball { ... }         /* element with id="ball" */

/* Combinators */
div p { ... }         /* <p> inside a <div> (descendant) */
div > p { ... }       /* direct child <p> of <div> */
h1 + p { ... }        /* <p> immediately after <h1> (adjacent) */
h1 ~ p { ... }        /* <p> preceded by <h1> (sibling) */

/* Attribute selectors */
[type="text"] { ... } /* input with type="text" */
[href^="https"] { ... } /* links starting with https */
[class*="btn"] { ... } /* class containing "btn" */

/* Pseudo-classes */
:hover { ... }        /* on hover */
:nth-child(odd) { ... } /* odd children */

/* Grouping */
h1, h2, h3 { ... }    /* multiple selectors */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">In this game</strong>, the player ball uses the class <code className="text-cyan-400">.player</code>.<br />
            Always write <code>.player {'{'} ... {'}'}</code> to target it.</p>
            <p><strong className="text-cyan-300">Specificity</strong> — ID selectors (100) &gt; classes (10) &gt; elements (1).<br />
            Higher specificity overrides lower ones.</p>
            <p><strong className="text-cyan-300">Pseudo-classes</strong> like <code>:hover</code>, <code>:focus</code> add interactive states.</p>
          </div>
        )
      },

      // ─── BOX MODEL ───
      {
        id: 'box-model',
        icon: <Box size={20} />,
        title: 'CSS Box Model',
        desc: 'Every HTML element is a rectangular box with content, padding, border, and margin — layered from the inside out.',
        code: `/*******************************/
/*         MARGIN              */  ← transparent space outside
/*  ┌──────────────────────┐  */
/*  │     BORDER           │  */  ← visible edge
/*  │  ┌────────────────┐  │  */
/*  │  │   PADDING      │  │  */  ← space inside, part of bg
/*  │  │  ┌──────────┐  │  │  */
/*  │  │  │ CONTENT  │  │  │  */  ← the actual content
/*  │  │  └──────────┘  │  │  */
/*  │  └────────────────┘  │  */
/*  └──────────────────────┘  */

/* Visualizing the box model */
.box {
  width:  200px;
  height: 100px;
  padding: 20px;
  border:  2px solid black;
  margin:  15px;
  /* total width  = 200 + 40(padding) + 4(border) = 244px */
  /* total height = 100 + 40(padding) + 4(border) = 144px */
  /* margin adds invisible space outside */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Content</strong> — the actual text or child elements.</p>
            <p><strong className="text-cyan-300">Padding</strong> — space between content and border. Part of the element's background. <code className="text-cyan-400">padding: 20px</code> pushes content inward.</p>
            <p><strong className="text-cyan-300">Border</strong> — a visible (or invisible) line around the element.</p>
            <p><strong className="text-cyan-300">Margin</strong> — transparent space outside the border. <code className="text-cyan-400">margin-left: 200px</code> pushes the element right.</p>
            <p className="text-amber-400 text-[10px] mt-2">In this game: margin and padding values are divided by 100 to determine how many cells the player moves. margin-left: 200px = 2 cells right.</p>
          </div>
        )
      },

      // ─── MARGIN ───
      {
        id: 'margin',
        icon: <ArrowRight size={20} />,
        title: 'Margin (Shorthand)',
        desc: 'Creates transparent space OUTSIDE the border. In the game, margin values move the player in specific directions.',
        code: `/* Single value — all four sides */
margin: 20px;         /* top = right = bottom = left = 20px */

/* Two values — vertical | horizontal */
margin: 10px 20px;    /* top/bottom = 10px, left/right = 20px */

/* Three values — top | horizontal | bottom */
margin: 10px 20px 30px; /* top=10, left/right=20, bottom=30 */

/* Four values — top right bottom left (clockwise) */
margin: 10px 20px 30px 40px;

/* Individual sides */
margin-top:    20px;  /* pushes element DOWN  */
margin-right:  20px;  /* pulls element LEFT   */
margin-bottom: 20px;  /* pulls element UP     */
margin-left:   20px;  /* pushes element RIGHT */

/* Special values */
margin: 0 auto;       /* centers block horizontally */
margin: auto;         /* centers both ways */

/* Negative margin */
margin-left: -20px;   /* pulls element LEFT */
margin-top:  -20px;   /* pulls element UP */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Game Direction Mapping</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">margin-top</code>    → <span className="text-green-400">DOWN</span>  (dy+)</span>
              <span><code className="text-cyan-400">margin-bottom</code> → <span className="text-red-400">UP</span>    (dy-)</span>
              <span><code className="text-cyan-400">margin-left</code>   → <span className="text-green-400">RIGHT</span> (dx+)</span>
              <span><code className="text-cyan-400">margin-right</code>  → <span className="text-red-400">LEFT</span>  (dx-)</span>
            </div>
            <p className="text-[10px] text-slate-500">Each 100px = 1 cell. So margin-left: 200px moves the player 2 cells right.</p>
            <p><strong className="text-cyan-300">Shorthand behavior</strong></p>
            <p className="text-[10px]">1 value → all 4 sides equal (net zero).<br />
            2 values → top/bottom cancel, left/right cancel (net zero).<br />
            4 values → top=dy+, right=dx-, bottom=dy-, left=dx+. Use this to move diagonally!</p>
          </div>
        )
      },

      // ─── PADDING ───
      {
        id: 'padding',
        icon: <Box size={20} />,
        title: 'Padding (Shorthand)',
        desc: 'Creates space INSIDE the element, between content and border. In the game, padding behaves like margin for movement.',
        code: `/* Single value — all four sides */
padding: 20px;          /* all sides = 20px */

/* Two values — vertical | horizontal */
padding: 10px 20px;     /* top/bottom=10, left/right=20 */

/* Three values — top | horizontal | bottom */
padding: 10px 20px 30px;

/* Four values — top right bottom left (clockwise) */
padding: 10px 20px 30px 40px;

/* Individual sides */
padding-top:    20px;   /* pushes player DOWN  */
padding-right:  20px;   /* pulls player LEFT   */
padding-bottom: 20px;   /* pulls player UP     */
padding-left:   20px;   /* pushes player RIGHT */

/* Unlike margin, padding has NO auto/negative values */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Game Direction Mapping</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">padding-top</code>    → <span className="text-green-400">DOWN</span>  (dy+)</span>
              <span><code className="text-cyan-400">padding-bottom</code> → <span className="text-red-400">UP</span>    (dy-)</span>
              <span><code className="text-cyan-400">padding-left</code>   → <span className="text-green-400">RIGHT</span> (dx+)</span>
              <span><code className="text-cyan-400">padding-right</code>  → <span className="text-red-400">LEFT</span>  (dx-)</span>
            </div>
            <p className="text-[10px] text-slate-500">Same as margin: 100px = 1 cell. padding-left: 200px → 2 cells right.</p>
            <p><strong className="text-cyan-300">Padding vs Margin</strong></p>
            <p className="text-[10px]">Padding is part of the element's clickable/background area. Margin is transparent space outside. For movement in this game, they work identically.</p>
          </div>
        )
      },

      // ─── TOP / BOTTOM / LEFT / RIGHT ───
      {
        id: 'top-left',
        icon: <ArrowDown size={20} />,
        title: 'Top / Bottom / Left / Right',
        desc: 'Offsets a positioned element from its reference point. Must be combined with a non-static position value.',
        code: `/* These only work with a non-static position */
.element {
  position: relative;   /* required! */
  top:  50px;           /* pushes DOWN  from top edge */
  left: 100px;          /* pushes RIGHT from left edge */
}

/* Different position contexts */
.box-a {
  position: relative;
  top: 20px;   /* offset 20px from its normal position */
}

.box-b {
  position: absolute;
  bottom: 0;    /* stick to bottom of parent */
  right: 0;     /* stick to right of parent */
}

.box-c {
  position: fixed;
  top: 10px;
  left: 10px;   /* 10px from viewport top-left */
}

/* Negative values pull in the opposite direction */
.element {
  position: relative;
  top: -20px;   /* pulls UP */
  left: -30px;  /* pulls LEFT */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Game Direction Mapping</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">top</code>    → <span className="text-green-400">DOWN</span>  (dy+)</span>
              <span><code className="text-cyan-400">bottom</code> → <span className="text-red-400">UP</span>    (dy-)</span>
              <span><code className="text-cyan-400">left</code>   → <span className="text-green-400">RIGHT</span> (dx+)</span>
              <span><code className="text-cyan-400">right</code>  → <span className="text-red-400">LEFT</span>  (dx-)</span>
            </div>
            <p className="text-[10px] text-slate-500">100px = 1 cell. top: 200px → 2 cells down.</p>
            <p><strong className="text-cyan-300">Important</strong></p>
            <p className="text-[10px]">These properties only work if <code>position</code> is set to <code>relative</code>, <code>absolute</code>, <code>fixed</code>, or <code>sticky</code>. In the game engine, position is automatically applied so <code>top</code> and <code>left</code> work directly.</p>
          </div>
        )
      },

      // ─── TRANSFORM: TRANSLATE ───
      {
        id: 'transform-translate',
        icon: <Move size={20} />,
        title: 'Transform: Translate',
        desc: 'Moves an element from its current position along the X (horizontal) and Y (vertical) axes.',
        code: `/* Translate on one axis */
transform: translateX(200px);  /* move RIGHT 200px */
transform: translateX(-100px); /* move LEFT 100px */
transform: translateY(150px);  /* move DOWN 150px */
transform: translateY(-50px);  /* move UP 50px */

/* Translate on both axes */
transform: translate(200px, 100px);   /* right 200, down 100 */
transform: translate(-50px, -150px);  /* left 50, up 150 */

/* Using different units */
transform: translateX(50%);   /* move right by 50% of own width */
transform: translate(100%, 50%); /* diagonal */

/* Combined with other transforms */
transform: translateX(200px) rotate(45deg);`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Game Direction Mapping</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>translateX(+n)</code> → <span className="text-green-400">RIGHT</span></span>
              <span><code>translateX(-n)</code> → <span className="text-red-400">LEFT</span></span>
              <span><code>translateY(+n)</code> → <span className="text-green-400">DOWN</span></span>
              <span><code>translateY(-n)</code> → <span className="text-red-400">UP</span></span>
            </div>
            <p className="text-[10px] text-slate-500">Each 100px = 1 cell. translateX(200px) → 2 cells right.</p>
            <p><strong className="text-cyan-300">Percentage trick</strong></p>
            <p className="text-[10px]">Percentages are based on the element's OWN dimensions, not the parent. translateX(100%) moves the element right by its own width.</p>
          </div>
        )
      },

      // ─── TRANSFORM: ROTATE ───
      {
        id: 'transform-rotate',
        icon: <RotateCw size={20} />,
        title: 'Transform: Rotate',
        desc: 'Rotates an element around its center point (or a custom transform-origin).',
        code: `/* Basic rotation */
transform: rotate(45deg);   /* 45 degrees clockwise */
transform: rotate(-90deg);  /* 90 degrees counter-clockwise */
transform: rotate(180deg);  /* flipped upside-down */
transform: rotate(360deg);  /* full spin (no visual change) */

/* Using other angle units */
transform: rotate(1rad);    /* 1 radian ≈ 57.3 degrees */
transform: rotate(0.25turn); /* 1/4 of a full turn = 90deg */
transform: rotate(0.5turn);  /* 1/2 turn = 180deg */

/* With custom transform-origin */
.element {
  transform-origin: top left;  /* rotate from top-left corner */
  transform: rotate(45deg);
}

/* Combined moves */
transform: translateX(200px) rotate(90deg);`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Angle Units</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">deg</code> — degrees (0-360)</span>
              <span><code className="text-cyan-400">rad</code> — radians</span>
              <span><code className="text-cyan-400">grad</code> — gradians</span>
              <span><code className="text-cyan-400">turn</code> — full turns</span>
            </div>
            <p className="text-[10px] text-slate-500">Positive = clockwise. Negative = counter-clockwise.</p>
            <p><strong className="text-cyan-300">transform-origin</strong></p>
            <p className="text-[10px]">Defaults to <code>center center</code> (50% 50%). Change it to rotate from a different point.</p>
          </div>
        )
      },

      // ─── TRANSFORM: SCALE ───
      {
        id: 'transform-scale',
        icon: <Maximize size={20} />,
        title: 'Transform: Scale',
        desc: 'Resizes an element — makes it larger or smaller. Values are multipliers of the original size.',
        code: `/* Uniform scaling */
transform: scale(1.5);      /* 50% larger */
transform: scale(2);        /* double the size */
transform: scale(0.5);      /* half the size */
transform: scale(0);        /* invisible! */
transform: scale(-1);       /* mirrored/flipped */

/* Non-uniform scaling */
transform: scale(2, 1);     /* double width, keep height */
transform: scale(1, 0.5);   /* keep width, half height */

/* Axis-specific scaling */
transform: scaleX(2);       /* stretch horizontally ×2 */
transform: scaleY(0.5);     /* squeeze vertically ×0.5 */

/* Useful in game: grow or shrink on specific tiles */
transform: translateX(200px) scale(0.8);`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Scale Values</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>1</code> = original size</span>
              <span><code>0</code> = invisible</span>
              <span><code>1.5</code> = 50% bigger</span>
              <span><code>0.5</code> = 50% smaller</span>
            </div>
            <p><strong className="text-cyan-300">Negative scale</strong> mirrors the element (flips it).<br />
            <code>scale(-1, 1)</code> flips horizontally. <code>scale(1, -1)</code> flips vertically.</p>
          </div>
        )
      },

      // ─── MULTIPLE TRANSFORMS ───
      {
        id: 'multiple-transforms',
        icon: <Sparkles size={20} />,
        title: 'Multiple Transforms',
        desc: 'Chain multiple transform functions in a single property. Order matters — each function is applied right-to-left.',
        code: `/* The order of functions matters! */
transform: translateX(200px) rotate(45deg);
/* 1. rotate 45° around its center
   2. then translate 200px RIGHT
   Result: moves right at a 45° angle */

transform: rotate(45deg) translateX(200px);
/* 1. translate 200px RIGHT (in original orientation)
   2. then rotate 45°
   Result: moves right, but final element is rotated */

/* Different combinations */
transform: translateX(100px) translateY(100px);
transform: scale(1.2) translateX(200px) rotate(90deg);
transform: translateX(200px) scale(0.8) rotate(-15deg);

/* Game tip: translate -> rotate -> scale is safest */
.transform {
  transform: translateX(200px) rotate(45deg) scale(0.9);
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Execution Order</strong></p>
            <p>Transforms are applied <strong className="text-amber-400">right to left</strong>.</p>
            <p className="text-[10px]">Think of it as: <code>transform: a(b(c(x)))</code> — c runs first, then b, then a.</p>
            <p><strong className="text-cyan-300">Recommended pattern</strong></p>
            <p className="text-[10px]">For predictable results: <code>translate</code> first → <code>rotate</code> → <code>scale</code> last.</p>
            <p className="text-[10px]">This way, rotation and scaling happen at the final position, not before moving.</p>
          </div>
        )
      },

      // ─── TRANSITIONS ───
      {
        id: 'transition',
        icon: <Clock size={20} />,
        title: 'Transitions',
        desc: 'Smoothly animates CSS property changes over a specified duration. Makes the player slide instead of teleporting.',
        code: `/* Shorthand — property duration timing-function delay */
transition: all 300ms ease-in-out;

/* Full syntax */
.player {
  transition:
    transform 400ms ease-in-out,
    margin-left 300ms linear,
    opacity 200ms ease;
}

/* Individual properties */
transition-property: transform;
transition-duration: 400ms;
transition-timing-function: ease-in-out;
transition-delay: 100ms;

/* Timing functions */
transition: margin-left 300ms linear;
transition: all 500ms ease;
transition: all 1s ease-in;
transition: all 800ms ease-out;
transition: all 2s cubic-bezier(0.25, 0.1, 0.25, 1);

/* Shorthand with delay */
transition: transform 400ms ease-in-out 200ms;
/*            prop     time   timing      delay */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Timing Functions</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">linear</code> — constant speed</span>
              <span><code className="text-cyan-400">ease</code> — slow start/end</span>
              <span><code className="text-cyan-400">ease-in</code> — slow start</span>
              <span><code className="text-cyan-400">ease-out</code> — slow end</span>
              <span><code className="text-cyan-400">ease-in-out</code> — slow both</span>
              <span><code className="text-cyan-400">cubic-bezier()</code> — custom curve</span>
            </div>
            <p><strong className="text-cyan-300">In the game</strong>, adding a transition makes the player slide smoothly between cells instead of jumping instantly. The game default is 400ms if you don't set one.</p>
          </div>
        )
      },

      // ─── POSITION ───
      {
        id: 'position',
        icon: <Layers size={20} />,
        title: 'Positioning',
        desc: 'Specifies the positioning method for an element. Controls how an element sits in the document flow.',
        code: `/* Static — default, normal document flow */
position: static;
/* top/left/bottom/right have NO effect */

/* Relative — offset from normal position */
position: relative;
top: 20px; left: 30px;
/* still occupies original space in layout */

/* Absolute — removed from flow */
position: absolute;
top: 0; right: 0;
/* positioned relative to NEAREST positioned ancestor */
/* if no positioned ancestor → relative to <html> */

/* Fixed — relative to viewport */
position: fixed;
bottom: 20px; right: 20px;
/* stays in place when scrolling */

/* Sticky — hybrid relative/fixed */
position: sticky;
top: 0;
/* normal until scroll passes it, then "sticks" */

/* Z-index — stacking order */
position: relative;
z-index: 10;           /* higher = closer to viewer */
z-index: -1;           /* behind other elements */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Position Reference</strong></p>
            <div className="grid grid-cols-1 gap-1 text-[10px]">
              <span><code className="text-cyan-400">relative</code> — offset relative to its own normal position</span>
              <span><code className="text-cyan-400">absolute</code> — relative to the nearest positioned ancestor</span>
              <span><code className="text-cyan-400">fixed</code> — relative to the browser viewport</span>
              <span><code className="text-cyan-400">sticky</code> — toggles between relative and fixed on scroll</span>
            </div>
            <p><strong className="text-cyan-300">z-index</strong></p>
            <p className="text-[10px]">Controls stacking order. Higher value = on top. Only works on positioned elements (non-static).</p>
          </div>
        )
      },

      // ─── DISPLAY ───
      {
        id: 'display',
        icon: <Layout size={20} />,
        title: 'Display Property',
        desc: 'Controls how an element is rendered in the layout — whether it appears as a block, inline, flex container, grid, or is hidden entirely.',
        code: `/* Basic display values */
display: none;        /* element HIDDEN, removed from layout */
display: block;       /* takes full width, starts new line */
display: inline;      /* fits within text flow */
display: inline-block;/* inline but can have width/height */

/* Layout modules */
display: flex;        /* flexbox — 1D layout */
display: grid;        /* grid — 2D layout */

/* Table values */
display: table;
display: table-cell;
display: table-row;

/* Other */
display: contents;    /* element "disappears", children inherit */
display: flow-root;   /* clears floats, contains children */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">display: none vs visibility: hidden</strong></p>
            <p className="text-[10px]"><code>display: none</code> removes the element from layout entirely (no space occupied).<br />
            <code>visibility: hidden</code> hides it visually but keeps its space in the layout.</p>
            <p><strong className="text-cyan-300">display: flex</strong> and <strong>display: grid</strong> unlock powerful layout systems for arranging children.</p>
          </div>
        )
      },

      // ─── FLEXBOX ───
      {
        id: 'flexbox',
        icon: <Layout size={20} />,
        title: 'Flexbox (Display: flex)',
        desc: 'A one-dimensional layout method for distributing space and aligning items in rows or columns.',
        code: `/* Container */
.container {
  display: flex;              /* enable flexbox */
  flex-direction: row;       /* default: horizontal */
  flex-direction: column;    /* vertical */
  flex-wrap: wrap;           /* allow items to wrap */
  justify-content: center;   /* main-axis alignment */
  align-items: stretch;      /* cross-axis alignment */
  gap: 16px;                 /* spacing between items */
}

/* Main-axis alignment (justify-content) */
justify-content: flex-start;    /* left */
justify-content: flex-end;      /* right */
justify-content: center;        /* center */
justify-content: space-between; /* even space between */
justify-content: space-around;  /* space around each */
justify-content: space-evenly;  /* equal space */

/* Cross-axis alignment (align-items) */
align-items: flex-start;    /* top */
align-items: flex-end;      /* bottom */
align-items: center;        /* middle */
align-items: stretch;       /* fill height */
align-items: baseline;      /* align text baseline */

/* Child items */
.item {
  flex: 1;                  /* grow/shrink ratio */
  align-self: center;       /* override align-items for this item */
  order: -1;                /* reorder items */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Main axis vs Cross axis</strong></p>
            <p className="text-[10px]"><code>flex-direction: row</code> → main = horizontal, cross = vertical</p>
            <p className="text-[10px]"><code>flex-direction: column</code> → main = vertical, cross = horizontal</p>
            <p><strong className="text-cyan-300">Justify vs Align</strong></p>
            <p className="text-[10px]"><code>justify-content</code> controls space on the main axis.<br />
            <code>align-items</code> controls alignment on the cross axis.</p>
          </div>
        )
      },

      // ─── CSS GRID ───
      {
        id: 'grid',
        icon: <Grid size={20} />,
        title: 'CSS Grid (Display: grid)',
        desc: 'A two-dimensional layout system. Define rows and columns to place items in a structured grid.',
        code: `/* Container */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* three equal columns */
  grid-template-rows: auto 200px;        /* two rows */
  gap: 16px;                             /* gutter between cells */
}

/* Fractional units (fr) */
grid-template-columns: 1fr 2fr 1fr;   /* middle column is 2x wider */

/* Repeat function */
grid-template-columns: repeat(3, 1fr);   /* same as 1fr 1fr 1fr */

/* Specific sizing */
grid-template-columns: 200px 1fr 100px;  /* fixed + flexible + fixed */
grid-template-columns: minmax(100px, 1fr); /* responsive min/max */

/* Named areas */
grid-template-areas:
  "header header header"
  "sidebar main main"
  "footer footer footer";

/* Child placement */
.item {
  grid-column: 1 / 3;      /* span from col 1 to col 3 */
  grid-row: 2 / 4;          /* span from row 2 to row 4 */
  grid-area: header;        /* place in named area */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Key Concepts</strong></p>
            <p className="text-[10px]"><code>grid-template-columns</code> defines column widths.<br />
            <code>grid-template-rows</code> defines row heights.<br />
            <code>gap</code> adds spacing between cells (not around the edge).</p>
            <p><strong className="text-cyan-300">fr unit</strong></p>
            <p className="text-[10px]">Fractional units distribute available space. <code>1fr 1fr</code> = two equal columns. <code>2fr 1fr</code> = first column gets 2/3 of space.</p>
          </div>
        )
      },

      // ─── BACKGROUND ───
      {
        id: 'background',
        icon: <Palette size={20} />,
        title: 'Background',
        desc: 'Controls the background of an element — color, image, gradient, position, and size.',
        code: `/* Background color */
background: red;
background: #ff0000;           /* hex */
background: rgb(255, 0, 0);    /* RGB */
background: rgba(255, 0, 0, 0.5); /* RGB with opacity */
background: hsl(0, 100%, 50%); /* HSL */

/* Background image */
background: url('image.jpg');
background-image: url('pattern.png');

/* Gradient backgrounds */
background: linear-gradient(to right, red, blue);
background: radial-gradient(circle, gold, darkblue);

/* Multiple backgrounds */
background: 
  url('overlay.png') center / cover,
  linear-gradient(45deg, #000, #333);

/* Background properties */
background-color: #0a0a1a;
background-image: url('bg.png');
background-repeat: no-repeat;   /* repeat, repeat-x, repeat-y */
background-position: center;    /* top, bottom, left, %, px */
background-size: cover;         /* cover, contain, 100% 100% */
background-attachment: fixed;   /* scroll, fixed, local */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Color Formats</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>#ff0</code> — 3-digit hex</span>
              <span><code>#ff0000</code> — 6-digit hex</span>
              <span><code>rgb(r,g,b)</code> — 0-255 each</span>
              <span><code>rgba(r,g,b,a)</code> — with alpha (0-1)</span>
              <span><code>hsl(h,s%,l%)</code> — hue/saturation/light</span>
              <span><code>hsla(...)</code> — HSL with alpha</span>
            </div>
            <p><strong className="text-cyan-300">background vs background-image</strong></p>
            <p className="text-[10px]"><code>background</code> is the shorthand — it can set color, image, position, size all at once.</p>
          </div>
        )
      },

      // ─── BORDER ───
      {
        id: 'border',
        icon: <Frame size={20} />,
        title: 'Border',
        desc: 'Draws a line around an element. You control the width, style, and color independently or together.',
        code: `/* Shorthand — width style color */
border: 2px solid #00e5ff;    /* all 4 sides */
border: 1px dashed rgba(255,255,255,0.3);

/* Individual sides */
border-top:    3px solid red;
border-right:  2px dotted blue;
border-bottom: 4px double green;
border-left:   1px dashed orange;

/* Individual properties */
border-width: 2px;
border-style: solid;
border-color: #00e5ff;

/* Border radius (rounded corners) */
border-radius: 8px;               /* all corners */
border-radius: 10px 20px;         /* top-left/bottom-right | top-right/bottom-left */
border-radius: 10px 20px 30px 40px; /* each corner individually */

/* Border radius for a circle */
border-radius: 50%;               /* perfect circle */

/* Outline (similar but outside border, doesn't affect layout) */
outline: 2px solid #00e5ff;
outline-offset: 4px;              /* gap between border and outline */

/* Border image */
border-image: url('border.png') 30 stretch;`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Border Styles</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>solid</code> — continuous line</span>
              <span><code>dashed</code> — broken line</span>
              <span><code>dotted</code> — series of dots</span>
              <span><code>double</code> — two parallel lines</span>
              <span><code>groove</code> — 3D grooved effect</span>
              <span><code>ridge</code> — 3D ridged effect</span>
              <span><code>inset</code> — 3D inset effect</span>
              <span><code>outset</code> — 3D outset effect</span>
              <span><code>none</code> — no border</span>
              <span><code>hidden</code> — hidden border</span>
            </div>
            <p><strong className="text-cyan-300">border-radius</strong></p>
            <p className="text-[10px]">With <code>50%</code>, any element becomes a circle (if width === height) or an ellipse.</p>
          </div>
        )
      },

      // ─── BOX SHADOW ───
      {
        id: 'box-shadow',
        icon: <Scan size={20} />,
        title: 'Box Shadow',
        desc: 'Adds shadow effects around an element. Can create depth, glow, and layering effects.',
        code: `/* Simple shadow: x-offset y-offset blur color */
box-shadow: 4px 4px 10px rgba(0,0,0,0.5);

/* Multiple values */
box-shadow:
  0 2px 5px rgba(0,0,0,0.3),
  0 5px 15px rgba(0,0,0,0.1);

/* Full syntax: inset x y blur spread color */
box-shadow: inset 0 0 20px rgba(0,229,255,0.3);

/* Glow effect (no offset, just blur) */
box-shadow: 0 0 20px #00e5ff;

/* Spread (4th value) makes shadow bigger */
box-shadow: 0 0 10px 5px #00e5ff40;

/* Multiple shadows = layered effects */
.player {
  box-shadow:
    0 0 10px #00e5ff,
    inset 0 0 5px rgba(255,255,255,0.2);
}

/* No shadow */
box-shadow: none;`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Syntax Breakdown</strong></p>
            <p className="text-[10px]"><code>box-shadow: offset-x offset-y blur-radius spread-radius color inset;</code></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>offset-x</code> — horizontal shift (+ right)</span>
              <span><code>offset-y</code> — vertical shift (+ down)</span>
              <span><code>blur</code> — how soft the shadow is</span>
              <span><code>spread</code> — how much the shadow expands</span>
            </div>
            <p><strong className="text-cyan-300">inset</strong></p>
            <p className="text-[10px]">Makes the shadow appear inside the element (inset glow). Great for CRT terminal effects!</p>
          </div>
        )
      },

      // ─── TEXT & TYPOGRAPHY ───
      {
        id: 'typography',
        icon: <Type size={20} />,
        title: 'Text & Typography',
        desc: 'Control the appearance of text — font family, size, weight, color, alignment, spacing, and decoration.',
        code: `/* Font family */
font-family: 'JetBrains Mono', monospace;   /* code-friendly */
font-family: 'Press Start 2P', cursive;     /* pixel/retro */
font-family: Arial, sans-serif;
font-family: serif;

/* Font size & weight */
font-size: 16px;
font-size: 1.2rem;
font-weight: bold;      /* 400=normal, 700=bold */
font-weight: 600;       /* semi-bold */
font-style: italic;     /* normal, italic, oblique */

/* Text alignment & decoration */
text-align: center;     /* left, right, center, justify */
text-decoration: underline;
text-decoration: line-through;
text-transform: uppercase;  /* uppercase, lowercase, capitalize */

/* Line height & spacing */
line-height: 1.5;        /* 1.5x the font size */
letter-spacing: 2px;     /* space between characters */
word-spacing: 4px;       /* space between words */
white-space: nowrap;     /* prevent wrapping */

/* Text shadow */
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
text-shadow: 0 0 10px #00e5ff;  /* glow effect */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Web-safe fonts</strong></p>
            <p className="text-[10px]">Always include a fallback (like <code>sans-serif</code>) after your custom font.</p>
            <p><strong className="text-cyan-300">font shorthand</strong></p>
            <p className="text-[10px]"><code>font: italic bold 16px/1.5 "JetBrains Mono", monospace;</code></p>
            <p><strong className="text-cyan-300">Game tip</strong></p>
            <p className="text-[10px]">Use <code>text-shadow</code> with cyan tones to match the CRT terminal theme!</p>
          </div>
        )
      },

      // ─── OPACITY & VISIBILITY ───
      {
        id: 'opacity',
        icon: <Eye size={20} />,
        title: 'Opacity & Visibility',
        desc: 'Control how transparent or visible an element is.',
        code: `/* Opacity — 0 to 1 */
opacity: 0;           /* completely transparent */
opacity: 0.5;         /* 50% visible */
opacity: 1;           /* fully opaque */

/* Opacity affects the ENTIRE element (including children) */

/* Visibility */
visibility: visible;   /* element is shown */
visibility: hidden;    /* element is hidden BUT still occupies space */
visibility: collapse;  /* for table rows/columns */

/* Difference: display: none vs visibility: hidden vs opacity: 0 */
/*
  display: none       → removed from layout, space gone
  visibility: hidden  → hidden but space preserved
  opacity: 0          → invisible but space preserved (interactive!)
*/`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Opacity quirks</strong></p>
            <p className="text-[10px]">Opacity creates a new <strong>stacking context</strong>. Elements with opacity &lt; 1 are rendered with z-index in a new layer.</p>
            <p><strong className="text-cyan-300">Opacity 0 trick</strong></p>
            <p className="text-[10px]">Unlike <code>visibility: hidden</code>, <code>opacity: 0</code> elements can still receive clicks and interact with JavaScript!</p>
          </div>
        )
      },

      // ─── FILTER ───
      {
        id: 'filter',
        icon: <Sliders size={20} />,
        title: 'CSS Filter',
        desc: 'Applies graphical effects like blur, brightness, contrast, and hue rotation to an element.',
        code: `/* Individual filter functions */
filter: blur(4px);           /* gaussian blur */
filter: brightness(1.5);     /* 150% brightness */
filter: contrast(200%);      /* double contrast */
filter: grayscale(100%);     /* black & white */
filter: hue-rotate(90deg);   /* shift all colors */
filter: invert(100%);        /* negative image */
filter: saturate(3);         /* triple saturation */
filter: sepia(80%);          /* sepia tone */
filter: opacity(50%);        /* transparency */

/* Multiple filters */
filter: brightness(1.2) contrast(1.5) saturate(2);
filter: blur(2px) hue-rotate(180deg);

/* Drop shadow (like box-shadow but respects shape) */
filter: drop-shadow(2px 4px 6px black);

/* Backdrop filter (affects background behind element) */
backdrop-filter: blur(10px);      /* glass-morphism effect */
backdrop-filter: brightness(0.5); /* darken background */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">filter vs backdrop-filter</strong></p>
            <p className="text-[10px]"><code>filter</code> affects the element itself (content + background).<br />
            <code>backdrop-filter</code> affects what's BEHIND the element (creates glass effects).</p>
            <p><strong className="text-cyan-300">Performance note</strong></p>
            <p className="text-[10px]">Filters can be GPU-accelerated but heavy combinations may affect performance. Use sparingly on animated elements.</p>
          </div>
        )
      },

      // ─── OVERFLOW ───
      {
        id: 'overflow',
        icon: <PanelRight size={20} />,
        title: 'Overflow',
        desc: 'Controls what happens when content exceeds its container\'s dimensions.',
        code: `/* Basic overflow values */
overflow: visible;     /* content spills outside (default) */
overflow: hidden;      /* content clipped, no scrollbar */
overflow: scroll;      /* always show scrollbars */
overflow: auto;        /* show scrollbars only when needed */
overflow: clip;        /* like hidden but also prevents programmatic scroll */

/* Per-axis overflow */
overflow-x: hidden;    /* horizontal only */
overflow-y: scroll;    /* vertical only */

/* Text overflow — ellipsis for single-line text */
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;   /* shows "..." when text overflows */
}

/* Scroll behavior */
overflow-y: auto;
scroll-behavior: smooth;     /* smooth scrolling */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Common use cases</strong></p>
            <p className="text-[10px]"><code>overflow: hidden</code> — crop child elements, create scroll-free containers.<br />
            <code>overflow: auto</code> — add scrollbars only when content overflows.</p>
            <p><strong className="text-cyan-300">overflow: clip</strong></p>
            <p className="text-[10px]">Newer value. Like <code>hidden</code> but also prevents JavaScript from scrolling the element.</p>
          </div>
        )
      },

      // ─── ANIMATIONS ───
      {
        id: 'animation',
        icon: <Layers3 size={20} />,
        title: 'CSS Animations (@keyframes)',
        desc: 'Create complex, multi-step animations without JavaScript. Define keyframes and apply them with the animation property.',
        code: `/* Step 1: Define the keyframes */
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Multi-step animation (percentages) */
@keyframes pulse-glow {
  0%   { box-shadow: 0 0 5px #00e5ff; }
  50%  { box-shadow: 0 0 25px #00e5ff; }
  100% { box-shadow: 0 0 5px #00e5ff; }
}

/* Step 2: Apply the animation */
.element {
  animation: slide-in 500ms ease-out forwards;
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Animation properties (shorthand) */
animation: name duration timing-function delay iteration-count direction fill-mode;

/* Individual properties */
animation-name: pulse-glow;
animation-duration: 2s;
animation-timing-function: ease-in-out;
animation-delay: 0.5s;
animation-iteration-count: infinite;  /* or 1, 2, 3, etc. */
animation-direction: alternate;       /* normal, reverse, alternate, alternate-reverse */
animation-fill-mode: forwards;        /* none, forwards, backwards, both */

/* Multiple animations */
animation: 
  slide-in 500ms ease-out,
  pulse-glow 2s ease-in-out infinite;`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">@keyframes</strong></p>
            <p className="text-[10px]">Define states at various points in the animation timeline using <code>from</code> (0%), <code>to</code> (100%), or any percentage.</p>
            <p><strong className="text-cyan-300">animation vs transition</strong></p>
            <p className="text-[10px]">Transitions animate BETWEEN two states. Animations can define many states and loop infinitely.</p>
            <p><strong className="text-cyan-300">Performance</strong></p>
            <p className="text-[10px]">Animate <code>transform</code> and <code>opacity</code> for the best performance (GPU-accelerated). Avoid animating <code>width</code>, <code>height</code>, <code>margin</code>, or <code>top</code> — they trigger layout recalculations.</p>
          </div>
        )
      },

      // ─── COMBINING PROPERTIES ───
      {
        id: 'combining',
        icon: <Hexagon size={20} />,
        title: 'Combining Properties',
        desc: 'In the game, you can use multiple CSS properties together. The game sums up all movement values from every property you write.',
        code: `/* Example: move diagonally with margin + padding */
.player {
  margin-left: 200px;   /* → 2 cells RIGHT */
  padding-top: 100px;   /* → 1 cell DOWN */
}
/* Total: (dx: 2, dy: 1) → moves 2 right, 1 down */

/* Example: big diagonal with shorthand + individual */
.player {
  margin: 200px 0 0 100px;   /* top=200(dy+2), left=100(dx+1) */
}
/* Total: (dx: 1, dy: 2) → moves 1 right, 2 down */

/* Example: combining margin, transform, and padding */
.player {
  margin-left: 300px;         /* → 3 RIGHT */
  transform: translateY(200px); /* → 2 DOWN */
  padding-right: 100px;       /* → 1 LEFT (cancels out some) */
}
/* Total: (dx: 3-1=2, dy: 2) → moves 2 right, 2 down */

/* Example: adding transition for smooth movement */
.player {
  margin-left: 200px;
  transition: all 500ms ease-in-out;
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">All movement properties stack additively!</strong></p>
            <p className="text-[10px]">The game reads ALL CSS properties you write and adds up their movement values. You can combine margin, padding, top/left, and transform: translate in the same code block.</p>
            <p><strong className="text-cyan-300">Cancelling movement</strong></p>
            <p className="text-[10px]">You can cancel out movement by using opposite directions. E.g., <code>margin-left: 200px</code> + <code>margin-right: 200px</code> = net 0 horizontal movement.</p>
            <p className="text-amber-400 text-[10px]">Tip: Use the live feedback bar in the editor to see exactly how your CSS will move the player before clicking RUN!</p>
          </div>
        )
      },

      // ─── BEST PRACTICES ───
      {
        id: 'best-practices',
        icon: <FileText size={20} />,
        title: 'Game Best Practices',
        desc: 'Tips and strategies for writing CSS that works well in the maze game.',
        code: `/* ✅ DO: Write valid CSS syntax */
.player {
  margin-left: 200px;
}

/* ✅ DO: Use px values (they work best with the game) */
margin-left: 200px;   /* ← perfect */
padding-top: 100px;    /* ← perfect */

/* ✅ DO: Combine properties for diagonal movement */
.player {
  margin-left: 200px;
  padding-top: 100px;
}

/* ✅ DO: Add transitions for smooth movement */
.player {
  margin-left: 200px;
  transition: all 400ms ease-in-out;
}

/* ❌ DON'T: Put values in comments */
/* margin-left: 200px */  /* ← ignored! */

/* ❌ DON'T: Use unsupported properties */
width: 200px;  /* ← doesn't move the player */
color: red;    /* ← doesn't move the player */

/* ❌ DON'T: Forget the .player selector */
margin-left: 200px;  /* ← won't work without a selector! */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Supported Properties for Movement</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>margin-top</code></span>
              <span><code>margin-bottom</code></span>
              <span><code>margin-left</code></span>
              <span><code>margin-right</code></span>
              <span><code>padding-top</code></span>
              <span><code>padding-bottom</code></span>
              <span><code>padding-left</code></span>
              <span><code>padding-right</code></span>
              <span><code>top</code></span>
              <span><code>bottom</code></span>
              <span><code>left</code></span>
              <span><code>right</code></span>
              <span><code>transform: translateX()</code></span>
              <span><code>transform: translateY()</code></span>
              <span><code>margin: (4 values)</code></span>
              <span><code>padding: (4 values)</code></span>
            </div>
            <p className="text-[10px] text-amber-400">Value ÷ 100 = number of cells moved (e.g., 200px = 2 cells)</p>
          </div>
        )
      },
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // INDONESIAN
  // ════════════════════════════════════════════════════════════════
  id: {
    title: 'Buku Panduan CSS',
    desc: 'Kuasai properti CSS yang digunakan di labirin. Referensi sintaks lengkap dengan contoh.',
    sections: [
      {
        id: 'css-syntax',
        icon: <FileText size={20} />,
        title: 'Dasar Sintaks CSS',
        desc: 'CSS (Cascading Style Sheets) mengontrol tampilan elemen HTML. Setiap aturan CSS terdiri dari selektor dan blok deklarasi.',
        code: `/* Ini adalah komentar CSS */
selektor {
  properti: nilai;
}

.player {
  margin-left: 200px;
}

/*
  selektor:  menarget elemen HTML
  properti:  apa yang diatur (color, margin, dll)
  nilai:     bagaimana mengaturnya (red, 200px, dll)
*/`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Selektor</strong> — memilih elemen mana yang akan diatur. Di game ini,<br />
            <code className="text-cyan-400">.player</code> menarget bola pemain.</p>
            <p><strong className="text-cyan-300">Properti: Nilai</strong> — setiap baris di dalam <code>{'{ }'}</code> adalah deklarasi.<br />
            Selalu akhiri dengan titik koma <code>;</code>. Spasi dan baris baru diabaikan.</p>
            <p><strong className="text-cyan-300">Komentar</strong> — <code>{'/* ... */'}</code> diabaikan oleh parser. Gunakan untuk catatan.</p>
          </div>
        )
      },

      {
        id: 'css-units',
        icon: <Ruler size={20} />,
        title: 'Satuan CSS (Units)',
        desc: 'Nilai dalam CSS dapat ditentukan menggunakan berbagai satuan. Yang paling umum adalah absolut (px) dan relatif (%, em, rem).',
        code: `/* Satuan absolut */
width: 200px;       /* piksel — 1px = 1 titik di layar */
margin: 2in;        /* inci */
padding: 5cm;       /* sentimeter */
font-size: 10pt;    /* poin (1pt = 1/72in) */

/* Satuan relatif */
width: 50%;         /* persentase dari induk */
font-size: 1.5em;   /* relatif terhadap font-size induk */
font-size: 1.2rem;  /* relatif terhadap font-size akar */
height: 100vh;      /* 1% dari tinggi viewport */
width: 50vw;        /* 1% dari lebar viewport */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Piksel (px)</strong> — satuan paling umum. Ukuran tetap di layar.<br />
            Di game ini, gunakan <code className="text-cyan-400">px</code> seperti <code>margin-left: 200px</code> untuk menggerakkan pemain.</p>
            <p><strong className="text-cyan-300">Persentase (%)</strong> — relatif terhadap ukuran elemen induk.</p>
            <p><strong className="text-cyan-300">em / rem</strong> — relatif terhadap ukuran font. 1em = ukuran font saat ini, 1rem = ukuran font akar.</p>
            <p><strong className="text-cyan-300">vh / vw</strong> — satuan viewport. 100vh = tinggi viewport penuh, 100vw = lebar penuh.</p>
          </div>
        )
      },

      {
        id: 'css-selectors',
        icon: <BoxSelect size={20} />,
        title: 'Selektor CSS',
        desc: 'Selektor menentukan elemen HTML mana yang akan dikenai aturan CSS. Berbagai jenis selektor memungkinkan Anda menarget elemen dengan presisi.',
        code: `/* Selektor elemen */
div { ... }           /* semua elemen <div> */
p { ... }             /* semua elemen <p> */

/* Selektor class */
.player { ... }       /* elemen dengan class="player" */
.active { ... }       /* elemen dengan class="active" */

/* Selektor ID */
#maze { ... }         /* elemen dengan id="maze" */
#ball { ... }         /* elemen dengan id="ball" */

/* Kombinator */
div p { ... }         /* <p> di dalam <div> (keturunan) */
div > p { ... }       /* anak langsung <p> dari <div> */
h1 + p { ... }        /* <p> setelah <h1> (tetangga) */
h1 ~ p { ... }        /* <p> didahului <h1> (saudara) */

/* Selektor atribut */
[type="text"] { ... } /* input dengan type="text" */
[href^="https"] { ... } /* tautan diawali https */
[class*="btn"] { ... } /* class mengandung "btn" */

/* Pseudo-class */
:hover { ... }        /* saat di-hover */
:nth-child(odd) { ... } /* anak ganjil */

/* Pengelompokan */
h1, h2, h3 { ... }    /* beberapa selektor */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Di game ini</strong>, bola pemain menggunakan class <code className="text-cyan-400">.player</code>.<br />
            Selalu tulis <code>.player {'{'} ... {'}'}</code> untuk menargetnya.</p>
            <p><strong className="text-cyan-300">Spesifisitas</strong> — ID (100) &gt; class (10) &gt; elemen (1).<br />
            Spesifisitas lebih tinggi menimpa yang lebih rendah.</p>
            <p><strong className="text-cyan-300">Pseudo-class</strong> seperti <code>:hover</code>, <code>:focus</code> menambah state interaktif.</p>
          </div>
        )
      },

      {
        id: 'box-model',
        icon: <Box size={20} />,
        title: 'Model Kotak CSS (Box Model)',
        desc: 'Setiap elemen HTML adalah kotak persegi panjang dengan konten, padding, border, dan margin — berlapis dari dalam ke luar.',
        code: `/*******************************/
/*         MARGIN              */  ← ruang transparan di luar
/*  ┌──────────────────────┐  */
/*  │     BORDER           │  */  ← tepi yang terlihat
/*  │  ┌────────────────┐  │  */
/*  │  │   PADDING      │  │  */  ← ruang di dalam, bagian bg
/*  │  │  ┌──────────┐  │  │  */
/*  │  │  │ CONTENT  │  │  │  */  ← konten sebenarnya
/*  │  │  └──────────┘  │  │  */
/*  │  └────────────────┘  │  */
/*  └──────────────────────┘  */

/* Memvisualisasikan box model */
.box {
  width:  200px;
  height: 100px;
  padding: 20px;
  border:  2px solid black;
  margin:  15px;
  /* total lebar  = 200 + 40(padding) + 4(border) = 244px */
  /* total tinggi = 100 + 40(padding) + 4(border) = 144px */
  /* margin menambah ruang tak terlihat di luar */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Konten</strong> — teks atau elemen anak yang sebenarnya.</p>
            <p><strong className="text-cyan-300">Padding</strong> — ruang antara konten dan border. Bagian dari latar belakang elemen.</p>
            <p><strong className="text-cyan-300">Border</strong> — garis terlihat (atau tak terlihat) di sekitar elemen.</p>
            <p><strong className="text-cyan-300">Margin</strong> — ruang transparan di luar border. <code className="text-cyan-400">margin-left: 200px</code> mendorong elemen ke kanan.</p>
            <p className="text-amber-400 text-[10px] mt-2">Di game ini: nilai margin dan padding dibagi 100 untuk menentukan berapa sel pemain bergerak. margin-left: 200px = 2 sel ke kanan.</p>
          </div>
        )
      },

      {
        id: 'margin',
        icon: <ArrowRight size={20} />,
        title: 'Margin (Batas Luar)',
        desc: 'Menciptakan ruang transparan DI LUAR border. Di game ini, nilai margin menggerakkan pemain ke arah tertentu.',
        code: `/* Satu nilai — keempat sisi */
margin: 20px;         /* atas = kanan = bawah = kiri = 20px */

/* Dua nilai — vertikal | horizontal */
margin: 10px 20px;    /* atas/bawah = 10px, kiri/kanan = 20px */

/* Tiga nilai — atas | horizontal | bawah */
margin: 10px 20px 30px;

/* Empat nilai — atas kanan bawah kiri (searah jarum jam) */
margin: 10px 20px 30px 40px;

/* Sisi individual */
margin-top:    20px;  /* mendorong elemen ke BAWAH */
margin-right:  20px;  /* menarik elemen ke KIRI */
margin-bottom: 20px;  /* menarik elemen ke ATAS */
margin-left:   20px;  /* mendorong elemen ke KANAN */

/* Nilai khusus */
margin: 0 auto;       /* menengahkan blok secara horizontal */
margin: auto;         /* menengahkan kedua arah */

/* Margin negatif */
margin-left: -20px;   /* menarik elemen ke KIRI */
margin-top:  -20px;   /* menarik elemen ke ATAS */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Pemetaan Arah di Game</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">margin-top</code>    → <span className="text-green-400">BAWAH</span> (dy+)</span>
              <span><code className="text-cyan-400">margin-bottom</code> → <span className="text-red-400">ATAS</span> (dy-)</span>
              <span><code className="text-cyan-400">margin-left</code>   → <span className="text-green-400">KANAN</span> (dx+)</span>
              <span><code className="text-cyan-400">margin-right</code>  → <span className="text-red-400">KIRI</span> (dx-)</span>
            </div>
            <p className="text-[10px] text-slate-500">Setiap 100px = 1 sel. Jadi margin-left: 200px menggerakkan pemain 2 sel ke kanan.</p>
            <p><strong className="text-cyan-300">Perilaku Shorthand</strong></p>
            <p className="text-[10px]">1 nilai → semua 4 sisi sama (netto nol).<br />
            2 nilai → atas/bawah saling hapus, kiri/kanan saling hapus (netto nol).<br />
            4 nilai → top=dy+, right=dx-, bottom=dy-, left=dx+. Gunakan untuk bergerak diagonal!</p>
          </div>
        )
      },

      {
        id: 'padding',
        icon: <Box size={20} />,
        title: 'Padding (Batas Dalam)',
        desc: 'Menciptakan ruang DI DALAM elemen, antara konten dan border. Di game ini, padding berfungsi seperti margin untuk pergerakan.',
        code: `/* Satu nilai — keempat sisi */
padding: 20px;          /* semua sisi = 20px */

/* Dua nilai — vertikal | horizontal */
padding: 10px 20px;     /* atas/bawah=10, kiri/kanan=20 */

/* Tiga nilai — atas | horizontal | bawah */
padding: 10px 20px 30px;

/* Empat nilai — atas kanan bawah kiri */
padding: 10px 20px 30px 40px;

/* Sisi individual */
padding-top:    20px;   /* mendorong pemain ke BAWAH */
padding-right:  20px;   /* menarik pemain ke KIRI */
padding-bottom: 20px;   /* menarik pemain ke ATAS */
padding-left:   20px;   /* mendorong pemain ke KANAN */

/* Tidak seperti margin, padding TIDAK punya nilai auto/negatif */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Pemetaan Arah di Game</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">padding-top</code>    → <span className="text-green-400">BAWAH</span> (dy+)</span>
              <span><code className="text-cyan-400">padding-bottom</code> → <span className="text-red-400">ATAS</span> (dy-)</span>
              <span><code className="text-cyan-400">padding-left</code>   → <span className="text-green-400">KANAN</span> (dx+)</span>
              <span><code className="text-cyan-400">padding-right</code>  → <span className="text-red-400">KIRI</span> (dx-)</span>
            </div>
            <p className="text-[10px] text-slate-500">Sama seperti margin: 100px = 1 sel. padding-left: 200px → 2 sel ke kanan.</p>
            <p><strong className="text-cyan-300">Padding vs Margin</strong></p>
            <p className="text-[10px]">Padding adalah bagian dari area klik/latar belakang elemen. Margin adalah ruang transparan di luar. Untuk pergerakan di game ini, keduanya bekerja identik.</p>
          </div>
        )
      },

      {
        id: 'top-left',
        icon: <ArrowDown size={20} />,
        title: 'Top / Bottom / Left / Right',
        desc: 'Menggeser elemen yang memiliki posisi (positioned) dari titik acuannya. Harus dikombinasikan dengan nilai position non-static.',
        code: `/* Ini hanya bekerja dengan position non-static */
.element {
  position: relative;   /* wajib! */
  top:  50px;           /* mendorong ke BAWAH dari tepi atas */
  left: 100px;          /* mendorong ke KANAN dari tepi kiri */
}

/* Konteks posisi yang berbeda */
.box-a {
  position: relative;
  top: 20px;   /* bergeser 20px dari posisi normal */
}

.box-b {
  position: absolute;
  bottom: 0;    /* menempel di bawah induk */
  right: 0;     /* menempel di kanan induk */
}

.box-c {
  position: fixed;
  top: 10px;
  left: 10px;   /* 10px dari pojok kiri-atas viewport */
}

/* Nilai negatif menarik ke arah berlawanan */
.element {
  position: relative;
  top: -20px;   /* menarik ke ATAS */
  left: -30px;  /* menarik ke KIRI */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Pemetaan Arah di Game</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">top</code>    → <span className="text-green-400">BAWAH</span> (dy+)</span>
              <span><code className="text-cyan-400">bottom</code> → <span className="text-red-400">ATAS</span> (dy-)</span>
              <span><code className="text-cyan-400">left</code>   → <span className="text-green-400">KANAN</span> (dx+)</span>
              <span><code className="text-cyan-400">right</code>  → <span className="text-red-400">KIRI</span> (dx-)</span>
            </div>
            <p className="text-[10px] text-slate-500">100px = 1 sel. top: 200px → 2 sel ke bawah.</p>
            <p><strong className="text-cyan-300">Penting</strong></p>
            <p className="text-[10px]">Properti ini hanya berfungsi jika <code>position</code> diatur ke <code>relative</code>, <code>absolute</code>, <code>fixed</code>, atau <code>sticky</code>. Di game ini, posisi otomatis diterapkan sehingga <code>top</code> dan <code>left</code> bekerja langsung.</p>
          </div>
        )
      },

      {
        id: 'transform-translate',
        icon: <Move size={20} />,
        title: 'Transform: Translate',
        desc: 'Memindahkan elemen dari posisinya saat ini sepanjang sumbu X (horizontal) dan Y (vertikal).',
        code: `/* Translasi pada satu sumbu */
transform: translateX(200px);  /* pindah ke KANAN 200px */
transform: translateX(-100px); /* pindah ke KIRI 100px */
transform: translateY(150px);  /* pindah ke BAWAH 150px */
transform: translateY(-50px);  /* pindah ke ATAS 50px */

/* Translasi pada kedua sumbu */
transform: translate(200px, 100px);   /* kanan 200, bawah 100 */
transform: translate(-50px, -150px);  /* kiri 50, atas 150 */

/* Menggunakan satuan berbeda */
transform: translateX(50%);   /* pindah kanan 50% dari lebar sendiri */
transform: translate(100%, 50%); /* diagonal */

/* Dikombinasikan dengan transform lain */
transform: translateX(200px) rotate(45deg);`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Pemetaan Arah di Game</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>translateX(+n)</code> → <span className="text-green-400">KANAN</span></span>
              <span><code>translateX(-n)</code> → <span className="text-red-400">KIRI</span></span>
              <span><code>translateY(+n)</code> → <span className="text-green-400">BAWAH</span></span>
              <span><code>translateY(-n)</code> → <span className="text-red-400">ATAS</span></span>
            </div>
            <p className="text-[10px] text-slate-500">Setiap 100px = 1 sel. translateX(200px) → 2 sel ke kanan.</p>
            <p><strong className="text-cyan-300">Trik persentase</strong></p>
            <p className="text-[10px]">Persentase didasarkan pada DIMENSI elemen itu sendiri, bukan induknya. translateX(100%) memindahkan elemen ke kanan selebar dirinya sendiri.</p>
          </div>
        )
      },

      {
        id: 'transform-rotate',
        icon: <RotateCw size={20} />,
        title: 'Transform: Rotate',
        desc: 'Memutar elemen di sekitar titik tengahnya (atau transform-origin khusus).',
        code: `/* Rotasi dasar */
transform: rotate(45deg);   /* 45 derajat searah jarum jam */
transform: rotate(-90deg);  /* 90 derajat berlawanan arah */
transform: rotate(180deg);  /* terbalik */
transform: rotate(360deg);  /* putaran penuh */

/* Menggunakan satuan sudut lain */
transform: rotate(1rad);    /* 1 radian ≈ 57.3 derajat */
transform: rotate(0.25turn); /* 1/4 putaran = 90deg */
transform: rotate(0.5turn);  /* 1/2 putaran = 180deg */

/* Dengan transform-origin kustom */
.element {
  transform-origin: top left;  /* rotasi dari pojok kiri-atas */
  transform: rotate(45deg);
}

/* Kombinasi dengan pergerakan */
transform: translateX(200px) rotate(90deg);`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Satuan Sudut</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">deg</code> — derajat (0-360)</span>
              <span><code className="text-cyan-400">rad</code> — radian</span>
              <span><code className="text-cyan-400">grad</code> — gradian</span>
              <span><code className="text-cyan-400">turn</code> — putaran penuh</span>
            </div>
            <p className="text-[10px] text-slate-500">Positif = searah jarum jam. Negatif = berlawanan arah.</p>
            <p><strong className="text-cyan-300">transform-origin</strong></p>
            <p className="text-[10px]">Default di <code>center center</code> (50% 50%). Ubah untuk memutar dari titik yang berbeda.</p>
          </div>
        )
      },

      {
        id: 'transform-scale',
        icon: <Maximize size={20} />,
        title: 'Transform: Scale',
        desc: 'Mengubah ukuran elemen — membuatnya lebih besar atau lebih kecil. Nilai adalah pengali dari ukuran asli.',
        code: `/* Skala seragam */
transform: scale(1.5);      /* 50% lebih besar */
transform: scale(2);        /* dua kali lipat */
transform: scale(0.5);      /* setengah ukuran */
transform: scale(0);        /* tidak terlihat! */
transform: scale(-1);       /* dicerminkan/dibalik */

/* Skala tidak seragam */
transform: scale(2, 1);     /* lebar dua kali, tinggi tetap */
transform: scale(1, 0.5);   /* lebar tetap, tinggi setengah */

/* Skala per sumbu */
transform: scaleX(2);       /* rentangkan horizontal ×2 */
transform: scaleY(0.5);     /* perkecil vertikal ×0.5 */

/* Berguna dalam game: perbesar/perkecil di sel tertentu */
transform: translateX(200px) scale(0.8);`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Nilai Skala</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>1</code> = ukuran asli</span>
              <span><code>0</code> = tidak terlihat</span>
              <span><code>1.5</code> = 50% lebih besar</span>
              <span><code>0.5</code> = 50% lebih kecil</span>
            </div>
            <p><strong className="text-cyan-300">Skala negatif</strong> mencerminkan elemen.<br />
            <code>scale(-1, 1)</code> membalik horizontal. <code>scale(1, -1)</code> membalik vertikal.</p>
          </div>
        )
      },

      {
        id: 'multiple-transforms',
        icon: <Sparkles size={20} />,
        title: 'Multiple Transforms (Transformasi Ganda)',
        desc: 'Merangkai beberapa fungsi transformasi dalam satu properti. Urutan penting — setiap fungsi diterapkan dari kanan ke kiri.',
        code: `/* URUTAN fungsi itu penting! */
transform: translateX(200px) rotate(45deg);
/* 1. rotate 45° di sekitar pusat
   2. lalu translate 200px ke KANAN
   Hasil: bergerak ke kanan pada sudut 45° */

transform: rotate(45deg) translateX(200px);
/* 1. translate 200px ke KANAN (orientasi asli)
   2. lalu rotate 45°
   Hasil: bergerak ke kanan, tapi elemen akhir berotasi */

/* Kombinasi berbeda */
transform: translateX(100px) translateY(100px);
transform: scale(1.2) translateX(200px) rotate(90deg);
transform: translateX(200px) scale(0.8) rotate(-15deg);

/* Tip game: translate -> rotate -> scale paling aman */
.transform {
  transform: translateX(200px) rotate(45deg) scale(0.9);
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Urutan Eksekusi</strong></p>
            <p>Transformasi diterapkan <strong className="text-amber-400">dari kanan ke kiri</strong>.</p>
            <p className="text-[10px]">Anggap saja: <code>transform: a(b(c(x)))</code> — c jalan dulu, lalu b, lalu a.</p>
            <p><strong className="text-cyan-300">Pola yang direkomendasikan</strong></p>
            <p className="text-[10px]">Untuk hasil prediktabel: <code>translate</code> dulu → <code>rotate</code> → <code>scale</code> terakhir.</p>
          </div>
        )
      },

      {
        id: 'transition',
        icon: <Clock size={20} />,
        title: 'Transitions (Transisi)',
        desc: 'Menganimasikan perubahan properti CSS dengan mulus selama durasi tertentu. Membuat pemain meluncur daripada teleportasi.',
        code: `/* Shorthand — properti durasi fungsi-waktu jeda */
transition: all 300ms ease-in-out;

/* Sintaks lengkap */
.player {
  transition:
    transform 400ms ease-in-out,
    margin-left 300ms linear,
    opacity 200ms ease;
}

/* Properti individual */
transition-property: transform;
transition-duration: 400ms;
transition-timing-function: ease-in-out;
transition-delay: 100ms;

/* Fungsi waktu */
transition: margin-left 300ms linear;
transition: all 500ms ease;
transition: all 1s ease-in;
transition: all 800ms ease-out;
transition: all 2s cubic-bezier(0.25, 0.1, 0.25, 1);

/* Shorthand dengan jeda */
transition: transform 400ms ease-in-out 200ms;
/*            properti waktu fungsi    jeda */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Fungsi Waktu</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code className="text-cyan-400">linear</code> — kecepatan konstan</span>
              <span><code className="text-cyan-400">ease</code> — pelan di awal/akhir</span>
              <span><code className="text-cyan-400">ease-in</code> — pelan di awal</span>
              <span><code className="text-cyan-400">ease-out</code> — pelan di akhir</span>
              <span><code className="text-cyan-400">ease-in-out</code> — pelan keduanya</span>
              <span><code className="text-cyan-400">cubic-bezier()</code> — kurva kustom</span>
            </div>
            <p><strong className="text-cyan-300">Di dalam game</strong>, menambahkan transisi membuat pemain meluncur mulus antar sel. Default game adalah 400ms jika tidak diatur.</p>
          </div>
        )
      },

      {
        id: 'position',
        icon: <Layers size={20} />,
        title: 'Positioning (Posisi)',
        desc: 'Menentukan metode posisi untuk sebuah elemen. Mengontrol bagaimana elemen ditempatkan dalam aliran dokumen.',
        code: `/* Static — default, aliran dokumen normal */
position: static;
/* top/left/bottom/right TIDAK berpengaruh */

/* Relative — bergeser dari posisi normal */
position: relative;
top: 20px; left: 30px;
/* masih menempati ruang asli di tata letak */

/* Absolute — dikeluarkan dari aliran */
position: absolute;
top: 0; right: 0;
/* diposisikan relatif terhadap induk terdekat yang diposisikan */

/* Fixed — relatif terhadap viewport */
position: fixed;
bottom: 20px; right: 20px;
/* tetap di tempat saat digulir */

/* Sticky — hybrid relative/fixed */
position: sticky;
top: 0;
/* normal sampai guliran melewatinya, lalu "menempel" */

/* Z-index — urutan tumpukan */
position: relative;
z-index: 10;           /* lebih tinggi = lebih dekat ke pengamat */
z-index: -1;           /* di belakang elemen lain */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Referensi Posisi</strong></p>
            <div className="grid grid-cols-1 gap-1 text-[10px]">
              <span><code className="text-cyan-400">relative</code> — bergeser relatif terhadap posisi normalnya</span>
              <span><code className="text-cyan-400">absolute</code> — relatif terhadap induk terdekat yang diposisikan</span>
              <span><code className="text-cyan-400">fixed</code> — relatif terhadap viewport peramban</span>
              <span><code className="text-cyan-400">sticky</code> — berubah antara relative dan fixed saat digulir</span>
            </div>
            <p><strong className="text-cyan-300">z-index</strong></p>
            <p className="text-[10px]">Mengontrol urutan tumpukan. Nilai lebih tinggi = di atas. Hanya bekerja pada elemen yang diposisikan (non-static).</p>
          </div>
        )
      },

      {
        id: 'display',
        icon: <Layout size={20} />,
        title: 'Properti Display',
        desc: 'Mengontrol bagaimana elemen dirender dalam tata letak — apakah muncul sebagai blok, inline, flex container, grid, atau disembunyikan.',
        code: `/* Nilai display dasar */
display: none;        /* elemen DISEMBUNYIKAN, dihapus dari tata letak */
display: block;       /* mengambil lebar penuh, memulai baris baru */
display: inline;      /* pas dalam aliran teks */
display: inline-block;/* inline tapi bisa punya lebar/tinggi */

/* Modul tata letak */
display: flex;        /* flexbox — tata letak 1D */
display: grid;        /* grid — tata letak 2D */

/* Nilai tabel */
display: table;
display: table-cell;
display: table-row;

/* Lainnya */
display: contents;    /* elemen "hilang", anak-anak mewarisi */
display: flow-root;   /* membersihkan float, membungkus anak */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">display: none vs visibility: hidden</strong></p>
            <p className="text-[10px]"><code>display: none</code> menghapus elemen dari tata letak (tanpa ruang).<br />
            <code>visibility: hidden</code> menyembunyikannya secara visual tapi tetap mempertahankan ruang.</p>
            <p><strong className="text-cyan-300">display: flex</strong> dan <strong>display: grid</strong> membuka sistem tata letak yang kuat untuk mengatur anak-anak.</p>
          </div>
        )
      },

      {
        id: 'flexbox',
        icon: <Layout size={20} />,
        title: 'Flexbox (Display: flex)',
        desc: 'Metode tata letak satu dimensi untuk mendistribusikan ruang dan menyelaraskan item dalam baris atau kolom.',
        code: `/* Kontainer */
.container {
  display: flex;              /* aktifkan flexbox */
  flex-direction: row;       /* default: horizontal */
  flex-direction: column;    /* vertikal */
  flex-wrap: wrap;           /* biarkan item membungkus */
  justify-content: center;   /* perataan sumbu utama */
  align-items: stretch;      /* perataan sumbu silang */
  gap: 16px;                 /* jarak antar item */
}

/* Perataan sumbu utama (justify-content) */
justify-content: flex-start;    /* kiri */
justify-content: flex-end;      /* kanan */
justify-content: center;        /* tengah */
justify-content: space-between; /* jarak merata antar */
justify-content: space-around;  /* jarak di sekitar masing-masing */
justify-content: space-evenly;  /* jarak sama rata */

/* Perataan sumbu silang (align-items) */
align-items: flex-start;    /* atas */
align-items: flex-end;      /* bawah */
align-items: center;        /* tengah */
align-items: stretch;       /* isi tinggi */
align-items: baseline;      /* sejajarkan garis dasar teks */

/* Item anak */
.item {
  flex: 1;                  /* rasio tumbuh/susut */
  align-self: center;       /* timpa align-items untuk item ini */
  order: -1;                /* urutkan ulang item */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Sumbu utama vs Sumbu silang</strong></p>
            <p className="text-[10px]"><code>flex-direction: row</code> → utama = horizontal, silang = vertikal</p>
            <p className="text-[10px]"><code>flex-direction: column</code> → utama = vertikal, silang = horizontal</p>
            <p><strong className="text-cyan-300">Justify vs Align</strong></p>
            <p className="text-[10px]"><code>justify-content</code> mengontrol ruang pada sumbu utama.<br />
            <code>align-items</code> mengontrol perataan pada sumbu silang.</p>
          </div>
        )
      },

      {
        id: 'grid',
        icon: <Grid size={20} />,
        title: 'CSS Grid (Display: grid)',
        desc: 'Sistem tata letak dua dimensi. Tentukan baris dan kolom untuk menempatkan item dalam kisi terstruktur.',
        code: `/* Kontainer */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* tiga kolom sama */
  grid-template-rows: auto 200px;        /* dua baris */
  gap: 16px;                             /* selokan antar sel */
}

/* Unit pecahan (fr) */
grid-template-columns: 1fr 2fr 1fr;   /* kolom tengah 2x lebih lebar */

/* Fungsi repeat */
grid-template-columns: repeat(3, 1fr);   /* sama dengan 1fr 1fr 1fr */

/* Ukuran spesifik */
grid-template-columns: 200px 1fr 100px;  /* tetap + fleksibel + tetap */
grid-template-columns: minmax(100px, 1fr); /* min/maks responsif */

/* Area bernama */
grid-template-areas:
  "header header header"
  "sidebar main main"
  "footer footer footer";

/* Penempatan anak */
.item {
  grid-column: 1 / 3;      /* rentang dari kolom 1 ke 3 */
  grid-row: 2 / 4;          /* rentang dari baris 2 ke 4 */
  grid-area: header;        /* tempatkan di area bernama */
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Konsep Kunci</strong></p>
            <p className="text-[10px]"><code>grid-template-columns</code> menentukan lebar kolom.<br />
            <code>grid-template-rows</code> menentukan tinggi baris.<br />
            <code>gap</code> menambah jarak antar sel (bukan di tepi).</p>
            <p><strong className="text-cyan-300">Unit fr</strong></p>
            <p className="text-[10px]">Unit pecahan mendistribusikan ruang yang tersedia. <code>1fr 1fr</code> = dua kolom sama. <code>2fr 1fr</code> = kolom pertama mendapat 2/3 ruang.</p>
          </div>
        )
      },

      {
        id: 'background',
        icon: <Palette size={20} />,
        title: 'Latar Belakang (Background)',
        desc: 'Mengontrol latar belakang elemen — warna, gambar, gradien, posisi, dan ukuran.',
        code: `/* Warna latar */
background: red;
background: #ff0000;              /* hex */
background: rgb(255, 0, 0);       /* RGB */
background: rgba(255, 0, 0, 0.5); /* RGB dengan opacity */
background: hsl(0, 100%, 50%);    /* HSL */

/* Gambar latar */
background: url('image.jpg');
background-image: url('pattern.png');

/* Latar gradien */
background: linear-gradient(to right, red, blue);
background: radial-gradient(circle, gold, darkblue);

/* Banyak latar */
background:
  url('overlay.png') center / cover,
  linear-gradient(45deg, #000, #333);

/* Properti background */
background-color: #0a0a1a;
background-image: url('bg.png');
background-repeat: no-repeat;     /* repeat, repeat-x, repeat-y */
background-position: center;      /* top, bottom, left, %, px */
background-size: cover;           /* cover, contain, 100% 100% */
background-attachment: fixed;     /* scroll, fixed, local */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Format Warna</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>#ff0</code> — hex 3-digit</span>
              <span><code>#ff0000</code> — hex 6-digit</span>
              <span><code>rgb(r,g,b)</code> — 0-255 masing-masing</span>
              <span><code>rgba(r,g,b,a)</code> — dengan alpha (0-1)</span>
              <span><code>hsl(h,s%,l%)</code> — hue/saturasi/terang</span>
              <span><code>hsla(...)</code> — HSL dengan alpha</span>
            </div>
            <p><strong className="text-cyan-300">background vs background-image</strong></p>
            <p className="text-[10px]"><code>background</code> adalah shorthand — bisa mengatur warna, gambar, posisi, ukuran sekaligus.</p>
          </div>
        )
      },

      {
        id: 'border',
        icon: <Frame size={20} />,
        title: 'Border (Batas/Tepi)',
        desc: 'Menggambar garis di sekitar elemen. Anda mengontrol lebar, gaya, dan warna secara independen atau bersama-sama.',
        code: `/* Shorthand — lebar gaya warna */
border: 2px solid #00e5ff;    /* semua 4 sisi */
border: 1px dashed rgba(255,255,255,0.3);

/* Sisi individual */
border-top:    3px solid red;
border-right:  2px dotted blue;
border-bottom: 4px double green;
border-left:   1px dashed orange;

/* Properti individual */
border-width: 2px;
border-style: solid;
border-color: #00e5ff;

/* Radius border (sudut membulat) */
border-radius: 8px;               /* semua sudut */
border-radius: 10px 20px;         /* kiri-atas/kanan-bawah | kanan-atas/kiri-bawah */
border-radius: 10px 20px 30px 40px; /* masing-masing sudut */

/* Radius border untuk lingkaran */
border-radius: 50%;               /* lingkaran sempurna */

/* Outline (mirip border tapi di luar, tidak mempengaruhi tata letak) */
outline: 2px solid #00e5ff;
outline-offset: 4px;              /* celah antara border dan outline */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Gaya Border</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>solid</code> — garis kontinu</span>
              <span><code>dashed</code> — garis putus-putus</span>
              <span><code>dotted</code> — seri titik-titik</span>
              <span><code>double</code> — dua garis sejajar</span>
              <span><code>groove</code> — efek 3D beralur</span>
              <span><code>ridge</code> — efek 3D menonjol</span>
              <span><code>inset</code> — efek 3D tersembunyi</span>
              <span><code>outset</code> — efek 3D menonjol</span>
              <span><code>none</code> — tanpa border</span>
              <span><code>hidden</code> — border tersembunyi</span>
            </div>
            <p><strong className="text-cyan-300">border-radius</strong></p>
            <p className="text-[10px]">Dengan <code>50%</code>, elemen apa pun menjadi lingkaran (jika lebar === tinggi) atau elips.</p>
          </div>
        )
      },

      {
        id: 'box-shadow',
        icon: <Scan size={20} />,
        title: 'Box Shadow (Bayangan Kotak)',
        desc: 'Menambahkan efek bayangan di sekitar elemen. Dapat menciptakan kedalaman, cahaya (glow), dan efek berlapis.',
        code: `/* Bayangan sederhana: x-offset y-offset blur warna */
box-shadow: 4px 4px 10px rgba(0,0,0,0.5);

/* Banyak nilai */
box-shadow:
  0 2px 5px rgba(0,0,0,0.3),
  0 5px 15px rgba(0,0,0,0.1);

/* Sintaks lengkap: inset x y blur spread color */
box-shadow: inset 0 0 20px rgba(0,229,255,0.3);

/* Efek glow (tanpa offset, hanya blur) */
box-shadow: 0 0 20px #00e5ff;

/* Spread (nilai ke-4) memperbesar bayangan */
box-shadow: 0 0 10px 5px #00e5ff40;

/* Banyak bayangan = efek berlapis */
.player {
  box-shadow:
    0 0 10px #00e5ff,
    inset 0 0 5px rgba(255,255,255,0.2);
}

/* Tanpa bayangan */
box-shadow: none;`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Rincian Sintaks</strong></p>
            <p className="text-[10px]"><code>box-shadow: offset-x offset-y blur-radius spread-radius color inset;</code></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>offset-x</code> — geser horizontal (+ kanan)</span>
              <span><code>offset-y</code> — geser vertikal (+ bawah)</span>
              <span><code>blur</code> — seberapa lembut bayangan</span>
              <span><code>spread</code> — seberapa besar bayangan melebar</span>
            </div>
            <p><strong className="text-cyan-300">inset</strong></p>
            <p className="text-[10px]">Membuat bayangan muncul di dalam elemen (glow dalam). Cocok untuk efek terminal CRT!</p>
          </div>
        )
      },

      {
        id: 'typography',
        icon: <Type size={20} />,
        title: 'Teks & Tipografi',
        desc: 'Mengontrol tampilan teks — jenis font, ukuran, ketebalan, warna, perataan, spasi, dan dekorasi.',
        code: `/* Keluarga font */
font-family: 'JetBrains Mono', monospace;   /* ramah kode */
font-family: 'Press Start 2P', cursive;     /* piksel/retro */
font-family: Arial, sans-serif;
font-family: serif;

/* Ukuran & ketebalan font */
font-size: 16px;
font-size: 1.2rem;
font-weight: bold;      /* 400=normal, 700=bold */
font-weight: 600;       /* semi-bold */
font-style: italic;     /* normal, italic, oblique */

/* Perataan & dekorasi teks */
text-align: center;     /* left, right, center, justify */
text-decoration: underline;
text-decoration: line-through;
text-transform: uppercase;  /* uppercase, lowercase, capitalize */

/* Tinggi baris & spasi */
line-height: 1.5;        /* 1.5x ukuran font */
letter-spacing: 2px;     /* jarak antar huruf */
word-spacing: 4px;       /* jarak antar kata */
white-space: nowrap;     /* cegah pembungkusan */

/* Bayangan teks */
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
text-shadow: 0 0 10px #00e5ff;  /* efek glow */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Font aman-web</strong></p>
            <p className="text-[10px]">Selalu sertakan cadangan (seperti <code>sans-serif</code>) setelah font kustom Anda.</p>
            <p><strong className="text-cyan-300">Shorthand font</strong></p>
            <p className="text-[10px]"><code>font: italic bold 16px/1.5 "JetBrains Mono", monospace;</code></p>
            <p><strong className="text-cyan-300">Tip game</strong></p>
            <p className="text-[10px]">Gunakan <code>text-shadow</code> dengan nada cyan untuk mencocokkan tema terminal CRT!</p>
          </div>
        )
      },

      {
        id: 'opacity',
        icon: <Eye size={20} />,
        title: 'Opacity & Visibility',
        desc: 'Mengontrol seberapa transparan atau terlihatnya suatu elemen.',
        code: `/* Opacity — 0 hingga 1 */
opacity: 0;           /* sepenuhnya transparan */
opacity: 0.5;         /* 50% terlihat */
opacity: 1;           /* sepenuhnya terlihat */

/* Opacity mempengaruhi SELURUH elemen (termasuk anak-anak) */

/* Visibility */
visibility: visible;   /* elemen ditampilkan */
visibility: hidden;    /* elemen disembunyikan TAPI tetap menempati ruang */
visibility: collapse;  /* untuk baris/kolom tabel */

/* Perbedaan: display: none vs visibility: hidden vs opacity: 0 */
/*
  display: none       → dihapus dari tata letak, ruang hilang
  visibility: hidden  → disembunyikan tapi ruang dipertahankan
  opacity: 0          → tidak terlihat tapi ruang dipertahankan (interaktif!)
*/`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Keanehan Opacity</strong></p>
            <p className="text-[10px]">Opacity menciptakan <strong>stacking context</strong> baru. Elemen dengan opacity &lt; 1 dirender dengan z-index di lapisan baru.</p>
            <p><strong className="text-cyan-300">Trik Opacity 0</strong></p>
            <p className="text-[10px]">Tidak seperti <code>visibility: hidden</code>, elemen <code>opacity: 0</code> masih bisa menerima klik dan berinteraksi dengan JavaScript!</p>
          </div>
        )
      },

      {
        id: 'filter',
        icon: <Sliders size={20} />,
        title: 'Filter CSS',
        desc: 'Menerapkan efek grafis seperti blur, kecerahan, kontras, dan rotasi hue pada elemen.',
        code: `/* Fungsi filter individual */
filter: blur(4px);           /* blur gaussian */
filter: brightness(1.5);     /* kecerahan 150% */
filter: contrast(200%);      /* kontras dua kali lipat */
filter: grayscale(100%);     /* hitam putih */
filter: hue-rotate(90deg);   /* menggeser semua warna */
filter: invert(100%);        /* gambar negatif */
filter: saturate(3);         /* saturasi tiga kali lipat */
filter: sepia(80%);          /* nada sepia */
filter: opacity(50%);        /* transparansi */

/* Banyak filter */
filter: brightness(1.2) contrast(1.5) saturate(2);
filter: blur(2px) hue-rotate(180deg);

/* Drop shadow (seperti box-shadow tapi mengikuti bentuk) */
filter: drop-shadow(2px 4px 6px black);

/* Backdrop filter (mempengaruhi latar di belakang elemen) */
backdrop-filter: blur(10px);      /* efek kaca buram */
backdrop-filter: brightness(0.5); /* menggelapkan latar */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">filter vs backdrop-filter</strong></p>
            <p className="text-[10px]"><code>filter</code> mempengaruhi elemen itu sendiri (konten + latar).<br />
            <code>backdrop-filter</code> mempengaruhi apa yang DI BELAKANG elemen (efek kaca).</p>
            <p><strong className="text-cyan-300">Catatan performa</strong></p>
            <p className="text-[10px]">Filter bisa dipercepat GPU tapi kombinasi berat bisa mempengaruhi performa. Gunakan secukupnya pada elemen yang dianimasi.</p>
          </div>
        )
      },

      {
        id: 'overflow',
        icon: <PanelRight size={20} />,
        title: 'Overflow',
        desc: 'Mengontrol apa yang terjadi ketika konten melebihi dimensi kontainernya.',
        code: `/* Nilai overflow dasar */
overflow: visible;     /* konten tumpah ke luar (default) */
overflow: hidden;      /* konten dipotong, tanpa scrollbar */
overflow: scroll;      /* selalu tampilkan scrollbar */
overflow: auto;        /* tampilkan scrollbar hanya jika perlu */
overflow: clip;        /* seperti hidden tapi cegah scroll programatik */

/* Overflow per sumbu */
overflow-x: hidden;    /* horizontal saja */
overflow-y: scroll;    /* vertikal saja */

/* Text overflow — elipsis untuk teks satu baris */
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;   /* menampilkan "..." saat teks meluap */
}

/* Perilaku scroll */
overflow-y: auto;
scroll-behavior: smooth;     /* scroll halus */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Kasus penggunaan umum</strong></p>
            <p className="text-[10px]"><code>overflow: hidden</code> — potong elemen anak, buat kontainer tanpa scroll.<br />
            <code>overflow: auto</code> — tambah scrollbar hanya jika konten meluap.</p>
            <p><strong className="text-cyan-300">overflow: clip</strong></p>
            <p className="text-[10px]">Nilai lebih baru. Seperti <code>hidden</code> tapi juga mencegah JavaScript menggulir elemen.</p>
          </div>
        )
      },

      {
        id: 'animation',
        icon: <Layers3 size={20} />,
        title: 'Animasi CSS (@keyframes)',
        desc: 'Buat animasi kompleks multi-langkah tanpa JavaScript. Tentukan keyframes dan terapkan dengan properti animation.',
        code: `/* Langkah 1: Tentukan keyframes */
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Animasi multi-langkah (persentase) */
@keyframes pulse-glow {
  0%   { box-shadow: 0 0 5px #00e5ff; }
  50%  { box-shadow: 0 0 25px #00e5ff; }
  100% { box-shadow: 0 0 5px #00e5ff; }
}

/* Langkah 2: Terapkan animasi */
.element {
  animation: slide-in 500ms ease-out forwards;
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Properti animation (shorthand) */
animation: nama durasi fungsi-waktu jeda iterasi arah fill-mode;

/* Properti individual */
animation-name: pulse-glow;
animation-duration: 2s;
animation-timing-function: ease-in-out;
animation-delay: 0.5s;
animation-iteration-count: infinite;  /* atau 1, 2, 3, dll */
animation-direction: alternate;       /* normal, reverse, alternate, alternate-reverse */
animation-fill-mode: forwards;        /* none, forwards, backwards, both */

/* Banyak animasi */
animation:
  slide-in 500ms ease-out,
  pulse-glow 2s ease-in-out infinite;`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">@keyframes</strong></p>
            <p className="text-[10px]">Tentukan state di berbagai titik menggunakan <code>from</code> (0%), <code>to</code> (100%), atau persentase.</p>
            <p><strong className="text-cyan-300">animation vs transition</strong></p>
            <p className="text-[10px]">Transisi menganimasikan antara DUA state. Animasi bisa menentukan banyak state dan berulang tanpa batas.</p>
            <p><strong className="text-cyan-300">Performa</strong></p>
            <p className="text-[10px]">Animasi <code>transform</code> dan <code>opacity</code> untuk performa terbaik (dipercepat GPU). Hindari menganimasi <code>width</code>, <code>height</code>, <code>margin</code>, atau <code>top</code> — mereka memicu perhitungan ulang tata letak.</p>
          </div>
        )
      },

      {
        id: 'combining',
        icon: <Hexagon size={20} />,
        title: 'Menggabungkan Properti',
        desc: 'Di game ini, Anda dapat menggunakan beberapa properti CSS sekaligus. Game menjumlahkan semua nilai pergerakan dari setiap properti.',
        code: `/* Contoh: bergerak diagonal dengan margin + padding */
.player {
  margin-left: 200px;   /* → 2 sel ke KANAN */
  padding-top: 100px;   /* → 1 sel ke BAWAH */
}
/* Total: (dx: 2, dy: 1) → bergerak 2 kanan, 1 bawah */

/* Contoh: diagonal besar dengan shorthand + individual */
.player {
  margin: 200px 0 0 100px;   /* top=200(dy+2), left=100(dx+1) */
}
/* Total: (dx: 1, dy: 2) → bergerak 1 kanan, 2 bawah */

/* Contoh: menggabungkan margin, transform, dan padding */
.player {
  margin-left: 300px;          /* → 3 KANAN */
  transform: translateY(200px); /* → 2 BAWAH */
  padding-right: 100px;        /* → 1 KIRI */
}
/* Total: (dx: 3-1=2, dy: 2) → bergerak 2 kanan, 2 bawah */

/* Contoh: menambah transisi untuk gerakan halus */
.player {
  margin-left: 200px;
  transition: all 500ms ease-in-out;
}`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Semua properti gerakan ditambahkan secara aditif!</strong></p>
            <p className="text-[10px]">Game membaca SEMUA properti CSS yang Anda tulis dan menjumlahkan nilai pergerakannya. Anda bisa menggabungkan margin, padding, top/left, dan transform: translate dalam satu blok kode.</p>
            <p><strong className="text-cyan-300">Membatalkan gerakan</strong></p>
            <p className="text-[10px]">Anda bisa membatalkan gerakan dengan menggunakan arah berlawanan. Misalnya <code>margin-left: 200px</code> + <code>margin-right: 200px</code> = netto 0 gerakan horizontal.</p>
            <p className="text-amber-400 text-[10px]">Tip: Gunakan bilah feedback langsung di editor untuk melihat persis bagaimana CSS Anda akan menggerakkan pemain sebelum mengklik RUN!</p>
          </div>
        )
      },

      {
        id: 'best-practices',
        icon: <FileText size={20} />,
        title: 'Praktik Terbaik Game',
        desc: 'Tips dan strategi untuk menulis CSS yang bekerja dengan baik di game labirin.',
        code: `/* ✅ LAKUKAN: Tulis sintaks CSS yang valid */
.player {
  margin-left: 200px;
}

/* ✅ LAKUKAN: Gunakan nilai px (paling cocok dengan game) */
margin-left: 200px;   /* ← sempurna */
padding-top: 100px;    /* ← sempurna */

/* ✅ LAKUKAN: Gabungkan properti untuk gerakan diagonal */
.player {
  margin-left: 200px;
  padding-top: 100px;
}

/* ✅ LAKUKAN: Tambah transisi untuk gerakan mulus */
.player {
  margin-left: 200px;
  transition: all 400ms ease-in-out;
}

/* ❌ JANGAN: Letakkan nilai di komentar */
/* margin-left: 200px */  /* ← diabaikan! */

/* ❌ JANGAN: Gunakan properti yang tidak didukung */
width: 200px;  /* ← tidak menggerakkan pemain */
color: red;    /* ← tidak menggerakkan pemain */

/* ❌ JANGAN: Lupa selektor .player */
margin-left: 200px;  /* ← tidak bekerja tanpa selektor! */`,
        detail: (
          <div className="space-y-2">
            <p><strong className="text-cyan-300">Properti yang Didukung untuk Gerakan</strong></p>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span><code>margin-top</code></span>
              <span><code>margin-bottom</code></span>
              <span><code>margin-left</code></span>
              <span><code>margin-right</code></span>
              <span><code>padding-top</code></span>
              <span><code>padding-bottom</code></span>
              <span><code>padding-left</code></span>
              <span><code>padding-right</code></span>
              <span><code>top</code></span>
              <span><code>bottom</code></span>
              <span><code>left</code></span>
              <span><code>right</code></span>
              <span><code>transform: translateX()</code></span>
              <span><code>transform: translateY()</code></span>
              <span><code>margin: (4 nilai)</code></span>
              <span><code>padding: (4 nilai)</code></span>
            </div>
            <p className="text-[10px] text-amber-400">Nilai ÷ 100 = jumlah sel bergerak (misal: 200px = 2 sel)</p>
          </div>
        )
      },
    ]
  }
};

function Ruler(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12H3" /><path d="M12 3v18" /><path d="M6 12V6" /><path d="M18 12V6" /><path d="M6 18h12" />
    </svg>
  );
}

export default function GuidebookModal() {
  const { isGuidebookOpen, toggleGuidebook, language, setLanguage } = useGameStore();

  if (!isGuidebookOpen) return null;

  const currentLang = content[language];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex flex-col items-center p-4 sm:p-8 bg-black/95 overflow-hidden"
      >
        {/* Terminal chrome bar */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-[#0a0a1a] border-b border-white/5 flex items-center px-3 gap-2 z-20">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-[8px] font-mono text-slate-600 ml-2">css-maze@v1.0 — guidebook</span>
        </div>

        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-4 md:mb-6 mt-10 md:mt-10 shrink-0">
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
            <div className="p-2 md:p-3 rounded-xl border text-cyan-400 hidden sm:block"
              style={{ background: 'rgba(0,229,255,0.08)', borderColor: 'rgba(0,229,255,0.25)' }}>
              <Book size={24} className="md:w-7 md:h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 font-pixel">{currentLang.title}</h2>
              <p className="text-slate-500 font-mono text-xs md:text-sm">{currentLang.desc}</p>
            </div>
            <button
              onClick={() => toggleGuidebook(false)}
              className="md:hidden p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 shrink-0 self-start mt-1"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex rounded-lg p-1 border w-full md:w-auto"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${language === 'en' ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}
                style={language === 'en' ? { background: '#00e5ff', color: '#070714' } : {}}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('id')}
                className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${language === 'id' ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}
                style={language === 'id' ? { background: '#00e5ff', color: '#070714' } : {}}
              >
                ID
              </button>
            </div>
            <button
              onClick={() => toggleGuidebook(false)}
              className="hidden md:flex p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 shrink-0"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-4xl overflow-y-auto pb-12 pr-2 custom-scrollbar">
          <div className="space-y-6">
            {currentLang.sections.map((section: any, idx: number) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl p-4 md:p-6 border transition-colors"
                style={{
                  background: '#0f0f20',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="text-cyan-400 shrink-0">
                    {section.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{section.title}</h3>
                </div>

                <p className="text-sm md:text-base text-slate-300 mb-3 md:mb-4 leading-relaxed">{section.desc}</p>

                <div className="rounded-xl p-3 md:p-4 border relative overflow-hidden group mb-3 md:mb-4"
                  style={{ background: '#070714', borderColor: 'rgba(0,229,255,0.08)' }}>
                  <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Code size={16} className="text-cyan-500" />
                  </div>
                  <pre className="font-mono text-xs md:text-sm text-cyan-300 whitespace-pre-wrap overflow-x-auto custom-scrollbar">
                    <code>{section.code}</code>
                  </pre>
                </div>

                <div className="text-xs md:text-sm text-slate-400 leading-relaxed p-3 md:p-4 rounded-xl border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.04)' }}>
                  {section.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
