# PAKIDA BOARD GAME CAFÉ — COMPLETE APP SPECIFICATION
## v4.1 Build Document — Everything You Need to Rebuild This App

---

## 1. BUSINESS CONTEXT

Pakida is a board game café in Trivandrum, Kerala, India. Located on the 4th floor opposite Technopark Phase 1 in Kazhakkoottam. Registered as ASHIN AND ASTRIN ENTERTAINMENTS LLP B.

**Target audience:** Technopark IT professionals (23-35 age), students (9th grade through college), families, MUN/debate communities.

**Core problem:** Low walk-in footfall due to 4th-floor location. The app serves as the single digital hub for all café operations — accessed via NFC tags on tables.

**Operating hours:** 2 PM – 12 AM daily, closed Mondays (admin can override). Flexible with late customers — always let them finish their game.

---

## 2. CREDENTIALS & CONFIG

```
Owner WhatsApp: 918547183423
UPI ID: ashinaustrin740@fbl
UPI Business Name: ASHIN AND ASTRIN ENTERTAINMENTS LLP B
WhatsApp Group: https://chat.whatsapp.com/LyA5iawErK3KYPs2SC4DZk
Staff PIN: 7364
WiFi Name: Pakida_Guest (configurable from admin)
WiFi Password: playandchill (configurable from admin)
```

---

## 3. BRAND IDENTITY

**Colors:**
- Background: #1b1f17 (dark charcoal)
- Surface: #242920 (card backgrounds)
- Surface Light: #2e3528 (borders)
- Primary: #7a9e7e (sage green — buttons, accents)
- Accent: #d4a843 (warm gold — highlights, badges)
- Text: #e8e4dc (light cream)
- Text Dim: #9a9689
- Text Muted: #6b6760
- Danger: #c0392b
- Success: #27ae60
- Veg dot: #27ae60
- Non-veg dot: #c0392b

**Typography:** DM Sans (body), system sans-serif fallback. No serif fonts.

**Aesthetic:** Dark, moody, editorial. Feels like a premium lounge, not a generic app. Chalkboard texture implied. Logo uses sage green "pakida" text with warm gold "BOARD GAME CAFE" tagline.

**Logo:** Circular badge with crossed fork and pakida (traditional Kerala spinning top) in sage green on dark background, with Malayalam text "പകിട" in gold. A base64-encoded version of the circular logo (120x120 webp) should be embedded in the app.

---

## 4. PRICING & MEMBERSHIP TIERS

Display in this order (price anchoring — highest first):

| Tier | Price | Description |
|------|-------|-------------|
| Monthly Pass | ₹999/mo | Unlimited visits · Priority booking · Free drink every visit. Badge: "Best Value". Show "= ₹33/day" |
| Founders Club | ₹799/mo | 15% off always · Priority booking · First 50 only. Badge: "Limited · X left" |
| Walk-In | ₹100/hr per person | Pay per session · Full game library · Snacks available |
| Group (5+) | ₹85/hr per person | Team outings · Corporate events · Private tables. Badge: "Teams" |

**Billing rules:**
- Bill in 30-minute blocks (round up)
- Minimum billing: 30 min = ₹50
- Under 10 minutes: FREE — but capture phone, show re-engagement hook: "Book your next session for a free fresh lime"
- Founders Club members get 15% off any rate (walk-in or group)
- Group rate of ₹85/hr auto-applies when 5+ players at a table

---

## 5. TABLE LAYOUT

| Table | Capacity |
|-------|----------|
| 1 | 2 |
| 2 | 6 |
| 3 | 4 |
| 4 | 4 |
| 5 | 6 |
| 6 | 6 |
| 7 | 6 |
| 8 | 2 |
| 9 | 2 |
| 10 | 12 |

Tables should show their capacity to customers. Grey out tables that are too small for the selected player count.

---

## 6. COMPLETE FOOD MENU

### Bites
| Item | Price | Emoji | Veg | Description |
|------|-------|-------|-----|-------------|
| Loaded Fries | ₹210 | 🍟 | Yes | Crispy fries buried under melted cheese, tangy sauce, and a crunch you won't shut up about. The table-stealer. |
| Fried Momos (10pc) | ₹190 | 🥟 | No | Golden-fried, impossibly crispy pockets with chutney that hits different. 10 pcs |
| Chicken Toast | ₹160 | 🍞 | No | Thick-cut, loaded, and toasted until the edges shatter |
| Chicken Nuggets (6pc) | ₹120 | 🍗 | No | Hand-breaded, deep-fried, served with house dip. 6 pcs |
| Classic Fries (150g) | ₹100 | 🍟 | Yes | Salted, golden, dangerously good. 150g of the official game-night side dish |
| Frozen Grapes Small | ₹30 | 🍇 | Yes | Sweet, cold, weirdly addictive. Nature's candy between turns. SEASONAL tag |
| Frozen Grapes Medium | ₹60 | 🍇 | Yes | The bigger bowl — because small was never enough. SEASONAL tag |

### Chillers
| Item | Price | Emoji | Veg | Description |
|------|-------|-------|-----|-------------|
| Mango Milkshake | ₹150 | 🥭 | Yes | Thick, creamy, unapologetically indulgent. Real Alphonso pulp |
| Chocolate Milkshake | ₹130 | 🍫 | Yes | Rich, dark, and dangerously smooth. Tastes like winning feels |
| Cold Coffee | ₹90 | 🧊 | Yes | Strong, chilled, no-nonsense. The Technopark survival drink |
| Mango Lassi | ₹90 | 🥭 | Yes | Creamy yogurt meets mango. Cool, thick, impossible to drink slowly |
| Plain Lassi | ₹50 | 🥛 | Yes | Simple, honest, cold. The classic palate cleanser |

### Limes
| Item | Price | Emoji | Veg | Description |
|------|-------|-------|-----|-------------|
| Mint Lime | ₹60 | 🍃 | Yes | Fresh lime, muddled mint, and ice that clinks right |
| Fresh Lime | ₹50 | 🍋 | Yes | Squeezed to order, sweet or salt. Most refreshing drink in Kazhakkoottam |

### Hot
| Item | Price | Emoji | Veg | Description |
|------|-------|-------|-----|-------------|
| Soothing Tea | ₹50 | 🍵 | Yes | House blend — mint, lemon, and honey. The calm before your next move |
| Mint Tea | ₹30 | 🌿 | Yes | Fresh mint steeped until exactly right. Pairs beautifully with long games |
| Lime Tea | ₹30 | 🍋 | Yes | Tangy, warm, and bright. The underrated drink regulars swear by |
| Black Tea | ₹20 | ☕ | Yes | Just tea. Done well. No fuss, no frills |
| Black Coffee | ₹20 | ☕ | Yes | Strong, dark, honest. For when the game is serious |

### Water
| Item | Price | Emoji | Veg | Description |
|------|-------|-------|-----|-------------|
| Water 500ml | ₹15 | 💧 | Yes | Stay hydrated, play better |

### ⭐ Combos (show first in menu)
| Combo | Price | Saves | Contents | Description |
|-------|-------|-------|----------|-------------|
| The Long Game | ₹310 | ₹30 | Loaded Fries + Chocolate Shake | Fuel for a 2+ hour session |
| The Strategist | ₹170 | ₹20 | Classic Fries + Cold Coffee | The perfect quick-start combo |
| Momo & Mango | ₹320 | ₹20 | Fried Momos + Mango Shake | Sweet meets spicy. The crowd favourite |
| The Full Table | ₹380 | ₹40 | Loaded Fries + Nuggets + Cold Coffee | Feeds the crew |
| The Chill Move | ₹100 | ₹10 | Fresh Lime + Frozen Grapes Med | Light, cold, and exactly enough |
| Chai & Crunch | ₹140 | ₹10 | Soothing Tea + Classic Fries | Cozy up and settle in |

**Menu display order:** Combos → Bites → Chillers → Limes → Hot → Water

**Menu features:**
- All items tagged with green (veg) or red (non-veg) dot
- Seasonal badge on Frozen Grapes
- Sold-out items greyed with "Sold out" label, not removable from menu
- Daily Special: admin can mark one item as featured with gold highlight at top of menu
- "New!" badge for 7 days on newly added items
- Admin can add/edit/delete items, change prices, toggle sold out

**Upsell triggers in cart:**
- When adding Classic Fries: "Make it Loaded for ₹110 more →"
- When adding Cold Coffee: "Add Fries → The Strategist ₹170 (save ₹20)"
- When adding any drink under ₹60: "Add Frozen Grapes for ₹30"
- When 3+ players at table with no food after 30 min: "The Full Table ₹380 (save ₹40)"

---

## 7. COMPLETE GAME LIBRARY (71 games)

```json
[
  {"n":"Catan","t":"Strategy","pl":"3-4","tm":"60","d":"Trade resources, build settlements, and backstab your friends politely. The game that started it all."},
  {"n":"Wingspan","t":"Strategy","pl":"1-5","tm":"40-70","d":"Collect birds, build habitats, chain combos. Gorgeous, relaxing, and deceptively competitive."},
  {"n":"Wingspan Asia","t":"Strategy","pl":"1-2","tm":"40-70","d":"The intimate two-player version. Same beauty, tighter decisions, new birds."},
  {"n":"Everdell","t":"Strategy","pl":"1-4","tm":"40-80","d":"Build a woodland city across four seasons. Charming art, deep engine-building."},
  {"n":"Cascadia","t":"Strategy","pl":"1-4","tm":"30-45","d":"Tile-laying puzzle of Pacific Northwest wildlife. Simple to learn, impossible to master."},
  {"n":"Lost Ruins of Arnak","t":"Strategy","pl":"1-4","tm":"30/player","d":"Explore ancient ruins, manage resources, and uncover lost temples. Adventure meets engine-building."},
  {"n":"Gizmos","t":"Strategy","pl":"2-4","tm":"40-50","d":"Build a marble-powered machine of chain reactions. Pick, build, trigger — pure combo satisfaction."},
  {"n":"Parks","t":"Strategy","pl":"1-5","tm":"40-70","d":"Hike through America's national parks collecting memories. Beautiful art, chill vibes, real decisions."},
  {"n":"Mercado de Lisboa","t":"Strategy","pl":"1-4","tm":"30-45","d":"Run market stalls in Lisbon. Tight economic puzzle by the designer of Cascadia."},
  {"n":"My Little Scythe","t":"Strategy","pl":"3-4","tm":"45","d":"The family-friendly version of the legendary Scythe. Adorable animals, real strategy."},
  {"n":"My City","t":"Strategy","pl":"2-4","tm":"30","d":"Legacy-style city builder that evolves with every game. Your city, your story."},
  {"n":"Arboretum","t":"Strategy","pl":"2-4","tm":"30","d":"Plant trees, build paths, and agonize over every card. Peaceful theme, ruthless decisions."},
  {"n":"Project L","t":"Strategy","pl":"1-4","tm":"30","d":"Tetris meets engine-building. Fit puzzle pieces, complete cards, chain upgrades. Addictively tactile."},
  {"n":"Sagrada","t":"Strategy","pl":"1-4","tm":"45","d":"Draft colorful dice to build a stained glass window. A puzzle that looks like art."},
  {"n":"Carcassonne","t":"Strategy","pl":"2-5","tm":"30","d":"Lay tiles, claim cities, steal farms. The original tile game — simple rules, endless rivalry."},
  {"n":"Richard Garfield's King of Monster Island","t":"Strategy","pl":"1-5","tm":"45-60","d":"Co-op monster mayhem by the creator of Magic: The Gathering. Roll dice, fight bosses, save the island."},
  {"n":"QE","t":"Strategy","pl":"3-5","tm":"30","d":"Bid ANY amount — there's no limit. But the highest total spender loses. Pure economic psychology."},
  {"n":"Galaxy Trucker","t":"Strategy","pl":"2-4","tm":"30","d":"Speed-build a spaceship from junk, then watch it fall apart in space. Hilarious chaos."},
  {"n":"Sheriff of Nottingham","t":"Social","pl":"3-6","tm":"60","d":"Bluff, bribe, and smuggle goods past the Sheriff. Look them in the eye and lie."},
  {"n":"Secret Hitler","t":"Social","pl":"5-10","tm":"45","d":"Hidden roles, political intrigue, trust no one. The social deduction game that ends friendships."},
  {"n":"Resistance","t":"Social","pl":"5-10","tm":"30","d":"Spies vs Resistance. No elimination, pure deduction. Five minutes to learn, infinite arguments."},
  {"n":"Clue Conspiracy","t":"Social","pl":"4-10","tm":"45","d":"A modern Clue twist with hidden agendas. Who's solving the crime? Who's covering it up?"},
  {"n":"Scotland Yard","t":"Social","pl":"3-6","tm":"45","d":"One player is Mr. X, everyone else hunts them across London. Classic cat-and-mouse."},
  {"n":"Drawing Without Dignity","t":"Social","pl":"4-12","tm":"30-60","d":"Pictionary's inappropriate cousin. Draw terrible things, laugh uncontrollably. Adults only."},
  {"n":"Malayali Aano","t":"Party","pl":"4+","tm":"20","d":"Are you really Malayali? Prove it. The Kerala culture quiz that gets louder every round."},
  {"n":"Taco Cat Goat Cheese Pizza","t":"Party","pl":"3-8","tm":"10","d":"Say the words, flip the cards, slap when they match. Reflexes over brains. Pure chaos."},
  {"n":"Poetry for Neanderthals","t":"Party","pl":"2+","tm":"15+","d":"Explain words using only one syllable. Get hit with an inflatable club when you fail."},
  {"n":"Just One","t":"Party","pl":"3-7","tm":"20","d":"Everyone writes a one-word clue — but duplicates get eliminated. Think different or think useless."},
  {"n":"Rapid Rumble","t":"Party","pl":"2-5","tm":"15","d":"Speed categories — name things fast or lose. Your brain will betray you."},
  {"n":"Would You Rather","t":"Party","pl":"2+","tm":"20","d":"Impossible choices, heated debates, and learning things about your friends you can't unlearn."},
  {"n":"Scattergories","t":"Party","pl":"2+","tm":"15-30","d":"Name something in each category starting with a random letter. Be creative or be basic."},
  {"n":"Sketch vs Sculpt","t":"Party","pl":"2+","tm":"20","d":"Draw it or mold it — your team guesses. Clay vs pencil showdown."},
  {"n":"Pictureka","t":"Party","pl":"2+","tm":"15","d":"Find hidden objects in a chaotic board of illustrations. Eagle eyes win."},
  {"n":"Pictionary","t":"Party","pl":"2-4","tm":"30","d":"Draw and guess — the original. Still unbeatable when everyone's terrible at drawing."},
  {"n":"Joking Hazard","t":"Party","pl":"3-10","tm":"30-90","d":"Create comic strips from random panels. By Cyanide & Happiness. Wildly inappropriate."},
  {"n":"Exploding Kittens","t":"Party","pl":"2-10","tm":"15","d":"Don't draw the exploding kitten. Defuse, dodge, and destroy your friends."},
  {"n":"Exploding Kittens: Good vs Evil","t":"Party","pl":"2-5","tm":"15","d":"Angels and demons with exploding cats. New powers, same chaos."},
  {"n":"Unstable Unicorns","t":"Party","pl":"2-8","tm":"30-60","d":"Build a unicorn army, sabotage everyone else's. Cute art, savage gameplay."},
  {"n":"Jaipur","t":"2-Player","pl":"2","tm":"30","d":"Trade spices, gems, and leather in a bustling Indian market. The best 2-player card game ever made."},
  {"n":"Patchwork","t":"2-Player","pl":"2","tm":"30","d":"Build a quilt from Tetris-shaped patches. Cozy, competitive, and quietly intense."},
  {"n":"Battleship","t":"2-Player","pl":"2","tm":"20","d":"Call coordinates, sink ships. The classic guessing game that still delivers tension."},
  {"n":"Othello","t":"2-Player","pl":"2","tm":"20","d":"A minute to learn, a lifetime to master. Flip discs, control the board, dominate corners."},
  {"n":"Corridor","t":"2-Player","pl":"2-4","tm":"15","d":"Race your pawn across the board while building walls to block your opponent."},
  {"n":"Cosmic Balance","t":"2-Player","pl":"2","tm":"15","d":"Place weighted pieces on a cosmic scale without tipping it. Physics meets strategy."},
  {"n":"Kabbadi","t":"2-Player","pl":"2","tm":"20","d":"The board game version of India's favourite sport. Raid, defend, outsmart."},
  {"n":"Mastermind","t":"2-Player","pl":"2","tm":"15","d":"Crack the secret code in limited guesses. Pure logic, zero luck."},
  {"n":"Guess Who: Animal Edition","t":"2-Player","pl":"2","tm":"10","d":"Is it furry? Does it swim? The classic deduction game — now with animals."},
  {"n":"Tumbling Monkeys","t":"2-Player","pl":"2","tm":"10","d":"Pull sticks without dropping the monkeys. Dexterity, patience, and inevitable disaster."},
  {"n":"Can't Stop","t":"Quick","pl":"2-4","tm":"30-40","d":"Roll dice, push your luck, and try to stop before you bust. You won't stop."},
  {"n":"Turing Machine","t":"Quick","pl":"1-4","tm":"20","d":"Crack a secret code using punch cards and logic. Analog computing at its finest."},
  {"n":"Ouch","t":"Quick","pl":"2-5","tm":"10","d":"Grab cacti without getting pricked. Quick, prickly, and surprisingly strategic."},
  {"n":"Lucky Numbers","t":"Quick","pl":"1-4","tm":"20","d":"Place numbered tiles in ascending rows and columns. Simple math, satisfying puzzle."},
  {"n":"Mountain Goats","t":"Quick","pl":"2-4","tm":"20","d":"Race goats up mountains by rolling dice. Adorable, fast, and surprisingly cutthroat."},
  {"n":"For Sale","t":"Quick","pl":"3-6","tm":"20-30","d":"Buy low, sell high — the real estate auction game. Two phases, zero downtime."},
  {"n":"Money","t":"Quick","pl":"3-5","tm":"20-30","d":"Trade currency cards to build the richest portfolio. Quick auction game with real economic thinking."},
  {"n":"Bounce Off","t":"Quick","pl":"2","tm":"15","d":"Bounce balls into a grid to match the pattern card. Gets competitive fast."},
  {"n":"Magnetic Puzzle","t":"Quick","pl":"2-4","tm":"15","d":"Magnetic pieces, spatial challenge, satisfying clicks. A puzzle race."},
  {"n":"Criss Cross","t":"Quick","pl":"1-6","tm":"10","d":"Everyone rolls the same dice, everyone fills their own grid. Same input, wildly different outcomes."},
  {"n":"The Face Cube","t":"Quick","pl":"2-4","tm":"10","d":"Make faces, match expressions, race to grab. Breaks all poker faces."},
  {"n":"Truffle Shuffle","t":"Quick","pl":"2-4","tm":"15-30","d":"Draft chocolate truffles to fill your box perfectly. Sweet, quick, and puzzly."},
  {"n":"Point Salad","t":"Quick","pl":"2-6","tm":"15-20","d":"Every vegetable scores differently. Draft cards, build salads, calculate combos."},
  {"n":"UNO","t":"Classic","pl":"2+","tm":"20","d":"You know UNO. You love UNO. You'll lose friendships over UNO. Draw 4 and feel nothing."},
  {"n":"Monopoly Deal","t":"Classic","pl":"2-5","tm":"15","d":"All the ruthlessness of Monopoly in 15 minutes. Steal properties, charge rent, break spirits."},
  {"n":"Monopoly","t":"Classic","pl":"2-8","tm":"60+","d":"The board game that started more family arguments than inheritance. Build an empire, bankrupt everyone."},
  {"n":"Antimonopoly","t":"Classic","pl":"2-6","tm":"60+","d":"The rebellious cousin. Competitors vs monopolists — play both sides of the economic war."},
  {"n":"The Game of Life","t":"Classic","pl":"2-5","tm":"45","d":"Spin the wheel, make life choices, retire rich or bankrupt. The original life simulator."},
  {"n":"Cluedo","t":"Classic","pl":"2-6","tm":"45","d":"Who did it, where, and with what? The murder mystery that made everyone a detective."},
  {"n":"Rummikub","t":"Classic","pl":"2-4","tm":"30","d":"Rearrange numbered tiles into sets and runs. The thinking person's rummy."},
  {"n":"Loot","t":"Classic","pl":"2-8","tm":"20","d":"Pirate ships battling for merchant gold. Simple card play, surprising depth."},
  {"n":"Magic Maze","t":"Co-op","pl":"1-8","tm":"15","d":"Control all characters but can only move them in YOUR direction. No talking. Silent panic."},
  {"n":"Incan Gold","t":"Push Your Luck","pl":"3-8","tm":"20-40","d":"Explore a temple — grab gems or escape before it collapses. Greed is your enemy."}
]
```

Game categories: Strategy (18), Party (15), Quick (13), Social (6), 2-Player (10), Classic (8), Co-op (1), Push Your Luck (1)

---

## 8. LOYALTY SYSTEM

- **6 stamps** for 1 free hour (not 10)
- Minimum 1 hour session to earn a stamp
- Free hour redeemable on ANY session type (admin toggle to restrict to off-peak later)
- Under-10-min visits: no stamp, no charge, but phone captured

**Referral system:**
- Every player gets code: "PK" + last 6 digits of phone
- Both referrer and friend get ₹30 credit
- Credit expires in 30 days
- Auto-deducted from host's bill at session end

**Rewards:**
- Next-visit incentive: Free fresh lime, valid 14 days
- Google Review: Free cold coffee
- Birthday: Free hour + mini cake (capture birth month at registration)

---

## 9. BOOKING SYSTEM

**Deposit rules:**
- 1-2 players: ₹100
- 3-4 players: ₹200
- 5+ players: ₹300
- Deducted from final bill on arrival
- Kept on no-show

**Booking rules:**
- Book up to 7 days ahead
- Time slots: 14:00 through 23:00 (matching 2 PM – 12 AM hours)
- Mondays hidden when closed (admin toggle to override)
- Free cancellation if 4+ hours before slot
- No-show auto-cancel after 30 minutes
- Tables filtered by capacity vs selected player count
- WhatsApp confirmation auto-sent to owner (918547183423) with all booking details
- UPI deposit link auto-generated

**Corporate/Team booking:**
- Toggle in booking flow
- Company name field
- Included in WhatsApp notification and admin view

---

## 10. GROUP SESSION FLOW

### Starting a session:
1. Customer taps NFC → enters phone → logs in
2. Taps "Start Session"
3. Selects player count (1-8)
4. Sees available tables (greyed out if capacity too small or in use)
5. Taps table → session starts
6. Timer shows: "Table X · Yp" with running clock

### Friends joining mid-session:
1. New person taps same NFC → enters their phone
2. App detects active session on that table
3. Shows "Join Table X?" instead of "Start Session"
4. They join → their personal timer starts from NOW
5. Host's display updates player count

### Someone leaving early:
1. They tap "Leave Table" in their hub
2. Staff confirms with PIN
3. Their portion calculated and payable immediately
4. Session continues for remaining players

### Bill calculation:
- Each player billed individually based on their join/leave times
- Mixed rates: Founders pay their discounted rate, walk-ins pay standard
- Group rate (₹85/hr) kicks in when 5+ players are at the table
- Food orders attached to session, shown as separate line item
- Referral credit deducted from host's portion only
- All players who stayed 1+ hour earn a stamp

---

## 11. VALUE MESSAGING SYSTEM

### 7 touchpoints where customers see value reinforcement:

**1. Homepage (pre-login):**
- "₹25/hr split 4 ways" in feature cards
- "First time? Access ₹2,00,000+ worth of games for ₹100/hr"
- Social proof counters: Players Joined · Tables Live · Sessions Played
- Tier comparison with price anchoring (₹999 shown first)

**2. Session start:**
- "You now have access to 71+ games, unlimited plays, free WiFi, and a great evening. Enjoy!"

**3. Mid-session (rotating every 30 min):**
- 30 min: "☕ Fun fact: You've spent less than a coffee at Starbucks so far"
- 60 min: "🎬 One hour! Cheaper than a movie ticket — and way more social"
- 90 min: "🧠 Board games reduce stress better than scrolling. Your brain thanks you"
- 120 min: "🔥 2 hours of real connection. Try getting that from Netflix"
- 150 min: "🎲 You've socialized more than most adults do in a week"
- 180 min: "👑 3 hours! Regulars who play this long have the most fun"

**4. Late joiner welcome:**
- "Welcome! You're joining X friends with access to 71+ games, snacks on demand, and free WiFi. Your timer starts now."

**5. Bill screen:**
- Per-player breakdown with individual hours and rates
- Value stack: "✓ Premium games worth ₹2,00,000+ / ✓ AC lounge · Free WiFi · Unlimited plays / ✓ Loyalty stamp earned"
- Per-minute-per-person cost breakdown
- Upgrade prompt if bill > ₹200 and not Founders Club

**6. Post-payment:**
- "🍋 Come back within 14 days → Free Fresh Lime!"
- "⭐ Review on Google → Free Cold Coffee"
- Share message pre-filled: "Just played at Pakida! Cost less than dinner out, 10× more fun. My code: PKXXXXXX — we both get ₹30 off!"

**7. Timed food prompts:**
- 30 min: "🍟 Settle in with a snack?" → The Strategist ₹170 (save ₹20)
- 60 min: "⚡ Energy check!" → Cold Coffee ₹90
- 90 min: "🌟 Fuel for the final stretch" → The Full Table ₹380 (save ₹40)
- 120 min: "🍋 You've earned a refresher" → Fresh Lime ₹50

---

## 12. TIPS

- Shown on bill screen after total
- Presets: ₹20 / ₹50 / ₹100 + custom input
- Added to UPI payment total
- "Enjoyed your time? Leave a tip 💛"

---

## 13. FOOD INVENTORY SYSTEM

- Each menu item can have a stock count set by admin
- When stock hits 0, item auto-marks as "Sold out" on customer menu
- "∞" means unlimited (default — no tracking for that item)
- Admin can increment/decrement stock with +/- buttons
- Combos don't have independent stock — their component items do

---

## 14. GAME LIBRARY MANAGEMENT

- Games stored in localStorage, loaded from default JSON on first launch
- Admin "Games" tab has a JSON editor — paste a full JSON array to bulk-replace
- "Export Current → Editor" button copies current library to the text field
- Customer-facing Game Guide reads from this stored list
- Filterable by category (Strategy, Party, Quick, Social, 2-Player, Classic, Co-op, Push Your Luck)
- Each game shows: name, type badge, player count, time, description

---

## 15. ADMIN PANEL (11 tabs)

| Tab | Purpose |
|-----|---------|
| **Today** | DEFAULT tab. 6 KPIs (Revenue, Sessions, Food Orders, Active Now, New Players, Tomorrow's Bookings) + active tables with End button + pending orders with status controls |
| **Live** | Real-time active tables + pending food orders with Pending/Preparing/Ready/Delivered status buttons |
| **Menu** | Add/edit/delete menu items. Set daily special. Toggle sold out, seasonal, veg/non-veg. Edit name, price, emoji, description, category, savings |
| **Inventory** | Per-item stock count with +/- buttons. 0 = sold out. ∞ = unlimited |
| **Games** | JSON paste for bulk import. Export current. Shows first 20 games + count |
| **Settings** | WiFi name/password editor. Monday closure toggle. Export CSV. Reset all data |
| **Overview** | 6 KPI cards with date filters (All/Today/Week) |
| **Bookings** | All upcoming confirmed bookings with details |
| **Players** | Searchable by name or phone. Shows visits, stamps, spend, referrals, birthday |
| **Sessions** | Historical session list with table, player, bill, duration |
| **Orders** | All orders with status controls and date filter |

---

## 16. REGISTRATION FLOW

1. Phone number entry (10 digits)
2. If existing player → straight to hub
3. If new → registration screen:
   - Name (required)
   - Birth month (optional, shown as tappable month buttons)
   - Referral code (optional)
4. First 50 registrations auto-enrolled as Founders Club
5. Shows "Founders Club #X — Y spots left!" badge
6. Both referrer and friend get ₹30 credit notification

---

## 17. ORDER STATUS TRACKING

- Orders flow through: Pending → Preparing → Ready → Delivered
- Auto-advances on timer (30s→Preparing, 120s→Ready, 180s→Delivered) as fallback
- Admin can manually override status from Live or Orders tab
- Customer sees live status pill + progress bar on each order
- Badge on Orders tab shows count of non-delivered orders

---

## 18. UPI PAYMENT

- Generated as `upi://pay?pa=ashinaustrin740@fbl&pn=ASHIN%20AND%20ASTRIN%20ENTERTAINMENTS%20LLP%20B&am=AMOUNT&cu=INR&tn=DESCRIPTION`
- Opens any UPI app (GPay, PhonePe, Paytm, etc.)
- Used for: session bills, booking deposits, membership upgrades
- Transaction note includes: café name, table number, player name

---

## 19. WHATSAPP INTEGRATION

- **Booking confirmation:** Auto-generated message to owner with all booking details
- **Post-bill share:** Pre-filled message with referral code + WhatsApp group link
- **Community group:** https://chat.whatsapp.com/LyA5iawErK3KYPs2SC4DZk

---

## 20. MOBILE-NATIVE FEATURES

- Persistent bottom tab navigation (Home, Menu, Orders, Stamps, Profile)
- Safe-area padding via env(safe-area-inset-*)
- Bottom-sheet modals (bills, PIN entry, delete confirmation, menu editor)
- user-select: none on all interactive elements
- Navigation stack with back buttons
- PWA manifest for "Add to Home Screen" installation
- 16px minimum font on inputs (prevents iOS zoom)
- overscroll-behavior-y: contain (prevents pull-to-navigate on mobile browsers)

---

## 21. TECH STACK

- React (Vite build)
- localStorage for all data persistence (no backend)
- Single-file app (~90KB)
- Deploy: Netlify drag-and-drop (free), or Vercel, Cloudflare Pages, GitHub Pages
- NFC tags programmed to app URL — one tag per table

**Key limitation:** localStorage means data lives on each device. Admin should use ONE dedicated device. Future upgrade path: Firebase or Supabase for shared database across devices.

---

## 22. UNDER-10-MIN VISITOR FLOW

- Session detected as under 10 minutes
- No charge applied
- Show: "Courtesy visit — no charge"
- Show: "Book your next session and get a free fresh lime 🍋"
- Phone number captured in database regardless
- No loyalty stamp awarded
- Player becomes a lead for re-engagement

---

## 23. MONDAY HANDLING

- App shows "Closed today (Monday) — see you tomorrow at 2 PM!" banner on homepage
- Booking screen hides Mondays
- Admin toggle in Settings to override and open on a specific Monday
- When overridden, Monday appears normally in booking slots

---

## 24. LATE SESSION HANDLING

- At 11:45 PM: subtle message "Café closes at midnight — finish your game, no rush"
- NO auto-end — session runs until staff manually ends it with PIN
- Staff can let people play past midnight at their discretion
- No overstay penalty

---

## 25. FILE STRUCTURE

```
pakida-hub/
├── index.html          (entry + PWA meta tags)
├── package.json        (vite + react deps)
├── vite.config.js      (react plugin)
├── public/
│   └── manifest.json   (PWA manifest)
└── src/
    ├── main.jsx        (React mount)
    └── PakidaHub.jsx   (entire app — single file)
```

---

## 26. FUTURE FEATURES (NOT IN CURRENT BUILD)

These were discussed but deferred:
- Firebase migration for shared database across devices
- Push notifications (requires Firebase)
- Table merge (spanning sessions across multiple tables)
- Table swap mid-session
- Waitlist when full
- Session pause (staff-controlled)
- Account merge (two phone numbers → one profile)
- Guest player (minor without phone)
- Pre-order food during booking
- Split payment (individual UPI links per person)
- Partial payment tracking
- "Mark as Paid" confirmation button
- Recurring bookings (weekly repeat)
- Booking for others (HR books for team)
- Walk-in vs booking conflict warnings
- Dynamic pricing / happy hour
- Daily reconciliation report
- Manual session creation in admin
- Discount / promo codes
- Game tracking per session
- Premium game reservations (₹25 hold fee)
- Extended hours / night owl pass
- Photo/memory packages
- Bulk hour packages (10 hrs for ₹800)
- Corporate monthly contracts
- Birthday party packages (₹2,999 for 8 people, 3 hours)
- Expiring referral credit notifications
- Lapsed customer reactivation messages
- Instagram story prompt for free drink
- Rate-for-reward (Google review flow)
