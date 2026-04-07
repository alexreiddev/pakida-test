// Full menu — source of truth for seed.sql and admin reset
export const MENU_DATA = [
  // Combos
  { name: 'The Long Game',         category: 'Combos',   price: 310, isVeg: true,  emoji: null, desc: 'Fuel for a 2+ hour session. Everything you need to settle in.',                   savings: 30,  contents: 'Loaded Fries + Chocolate Shake' },
  { name: 'The Strategist',        category: 'Combos',   price: 170, isVeg: true,  emoji: null, desc: 'The perfect quick-start combo. Light, caffeinated, and satisfying.',               savings: 20,  contents: 'Classic Fries + Cold Coffee' },
  { name: 'Momo & Mango',          category: 'Combos',   price: 320, isVeg: false, emoji: null, desc: 'Sweet meets spicy. The crowd favourite at Pakida.',                               savings: 20,  contents: 'Fried Momos + Mango Shake' },
  { name: 'The Full Table',        category: 'Combos',   price: 380, isVeg: false, emoji: null, desc: 'Feeds the crew. Order once and share.',                                           savings: 40,  contents: 'Loaded Fries + Nuggets + Cold Coffee' },
  { name: 'The Chill Move',        category: 'Combos',   price: 100, isVeg: true,  emoji: null, desc: 'Light, cold, and exactly enough to refresh without slowing you down.',             savings: 10,  contents: 'Fresh Lime Soda + Frozen Grapes (M)' },
  { name: 'Chai & Crunch',         category: 'Combos',   price: 140, isVeg: true,  emoji: null, desc: 'Cozy up and settle in. The slow-burn favourite.',                                 savings: 10,  contents: 'Soothing Tea + Classic Fries' },

  // Bites
  { name: 'Loaded Fries',          category: 'Bites',    price: 210, isVeg: true,  emoji: '🍟', desc: 'Crispy fries buried under melted cheese and our house seasoning. Shareable.',       savings: null, contents: null },
  { name: 'Classic Fries',         category: 'Bites',    price: 110, isVeg: true,  emoji: '🍟', desc: 'Perfectly salted, hot and crispy. The reliable sidekick.',                          savings: null, contents: null },
  { name: 'Fried Momos (6 pcs)',   category: 'Bites',    price: 180, isVeg: false, emoji: '🥟', desc: 'Pan-fried and crispy outside, juicy inside. Served with red chutney.',              savings: null, contents: null },
  { name: 'Steamed Momos (6 pcs)', category: 'Bites',    price: 160, isVeg: false, emoji: '🥟', desc: 'Soft, pillowy, and comforting. Served with red chutney.',                          savings: null, contents: null },
  { name: 'Chicken Nuggets',       category: 'Bites',    price: 200, isVeg: false, emoji: '🍗', desc: 'Crispy, golden, and impossible to stop at one. Served with dip.',                  savings: null, contents: null },
  { name: 'Veg Puffs (2 pcs)',     category: 'Bites',    price: 80,  isVeg: true,  emoji: '🥐', desc: 'Flaky pastry with spiced mixed veg filling. Best with chai.',                      savings: null, contents: null },
  { name: 'Frozen Grapes (M)',     category: 'Bites',    price: 90,  isVeg: true,  emoji: '🍇', desc: 'Chilled sweet grapes — the sleeper hit of the menu.',                             savings: null, contents: null },

  // Chillers
  { name: 'Cold Coffee',           category: 'Chillers', price: 120, isVeg: true,  emoji: '☕', desc: 'House-blended cold coffee. Rich, smooth, and endlessly refuellable.',              savings: null, contents: null },
  { name: 'Chocolate Shake',       category: 'Chillers', price: 150, isVeg: true,  emoji: '🍫', desc: 'Thick, indulgent, and a little dangerous for your productivity.',                  savings: null, contents: null },
  { name: 'Mango Shake',           category: 'Chillers', price: 160, isVeg: true,  emoji: '🥭', desc: 'Pure Alphonso goodness. Seasonal — order it while you can.',                      savings: null, contents: null },
  { name: 'Strawberry Shake',      category: 'Chillers', price: 150, isVeg: true,  emoji: '🍓', desc: 'Sweet, creamy, and very pink. A crowd favourite.',                                savings: null, contents: null },
  { name: 'Oreo Shake',            category: 'Chillers', price: 160, isVeg: true,  emoji: '🍪', desc: 'Crushed Oreos blended into a thick, dessert-worthy shake.',                       savings: null, contents: null },

  // Limes
  { name: 'Fresh Lime Soda',       category: 'Limes',    price: 80,  isVeg: true,  emoji: '🍋', desc: 'Sweet or salted, fizzy and fresh. The classic café refresh.',                     savings: null, contents: null },
  { name: 'Fresh Lime Water',      category: 'Limes',    price: 60,  isVeg: true,  emoji: '🍋', desc: 'No frills, just fresh lime in cold water. Clean and simple.',                     savings: null, contents: null },

  // Hot
  { name: 'Soothing Tea',          category: 'Hot',      price: 60,  isVeg: true,  emoji: '🍵', desc: 'Ginger-cardamom chai. Made properly, served hot.',                                savings: null, contents: null },
  { name: 'Black Coffee',          category: 'Hot',      price: 70,  isVeg: true,  emoji: '☕', desc: 'Strong, no-nonsense filter coffee. Keeps the endgame going.',                     savings: null, contents: null },
  { name: 'Green Tea',             category: 'Hot',      price: 60,  isVeg: true,  emoji: '🍵', desc: 'Light and calming. For the player who came to focus.',                            savings: null, contents: null },
  { name: 'Masala Chai',           category: 'Hot',      price: 70,  isVeg: true,  emoji: '🍵', desc: 'Spiced milk tea with the works. Pakida\'s house blend.',                          savings: null, contents: null },
  { name: 'Hot Chocolate',         category: 'Hot',      price: 110, isVeg: true,  emoji: '🍫', desc: 'Rich and warming. A good call when the AC gets too cold.',                        savings: null, contents: null },

  // Water
  { name: 'Water 500ml',           category: 'Water',    price: 15,  isVeg: true,  emoji: '💧', desc: 'Stay hydrated. Play better.',                                                     savings: null, contents: null },
]

export const MENU_CATEGORIES = ['Combos', 'Bites', 'Chillers', 'Limes', 'Hot', 'Water']
