/*
@title: Vroom
@author: Karman
@snapshot: Vroom12
*/

// Set the document dimensions
setDocDimensions(125, 125);

// Define a function to draw a car with randomized wheel spokes
function drawCarWithRandomWheels() {
  const carShapes = [];
  
  // Define the car body
  const carBody = [
    [20, 40], [20, 65], // Left side of the car top
    [35, 75], [90, 75], // Roof of the car
    [105, 65], [105, 45], // Right side of the car top
    [105, 40], [20, 40]  // Bottom of the car
  ];

  carShapes.push(carBody); // Add the car body to the shapes array

  // Define the windshield
  const windshield = [
    [30, 65], [40, 75], // Left side of the windshield
    [85, 75], [95, 65]  // Right side of the windshield
  ];

  carShapes.push(windshield); // Add the windshield to the shapes array

  // Define the car door
  const door = [
    [50, 40], [50, 65], // Left side of the door
    [80, 65], [80, 40]  // Right side of the door
  ];

  carShapes.push(door); // Add the door to the shapes array

  // Define the door handle
  const handle = [
    [70, 55], [75, 55]
  ];

  carShapes.push(handle); // Add the handle to the shapes array

  // Define the headlight
  const headlight = [
    [95, 45], [105, 45], [105, 50], [95, 50], // Rectangular headlight
    [95, 45]
  ];

  carShapes.push(headlight); // Add the headlight to the shapes array

  // Wheel parameters
  const wheelCenters = [[45, 35], [80, 35]]; // Positions of the wheels
  const wheelRadius = 10; // Radius of the wheels
  const spokesOptions = [5, 8, 20]; // Spoke design options

  // Function to draw a wheel with spokes
  function drawWheel(center, radius, numSpokes) {
    const [cx, cy] = center;
    const wheel = [];
    const spokeAngle = 360 / numSpokes;

    // Create the wheel circle
    for (let angle = 0; angle < 360; angle += spokeAngle) {
      const radian = (angle * Math.PI) / 180;
      wheel.push([cx + radius * Math.cos(radian), cy + radius * Math.sin(radian)]);
    }
    wheel.push(wheel[0]); // Close the wheel circle

    // Add spokes
    const spokes = [];
    for (let i = 0; i < numSpokes; i++) {
      const angle = (i * 360 / numSpokes) * Math.PI / 180;
      spokes.push([[cx, cy], [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]]);
    }

    return wheel.concat(...spokes);
  }

  // Randomly select spoke designs for each wheel
  const chosenSpokes = spokesOptions.map(() => spokesOptions[bt.randIntInRange(0, spokesOptions.length - 1)]);
  
  // Draw the wheels with the chosen spoke designs
  wheelCenters.forEach((center, index) => {
    carShapes.push(drawWheel(center, wheelRadius, chosenSpokes[index]));
  });

  // Draw all the car shapes
  carShapes.forEach(shape => drawLines([shape], { stroke: 'black', width: 2 }));
}

// Call the function to draw the car with random wheels
drawCarWithRandomWheels();
