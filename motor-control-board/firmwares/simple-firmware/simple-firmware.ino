
#define AXIS_NUM 2
#define SPU 400.0
#define EPSILON 0.1

const int dirPins[AXIS_NUM] = { D5, D8 };
const int stepPins[AXIS_NUM] = { D6, D7 };

float targetPositions[] = {0, 0};
float positions[] = {0, 0};

unsigned long motorIntervals[AXIS_NUM] = { 0, 0 };
unsigned long prevMotorTime[AXIS_NUM] = { 0, 0 };

void setup() {
  Serial.begin(9600);

  for (int i = 0; i < AXIS_NUM; i++) {
    pinMode(dirPins[i], OUTPUT);
    pinMode(stepPins[i], OUTPUT);
  }

  goTo(0.0, 0.0);
  goTo(10.0, 10.0);
  // goTo(0.0, 0.0);

}

void loop() {
  readSerial();
  
}



void moveToTarget() {
  while (!isDone()) {
    
    for (int i = 0; i < AXIS_NUM; i++) {
      unsigned long prev = prevMotorTime[i];
      unsigned long curr = millis();
      if (curr - prev > motorIntervals[i]) {
        moveCloser(i);
        prevMotorTime[i] = curr;
      }
      
    }
  }
}

void setIntervals() {
  // give a fixed amount of time to the bigger step
  float delta_0 = targetPositions[0] - positions[0];
  float delta_1 = targetPositions[1] - positions[1];
  float maxDist = max(delta_0, delta_1);
  float minDist = min(delta_0, delta_1);
  int maxIndex = delta_0 >= delta_1 ? 0 : 1;
  int minIndex = delta_0 < delta_1 ? 0 : 1;

  // float maxD = max(delta_0, delta_1);
  // float minD = min(delta_0, delta_1);

  // float ratio = abs(delta_0/delta_1);

  // Serial.println(abs(minD/maxD));
  // Serial.println(ratio);

  Serial.println("deltas");
  Serial.println(delta_0);
  Serial.println(delta_1);
  Serial.println(delta_0/delta_1);
  Serial.println("end");

  float ratio = abs(delta_0/delta_1);

  motorIntervals[0] = 1.0;
  motorIntervals[1] = 1.0;

}

bool isDone() {
  bool isDone = true;
  for (int i = 0; i < AXIS_NUM; i++) {
    isDone = isDone && (abs(distanceToGo(i)) < EPSILON);
  }

  return isDone;
}

void goTo(float x, float y) {
  // int SCALE = 1000;
  targetPositions[0] = x + y;
  targetPositions[1] = y - x;
  
  bresenham_loop();

  // setIntervals();
  // moveToTarget();
  // delay(200);
}


void moveCloser(int i) {
  // Serial.println(distanceToGo(i));
  // if (abs(distanceToGo(i)) < EPSILON) return;
  bool dir = distanceToGo(i) > 0;
  step(i, dir);
}

void step(int i, bool dir) {
  digitalWrite(dirPins[i], dir);

  digitalWrite(stepPins[i], HIGH);
  delayMicroseconds(5);
  digitalWrite(stepPins[i], LOW);
  delayMicroseconds(5);

  positions[i] = positions[i] + (dir ? 1.0 : -1.0)/SPU;
}

float distanceToGo(int i) {
  return targetPositions[i] - positions[i];
}

int bufferIndex = 0;
uint8_t msgBuffer[100];

void readSerial() {
  if (Serial.available() > 0) {
    uint8_t incoming = Serial.read(); 
    if (incoming == 0x0A) { // \n terminated
      uint8_t msg = msgBuffer[0];
      if (msg == 0x00) { // "go"

        float x = read_float(msgBuffer, 1);
        float y = read_float(msgBuffer, 5);
        
        goTo(x, y);

        Serial.println(x);
        Serial.println(y);
        Serial.println("move");
      }

      // if (msg == 0x01) { // "accel"
      //   float value = read_float(msgBuffer, 1);
      //   ACCEL = value;
      //   Serial.print("accel: ");
      //   Serial.println(value);
      // }

      // if (msg == 0x02) { // "maxSpeed"
      //   float value = read_float(msgBuffer, 1);
      //   MAX_SPEED = value;
      //   Serial.print("speed: ");
      //   Serial.println(value);
      // }

      if (msg == 0x03) { // "servo"
        int angle = read_int(msgBuffer, 1);
        // servo.write(angle);

        Serial.print("servo: ");
        Serial.println(angle);
      }

      bufferIndex = 0;
    } else {
      msgBuffer[bufferIndex] = incoming;
      bufferIndex = bufferIndex + 1;

      if (bufferIndex >= 100) {
        Serial.println("Communication buffer overflow.");
      }
    }
  }
}

float read_float(uint8_t* buffer, int index) {
  uint8_t byte0 = buffer[index];
  uint8_t byte1 = buffer[index+1];
  uint8_t byte2 = buffer[index+2];
  uint8_t byte3 = buffer[index+3];

  uint8_t byteArray[] = {byte0, byte1, byte2, byte3};
  float floatValue;
  memcpy(&floatValue, &byteArray, sizeof(floatValue));

  return floatValue;
}

int read_int(uint8_t* buffer, int index) {
  uint8_t byte0 = buffer[index];
  uint8_t byte1 = buffer[index+1];
  uint8_t byte2 = buffer[index+2];
  uint8_t byte3 = buffer[index+3];

  uint8_t byteArray[] = {byte0, byte1, byte2, byte3};
  int value;
  memcpy(&value, &byteArray, sizeof(value));

  return value;
}

void bresenham_loop() {
  // Set your target distances for each motor (in steps)
  float motor1Target = targetPositions[0];
  float motor2Target = targetPositions[1];

  // Initialize variables for Bresenham's Algorithm
  float motor1Step = 0.0;
  float motor2Step = 0.0;
  float motor1Error = abs(motor1Target) / 2;
  float motor2Error = abs(motor2Target) / 2;

  // Set motor direction based on target values
  digitalWrite(dirPins[0], motor1Target >= 0 ? HIGH : LOW);
  digitalWrite(dirPins[1], motor2Target >= 0 ? HIGH : LOW);

  // Loop until both motors reach their target steps
  while (abs(motor1Step) < abs(motor1Target) || abs(motor2Step) < abs(motor2Target)) {
    // Motor 1
    motor1Error -= abs(motor1Target);
    if (motor1Error < 0 && abs(motor1Step) < abs(motor1Target)) {
      digitalWrite(stepPins[0], HIGH);
      delayMicroseconds(1); // Adjust for desired motor speed
      digitalWrite(stepPins[0], LOW);
      delayMicroseconds(1); // Adjust for desired motor speed

      motor1Step += motor1Target >= 0 ? 1.0/SPU : -1.0/SPU;
      motor1Error += abs(motor2Target);
    }

    // Motor 2
    motor2Error -= abs(motor2Target);
    if (motor2Error < 0 && abs(motor2Step) < abs(motor2Target)) {
      digitalWrite(stepPins[1], HIGH);
      delayMicroseconds(1); // Adjust for desired motor speed
      digitalWrite(stepPins[1], LOW);
      delayMicroseconds(1); // Adjust for desired motor speed

      motor2Step += motor2Target >= 0 ? 1.0/SPU : -1.0/SPU;
      motor2Error += abs(motor1Target);
    }
  }


  // Add a delay or other code here if you want to run the movement repeatedly
  delay(100);
}

float bresenham_step(int i) {
  bool dir = distanceToGo(i) > 0;

  digitalWrite(dirPins[i], dir);

  digitalWrite(stepPins[i], HIGH);
  delayMicroseconds(1);
  digitalWrite(stepPins[i], LOW);
  delayMicroseconds(1);

  float delta = (dir ? 1.0 : -1.0)/SPU;
  positions[i] = positions[i] + delta;

  return delta;
}




