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
| gold.enterprise | #FFD54F | Enterprise accents ON NAVY only: chips, rules, checkmarks, serif money numerals (app report cover gold) |
| ink.enterprise | #3949AB | Enterprise accents on LIGHT surfaces: kickers, links, section numerals (app report indigo) |
| navy.enterprise | #141B4D | Enterprise report/hero surfaces (report cover gradient: #0D1240 → #1A237E → #283593, glow #3D5AFE) |
| reward.gold | #FFE7A3 → #FFC24D | Reward chips (text #4E3200) |
| success | #43A047 family | Done states |
| danger | app aillyError | Overdue/destructive |

**Rules:** brand gradient buttons NEVER sit on the brand gradient (use white pills). Deep hues never carry text on dark cards — brighten per hue in dark mode. Enterprise gold #FFD54F NEVER carries text on white — switch to ink.enterprise on light surfaces (the app does exactly this: gold on the cover, indigo in the body).

### 2a. Grade bands (app `LetterGrade.color` — canonical)
| Band | Color | Leadership label |
|---|---|---|
| A+, A, A- | #2E7D32 green | Leading |
| B+, B, B- | #3949AB indigo | On track |
| C+, C, C- | #F57C00 amber | Developing |
| D | #E65100 deep orange | Early |
| F | #C62828 red | At risk |

Score → grade: 95+ A+ · 90 A · 85 A- · 80 B+ · 73 B · 67 B- · 62 C+ · 55 C · 50 C- · 40 D · else F.
**Grade seal:** circular, band-color fill, white **serif** letter (report language). Pair with a 4px band-color score bar and `score/100 · label` caption. Never show a letter grade in Quicksand, never recolor a band.

## 3. Type
- **Quicksand** (500/600/700) for everything — EXCEPT the brand name (see §3a).
- **Source Serif 4** (600/700) ONLY for enterprise REPORT artifacts: report titles/section headers, grade seals, big dollar/hour numerals. Page chrome — even on enterprise screens — stays rounded.
- Eyebrow labels: 10.5–12px, bold, +0.8–2 tracking, ALL CAPS.
- Stage titles: 23–27 heavy, white, centered. Page titles: 26 bold.

## 3a. Brand lockup (wordmark + mascot)
The app is the reference. Its wordmark is **rendered SF Rounded**, not Quicksand — the two differ visibly (A, y). Rules:
- **Never typeset "Ailly" as logo text** in Quicksand or any web font. Always place the rendered wordmark asset: `assets/wordmark.png` on the web (pixel-identical to the app's `AillyWordmark` imageset; white, for dark/gradient surfaces).
- **Opening-screen lockup** (splash, share cards, hero brand moments): mascot stacked ON TOP of wordmark, centered. Proportions from the app splash — mascot 190 : wordmark width 130 : gap 12 (scale together). Tagline sits below the wordmark.
- Body copy may say Ailly in Quicksand like any word; the rule is only for logo/lockup usage.
- Mascot always paired white-on-gradient in brand moments; drop-shadow ok, recolors not.

## 4. Surfaces & components
- **Stage** (`.stage`): 160deg brand gradient + one blurred glow circle + white top gloss. Content: white text, glass inputs (white 12% fill / 22–25% stroke), options fill WHITE when selected (brand-blue text + check).
- **White pill CTA** (on stage): white bg, brand.blue text, 16–18 radius, heavy shadow. Disabled: white 18%, white 50% text.
- **Paper card**: white, radius 16–22, shadow 0 4px 18px rgba(20,26,77,.07).
- **Journey row**: numbered circle (gold gradient = NEXT, green check = done, gray outline = future), connector ticks, trailing NEXT chip.
- **Jewel-box celebration**: gradient card, floating mascot, gold reward chip, white pill.
- **Letterhead documents**: serif title, date line, 44×2 brand rule, then formatted body.
- **Enterprise report artifacts** (cover, scorecard): navy surface, gold #FFD54F chip ("CONFIDENTIAL" style: gold text, 50%-alpha gold border, 4px radius) + 56×2 gold rule; **serif** for the company name, grade-seal letters, and in-report numerals; everything else stays Quicksand.
- **Enterprise pricing card**: navy surface + gold accents, but numerals stay **Quicksand** — prices sit beside the other lanes' prices and must read as one family (serif next to Quicksand numerals reads as off, not premium). Strikethrough compare-at in 60% white, founding-savings line in gold. Serif never leaves the report.
- **Scorecard dimension card**: white card, grade seal (see §2a) on top, dimension name, band-color score bar, `score/100 · label` caption. Sample grades on marketing surfaces MUST be the sample company's real numbers, captioned as such.

## 5. Mascot
White speech-bubble Ailly (+lightning). Business/enterprise variant carries a briefcase and its face fills ~1.29× more canvas — ALWAYS render at `matched` size (business = personal ÷ 1.29). Floats 8pt over 3.6s with a narrowing ground shadow; respect reduced-motion.

## 6. Motion & feedback
Springs ~0.45/0.85 for steps; heroes fade/scale/blur away on scroll; every meaningful tap = haptic; success = procedural marimba (success/celebrate/fanfare). Nothing shimmers except the Pro card.

## 7. Voice
Benefit first, ~15-word sentences, sentence case, contractions, zero jargon. Money is stated plainly ($2,500 + $75/person · invoiced). Privacy promises are specific ("leadership sees levels and opportunities, never word-for-word answers").
