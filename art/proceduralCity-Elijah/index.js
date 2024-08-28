/*
@title: Procedural City
@author: Elijah Bodden
@snapshot: snapshot3.png
*/


const width = 125;
const height = 125;

setDocDimensions(width, height);
bt.setRandSeed(85)

/*
Sorry that sometimes the scene changes even on the same seed when you rerender
(e.g. by rotating). The bt.noise function seems to make bt.random unpredictable
And I couldn't find a way around it
*/

/*
This is a hacky orthographic renderer
It uses facades with z-indices instead of full 3d triangle meshes
Because of this, the scene will break 
if you rotate it by more than pi/2 or less than 0 in any direction
*/
var GLOBAL_ROT_X = 0.5
var GLOBAL_ROT_Y = 0.3
var GLOBAL_ROT_Z = -0.0

// IMPORTANT CONSTANTS
// Any constants not here are inside of the individual component functions
const page_border = 10
const curves_detail_level = 20
// Probability that if there can be a window somewhere, there will be one
const window_socket_prob = 0.6
const windows_circular_prob = 0.3
const tree_in_yard_prob = 0.6
const bush_under_window_socket_prob = 0.7
const orient_trees_toward_camera = true

// Relative weight of each house type
const square_house_weight = 4
const long_house_weight = 2
const deep_house_weight = 2
const tall_long_house_weight = 2
const tall_deep_house_weight = 2
const park_weight = 6


// Normalize weights
let total_weight = square_house_weight + long_house_weight + deep_house_weight + tall_long_house_weight + tall_deep_house_weight + park_weight
var prob_arr = [square_house_weight/total_weight, long_house_weight/total_weight, deep_house_weight/total_weight, tall_long_house_weight/total_weight, tall_deep_house_weight/total_weight, park_weight/total_weight]

const street_width = 10
const block_width = 30
const block_height = 30
// How far inside the lines of a block a house's border should be
const global_curb = 4
// Number of vertical/horizontal blocks
const h_blocks = 4
const v_blocks = 4
const street_line_gap = 6
const street_line_density = 0.08
const street_line_width = 1.5
const wireframe = false
const showBorder = true
const park_has_pond_prob = 0.5
const roof_rotation_prob = 0.5


// Get z's for objects in  the order you want them to render with this function
var global_z_counter = 1
var get_next_z_index = _ => global_z_counter++

var choose_dont_replace = arr => arr.splice(bt.randIntInRange(0, arr.length - 1), 1)[0]
var sum_to_nth = (arr, n) => arr.slice(0, n).reduce((acc, cur) => acc + cur)

// PRIMITIVES
function origin_rect_shell(x, y, z) {
  // False prism. Only the visible faces
  return [
    // Front face
    [
      [x / 2, -y / 2, z / 2],
      [-x / 2, -y / 2, z / 2],
      [-x / 2, y / 2, z / 2],
      [x / 2, y / 2, z / 2],
      [x / 2, -y / 2, z / 2]
    ],
    // Right face
    [
      [x / 2, y / 2, z / 2],
      [x / 2, y / 2, -z / 2],
      [x / 2, -y / 2, -z / 2],
      [x / 2, -y / 2, z / 2],
      [x / 2, y / 2, z / 2]
    ],
    // Top face
    [
      [x / 2, y / 2, z / 2],
      [x / 2, y / 2, -z / 2],
      [-x / 2, y / 2, -z / 2],
      [-x / 2, y / 2, z / 2],
      [x / 2, y / 2, z / 2]
    ]
  ]
}

function plane(width, height, z = 0) {
  // Plane facing camera with given z value
  return [
    [
      [-width / 2, height / 2, z],
      [width / 2, height / 2, z],
      [width / 2, -height / 2, z],
      [-width / 2, -height / 2, z],
      [-width / 2, height / 2, z],
    ]
  ]
}

function ellipse(width, height, detail = 40) {
  let t = new bt.Turtle()
  let sample_density = Math.PI / detail
  t.arc(360, 0.5)
  let curve = t.lines()
  bt.resample(curve, sample_density)
  bt.scale(curve, [width, height])
  // Fixes loss of precision based repositioning
  bt.originate(curve)
  return make_3d(curve)
}


// TRANSFORMS
function rotate_3d(paths, x, y, z) {
  // Rotate a set of paths around the origin in 3d
  return paths.map(path =>
    path.map(vertex => {
      let x_rot = rotate_point_x(vertex, x)
      let y_rot = rotate_point_y(x_rot, y)
      let z_rot = rotate_point_z(y_rot, z)
      return z_rot
    })
  )
}

function rotate_point_x(point, theta) {
  let x, y, z
  [x, y, z] = point
  return [
    x,
    y * Math.cos(theta) - z * Math.sin(theta),
    y * Math.sin(theta) + z * Math.cos(theta),
  ]
}

function rotate_point_y(point, theta) {
  let x, y, z
  [x, y, z] = point
  return [
    Math.cos(theta) * x + Math.sin(theta) * z,
    y,
    -Math.sin(theta) * x + Math.cos(theta) * z
  ]
}

function rotate_point_z(point, theta) {
  let x, y, z
  [x, y, z] = point
  return [
    Math.cos(theta) * x - Math.sin(theta) * y,
    Math.sin(theta) * x + Math.cos(theta) * y,
    z
  ]
}

function make_2d(paths) {
  return paths.map(path =>
    path.map(vertex =>
      vertex.slice(0, 2)
    )
  )
}

function make_3d(paths) {
  return paths.map(path =>
    path.map(vertex => [vertex[0], vertex[1], 0])
  )
}

function translate_3d(paths, d_x, d_y, d_z) {
  return paths.map(path =>
    path.map(vertex => {
      return [vertex[0] + d_x, vertex[1] + d_y, vertex[2] + d_z]
    })
  )
}

function translate_absolute(paths, current, target) {
  // Translate a shape such that current comes to rest on target
  return translate_3d(paths, target[0] - current[0], target[1] - current[1], target[2] - current[2])
}



// COMPONENTS/ACCESSORIES
function base(x, y, z) {
  let paths = []
  bt.join(paths, origin_rect_shell(x, y, z))
  // Put origin on bottom back left of the shape
  let bbl_recentered = translate_absolute(paths, [-x / 2, -y / 2, -z / 2], [0, 0, 0])
  return bbl_recentered
}

function roof(width, depth, height, rotation_kind) {
  // Width = slant width, depth = triangle depth
  // True pre-rotation height of the plane
  let true_height = Math.pow(Math.pow(depth / 2, 2) + Math.pow(height, 2), 0.5)
  let roof_plane = plane(width, true_height)
  let angle = Math.asin(depth / 2 * 1 / true_height)
  let rotated = rotate_3d(roof_plane, -angle, 0, 0)
  // Other half of the roof
  let slant_copy = bt.copy(rotated)
  slant_copy = rotate_3d(slant_copy, 2 * angle, 0, 0)
  // Put the origin at the roof's center
  rotated = translate_3d(rotated, 0, 0, depth / 4)
  slant_copy = translate_3d(slant_copy, 0, 0, -depth / 4)
  let t_l_vertex = rotated[0][0]
  let t_r_vertex = rotated[0][1]
  let b_r_vertex = rotated[0][2]
  let b_l_vertex = rotated[0][3]
  bt.join(slant_copy, rotated)
  rotated = slant_copy
  if (rotation_kind == 0) {
    // Triangle part
    let side = [
      [
        b_r_vertex,
        t_r_vertex,
        [b_r_vertex[0], b_r_vertex[1], -b_r_vertex[2]],
        b_r_vertex
      ]
    ]
    bt.join(rotated, side)
  } else {
    let side = [
      [
        b_l_vertex,
        t_l_vertex,
        [b_l_vertex[0], b_l_vertex[1], -b_l_vertex[2]],
        b_l_vertex
      ]
    ]
    bt.join(rotated, side)
    rotated = rotate_3d(rotated, 0, Math.PI / 2, 0)
  }
  // Literally crying at how convoluted the roof rotation logic got
  let bbl
  if (rotation_kind === 0) {
    bbl = translate_absolute(rotated, [-width / 2, -height / 2, -depth / 2], [0, 0, 0])
  } else {
    bbl = translate_absolute(rotated, [-depth / 2, -height / 2, -width / 2], [0, 0, 0])
  }
  return bbl
}

function tree(variant) {
  let trunk_detail = curves_detail_level
  let top_detail_frequecy = 100 / curves_detail_level

  let t = new bt.Turtle()
  let lines
  if (variant == 0) {
    // Pine tree
    t.setAngle(-45)
    t.forward(10)
    t.setAngle(180)
    t.forward(4)
    t.setAngle(-45)
    t.forward(10)
    t.setAngle(180)
    t.forward(4)
    t.setAngle(-45)
    t.forward(10)
    t.setAngle(180)
    t.forward(10)
    t.setAngle(-90)
    t.forward(3)
    t.setAngle(-180)
    t.forward(3.3)
    lines = make_3d(t.lines())
    let reverse = rotate_3d(lines, 0, Math.PI, 0)
    lines = [lines[0].concat(reverse[0].reverse())]
  } else if (variant == 1) {
    // Cartoon deciduous tree
    t.setAngle(10)
    t.forward(8)
    t.setAngle(34)
    t.forward(10)
    t.setAngle(61)
    t.forward(9)
    t.setAngle(83)
    t.forward(14)
    t.setAngle(93)
    t.forward(17)
    t.setAngle(151)
    t.forward(17)
    // Break the line because we don't want to nurbs the rest
    let trunk = t.lines()
    t = new bt.Turtle()
    t.jump(trunk[0].slice(-1)[0])
    t.setAngle(200)
    t.arc(-74, 25)
    t.setAngle(-193)
    t.arc(-124, 15)
    t.setAngle(-289)
    t.arc(-50, 34)
    t.setAngle(-309)
    t.goTo([t.pos[0], t.pos[1]])
    t.arc(-64, 37)
    let top = t.lines()
    bt.resample(top, top_detail_frequecy)
    lines = bt.nurbs(trunk[0], { steps: trunk_detail })
    lines = [lines.concat(top[0])]
    lines = make_3d(lines)
    lines = translate_absolute(lines, [lines[0].at(-1)[0], 0, 0], [0, 0, 0])
    let reverse = rotate_3d(lines, 0, Math.PI, 0)
    // .reverse is because the "first" point without reversing is at the base of the tree
    lines = [lines[0].concat(reverse[0].reverse())]
    // Hacky way to close the shape
    lines[0] = [...lines[0],
      [lines[0][0][0], 0, 0]
    ]
    lines = make_2d(lines)
    bt.scale(lines, [0.2, 0.2])
  }
  lines = make_2d(lines)
  bt.originate(lines)
  bt.scale(lines, [2, 2])
  return lines
}

function window(width, height, x, y, z, y_rotation, is_circular = false, tiles_x = 2, tiles_y = 2) {
  // x, y, and z are center coordinate
  let tile_width = width / tiles_x
  let tile_height = height / tiles_y
  let lines = []
  let circle_window_detail = curves_detail_level

  let tile = make_2d(plane(tile_width, tile_height))
  for (let i = 0; i < width; i += tile_width) {
    for (let j = 0; j < height; j += tile_height) {
      let current_tile = bt.copy(tile)
      bt.translate(current_tile, [i, j])
      bt.join(lines, current_tile)
    }
  }
  bt.originate(lines)
  if (is_circular) {
    let cutter = ellipse(width, height, circle_window_detail)
    bt.cut(lines, make_2d(cutter))
    // Swap the order here to make sure the circle goes before (and thus under) the crossbars
    bt.join(cutter, lines)
    lines = cutter
  }
  lines = rotate_3d(make_3d(lines), 0, y_rotation, 0)
  lines = translate_3d(lines, x, y, z)
  return lines
}

function door(width, height, x, y, z, y_rotation) {
  // x, y, and z are bottom center coordinate
  let has_window_probability = 0.5
  let window_is_circular_probability = 0.3
  let window_margin = 0.5 * Math.min(width, height)
  let doorknob_detail = curves_detail_level / 2

  let has_window = bt.rand() < has_window_probability
  let lines = plane(width, height)
  lines = translate_3d(lines, 0, height / 2, 0)

  if (has_window) {
    let window_is_circular = bt.rand() < window_is_circular_probability
    let the_window = window(width - window_margin, height / 2 - window_margin, 0, height * 0.75, 0, 0, window_is_circular)
    bt.join(lines, the_window)
  }
  let doorknob = ellipse(width / 10, width / 10, doorknob_detail)
  doorknob = translate_3d(doorknob, width * 0.36, height / 2, 0)
  bt.join(lines, doorknob)
  lines = rotate_3d(lines, 0, y_rotation, 0)
  lines = translate_3d(lines, x, y, z)
  return lines
}

function bush(width, height, x, y, z, y_rotation, noise_scale = 4, noise_intensity = 2.9) {
  // x, y, z are for base center
  let curve_detail = curves_detail_level * 3
  let subdiv_density = curve_detail / 11
  let the_bush
  let top = []
  let bottom = []
  // The i = width/subdivision_density and i < width - width/subdivision_density give it rounded corners
  for (let i = width / subdiv_density; i < width - width / subdiv_density; i += width / subdiv_density) {
    let t_offset = (bt.noise([(i + x) * noise_scale, (height + y) * noise_scale, z]) - 0.5) * noise_intensity
    let b_offset = (bt.noise([(i + x) * noise_scale, y, z]) - 0.5) * noise_intensity
    top.push([i, height + t_offset])
    bottom.push([i, b_offset])
  }
  let left = []
  let right = []
  for (let i = height / subdiv_density; i < height - height / subdiv_density; i += height / subdiv_density) {
    let l_offset = (bt.noise([x, (y + i) * noise_scale, z]) - 0.5) * noise_intensity
    let r_offset = (bt.noise([(width + x) * noise_scale, (i + y) * noise_scale, z]) - 0.5) * noise_intensity
    left.push([l_offset, i])
    right.push([width + r_offset, i])
  }
  the_bush = [...top, ...right.reverse(), ...bottom.reverse(), ...left, top.at(0)]
  the_bush = bt.nurbs(the_bush, { steps: curve_detail })
  // Cut it off at the ground
  the_bush = [the_bush.map(point => {
    if (point[1] < 0) return [point[0], 0, point[2]]
    return point
  })]
  the_bush = translate_absolute(make_3d(the_bush), [0, 0, 0], [-width / 2, 0, 0])
  the_bush = rotate_3d(the_bush, 0, y_rotation, 0)
  the_bush = translate_absolute(the_bush, [0, 0, 0], [x, y, z])
  return the_bush
}

function pond(width, height, variant) {
  let curve_detail = 7 * curves_detail_level
  let t = new bt.Turtle()

  if (variant === 0) {
    t.right(4)
    t.forward(22)
    t.right(-23)
    t.forward(24)
    t.right(37)
    t.forward(17)
    t.right(9)
    t.forward(15)
    t.right(35)
    t.forward(10)
    t.right(34)
    t.forward(14)
    t.right(39)
    t.forward(28)
    t.right(51)
    t.forward(36)
    t.right(14)
    t.forward(11)
    t.right(21)
    t.forward(7)
    t.right(-18)
    t.forward(23)
    t.right(-43)
    t.forward(20)
    t.right(86)
    t.forward(11)
    t.right(29)
    t.forward(14)
    t.right(51)
    t.forward(9)
    t.right(23)
    t.forward(21)
  } else if (variant === 1) {
    t.left(53)
    t.forward(18)
    t.left(48)
    t.forward(14)
    t.left(36)
    t.forward(15)
    t.right(60)
    t.forward(19)
    t.right(15)
    t.forward(0)
    t.right(3)
    t.forward(8)
    t.right(8)
    t.forward(17)
    t.left(22)
    t.forward(19)
    t.right(-7)
    t.forward(20)
    t.right(13)
    t.forward(12)
    t.right(22)
    t.forward(5)
    t.right(22)
    t.forward(2)
    t.right(36)
    t.forward(6)
    t.right(16)
    t.forward(5)
    t.right(43)
    t.forward(18)
    t.right(20)
    t.forward(15)
    t.right(20)
    t.forward(9)
    t.left(33)
    t.forward(23)
    t.left(-22)
    t.forward(8)
    t.left(-14)
    t.forward(4)
    t.left(17)
    t.forward(6)
    t.left(48)
    t.forward(4)
    t.left(-36)
    t.forward(9)
    t.left(-43)
    t.forward(8)
    t.left(-38)
    t.forward(3)
    t.left(-206)
    t.forward(3)
    t.left(-36)
    t.forward(3)
    t.left(-19)
    t.forward(3)
    t.left(-13)
    t.forward(3)
    t.left(-12)
    t.forward(11)
    t.left(-19)
    t.forward(14)
    t.left(-68)
    t.forward(5)
    t.left(-76)
    t.forward(7)
    t.left(-20)
    t.forward(2)
    t.left(5)
    t.forward(3)
    t.left(161)
    t.forward(12)
    t.left(-40)
    t.forward(15)
    t.left(-6)
    t.forward(4)
  }
  let line = t.lines()[0]
  line.push(line[0])
  line = [bt.nurbs(line, { steps: curve_detail })]
  bt.originate(line)
  let bounds = bt.bounds(line)
  bt.scale(line, [width / bounds.width, height / bounds.height])
  line = make_3d(line)
  line = rotate_3d(line, Math.PI / 2, 0, 0)

  return line
}



// UNITS
function house(x, y, z, roof_height, roof_rotation, roof_overhang_triangle, roof_overhang_slants, window_socket_prob = 0.5, windows_circular_prob = 0.3, tree_in_yard_prob = 0.3, bush_under_window_socket_prob = 1.0, stories = 1, door_sockets = [], window_only_sockets = [], tree_sockets = []) {
  // Generates a house and populates the given sockets
  // Socket (a possible location to place an accessory) format: x, y, z, y-rotation
  let windows_circular = bt.rand() < windows_circular_prob
  let windows_height = y / 2.5 / stories
  let windows_width = windows_height
  let bush_width = windows_width
  let bush_height = bush_width * 0.7
  let windows_center = y / 2 / stories
  let windows_x_tiles = 2
  let windows_y_tiles = 2
  let door_height = y / 1.5 / stories
  let door_width = door_height / 2
  let bush_offset = x / 18
  let max_tree_size = 0.7
  let min_tree_size = 0.4


  let z_indexes = []
  let lines = base(x, y, z)
  
  // Fill sockets
  let door_socket = choose_dont_replace(door_sockets)
  console.log(...door_socket)
  let the_door = door(door_width, door_height, ...door_socket)
  bt.join(lines, the_door)
  // Door sockets can also house a window (and may also have a bush)
  while (door_sockets.length > 0) {
    if (bt.rand() < window_socket_prob) {
      let the_window = window(windows_height, windows_width, ...door_sockets[0], windows_circular, windows_x_tiles, windows_y_tiles)
      the_window = translate_3d(the_window, 0, windows_center, 0)
      bt.join(lines, the_window)
    }
    if (bt.rand() < bush_under_window_socket_prob) {
      let the_bush = bush(bush_width, bush_height, ...door_sockets[0])
      let offset = door_sockets[0][3] == 0 ? [0, 0, bush_offset] : [bush_offset, 0, 0]
      the_bush = translate_3d(the_bush, ...offset)
      bt.join(lines, the_bush)
    }
    door_sockets.splice(0, 1)
  }

  while (window_only_sockets.length > 0) {
    if (bt.rand() < window_socket_prob) {
      let the_window = window(windows_height, windows_width, ...window_only_sockets[0], windows_circular, windows_x_tiles, windows_y_tiles)
      the_window = translate_3d(the_window, 0, windows_center, 0)
      bt.join(lines, the_window)
    }
    window_only_sockets.splice(0, 1)
  }

  while (tree_sockets.length > 0) {
    if (bt.rand() < tree_in_yard_prob) {
      let socket = tree_sockets[0]
      let the_tree = tree(1)
      let t_height = bt.bounds(the_tree).height
      the_tree = translate_3d(the_tree, ...socket.slice(0, 3))
      the_tree = rotate_3d(the_tree, 0, socket[3], 0)
      the_tree = make_2d(the_tree)
      bt.scale(the_tree, [y / t_height / stories * bt.randInRange(min_tree_size, max_tree_size), y / t_height / stories * bt.randInRange(min_tree_size, max_tree_size)])
      the_tree = translate_3d(the_tree, 0, -the_tree[0][0][1], 0)
      // Disabled because rotating trees in yards is sometimes cursed
      // if (orient_trees_toward_camera) {
      //   the_tree = rotate_3d(the_tree, 0, GLOBAL_ROT_Y, 0)
      // }
      bt.join(lines, the_tree)
    }
    tree_sockets.splice(0, 1)
  }

  let roof_depth = (roof_rotation === 0 ? z : x) + roof_overhang_slants * 2
  let roof_width = (roof_rotation === 0 ? x : z) + roof_overhang_triangle * 2
  let this_roof = roof(roof_width, roof_depth, roof_height, roof_rotation)
  if (roof_rotation === 0) {
    this_roof = translate_3d(this_roof, -roof_overhang_triangle, y, -roof_overhang_slants)
  } else {
    this_roof = translate_3d(this_roof, -roof_overhang_slants, y, -roof_overhang_triangle)
  }

  bt.join(lines, this_roof)

  for (let i in lines) z_indexes.push(get_next_z_index())
  return [lines, z_indexes]
}

function basic_house(max_x, max_z, window_socket_prob = 0.5, windows_circular_prob = 0.3, tree_in_yard_prob = 0.3, bush_under_window_socket_prob = 1.0, roof_overhang_triangle = 0, roof_overhang_slants = 3) {
  let x = max_x
  let y = max_x / 2
  let z = max_z
  let stories = 1
  let roof_rotation = bt.rand() > roof_rotation_prob ? 0 : 1
  let door_sockets = [
    [x / 4, 0, z, 0],
    [x / 2, 0, z, 0],
    [3 * x / 4, 0, z, 0],
    [x, 0, z / 4, Math.PI / 2],
    [x, 0, z / 2, Math.PI / 2],
    [x, 0, 3 * z / 4, Math.PI / 2]
  ]
  let window_only_sockets = []
  let tree_sockets = []

  let roof_height = (roof_rotation === 0 ? z : x) * 0.6
  let the_house = house(x, y, z, roof_height, roof_rotation, roof_overhang_triangle, roof_overhang_slants, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob, stories, door_sockets, window_only_sockets, tree_sockets)
  return the_house
}

function narrow_house(max_x, max_z, window_socket_prob = 0.5, windows_circular_prob = 0.3, tree_in_yard_prob = 0.3, bush_under_window_socket_prob = 1.0, roof_overhang_triangle = 0, roof_overhang_slants = 1.5) {
  let x = max_x / 2
  let y = x
  let z = max_z
  let stories = 1
  let tree_socket_margin = Math.max(x / 10, z / 10)
  let roof_rotation = bt.rand() > roof_rotation_prob ? 0 : 1
  let door_sockets = [
    [x / 2, 0, z, 0],
    [x, 0, z / 4, Math.PI / 2],
    [x, 0, z / 2, Math.PI / 2],
    [x, 0, 3 * z / 4, Math.PI / 2]
  ]
  let window_only_sockets = []

  let tree_sockets = [
    [bt.randInRange(max_x / 2 + tree_socket_margin, max_x - tree_socket_margin), 0,
      bt.randInRange(tree_socket_margin, max_z - tree_socket_margin), 0
    ]
  ]

  let roof_height = y
  let the_house = house(x, y, z, roof_height, roof_rotation, roof_overhang_triangle, roof_overhang_slants, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob, stories, door_sockets, window_only_sockets, tree_sockets)
  return the_house
}

function skinny_house(max_x, max_z, window_socket_prob = 0.5, windows_circular_prob = 0.3, tree_in_yard_prob = 0.3, bush_under_window_socket_prob = 1.0, roof_overhang_triangle = 0, roof_overhang_slants = 1.5) {
  let x = max_x
  let z = max_z / 2
  let y = z
  let stories = 1
  let tree_socket_margin = Math.max(x / 10, z / 10)
  let roof_rotation = bt.rand() > roof_rotation_prob ? 1 : 0
  let door_sockets = [
    [x / 4, 0, z, 0],
    [x / 2, 0, z, 0],
    [3 * x / 4, 0, z, 0],
    [x, 0, z / 2, Math.PI / 2]
  ]
  let window_only_sockets = []

  let tree_sockets = [
    [bt.randInRange(tree_socket_margin, max_x - tree_socket_margin), 0,
      bt.randInRange(max_z / 2 + tree_socket_margin, max_z - tree_socket_margin), 0
    ]
  ]

  let roof_height = y
  let the_house = house(x, y, z, roof_height, roof_rotation, roof_overhang_triangle, roof_overhang_slants, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob, stories, door_sockets, window_only_sockets, tree_sockets)
  return the_house
}

function narrow_house_tall(max_x, max_z, window_socket_prob = 0.5, windows_circular_prob = 0.3, tree_in_yard_prob = 0.3, bush_under_window_socket_prob = 1.0, roof_overhang_triangle = 0, roof_overhang_slants = 1.5) {
  let x = max_x / 2
  let y = x * 2
  let z = max_z
  let stories = 2
  let tree_socket_margin = Math.max(x / 10, z / 10)
  let roof_rotation = bt.rand() > roof_rotation_prob ? 0 : 1
  let door_sockets = [
    [x / 2, 0, z, 0],
    [x, 0, z / 4, Math.PI / 2],
    [x, 0, z / 2, Math.PI / 2],
    [x, 0, 3 * z / 4, Math.PI / 2]
  ]
  let window_only_sockets = [
    [x / 2, y / 2, z, 0],
    [x, y / 2, z / 4, Math.PI / 2],
    [x, y / 2, z / 2, Math.PI / 2],
    [x, y / 2, 3 * z / 4, Math.PI / 2]
  ]

  let tree_sockets = [
    [bt.randInRange(max_x / 2 + tree_socket_margin, max_x - tree_socket_margin), 0,
      bt.randInRange(tree_socket_margin, max_z - tree_socket_margin), 0
    ]
  ]

  let roof_height = y / stories
  let the_house = house(x, y, z, roof_height, roof_rotation, roof_overhang_triangle, roof_overhang_slants, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob, stories, door_sockets, window_only_sockets, tree_sockets)
  return the_house
}

function skinny_house_tall(max_x, max_z, window_socket_prob = 0.5, windows_circular_prob = 0.3, tree_in_yard_prob = 0.3, bush_under_window_socket_prob = 1.0, roof_overhang_triangle = 0, roof_overhang_slants = 1.5) {
  let x = max_x
  let z = max_z / 2
  let y = z * 2
  let stories = 2
  let tree_socket_margin = Math.max(x / 10, z / 10)
  let roof_rotation = bt.rand() > roof_rotation_prob ? 1 : 0
  let door_sockets = [
    [x / 4, 0, z, 0],
    [x / 2, 0, z, 0],
    [3 * x / 4, 0, z, 0],
    [x, 0, z / 2, Math.PI / 2]
  ]
  let window_only_sockets = [
    [x / 4, y / 2, z, 0],
    [x / 2, y / 2, z, 0],
    [3 * x / 4, y / 2, z, 0],
    [x, y / 2, z / 2, Math.PI / 2]
  ]

  let tree_sockets = [
    [bt.randInRange(tree_socket_margin, max_x - tree_socket_margin), 0,
      bt.randInRange(max_z / 2 + tree_socket_margin, max_z - tree_socket_margin), 0
    ]
  ]

  let roof_height = y / stories
  let the_house = house(x, y, z, roof_height, roof_rotation, roof_overhang_triangle, roof_overhang_slants, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob, stories, door_sockets, window_only_sockets, tree_sockets)
  return the_house
}

function park(width, depth, pond_prob = 0.3, tree_density = 4, tree_prob_per_density_unit = 0.2, pine_probability = 0.5) {
  let tree_max_rand_scale = 1.4
  let tree_min_rand_scale = 0.8
  let pond_max_coverage_fraction = 1.0
  let pond_min_coverage_fraction = 0.5
  let z_indexes = []
  let park_lines = []

  let the_pond
  // For testing if we can grow a tree with bt.pointInside
  let pond_xy = []
  if (bt.rand() < pond_prob) {
    let rotation = bt.randInRange(0, Math.PI * 2)
    let pond_width = width * bt.randInRange(pond_min_coverage_fraction, pond_max_coverage_fraction)
    let pond_height = depth * bt.randInRange(pond_min_coverage_fraction, pond_max_coverage_fraction)
    let pond_type = bt.rand() > 0.5 ? 1 : 0
    let hypothetical_diag_1 = Math.pow(Math.pow(pond_width, 2) + Math.pow(pond_height, 2), 0.5)
    let hypothetical_diag_2 = Math.pow(Math.pow(Math.min(width, depth), 2), 0.5)
    if (hypothetical_diag_1 > hypothetical_diag_2) {
      pond_width *= hypothetical_diag_2 / hypothetical_diag_1
      pond_height *= hypothetical_diag_2 / hypothetical_diag_1
    }
    the_pond = pond(pond_width, pond_height, pond_type)
    the_pond = rotate_3d(the_pond, 0, rotation, 0)
    the_pond = translate_absolute(the_pond, [0, 0, 0], [width / 2, 0, depth / 2])
    bt.join(park_lines, the_pond)
    z_indexes.push(get_next_z_index())
    pond_xy = make_2d(rotate_3d(the_pond, -Math.PI / 2, 0, 0))
  }

  // Populate with trees
  for (let i = 0; i < tree_density; i++) {
    for (let j = 0; j < tree_density; j++) {
      if (bt.pointInside(pond_xy, [(width / tree_density) * i, (depth / tree_density) * j]))
        continue
      if (bt.rand() > tree_prob_per_density_unit) continue
      let tree_type = bt.rand() < pine_probability ? 0 : 1
      let happy_tree = tree(tree_type)
      let tree_height = bt.bounds(happy_tree).height
      bt.scale(happy_tree, [(width / tree_density) / tree_height, (width / tree_density) / tree_height])
      bt.scale(happy_tree, [bt.randInRange(tree_max_rand_scale, tree_min_rand_scale), bt.randInRange(tree_max_rand_scale, tree_min_rand_scale)])
      // Put the tree on the ground and where we want it
      let bottom = bt.bounds(happy_tree).yMin
      if (orient_trees_toward_camera) {
        happy_tree = rotate_3d(happy_tree, 0, GLOBAL_ROT_Y, 0)
      }
      happy_tree = translate_absolute(happy_tree, [0, bottom, 0], [(width / tree_density) * i, 0, (depth / tree_density) * j])
      bt.join(park_lines, happy_tree)
      z_indexes.push(get_next_z_index())
    }
  }

  return [park_lines, z_indexes]
  // random pond too?
}

function streets(width, block_width, block_height, v_blocks, h_blocks, line_gap, line_density, line_width) {
  let grid = []
  let lines = []
  // Square surrounding the outside of the streets
  let block = plane(block_width, block_height)
  block = rotate_3d(block, Math.PI / 2, 0, 0)

  // street lines
  let v_count = Math.floor(block_height * line_density)
  let h_count = Math.floor(block_width * line_density)
  let v_length = (block_height - line_gap * (1 + v_count)) / v_count
  let h_length = (block_width - line_gap * (1 + h_count)) / h_count
  let v_line = plane(line_width, v_length)
  let h_line = plane(h_length, line_width)
  v_line = rotate_3d(v_line, Math.PI / 2, 0, 0)
  h_line = rotate_3d(h_line, Math.PI / 2, 0, 0)
  // 0, 0 is now bl corner:
  v_line = translate_absolute(v_line, [-line_width / 2, 0, -v_length / 2], [0, 0, 0])
  h_line = translate_absolute(h_line, [-h_length / 2, 0, -line_width / 2], [0, 0, 0])
  let v_lines_set = []
  let h_lines_set = []
  for (let i = 0; i < v_count; i++) {
    let instance = bt.copy(v_line)
    instance = translate_3d(instance, 0, 0, (v_length + line_gap) * i + line_gap)
    bt.join(v_lines_set, instance)
  }

  for (let i = 0; i < h_count; i++) {
    let instance = bt.copy(h_line)
    instance = translate_3d(instance, (h_length + line_gap) * i + line_gap, 0, 0)
    bt.join(h_lines_set, instance)
  }


  block = translate_absolute(block, [-block_width / 2, 0, -block_height / 2], [0, 0, 0])
  for (let i = 0; i < h_blocks; i++) {
    for (let j = 0; j < v_blocks; j++) {
      let this_block = bt.copy(block)
      this_block = translate_3d(this_block, (block_width + width) * i, 0, (block_height + width) * j)
      bt.join(grid, this_block)
      if (i != h_blocks - 1) {
        let instance = bt.copy(v_lines_set)
        let left = (i + 1) * (block_width + (width - line_width) / 2) + i * ((width + line_width) / 2)
        let top = j * (block_height + width)
        instance = translate_3d(instance, left, 0, top)
        bt.join(lines, instance)
      }
      if (j != v_blocks - 1) {
        let instance = bt.copy(h_lines_set)
        let left = i * (block_width + width)
        let top = (j + 1) * (block_height + (width - line_width) / 2) + j * ((width + line_width) / 2)
        instance = translate_3d(instance, left, 0, top)
        bt.join(lines, instance)
      }
    }
  }

  let right = width * (h_blocks - 1) + block_width * h_blocks
  let bottom = width * (v_blocks - 1) + block_height * v_blocks
  let border = [
    [
      [0, 0, 0],
      [right, 0, 0],
      [right, 0, bottom],
      [0, 0, bottom],
      [0, 0, 0]
    ]
  ]
  return [grid, lines, border]
}



function processComponent(component) {
  // Put a unit into the world by giving it global rotation and making it 2d
  var rotated = rotate_3d(component, GLOBAL_ROT_X, -GLOBAL_ROT_Y, GLOBAL_ROT_Z)
  return make_2d(rotated)
}

function apply_z_indexes(paths, z_indexes) {
  // Can give z = 0 to an object if you want it to render under EVERYTHING
  // give z < 0 if you want the object to render as a wireframe over everything else
  let no_overlaps = []
  let overlaps = []
  if (z_indexes.length !== paths.length) {
    console.log(JSON.stringify(z_indexes), JSON.stringify(paths))
    throw new Error("z_indexes length != paths length")
  }
  for (let i in z_indexes) {
    if (z_indexes[i] < 0) {
      bt.join(no_overlaps, [paths[i]])
      z_indexes.splice(i, 1)
      paths.splice(i, 1)
    }
  }
  for (let z = Math.min(...z_indexes); Number.isFinite(z); z = Math.min(...z_indexes)) {
    let i = z_indexes.indexOf(z)
    bt.cover(overlaps, [paths[i]])
    bt.join(overlaps, [paths[i]])
    z_indexes.splice(i, 1)
    paths.splice(i, 1)
  }
  bt.join(overlaps, no_overlaps)
  return overlaps
}


function buildGrid() {
  let lines = []
  let z_indexes = []
  // Top left corner = (0, 0)
  let roads, road_lines, border
  [roads, road_lines, border] = streets(street_width, block_width, block_height, v_blocks, h_blocks, street_line_gap, street_line_density, street_line_width)
  let processed_road_lines = processComponent(road_lines)
  let processed_roads = processComponent(roads)
  if (showBorder) {
    let processed_border = processComponent(border)
    bt.join(lines, processed_border)
    z_indexes.push(0)
  }

  let processed_border = processComponent(border)
  bt.join(lines, processed_roads)
  bt.join(lines, processed_road_lines)
  for (let i in processed_roads) z_indexes.push(0)
  for (let i in processed_road_lines) z_indexes.push(0)

  for (let i = 0; i < roads.length; i++) {
    // load in units
    let unit, unit_zs
    let cell_type_raw = bt.rand()
    let unit_width = block_width - global_curb * 2
    let unit_height = block_height - global_curb * 2
    if (cell_type_raw < sum_to_nth(prob_arr, 1)) {
      [unit, unit_zs] = basic_house(unit_width, unit_height, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob)
    }  else if (cell_type_raw < sum_to_nth(prob_arr, 2)) {
      [unit, unit_zs] = skinny_house(unit_width, unit_height, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob)
    } else if (cell_type_raw < sum_to_nth(prob_arr, 3)) {
      [unit, unit_zs] = narrow_house(unit_width, unit_height, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob)
    } else if (cell_type_raw < sum_to_nth(prob_arr, 4)) {
      [unit, unit_zs] = skinny_house_tall(unit_width, unit_height, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob)
    } else if (cell_type_raw < sum_to_nth(prob_arr, 5)) {
      [unit, unit_zs] = narrow_house_tall(unit_width, unit_height, window_socket_prob, windows_circular_prob, tree_in_yard_prob, bush_under_window_socket_prob)
    } else if (cell_type_raw < sum_to_nth(prob_arr, 6)) {
      [unit, unit_zs] = park(unit_width, unit_height, park_has_pond_prob)
    }
    z_indexes = z_indexes.concat(unit_zs)
    // Put the unit's top left on the cell's top left
    let tl = roads[i][3]
    let oriented = translate_absolute(unit, [0, 0, 0], [tl[0] + global_curb, tl[1], tl[2] + global_curb])
    bt.join(lines, processComponent(oriented))
  }

  let overlapped = !wireframe ? apply_z_indexes(lines, z_indexes) : lines
  return overlapped
}


var city = buildGrid()
var bounds = bt.bounds(city)
var scale_factor = Math.min((width - page_border) / bounds.width, (height - page_border) / bounds.height)
bt.scale(city, [scale_factor, scale_factor])
bt.originate(city)
bt.translate(city, [width / 2, height / 2])
drawLines(city)