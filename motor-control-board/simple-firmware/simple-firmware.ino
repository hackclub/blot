
#define AXIS_NUM 2

const int dirPins[AXIS_NUM] = { D5, D8 };
const int stepPins[AXIS_NUM] = { D6, D7 };

int targetPositions[] = {0, 0};
int positions[] = {0, 0};
// int speeds[] = {300, 300};

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < AXIS_NUM; i++) {
    pinMode(dirPins[i], OUTPUT);
    pinMode(stepPins[i], OUTPUT);
  }

  goTo(0, 0);
  goTo(0, -0.5);
  goTo(1, -0.5);
  goTo(1, -1.5);
  goTo(2, -1.5);
  goTo(2, -2.5);
  goTo(3, -2.5);

  // goTo(0, 0);
  // goTo(1, 0);
  // goTo(1, 1);
  // goTo(0, 1);
  // goTo(0, 0);

  // goTo(1, .5);
  // goTo(3, .5);
  // goTo(-.3, -.5);
  // goTo(0, 0);

}

void loop() {
  readSerial();
}

float motorIntervals[AXIS_NUM] = { 100, 100 };

void moveToTarget() {
  int maxIndex = abs(distanceToGo(0)) > abs(distanceToGo(1)) ? 0 : 1;
  int minIndex = (maxIndex+1)%2;
  int maxSteps = abs(distanceToGo(maxIndex));
  int minSteps = abs(distanceToGo(minIndex));

  int lastStep = 0;

  for (int i = 0; i < maxSteps; i++) {
    moveCloser(maxIndex);

    while (i - lastStep > maxSteps/minSteps) {
      moveCloser(minIndex);
      lastStep++;
    }
  }

  while (distanceToGo(minIndex) != 0) moveCloser(minIndex);
}

void moveCloser(int i) {
  if (distanceToGo(i) == 0) return;

  bool dir = distanceToGo(i) > 0;
  step(i, dir);
}

void step(int i, bool dir) {
  digitalWrite(dirPins[i], dir);

  digitalWrite(stepPins[i], HIGH);
  delayMicroseconds(500);
  digitalWrite(stepPins[i], LOW);
  delayMicroseconds(500);

  positions[i] = positions[i] + ( dir ? 1 : -1);
}

int distanceToGo(int i) {
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

void goTo(float x, float y) {
  int SCALE = 1000;
  int step0 = (int)(x + y)*SCALE;
  int step1 = (int)(y - x)*SCALE;
  targetPositions[0] = step0;
  targetPositions[1] = step1;
  moveToTarget();
  delay(2000);
}






