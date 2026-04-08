-- ============================================================
-- PAKIDA BOARD GAME CAFÉ — SEED DATA
-- Run after 001_schema.sql
-- ============================================================

-- ============================================================
-- GAMES (71 games from spec)
-- ============================================================
insert into games (name, category, min_players, max_players, time_estimate, description) values
-- Strategy (18)
('Catan',                    'Strategy',      3, 4,  '60-90',  'Trade resources, build roads and settlements to dominate the island'),
('Wingspan',                 'Strategy',      1, 5,  '40-70',  'Attract birds to your wildlife preserve in this engine-building gem'),
('Ticket to Ride',           'Strategy',      2, 5,  '45-75',  'Claim railway routes across the map before opponents cut you off'),
('7 Wonders',                'Strategy',      2, 7,  '30',     'Draft cards to build the most glorious ancient civilization'),
('Pandemic',                 'Strategy',      2, 4,  '45',     'Work together to cure four deadly diseases before time runs out'),
('Agricola',                 'Strategy',      1, 5,  '90-150', 'Build the most prosperous farm through careful resource management'),
('Power Grid',               'Strategy',      2, 6,  '120',    'Build power plants and supply cities in this economic strategy game'),
('Terra Mystica',            'Strategy',      2, 5,  '60-150', 'Lead one of 14 factions to terraform the land and build structures'),
('Caverna',                  'Strategy',      1, 7,  '30-210', 'Dwarven cave-dwellers farm, mine, and adventure in this worker placement epic'),
('Through the Ages',         'Strategy',      2, 4,  '120-240','Guide your civilization from antiquity to the modern era'),
('Puerto Rico',              'Strategy',      2, 5,  '90-150', 'Produce and ship goods or build buildings to earn victory points'),
('Race for the Galaxy',      'Strategy',      2, 4,  '30-60',  'Explore, settle, and develop planets in a card-driven civilization race'),
('Stone Age',                'Strategy',      2, 4,  '60-90',  'Gather resources and feed your tribe in the prehistoric era'),
('Tzolkin',                  'Strategy',      2, 4,  '90',     'Use interlocking gears to plan your Mayan civilization''s rise'),
('Lewis & Clark',            'Strategy',      1, 5,  '100',    'Race to the Pacific using cards cleverly to manage your expedition'),
('Brass: Birmingham',        'Strategy',      2, 4,  '60-120', 'Build industrial networks in Victorian England in this economic masterpiece'),
('Scythe',                   'Strategy',      1, 5,  '90-120', 'Mechs, resources, and area control in an alternate 1920s Europe'),
('Viticulture',              'Strategy',      2, 6,  '45-90',  'Grow grapes and craft wines in the rolling hills of Tuscany'),

-- Party (15)
('Codenames',                'Party',         2, 8,  '15-30',  'Two spymasters give one-word clues to help their team identify secret agents'),
('Dixit',                    'Party',         3, 6,  '30',     'Describe dreamy illustrations with just enough vagueness to fool and delight'),
('Taboo',                    'Party',         4, 10, '20-30',  'Describe words without using the forbidden ones — fast, loud, and chaotic'),
('Pictionary',               'Party',         4, 8,  '30-60',  'Draw clues while your team races to guess before time runs out'),
('Telestrations',            'Party',         4, 8,  '30',     'The telephone game meets Pictionary — chaos and laughter guaranteed'),
('Wavelength',               'Party',         2, 12, '20-30',  'Tune your team''s psychic frequency to hit the hidden target on the spectrum'),
('Just One',                 'Party',         3, 7,  '20-40',  'Cooperative word game — give unique clues or they cancel each other out'),
('Mysterium',                'Party',         2, 7,  '42',     'A ghost sends visions; detectives must decode them to solve the murder'),
('The Resistance',           'Party',         5, 10, '30',     'Spies hide among resistance fighters — trust no one, vote carefully'),
('Skull',                    'Party',         3, 6,  '15-45',  'Bluff and challenge in this beautiful game of nerve and deduction'),
('Bohnanza',                 'Party',         2, 7,  '45',     'Plant and trade beans in the most cheerful negotiation game ever made'),
('Sushi Go!',                'Party',         2, 5,  '15',     'Draft the best combination of sushi dishes before they pass you by'),
('Exploding Kittens',        'Party',         2, 5,  '15',     'Draw cards, defuse kittens, and sabotage opponents in this chaotic feline duel'),
('Munchkin',                 'Party',         3, 6,  '60-120', 'Fight monsters and stab your friends in a dungeon-crawl card game'),
('Coup',                     'Party',         2, 6,  '15',     'Bluff your way to power by eliminating other players'' influence'),

-- Quick (13)
('Sushi Go Party!',          'Quick',         2, 8,  '20',     'Expanded Sushi Go with more cards and players — pick and pass sushi'),
('Love Letter',              'Quick',         2, 6,  '20',     'Deduce, bluff, and outmanoeuvre opponents with just 16 cards'),
('No Thanks!',               'Quick',         3, 7,  '20',     'Avoid point cards unless you can grab a run for cheap — tense and clever'),
('For Sale',                 'Quick',         3, 6,  '20-30',  'Bid for properties then sell them in this quick two-phase auction game'),
('Cockroach Poker',          'Quick',         2, 6,  '20',     'Pass bugs and bluff — the loser is whoever has four of a kind face up'),
('Schotten Totten',          'Quick',         2, 2,  '20',     'Claim border stones by making the best three-card poker hands'),
('Coloretto',                'Quick',         2, 5,  '30',     'Collect sets of coloured chameleons — but too many colours hurt you'),
('Qwixx',                    'Quick',         2, 5,  '15',     'Cross off numbers on your scoresheet using the communal dice rolls'),
('Inuit: The Snow Folk',     'Quick',         2, 4,  '30',     'Place tiles to create an Arctic landscape and score clever patterns'),
('Point Salad',              'Quick',         2, 6,  '15-30',  'Draft vegetables and scoring cards — every combo is a valid strategy'),
('Dragonwood',               'Quick',         2, 4,  '20-30',  'Collect cards to strike, stomp, or screech at creatures in the forest'),
('Taco Cat Goat Cheese Pizza','Quick',        2, 8,  '10-20',  'Shout and slap in this hilariously fast reaction card game'),
('Dobble (Spot It!)',         'Quick',        2, 8,  '15',     'Every two cards share exactly one symbol — spot it faster than anyone else'),

-- Social (6)
('Two Rooms and a Boom',     'Social',        6, 30, '15-30',  'Teams must figure out who the president and bomber are before the game ends'),
('Werewords',                'Social',        4, 10, '10',     'The werewolf is the mayor guiding you away from the magic word'),
('One Night Ultimate Werewolf','Social',      3, 10, '10',     'One sleepless night, shifting roles, and a single vote to lynch the wolf'),
('Spyfall',                  'Social',        3, 8,  '15',     'Everyone knows the location except the spy — can you blend in?'),
('Secret Hitler',            'Social',        5, 10, '45',     'Liberals vs fascists in 1930s Germany — policy, power, and paranoia'),
('Mafia',                    'Social',        7, 20, '30-60',  'The classic social deduction game: townspeople vs secret mafia members'),

-- 2-Player (10)
('Jaipur',                   '2-Player',      2, 2,  '30',     'Trade goods and sell at the right moment in this elegant two-player duel'),
('Patchwork',                '2-Player',      2, 2,  '15-30',  'Collect and fit Tetris-like patches on your quilt — buttons are currency'),
('7 Wonders Duel',           '2-Player',      2, 2,  '30',     'A two-player distillation of 7 Wonders — military, science, and culture clash'),
('Hive',                     '2-Player',      2, 2,  '20',     'Surround the opponent''s queen bee using insect tiles with unique movement'),
('Targi',                    '2-Player',      2, 2,  '60',     'Desert trade and tribal card collection in a clever two-player worker placement'),
('Lost Cities',              '2-Player',      2, 2,  '30',     'Mount expeditions by building ascending card sequences — commit or fold'),
('Netrunner',                '2-Player',      2, 2,  '45-60',  'Corp vs runner in a cyberpunk asymmetric card game of cat and mouse'),
('Twilight Struggle',        '2-Player',      2, 2,  '180',    'The Cold War in a card-driven game of geopolitical tension and crisis'),
('Blokus',                   '2-Player',      2, 4,  '20-30',  'Place all your pieces on the board — each must touch a corner of your own color'),
('Battle Line',              '2-Player',      2, 2,  '30',     'Deploy troops along nine flag positions to claim a winning majority'),

-- Classic (8)
('Chess',                    'Classic',       2, 2,  '30-90',  'The timeless game of kings — strategy, tactics, and mental warfare'),
('Scrabble',                 'Classic',       2, 4,  '90',     'Build words on the board and outscore your opponents letter by letter'),
('Monopoly',                 'Classic',       2, 6,  '60-180', 'Buy, trade, and bankrupt your way to real estate dominance'),
('Ludo',                     'Classic',       2, 4,  '30-60',  'Race your tokens home while blocking and sending back opponents'),
('Carrom',                   'Classic',       2, 4,  '30-60',  'Pocket all your coins before your opponent in this South Asian classic'),
('Chinese Checkers',         'Classic',       2, 6,  '30-60',  'Race your marbles across the star-shaped board before your rivals do'),
('Backgammon',               'Classic',       2, 2,  '20-45',  'Roll dice and race your pieces home while hitting your opponent''s blots'),
('Snakes & Ladders',         'Classic',       2, 6,  '15-30',  'A game of pure fortune — climb ladders and slide down snakes to the finish'),

-- Co-op (1)
('Spirit Island',            'Co-op',         1, 4,  '90-120', 'Powerful spirits defend their island home against colonial invaders together'),

-- Push Your Luck (1)
('Incan Gold',               'Push Your Luck',3, 8,  '20-30',  'Explore a temple for gems — but know when to bank your haul before disaster strikes');

-- ============================================================
-- MENU ITEMS
-- ============================================================
insert into menu_items (name, category, price, is_veg, emoji, description, savings_amount, combo_contents) values
-- Combos (6)
('The Long Game',         'Combos', 310, true,  null, 'Fuel for a 2+ hour session. Everything you need to settle in.',                    30,  'Loaded Fries + Chocolate Shake'),
('The Strategist',        'Combos', 170, true,  null, 'The perfect quick-start combo. Light, caffeinated, and satisfying.',                20,  'Classic Fries + Cold Coffee'),
('Momo & Mango',          'Combos', 320, false, null, 'Sweet meets spicy. The crowd favourite at Pakida.',                                20,  'Fried Momos + Mango Shake'),
('The Full Table',        'Combos', 380, false, null, 'Feeds the crew. Order once and share.',                                            40,  'Loaded Fries + Nuggets + Cold Coffee'),
('The Chill Move',        'Combos', 100, true,  null, 'Light, cold, and exactly enough to refresh without slowing you down.',             10,  'Fresh Lime Soda + Frozen Grapes (M)'),
('Chai & Crunch',         'Combos', 140, true,  null, 'Cozy up and settle in. The slow-burn favourite.',                                  10,  'Soothing Tea + Classic Fries'),

-- Bites (7)
('Loaded Fries',          'Bites',  210, true,  '🍟', 'Crispy fries buried under melted cheese and our house seasoning. Shareable.',       null, null),
('Classic Fries',         'Bites',  110, true,  '🍟', 'Perfectly salted, hot and crispy. The reliable sidekick.',                          null, null),
('Fried Momos (6 pcs)',   'Bites',  180, false, '🥟', 'Pan-fried and crispy outside, juicy inside. Served with red chutney.',              null, null),
('Steamed Momos (6 pcs)', 'Bites',  160, false, '🥟', 'Soft, pillowy, and comforting. Served with red chutney.',                          null, null),
('Chicken Nuggets',       'Bites',  200, false, '🍗', 'Crispy, golden, and impossible to stop at one. Served with dip.',                  null, null),
('Veg Puffs (2 pcs)',     'Bites',  80,  true,  '🥐', 'Flaky pastry with spiced mixed veg filling. Best with chai.',                      null, null),
('Frozen Grapes (M)',     'Bites',  90,  true,  '🍇', 'Chilled sweet grapes — the sleeper hit of the menu.',                             null, null),

-- Chillers (5)
('Cold Coffee',           'Chillers',120, true,  '☕', 'House-blended cold coffee. Rich, smooth, and endlessly refuellable.',              null, null),
('Chocolate Shake',       'Chillers',150, true,  '🍫', 'Thick, indulgent, and a little dangerous for your productivity.',                  null, null),
('Mango Shake',           'Chillers',160, true,  '🥭', 'Pure Alphonso goodness. Seasonal — order it while you can.',                      null, null),
('Strawberry Shake',      'Chillers',150, true,  '🍓', 'Sweet, creamy, and very pink. A crowd favourite.',                                null, null),
('Oreo Shake',            'Chillers',160, true,  '🍪', 'Crushed Oreos blended into a thick, dessert-worthy shake.',                       null, null),

-- Limes (2)
('Fresh Lime Soda',       'Limes',   80,  true,  '🍋', 'Sweet or salted, fizzy and fresh. The classic café refresh.',                     null, null),
('Fresh Lime Water',      'Limes',   60,  true,  '🍋', 'No frills, just fresh lime in cold water. Clean and simple.',                     null, null),

-- Hot (5)
('Soothing Tea',          'Hot',     60,  true,  '🍵', 'Ginger-cardamom chai. Made properly, served hot.',                                null, null),
('Black Coffee',          'Hot',     70,  true,  '☕', 'Strong, no-nonsense filter coffee. Keeps the endgame going.',                     null, null),
('Green Tea',             'Hot',     60,  true,  '🍵', 'Light and calming. For the player who came to focus.',                            null, null),
('Masala Chai',           'Hot',     70,  true,  '🍵', 'Spiced milk tea with the works. Pakida''s house blend.',                          null, null),
('Hot Chocolate',         'Hot',     110, true,  '🍫', 'Rich and warming. A good call when the AC gets too cold.',                        null, null),

-- Water (1)
('Water 500ml',           'Water',   15,  true,  '💧', 'Stay hydrated. Play better.',                                                     null, null);
