#include "motionStateMachine.h"
#include "stepperDriver.h"

#include <Servo.h>

#define PIN_SERVO D4

Servo servo;

// motion_setPositionTarget(targ, maxVel, maxAccel);
// motion_setVelocityTarget(targ, maxAccel);
// motion_getCurrentStates(&state);
// motion_setPosition(pos);
// stepper_setCScale(cscale);

float MAX_SPEED = 5000.0F;
float ACCEL = 5000.0F;

void setup() {
  servo.attach(PIN_SERVO);

  Serial.begin(115200); // initialize serial communication

  stepper_init();
  motion_init(250);
}

void loop() {
  // check for incoming serial data
  readSerial();
}


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
        
        motion_setPositionTarget(0, floatData0, MAX_SPEED, ACCEL);
        motion_setPositionTarget(1, floatData1, MAX_SPEED, ACCEL);

        // in js should await this response
        Serial.print("moveTo: ");
        Serial.print(floatData0);
        Serial.print(" ");
        Serial.print(floatData1);
        Serial.println("");
      }

      if (msg == 0x01) { // "accel"
        float value = read_float(msgBuffer, 1);
        ACCEL = value;
        Serial.print("accel: ");
        Serial.println(value);
      }

      if (msg == 0x02) { // "maxSpeed"
        float value = read_float(msgBuffer, 1);
        MAX_SPEED = value;
        Serial.print("speed: ");
        Serial.println(value);
      }

      if (msg == 0x03) { // "servo"
        int angle = read_int(msgBuffer, 1);
        servo.write(angle);

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

  // int32_t intData = (byte0 << 24) | (byte1 << 16) | (byte2 << 8) | byte3;
  // float floatData = (float)intData;

  uint8_t byteArray[] = {byte0, byte1, byte2, byte3};
  float floatValue;
  memcpy(&floatValue, &byteArray, sizeof(floatValue));

  // Serial.println("floatValue");
  // Serial.println(floatValue);

  return floatValue;
}

uint16_t read_uint16(uint8_t* buffer, int index) {
  uint8_t byte0 = buffer[index];
  uint8_t byte1 = buffer[index+1];

  uint8_t byteArray[] = {byte0, byte1};
  uint16_t value;
  memcpy(&value, &byteArray, sizeof(value));

  // Serial.println("uint16");
  // Serial.println(value);

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

  // Serial.println("int");
  // Serial.println(value);

  return value;
}

