#include <AccelStepper.h>
#include <MultiStepper.h>

#include <Servo.h>

#define PIN_SERVO D4

Servo servo;

// #define STEPS_PER_REV 200*16
uint16_t MAX_SPEED = 300;
uint16_t ACCEL = 5000;

#define NUMBER_OF_AXIS 2

const int dirPins[NUMBER_OF_AXIS] = { D5, D8 };
const int stepPins[NUMBER_OF_AXIS] = { D6, D7 };

long positions[NUMBER_OF_AXIS];

AccelStepper stepperArr[NUMBER_OF_AXIS];

MultiStepper steppers;

void setup() {
  servo.attach(PIN_SERVO);
  Serial.begin(115200); // initialize serial communication
  for (int i = 0; i < NUMBER_OF_AXIS; i++) {
    AccelStepper stepper(1, stepPins[i], dirPins[i]);
    stepperArr[i] = stepper;
    stepper.setMaxSpeed(MAX_SPEED);
    steppers.addStepper(stepper);
  }
}

void loop() {
  // check for incoming serial data
  readSerial();

  // steppers.run();
}

/*

possible packet structure

msglength msg packetlength payload

*/

int bufferIndex = 0;
uint8_t msgBuffer[100];

void readSerial() {
  if (Serial.available() > 0) {
    uint8_t incoming = Serial.read(); 
    if (incoming == 0x0A) { // \n terminated
      uint8_t msg = msgBuffer[0];
      if (msg == 0x00) { // "go"
        // 2 signed floats
        float floatData0 = read_float(msgBuffer, 1);
        float floatData1 = read_float(msgBuffer, 5);
        
        // stepperArr[0].moveTo(floatData0);
        // stepperArr[1].moveTo(floatData1);

        positions[0] = floatData0;
        positions[1] = floatData1;

        steppers.moveTo(positions);
        
        for(int i = 0; i < 2; i++) {
          Serial.print(positions[i]);
        }

        steppers.runSpeedToPosition();

        // in js should await this response
        Serial.println("moving");
      }

      if (msg == 0x01) { // "accel"
        float value = read_float(msgBuffer, 1);
        for (int i = 0; i < NUMBER_OF_AXIS; i++) {
          stepperArr[i].setAcceleration(value);
        }
        Serial.println("accel");
        Serial.println(value);
      }

      if (msg == 0x02) { // "maxSpeed"
        float value = read_float(msgBuffer, 1);
        for (int i = 0; i < NUMBER_OF_AXIS; i++) {
          stepperArr[i].setMaxSpeed(value);
        }
        Serial.println("speed");
        Serial.println(value);
      }

      if (msg == 0x03) { // "servo"
        int angle = read_int(msgBuffer, 1);
        servo.write(angle);

        Serial.println("servo");
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

  // int32_t intData = (byte0 << 24) | (byte1 << 16) | (byte2 << 8) | byte3;
  // float floatData = (float)intData;

  uint8_t byteArray[] = {byte0, byte1, byte2, byte3};
  float floatValue;
  memcpy(&floatValue, &byteArray, sizeof(floatValue));

  Serial.println("floatValue");
  Serial.println(floatValue);

  return floatValue;
}

uint16_t read_uint16(uint8_t* buffer, int index) {
  uint8_t byte0 = buffer[index];
  uint8_t byte1 = buffer[index+1];

  uint8_t byteArray[] = {byte0, byte1};
  uint16_t value;
  memcpy(&value, &byteArray, sizeof(value));

  Serial.println("uint16");
  Serial.println(value);

  return value;
}

int read_int(uint8_t* buffer, int index) {
  uint8_t byte0 = buffer[index];
  uint8_t byte1 = buffer[index+1];
  uint8_t byte2 = buffer[index+2];
  uint8_t byte3 = buffer[index+3];

  uint8_t byteArray[] = {byte0, byte1, byte2, byte3};
  int value;
  memcpy(&value, &byteArray, sizeof(value));

  Serial.println("int");
  Serial.println(value);

  return value;
}



