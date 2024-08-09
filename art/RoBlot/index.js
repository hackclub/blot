const width = 125;
const height = 125;

const head_width = bt.randInRange(30, 90);
const head_height = bt.randInRange(20, 60);
const eye_radius = bt.randInRange(2, 4);
const robot_width = bt.randInRange(15, 50);
const robot_height = bt.randInRange(80, 125);
const neck_length = bt.randInRange(1, 20);
const neck_width = bt.randInRange(3, 15);
const mouth_width = bt.randInRange(30, Math.min(90, head_width));
const mouth_height = bt.randInRange(2, 5);
const mouth_offset_y = bt.randInRange(5, 10);
const leg_width = bt.randInRange(5, Math.min(20, (robot_width/2)));
const arm_width = bt.randInRange(10, (robot_height / 4 - head_height/4 - neck_length/4));
const arm_dist = bt.randInRange(1, 30);

const a = 39

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

const head = [
  [width / 2 - head_width / 2, (height - robot_height) / 2 + robot_height],
  [width / 2 + head_width / 2, (height - robot_height) / 2 + robot_height],
  [width / 2 + head_width / 2, (height - robot_height) / 2 + robot_height - head_height],
  [width / 2 - head_width / 2, (height - robot_height) / 2 + robot_height - head_height],
  [width / 2 - head_width / 2, (height - robot_height) / 2 + robot_height],
];

const eye_left_center = [
  width / 2 - head_width / 5,
  (height - robot_height) / 2 + robot_height - head_height + head_height * 0.65
];

const eye_right_center = [
  width / 2 + head_width / 5,
  (height - robot_height) / 2 + robot_height - head_height + head_height * 0.65
];

const eye_left = [];
const eye_right = [];

const num_segments = 20;
for (let i = 0; i <= num_segments; i++) {
  const theta = 2 * Math.PI * i / num_segments;
  const x_left = eye_left_center[0] + eye_radius * Math.cos(theta);
  const y_left = eye_left_center[1] + eye_radius * Math.sin(theta);
  eye_left.push([x_left, y_left]);

  const x_right = eye_right_center[0] + eye_radius * Math.cos(theta);
  const y_right = eye_right_center[1] + eye_radius * Math.sin(theta);
  eye_right.push([x_right, y_right]);
}

const mouth = [
  [width / 2 - mouth_width / 2, (height + robot_height) / 2 - head_height / 2 - mouth_offset_y],
  [width / 2 + mouth_width / 2, (height + robot_height) / 2 - head_height / 2 - mouth_offset_y],
  [width / 2 + mouth_width / 2, (height + robot_height) / 2 - head_height / 2 - mouth_offset_y - mouth_height],
  [width / 2 - mouth_width / 2, (height + robot_height) / 2 - head_height / 2 - mouth_offset_y - mouth_height],
  [width / 2 - mouth_width / 2, (height + robot_height) / 2 - head_height / 2 - mouth_offset_y],
]

const neck = [
  [width / 2 - neck_width / 2, (height + robot_height) / 2 - head_height],
  [width / 2 + neck_width / 2, (height + robot_height) / 2 - head_height],
  [width / 2 + neck_width / 2, (height + robot_height) / 2 - head_height - neck_length],
  [width / 2 - neck_width / 2, (height + robot_height) / 2 - head_height - neck_length],
  [width / 2 - neck_width / 2, (height + robot_height) / 2 - head_height],

]

const body = [
  [(width - robot_width) / 2, (height + robot_height) / 2 - head_height - neck_length],
  [(width - robot_width) / 2 + robot_width, (height + robot_height) / 2 - head_height - neck_length],
  [(width - robot_width) / 2 + robot_width, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2, (height + robot_height) / 2 - head_height - neck_length],
]

const leg_left = [
  [(width - robot_width) / 2, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2 + leg_width, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2 + leg_width, (height - robot_height) / 2], // fun fact the y coordinate here is the simplified version of (height/2 - head_height/2 - neck_length/2)-(((height + robot_height) / 2 - head_height - neck_length)-(height/2 - head_height/2 - neck_length/2)), GCSE maths coming in handy
  [(width - robot_width) / 2, (height - robot_height) / 2],
  [(width - robot_width) / 2, height / 2 - head_height / 2 - neck_length / 2],
]

const leg_right = [
  [(width + robot_width) / 2, height / 2 - head_height / 2 - neck_length / 2],
  [(width + robot_width) / 2 - leg_width, height / 2 - head_height / 2 - neck_length / 2],
  [(width + robot_width) / 2 - leg_width, (height - robot_height) / 2],
  [(width + robot_width) / 2, (height - robot_height) / 2],
  [(width + robot_width) / 2, height / 2 - head_height / 2 - neck_length / 2],
]

const arm_left = [
  [(width - robot_width) / 2 + robot_width, (height + robot_height) / 2 - head_height - neck_length],
  [(width - robot_width) / 2 + robot_width, (height + robot_height) / 2 - head_height - neck_length - arm_width],
  [(width - robot_width) / 2 + robot_width + arm_dist, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2 + robot_width + arm_dist + arm_width, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2 + robot_width, (height + robot_height) / 2 - head_height - neck_length],
]

const arm_right = [
  [(width - robot_width) / 2, (height + robot_height) / 2 - head_height - neck_length],
  [(width - robot_width) / 2, (height + robot_height) / 2 - head_height - neck_length - arm_width],
  [(width - robot_width) / 2 - arm_dist, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2 - arm_width - arm_dist, height / 2 - head_height / 2 - neck_length / 2],
  [(width - robot_width) / 2, (height + robot_height) / 2 - head_height - neck_length],

]

finalLines.push(head);
finalLines.push(eye_left);
finalLines.push(eye_right);
finalLines.push(mouth);
finalLines.push(neck);
finalLines.push(body);
finalLines.push(leg_left);
finalLines.push(leg_right);
finalLines.push(arm_left);
finalLines.push(arm_right);

// transform lines using the toolkit
// bt.rotate(finalLines, 45);

// draw it
drawLines(finalLines);
