---
name: Autharie
description: Your AI agents do the work. You stay in control.
colors:
  autharie-violet: "oklch(0.52 0.19 285)"
  violet-soft: "oklch(0.78 0.13 285)"
  violet-foreground: "oklch(0.99 0 0)"
  ink: "oklch(0.17 0.012 285)"
  deep-night: "oklch(0.19 0.024 285)"
  paper: "oklch(0.994 0.002 285)"
  lavender-surface: "oklch(0.975 0.004 285)"
  canvas-lavender: "#f6f4ff"
  card-white: "oklch(1 0 0)"
  quiet-grey: "oklch(0.52 0.014 285)"
  hairline: "oklch(0.905 0.005 285)"
  verdict-allowed: "oklch(0.508 0.118 165.612)"
  verdict-blocked: "oklch(0.505 0.213 27.518)"
  verdict-stopped: "oklch(0.769 0.188 70.08)"
  otarie-body: "#634ecf"
  otarie-shade: "#4636a3"
  otarie-belly: "#d9d3ff"
  otarie-outline: "#241a5c"
  otarie-light: "#8f7ef5"
typography:
  display:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.028em"
    fontFeature: "'ss01' on, 'cv05' on"
  headline:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.028em"
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.14em"
  micro:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.45
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  gutter: "20px"
  container: "1152px"
  section: "80px"
  section-lg: "112px"
  card: "28px"
components:
  button-primary:
    backgroundColor: "{colors.autharie-violet}"
    textColor: "{colors.violet-foreground}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "44px"
  button-stop:
    backgroundColor: "{colors.verdict-blocked}"
    textColor: "{colors.violet-foreground}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-on-dark:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "44px"
  chip:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  rule-chip:
    backgroundColor: "{colors.lavender-surface}"
    textColor: "{colors.autharie-violet}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.2xl}"
    padding: "28px"
  nav-link:
    textColor: "{colors.quiet-grey}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
---

# Design System: Autharie

## Overview

**Creative North Star: "The Watchful Sea Lion"**

Autharie watches over what your agents do so you do not have to. The system is attentive and kind rather than alarmist: calm lavender paper, one confident violet, and a pixel-art sea lion that signs every surface. Vigilance shows through precision (every decision has a verdict and a reason, every action has a time) and warmth shows through the mascot, plain language and rounded, friendly forms.

The interface explains itself by showing the product at work. Hero and section visuals are live product moments (a rule written as a sentence, a decision with "because", a stop button that works), never abstract illustrations. Light sections carry the story; a few deep-night sections (Europe, Premium, final call to action) mark moments of trust and commitment.

Depth is moving from flat toward layered: the incumbent system relies on hairline borders and light shadows, and the confirmed direction is to give surfaces more relief, so product mock-ups feel like real objects resting on the page.

**Key Characteristics:**
- One accent (Autharie Violet) on light lavender paper, with deep-night bands for trust moments.
- Product moments instead of illustrations; every animated visual can be read without motion.
- Verdict colours (allowed, blocked, stopped) are semantic and never decorative.
- The pixel sea lion is the signature: crisp pixels, never blurred, never redrawn.
- Plain type, tight headlines, mono only for data (times, traces, code, tags).

## Colors

A single violet voice over cool lavender neutrals, with three verdict colours reserved for decisions.

### Primary
- **Autharie Violet** (oklch(0.52 0.19 285)): primary buttons, links, active states, focus rings, rule chips. The brand's only accent; it also matches the product console so the site and the app feel like one company.
- **Violet Soft** (oklch(0.78 0.13 285)): the accent on deep-night sections (links, focus rings), where Autharie Violet would lack contrast.

### Neutral
- **Ink** (oklch(0.17 0.012 285)): body text and headlines; also the dark tile behind agent initials.
- **Deep Night** (oklch(0.19 0.024 285)): full-bleed dark sections and the Premium plan card. Text on it uses white at 70% for leads and 60% for secondary copy.
- **Paper** (oklch(0.994 0.002 285)): page background.
- **Lavender Surface** (oklch(0.975 0.004 285)): alternating section bands and quiet insets.
- **Canvas Lavender** (#f6f4ff): the background of product canvases (rules editor), with a dotted grid.
- **Card White** (oklch(1 0 0)): cards, nodes, inputs.
- **Quiet Grey** (oklch(0.52 0.014 285)): secondary text, nav links, timestamps. Keeps 5:1 or better on every light surface.
- **Hairline** (oklch(0.905 0.005 285)): borders and dividers, and the background grid.

### Verdict colours
- **Allowed** (oklch(0.508 0.118 165.612)): an action that went through. Used as text on a pale green tint, or as a solid badge.
- **Blocked** (oklch(0.505 0.213 27.518)): an action that was refused, and the stop button.
- **Stopped** (oklch(0.769 0.188 70.08)): an agent cut automatically by a safety. Paired with dark text when solid.

### Mascot palette
- **Otarie Body** (#634ecf), **Otarie Shade** (#4636a3), **Otarie Belly** (#d9d3ff), **Otarie Outline** (#241a5c): the four layers of the 24 by 24 pixel sea lion. Used only in the mark.
- **Otarie Light** (#8f7ef5): the highlight edge of the pixel shield the sea lion guards in the footer.

### Named Rules
**The One Voice Rule.** Autharie Violet is the only accent. Green, red and amber exist only to say what happened to an action.

**The Verdict Rule.** A verdict colour always comes with a word (Allowed, Blocked, Stopped). Colour alone never carries the meaning.

## Typography

**Display Font:** Instrument Sans (with ui-sans-serif, system-ui)
**Body Font:** Instrument Sans
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** A friendly grotesque with tight negative tracking on headings gives a modern, confident voice without coldness. Mono appears only where the content is data: times, traces, tags, code.

### Hierarchy
- **Display** (600, clamp(2.25rem, 6vw, 4rem), 1.04): the one h1 of full-width page heroes (home, technology). On the home page, two lines with the second in Autharie Violet. Pages whose h1 shares a column with a form (contact) use Headline.
- **Headline** (600, clamp(1.875rem, 4vw, 2.6rem), 1.1): one per section, balanced wrapping. Every section headline uses this size, manifesto and final call to action included.
- **Title** (600, 1.125rem, 1.4): card and step titles.
- **Body** (400, 1rem, 1.6): descriptions, kept to about 65ch.
- **Lead** (400, 1.125rem, 1.6): section intros in Quiet Grey.
- **Label** (600, 0.75rem, 0.14em, uppercase): small section labels inside product mock-ups (The rule, Right now, History). Never above a page heading.
- **Mono** (500, 0.75rem): timestamps, trace lines, rule tags, column labels in product canvases.
- **Micro** (500, 0.6875rem, `text-micro`): metadata inside product mock-ups only (tags, column labels, small timestamps). The floor: nothing on the site is smaller.

### Named Rules
**The Sentence Rule.** Rules and decisions are set as readable sentences in the body face; mono is never used to write a rule a manager must understand.

**The Heading Speaks Alone Rule.** A section headline carries its own weight. No eyebrow, kicker or label sits above it.

## Layout

Centred container of 1152px (max-w-6xl) with 20px gutters. Sections breathe with 80px vertical padding, 112px from the small breakpoint up. Section intros are centred and capped near 42rem; problem and manifesto sections use a left-aligned text column next to their content. Card grids run one column on mobile, two or three on desktop; the platform grid is a bento with two wide cards (policies, governance) spanning two of three columns. Product canvases keep a fixed aspect ratio and scroll horizontally on narrow screens rather than squeezing their nodes.

## Elevation & Depth

Layered. Hairline borders still define structure, and three violet-tinted shadow steps give relief: cards rest on the page, mock-ups float inside their cards, and the product moment is lifted above its section.

### Shadow Vocabulary
- **Resting** (`shadow-resting`: `0 1px 2px oklch(0.17 0.012 285 / 0.04), 0 2px 6px -2px oklch(0.17 0.012 285 / 0.06)`): cards on the page.
- **Raised** (`shadow-raised`: `0 2px 4px -1px oklch(0.17 0.012 285 / 0.06), 0 10px 24px -8px oklch(0.52 0.19 285 / 0.18)`): mock-ups floating inside their cards, on lavender art bands.
- **Product lift** (`shadow-lift`: `0 2px 6px -2px oklch(0.17 0.012 285 / 0.08), 0 24px 48px -16px oklch(0.52 0.19 285 / 0.28), 0 48px 96px -32px oklch(0.17 0.012 285 / 0.18)`): the hero agent card (on a lavender plate) and the rules canvas.

### Named Rules
**The Lifted Product Rule.** The product moment is the highest object on its screen; nothing decorative sits above it.

## Shapes

Friendly, consistent rounding. Large containers and section cards use 16px corners, product nodes and inner panels 8 to 12px, buttons 6px, and chips and nav links are fully rounded pills. The pixel sea lion is the deliberate exception: square pixels with crisp edges (`shape-rendering: crispEdges`), never smoothed.

## Components

### Buttons
- **Shape:** gently rounded (6px), 44px tall.
- **Primary:** Autharie Violet with white text, 24px horizontal padding, trailing arrow icon. Hover darkens to 90% opacity.
- **Secondary:** Card White with a hairline border and Ink text; hover fills with a light accent tint.
- **On dark:** Card White button with Ink text; the secondary becomes a 25% white outline.
- **Stop:** Blocked red with white text, 36px tall, used only to stop an agent. Once pressed it becomes a neutral "Restart" outline.
- **Focus:** 2px Autharie Violet outline with 2px offset (Violet Soft on dark sections).

### Chips
- **Style:** fully rounded pill, Card White, hairline border, 12px text. Used for protocols and channels.
- **Rule chip:** 6px corners, violet tint background, violet text, inline inside a sentence; turns into the verdict tint when that part of the rule decides.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Card White on paper, or Lavender Surface bands.
- **Shadow Strategy:** Resting; see Elevation.
- **Border:** hairline.
- **Internal Padding:** 24 to 28px. Solution cards put a 208px illustrated band on top, separated by a hairline, then title and description.

### Navigation
- **Style:** sticky header with a 92% paper background and blur, logo left, pill links centred in Quiet Grey turning Ink on hover, primary button and language switch right. Mobile collapses into a panel with the same flat list.

### Agent control card (signature)
The hero product moment: agent identity with initials tile and status pill, a stop button, the rule as a sentence with inline chips, a "Right now" panel showing one action, its verdict badge and "Because:" reason, and a short history. One decision at a time.

### Rules canvas (signature)
A Canvas Lavender board with a dotted grid, read left to right under mono column labels (Who, If, Then). White nodes with 8 to 12px corners, curved connectors that animate with travelling dashes in verdict colours, a forbidden tool marked with a dashed red border and a "Never" tag, and an end-to-end trace below.

### Pixel sea lion mark
The 24 by 24 pixel logo in its four layer colours. Appears in the header, the footer and as the watermark of product canvases.

## Do's and Don'ts

### Do:
- **Do** keep Autharie Violet as the single accent and use verdict colours only for decisions, always with a word.
- **Do** show the product working (rule, decision, reason, stop) instead of describing infrastructure.
- **Do** write rules as sentences in Instrument Sans; reserve JetBrains Mono for times, traces, tags and code.
- **Do** give every animation a readable static state and honour `prefers-reduced-motion`.
- **Do** render the sea lion with crisp pixels.

### Don't:
- **Don't** use emojis or decorative symbols (ticks, crosses, stars, clocks) in place of words or icons.
- **Don't** add a second brand accent or use gradients on text.
- **Don't** put an eyebrow or kicker label above a heading.
- **Don't** set text below 0.6875rem (Micro).
- **Don't** put technical identifiers (scopes, IP ranges, API method names) on home page visuals; they belong in code views and on /technology.
- **Don't** show founder names or faces as a headline, customer logos, testimonials or numbers that do not exist.
- **Don't** blur, recolour or redraw the sea lion.
