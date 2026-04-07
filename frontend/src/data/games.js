// 71 board games — source of truth for seed.sql and admin Games tab reset
export const GAMES_DATA = [
  // Strategy (18)
  { name: 'Catan',                     category: 'Strategy',       min: 3, max: 4,  time: '60-90',  desc: 'Trade resources, build roads and settlements to dominate the island' },
  { name: 'Wingspan',                  category: 'Strategy',       min: 1, max: 5,  time: '40-70',  desc: 'Attract birds to your wildlife preserve in this engine-building gem' },
  { name: 'Ticket to Ride',            category: 'Strategy',       min: 2, max: 5,  time: '45-75',  desc: 'Claim railway routes across the map before opponents cut you off' },
  { name: '7 Wonders',                 category: 'Strategy',       min: 2, max: 7,  time: '30',     desc: 'Draft cards to build the most glorious ancient civilization' },
  { name: 'Pandemic',                  category: 'Strategy',       min: 2, max: 4,  time: '45',     desc: 'Work together to cure four deadly diseases before time runs out' },
  { name: 'Agricola',                  category: 'Strategy',       min: 1, max: 5,  time: '90-150', desc: 'Build the most prosperous farm through careful resource management' },
  { name: 'Power Grid',                category: 'Strategy',       min: 2, max: 6,  time: '120',    desc: 'Build power plants and supply cities in this economic strategy game' },
  { name: 'Terra Mystica',             category: 'Strategy',       min: 2, max: 5,  time: '60-150', desc: 'Lead one of 14 factions to terraform the land and build structures' },
  { name: 'Caverna',                   category: 'Strategy',       min: 1, max: 7,  time: '30-210', desc: 'Dwarven cave-dwellers farm, mine, and adventure in this worker placement epic' },
  { name: 'Through the Ages',          category: 'Strategy',       min: 2, max: 4,  time: '120-240',desc: 'Guide your civilization from antiquity to the modern era' },
  { name: 'Puerto Rico',               category: 'Strategy',       min: 2, max: 5,  time: '90-150', desc: 'Produce and ship goods or build buildings to earn victory points' },
  { name: 'Race for the Galaxy',       category: 'Strategy',       min: 2, max: 4,  time: '30-60',  desc: 'Explore, settle, and develop planets in a card-driven civilization race' },
  { name: 'Stone Age',                 category: 'Strategy',       min: 2, max: 4,  time: '60-90',  desc: 'Gather resources and feed your tribe in the prehistoric era' },
  { name: 'Tzolkin',                   category: 'Strategy',       min: 2, max: 4,  time: '90',     desc: 'Use interlocking gears to plan your Mayan civilization\'s rise' },
  { name: 'Lewis & Clark',             category: 'Strategy',       min: 1, max: 5,  time: '100',    desc: 'Race to the Pacific using cards cleverly to manage your expedition' },
  { name: 'Brass: Birmingham',         category: 'Strategy',       min: 2, max: 4,  time: '60-120', desc: 'Build industrial networks in Victorian England in this economic masterpiece' },
  { name: 'Scythe',                    category: 'Strategy',       min: 1, max: 5,  time: '90-120', desc: 'Mechs, resources, and area control in an alternate 1920s Europe' },
  { name: 'Viticulture',               category: 'Strategy',       min: 2, max: 6,  time: '45-90',  desc: 'Grow grapes and craft wines in the rolling hills of Tuscany' },

  // Party (15)
  { name: 'Codenames',                 category: 'Party',          min: 2, max: 8,  time: '15-30',  desc: 'Two spymasters give one-word clues to help their team identify secret agents' },
  { name: 'Dixit',                     category: 'Party',          min: 3, max: 6,  time: '30',     desc: 'Describe dreamy illustrations with just enough vagueness to fool and delight' },
  { name: 'Taboo',                     category: 'Party',          min: 4, max: 10, time: '20-30',  desc: 'Describe words without using the forbidden ones — fast, loud, and chaotic' },
  { name: 'Pictionary',                category: 'Party',          min: 4, max: 8,  time: '30-60',  desc: 'Draw clues while your team races to guess before time runs out' },
  { name: 'Telestrations',             category: 'Party',          min: 4, max: 8,  time: '30',     desc: 'The telephone game meets Pictionary — chaos and laughter guaranteed' },
  { name: 'Wavelength',                category: 'Party',          min: 2, max: 12, time: '20-30',  desc: 'Tune your team\'s psychic frequency to hit the hidden target on the spectrum' },
  { name: 'Just One',                  category: 'Party',          min: 3, max: 7,  time: '20-40',  desc: 'Cooperative word game — give unique clues or they cancel each other out' },
  { name: 'Mysterium',                 category: 'Party',          min: 2, max: 7,  time: '42',     desc: 'A ghost sends visions; detectives must decode them to solve the murder' },
  { name: 'The Resistance',            category: 'Party',          min: 5, max: 10, time: '30',     desc: 'Spies hide among resistance fighters — trust no one, vote carefully' },
  { name: 'Skull',                     category: 'Party',          min: 3, max: 6,  time: '15-45',  desc: 'Bluff and challenge in this beautiful game of nerve and deduction' },
  { name: 'Bohnanza',                  category: 'Party',          min: 2, max: 7,  time: '45',     desc: 'Plant and trade beans in the most cheerful negotiation game ever made' },
  { name: 'Sushi Go!',                 category: 'Party',          min: 2, max: 5,  time: '15',     desc: 'Draft the best combination of sushi dishes before they pass you by' },
  { name: 'Exploding Kittens',         category: 'Party',          min: 2, max: 5,  time: '15',     desc: 'Draw cards, defuse kittens, and sabotage opponents in this chaotic feline duel' },
  { name: 'Munchkin',                  category: 'Party',          min: 3, max: 6,  time: '60-120', desc: 'Fight monsters and stab your friends in a dungeon-crawl card game' },
  { name: 'Coup',                      category: 'Party',          min: 2, max: 6,  time: '15',     desc: 'Bluff your way to power by eliminating other players\' influence' },

  // Quick (13)
  { name: 'Sushi Go Party!',           category: 'Quick',          min: 2, max: 8,  time: '20',     desc: 'Expanded Sushi Go with more cards and players — pick and pass sushi' },
  { name: 'Love Letter',               category: 'Quick',          min: 2, max: 6,  time: '20',     desc: 'Deduce, bluff, and outmanoeuvre opponents with just 16 cards' },
  { name: 'No Thanks!',                category: 'Quick',          min: 3, max: 7,  time: '20',     desc: 'Avoid point cards unless you can grab a run for cheap — tense and clever' },
  { name: 'For Sale',                  category: 'Quick',          min: 3, max: 6,  time: '20-30',  desc: 'Bid for properties then sell them in this quick two-phase auction game' },
  { name: 'Cockroach Poker',           category: 'Quick',          min: 2, max: 6,  time: '20',     desc: 'Pass bugs and bluff — the loser is whoever has four of a kind face up' },
  { name: 'Schotten Totten',           category: 'Quick',          min: 2, max: 2,  time: '20',     desc: 'Claim border stones by making the best three-card poker hands' },
  { name: 'Coloretto',                 category: 'Quick',          min: 2, max: 5,  time: '30',     desc: 'Collect sets of coloured chameleons — but too many colours hurt you' },
  { name: 'Qwixx',                     category: 'Quick',          min: 2, max: 5,  time: '15',     desc: 'Cross off numbers on your scoresheet using the communal dice rolls' },
  { name: 'Inuit: The Snow Folk',      category: 'Quick',          min: 2, max: 4,  time: '30',     desc: 'Place tiles to create an Arctic landscape and score clever patterns' },
  { name: 'Point Salad',               category: 'Quick',          min: 2, max: 6,  time: '15-30',  desc: 'Draft vegetables and scoring cards — every combo is a valid strategy' },
  { name: 'Dragonwood',                category: 'Quick',          min: 2, max: 4,  time: '20-30',  desc: 'Collect cards to strike, stomp, or screech at creatures in the forest' },
  { name: 'Taco Cat Goat Cheese Pizza',category: 'Quick',          min: 2, max: 8,  time: '10-20',  desc: 'Shout and slap in this hilariously fast reaction card game' },
  { name: 'Dobble (Spot It!)',          category: 'Quick',         min: 2, max: 8,  time: '15',     desc: 'Every two cards share exactly one symbol — spot it faster than anyone else' },

  // Social (6)
  { name: 'Two Rooms and a Boom',      category: 'Social',         min: 6, max: 30, time: '15-30',  desc: 'Teams must figure out who the president and bomber are before the game ends' },
  { name: 'Werewords',                 category: 'Social',         min: 4, max: 10, time: '10',     desc: 'The werewolf is the mayor guiding you away from the magic word' },
  { name: 'One Night Ultimate Werewolf',category: 'Social',        min: 3, max: 10, time: '10',     desc: 'One sleepless night, shifting roles, and a single vote to lynch the wolf' },
  { name: 'Spyfall',                   category: 'Social',         min: 3, max: 8,  time: '15',     desc: 'Everyone knows the location except the spy — can you blend in?' },
  { name: 'Secret Hitler',             category: 'Social',         min: 5, max: 10, time: '45',     desc: 'Liberals vs fascists in 1930s Germany — policy, power, and paranoia' },
  { name: 'Mafia',                     category: 'Social',         min: 7, max: 20, time: '30-60',  desc: 'The classic social deduction game: townspeople vs secret mafia members' },

  // 2-Player (10)
  { name: 'Jaipur',                    category: '2-Player',       min: 2, max: 2,  time: '30',     desc: 'Trade goods and sell at the right moment in this elegant two-player duel' },
  { name: 'Patchwork',                 category: '2-Player',       min: 2, max: 2,  time: '15-30',  desc: 'Collect and fit Tetris-like patches on your quilt — buttons are currency' },
  { name: '7 Wonders Duel',            category: '2-Player',       min: 2, max: 2,  time: '30',     desc: 'A two-player distillation of 7 Wonders — military, science, and culture clash' },
  { name: 'Hive',                      category: '2-Player',       min: 2, max: 2,  time: '20',     desc: 'Surround the opponent\'s queen bee using insect tiles with unique movement' },
  { name: 'Targi',                     category: '2-Player',       min: 2, max: 2,  time: '60',     desc: 'Desert trade and tribal card collection in a clever two-player worker placement' },
  { name: 'Lost Cities',               category: '2-Player',       min: 2, max: 2,  time: '30',     desc: 'Mount expeditions by building ascending card sequences — commit or fold' },
  { name: 'Netrunner',                 category: '2-Player',       min: 2, max: 2,  time: '45-60',  desc: 'Corp vs runner in a cyberpunk asymmetric card game of cat and mouse' },
  { name: 'Twilight Struggle',         category: '2-Player',       min: 2, max: 2,  time: '180',    desc: 'The Cold War in a card-driven game of geopolitical tension and crisis' },
  { name: 'Blokus',                    category: '2-Player',       min: 2, max: 4,  time: '20-30',  desc: 'Place all your pieces on the board — each must touch a corner of your own color' },
  { name: 'Battle Line',               category: '2-Player',       min: 2, max: 2,  time: '30',     desc: 'Deploy troops along nine flag positions to claim a winning majority' },

  // Classic (8)
  { name: 'Chess',                     category: 'Classic',        min: 2, max: 2,  time: '30-90',  desc: 'The timeless game of kings — strategy, tactics, and mental warfare' },
  { name: 'Scrabble',                  category: 'Classic',        min: 2, max: 4,  time: '90',     desc: 'Build words on the board and outscore your opponents letter by letter' },
  { name: 'Monopoly',                  category: 'Classic',        min: 2, max: 6,  time: '60-180', desc: 'Buy, trade, and bankrupt your way to real estate dominance' },
  { name: 'Ludo',                      category: 'Classic',        min: 2, max: 4,  time: '30-60',  desc: 'Race your tokens home while blocking and sending back opponents' },
  { name: 'Carrom',                    category: 'Classic',        min: 2, max: 4,  time: '30-60',  desc: 'Pocket all your coins before your opponent in this South Asian classic' },
  { name: 'Chinese Checkers',          category: 'Classic',        min: 2, max: 6,  time: '30-60',  desc: 'Race your marbles across the star-shaped board before your rivals do' },
  { name: 'Backgammon',                category: 'Classic',        min: 2, max: 2,  time: '20-45',  desc: 'Roll dice and race your pieces home while hitting your opponent\'s blots' },
  { name: 'Snakes & Ladders',          category: 'Classic',        min: 2, max: 6,  time: '15-30',  desc: 'A game of pure fortune — climb ladders and slide down snakes to the finish' },

  // Co-op (1)
  { name: 'Spirit Island',             category: 'Co-op',          min: 1, max: 4,  time: '90-120', desc: 'Powerful spirits defend their island home against colonial invaders together' },

  // Push Your Luck (1)
  { name: 'Incan Gold',                category: 'Push Your Luck', min: 3, max: 8,  time: '20-30',  desc: 'Explore a temple for gems — but know when to bank your haul before disaster strikes' },
]

export const GAME_CATEGORIES = [
  'Strategy', 'Party', 'Quick', 'Social', '2-Player', 'Classic', 'Co-op', 'Push Your Luck'
]
