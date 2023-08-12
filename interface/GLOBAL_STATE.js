const adjectives = ["absorbing", "abstract", "acclaimed", "accomplished", "adroit", "aesthetic", "aesthetically_pleasing", "aggressive", "appealing", "artistic", "astonishing", "atmospheric", "authentic", "avant-garde", "award-winning", "awe-inspiring", "balanced", "baroque", "beautiful", "bold", "boundless", "brilliant", "candid", "ceramic", "characteristic", "classic", "collectable", "colorful", "complementary", "complex", "conceptual", "contemplative", "contemporary", "controversial", "conversational", "creative", "daring", "dazzling", "decorative", "deeply_thoughtful", "delicate", "dense", "detailed", "dimensional", "disciplined", "disruptive", "distinctive", "distinguished", "divine", "dreamlike", "dreamy", "dynamic", "eclectic", "elevated", "elevating", "emergent", "emerging", "emotional", "emotionally_charged", "enchanted", "energetic", "engaging", "engrossing", "enigmatic", "epochal", "ethereal", "evocative", "exceptional", "exotic", "explosive", "expressive", "extreme", "fascinating", "figural", "figurative", "fluid", "freelance", "fresh", "gorgeous", "graceful", "granular", "honest", "human", "hyper-creative", "imaginative", "impassioned", "impeccable", "impressionist", "infused", "inspirational", "inspired", "instinctive", "intellectual", "intense", "intensive", "interesting", "intuitive", "inventive", "labyrinthine", "layered", "lifelike", "literal", "luminous", "lyrical", "mature", "meandering", "mosaic-like", "moving", "mysterious", "mystical", "narrative", "organic", "original", "paradoxical", "passionate", "peaceful", "personal", "phenomenal", "pictorial", "playful", "potent", "profound", "provoking", "pure", "radiant", "realistic", "refined", "refreshing", "remarkable", "resourceful", "revealing", "rich", "romantic", "saturated", "sculptural", "semi-abstract", "sensual", "serene", "signature", "simple", "skilled", "soft", "sparse", "spiritual", "stimulating", "stirring", "studied", "stunning", "sublime", "substantive", "supple", "surreal", "symbolic", "tactile", "talented", "tasteful", "textile", "thought-provoking", "timeless", "touching", "traditional", "tranquil", "unconventional", "unexpected", "unforgettable", "unique", "universal", "unpredictable", "varied", "visionary", "visual", "visually_stimulating", "voyeuristic"];
const nouns = ['Asian_Box', 'Chinese_Box', 'Malaysian_Box', 'Box', 'Coahuilan_Box', 'Desert_Box', 'Eastern_Box', 'Gulf_Coast_Box', 'Ornate_Box', 'Three-toed_Box', 'Chicken', 'Florida_River_Cooter', 'Peninsula_Cooter', 'European_Pond', 'Western_Pond', 'Golden_Thread', 'Indian_Tent', 'Japanese_Pond', 'Reeves', 'Cumberland_Slider', 'Nicaraguan_Slider', 'Red-eared_Slider', 'Yellow-bellied_Slider', 'Arakan_Forest', 'Philippine_Forest', 'Leaf_Overview', 'Black-breasted_Leaf', 'Alabama_Map', 'Barbours_Map', 'Black-knobbed_Map', 'Cagles_Map', 'False_Map', 'Mississippi_Map', 'Northern_Map', 'Ouachita_Map', 'Texas_Map', 'Yellow-blotched_Map', 'Mud_Overview', 'Mississippi_Mud', 'Red-cheeked_Mud', 'Scorpion_Mud', 'Striped_Mud', 'White-lipped_Mud', 'Yellow_Mud', 'Musk_Overview', 'Common_Musk', 'Flattened_Musk', 'Loggerhead_Musk', 'Razor-backed_Musk', 'Painted_Overview', 'Eastern_Painted', 'Midland_Painted', 'Southern_Painted', 'Western_Painted', 'African_Helmeted', 'African_Side-necked', 'Pink-bellied_Side-necked', 'Snake-necked_Overview', 'Eastern_Snake-necked', 'Alligator_Snapping', 'Common_Snapping', 'Florida_Softshell', 'Smooth_Softshell', 'Spiny_Softshell', 'African_Softshell', 'Black_Softshell', 'Chinese_Softshell', 'Indian_Peacock_Softshell', 'Diamondback_Terrapin', 'Wood_Overview', 'Blandings', 'Bog', 'Central_American_Wood', 'Ornate_Wood', 'Spotted', 'Big-headed', 'Matamata', 'Pig-nosed'].map(word => word.replaceAll("-", "_").toLowerCase());
let title

if (localStorage.getItem('filename') === null) {
  title = adjectives[Math.floor(Math.random() * adjectives.length)] + '_' + nouns[Math.floor(Math.random() * nouns.length)]
  localStorage.setItem('filename', title)
} else {
  title = localStorage.getItem('filename')
}

export const GLOBAL_STATE = {
  turtles: [],
  machineWidth: 1,
  machineHeight: 1,
  scaleX: 1,
  scaleY: 1,
  turtlePos: [ 0, 0 ],
  logs: [],
  codemirror: null,
  topScope: {},
  haxidraw: null,
  filename: title,
  renderMethod: "svg" // svg | canvas
}