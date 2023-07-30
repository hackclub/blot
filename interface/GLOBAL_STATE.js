const adjectives = ["absorbing", "abstract", "acclaimed", "accomplished", "adroit", "aesthetic", "aesthetically_pleasing", "aggressive", "appealing", "artistic", "astonishing", "atmospheric", "authentic", "avant-garde", "award-winning", "awe-inspiring", "balanced", "baroque", "beautiful", "bold", "boundless", "brilliant", "candid", "ceramic", "characteristic", "classic", "collectable", "colorful", "complementary", "complex", "conceptual", "contemplative", "contemporary", "controversial", "conversational", "creative", "daring", "dazzling", "decorative", "deeply_thoughtful", "delicate", "dense", "detailed", "dimensional", "disciplined", "disruptive", "distinctive", "distinguished", "divine", "dreamlike", "dreamy", "dynamic", "eclectic", "elevated", "elevating", "emergent", "emerging", "emotional", "emotionally_charged", "enchanted", "energetic", "engaging", "engrossing", "enigmatic", "epochal", "ethereal", "evocative", "exceptional", "exotic", "explosive", "expressive", "extreme", "fascinating", "figural", "figurative", "fluid", "freelance", "fresh", "gorgeous", "graceful", "granular", "honest", "human", "hyper-creative", "imaginative", "impassioned", "impeccable", "impressionist", "infused", "inspirational", "inspired", "instinctive", "intellectual", "intense", "intensive", "interesting", "intuitive", "inventive", "labyrinthine", "layered", "lifelike", "literal", "luminous", "lyrical", "mature", "meandering", "mosaic-like", "moving", "mysterious", "mystical", "narrative", "organic", "original", "paradoxical", "passionate", "peaceful", "personal", "phenomenal", "pictorial", "playful", "potent", "profound", "provoking", "pure", "radiant", "realistic", "refined", "refreshing", "remarkable", "resourceful", "revealing", "rich", "romantic", "saturated", "sculptural", "semi-abstract", "sensual", "serene", "signature", "simple", "skilled", "soft", "sparse", "spiritual", "stimulating", "stirring", "studied", "stunning", "sublime", "substantive", "supple", "surreal", "symbolic", "tactile", "talented", "tasteful", "textile", "thought-provoking", "timeless", "touching", "traditional", "tranquil", "unconventional", "unexpected", "unforgettable", "unique", "universal", "unpredictable", "varied", "visionary", "visual", "visually_stimulating", "voyeuristic"];

const nouns = ['asian_box', 'chinese_box', 'malaysian_box', 'box', 'coahuilan_box', 'desert_box', 'eastern_box', 'gulf_coast_box', 'ornate_box', 'three-toed_box', 'chicken', 'florida_river_cooter', 'peninsula_cooter', 'european_pond', 'western_pond', 'golden_thread', 'indian_tent', 'japanese_pond', 'reeves', 'cumberland_slider', 'nicaraguan_slider', 'red-eared_slider', 'yellow-bellied_slider', 'arakan_forest', 'philippine_forest', 'leaf_overview', 'black-breasted_leaf', 'alabama_map', 'barbours_map', 'black-knobbed_map', 'cagles_map', 'false_map', 'mississippi_map', 'northern_map', 'ouachita_map', 'texas_map', 'yellow-blotched_map', 'mud_overview', 'mississippi_mud', 'red-cheeked_mud', 'scorpion_mud', 'striped_mud', 'white-lipped_mud', 'yellow_mud', 'musk_overview', 'common_musk', 'flattened_musk', 'loggerhead_musk', 'razor-backed_musk', 'painted_overview', 'eastern_painted', 'midland_painted', 'southern_painted', 'western_painted', 'african_helmeted', 'african_side-necked', 'pink-bellied_side-necked', 'snake-necked_overview', 'eastern_snake-necked', 'alligator_snapping', 'common_snapping', 'florida_softshell', 'smooth_softshell', 'spiny_softshell', 'african_softshell', 'black_softshell', 'chinese_softshell', 'indian_peacock_softshell', 'diamondback_terrapin', 'wood_overview', 'blandings', 'bog', 'central_american_wood', 'ornate_wood', 'spotted', 'big-headed', 'matamata', 'pig-nosed']

let examplesArr = [];

await fetch('/examples/examples.json')
  .then(response => response.json())
  .then(data => {
    examplesArr = data.examples;
  })
  .catch(error => {
    console.error('Error:', error);
  });

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
  examples: examplesArr,
  filename: title,
  servo: null,
  renderMethod: "canvas" // svg | canvas
}
