# Ailly Design Methodology

The single source of truth for how Ailly looks, moves, and speaks — on iOS, the web, in email, and in PDFs. Derived from the shipped app; the app is the reference implementation.

## 1. Principles
1. **One breath, one question.** Every screen has one job. If a screen needs a paragraph to explain itself, split it.
2. **Stages and pages.** *Doing/deciding* happens on the full-bleed brand gradient ("the stage"). *Reading/managing* happens on white paper cards over a soft light background. Never mix roles.
3. **The next step is always lit.** Journeys (launch path, enterprise checklist, assessments) mark exactly one NEXT step; everything done gets a green check and a strikethrough.
4. **Celebrate like it matters.** Milestones get the jewel-box moment (gradient card, confetti, gold reward chip) — never a plain alert.
5. **Warm, plain, honest.** No jargon, no fear, no fake urgency. "No wrong answers."

## 2. Color
| Token | Value | Role |
|---|---|---|
| brand.blue | #1A237E | Gradient start, primary text-on-white accents |
| brand.purple | #4A148C | Gradient end |
| brand.mid | #311B92 | Gradient middle stop (160deg, 55%) |
| accent.glow | #5C6BFF (~aillyAccent) | Blurred glow circles on stages |
| paper.bg | #F6F6FA | Light screen background |
| paper.card | #FFFFFF | Cards (adaptive: dark-mode card in app) |
| gold.business.hi | #C79A3E | Business accents (burnished gold) |
| gold.business.lo | #A9762A | Business gradient start |
| gold.business.deep | #7A4E12 | Business gradient depth |
| gold.enterprise | #C9A34A / #E7C878 | Enterprise chips, rules, serif numerals |
| navy.enterprise | #141B4D | Enterprise report/hero surfaces |
| reward.gold | #FFE7A3 → #FFC24D | Reward chips (text #4E3200) |
| success | #43A047 family | Done states |
| danger | app aillyError | Overdue/destructive |

**Rules:** brand gradient buttons NEVER sit on the brand gradient (use white pills). Deep hues never carry text on dark cards — brighten per hue in dark mode.

## 3. Type
- **Quicksand** (500/600/700) for everything.
- **Source Serif 4** (600/700) ONLY for enterprise REPORT artifacts: report titles/section headers, grade seals, big dollar/hour numerals. Page chrome — even on enterprise screens — stays rounded.
- Eyebrow labels: 10.5–12px, bold, +0.8–2 tracking, ALL CAPS.
- Stage titles: 23–27 heavy, white, centered. Page titles: 26 bold.

## 4. Surfaces & components
- **Stage** (`.stage`): 160deg brand gradient + one blurred glow circle + white top gloss. Content: white text, glass inputs (white 12% fill / 22–25% stroke), options fill WHITE when selected (brand-blue text + check).
- **White pill CTA** (on stage): white bg, brand.blue text, 16–18 radius, heavy shadow. Disabled: white 18%, white 50% text.
- **Paper card**: white, radius 16–22, shadow 0 4px 18px rgba(20,26,77,.07).
- **Journey row**: numbered circle (gold gradient = NEXT, green check = done, gray outline = future), connector ticks, trailing NEXT chip.
- **Jewel-box celebration**: gradient card, floating mascot, gold reward chip, white pill.
- **Letterhead documents**: serif title, date line, 44×2 brand rule, then formatted body.

## 5. Mascot
White speech-bubble Ailly (+lightning). Business/enterprise variant carries a briefcase and its face fills ~1.29× more canvas — ALWAYS render at `matched` size (business = personal ÷ 1.29). Floats 8pt over 3.6s with a narrowing ground shadow; respect reduced-motion.

## 6. Motion & feedback
Springs ~0.45/0.85 for steps; heroes fade/scale/blur away on scroll; every meaningful tap = haptic; success = procedural marimba (success/celebrate/fanfare). Nothing shimmers except the Pro card.

## 7. Voice
Benefit first, ~15-word sentences, sentence case, contractions, zero jargon. Money is stated plainly ($2,500 + $75/person · invoiced). Privacy promises are specific ("leadership sees levels and opportunities, never word-for-word answers").
