#define SPU 400

typedef void (*CallbackFunction)(uint8_t*, int);

struct EventCallback {
  String event;
  CallbackFunction callback;
};

float pos[] = {0, 0};

const int motor1StepPin = D6;
const int motor1DirPin = D5;
const int motor2StepPin = D7;
const int motor2DirPin = D8;

void setup() {

  Serial.begin(9600);

  pinMode(motor1StepPin, OUTPUT);
  pinMode(motor1DirPin, OUTPUT);
  pinMode(motor2StepPin, OUTPUT);
  pinMode(motor2DirPin, OUTPUT);

  on("go", go);
}

void loop() {

  readSerial();

}

void goTo(float x, float y) {
    // Set your target distances for each motor (in steps)
  float motor1Target = (x + y) - pos[0];
  float motor2Target = (y - x) - pos[1];

  // Set motor direction based on target values
  digitalWrite(motor1DirPin, motor1Target >= 0 ? HIGH : LOW);
  digitalWrite(motor2DirPin, motor2Target >= 0 ? HIGH : LOW);

  // Calculate the relative speeds and maximum duration for both motors
  float maxSteps = max(abs(motor1Target), abs(motor2Target));
  float motor1Speed = abs(motor1Target) / maxSteps;
  float motor2Speed = abs(motor2Target) / maxSteps;

  unsigned long stepDuration = 500; // The time it takes to perform one step in microseconds
  unsigned long motor1StepInterval = stepDuration / motor1Speed;
  unsigned long motor2StepInterval = stepDuration / motor2Speed;

  // Initialize variables for step timing
  unsigned long motor1PrevStepTime = 0;
  unsigned long motor2PrevStepTime = 0;
  float motor1Step = 0;
  float motor2Step = 0;

  // Loop until both motors reach their target steps
  while (abs(motor1Step) < abs(motor1Target) || abs(motor2Step) < abs(motor2Target)) {
    unsigned long currentTime = micros();

    // Motor 1
    if (abs(motor1Step) < abs(motor1Target) && currentTime - motor1PrevStepTime >= motor1StepInterval) {
      digitalWrite(motor1StepPin, HIGH);
      delayMicroseconds(1);
      digitalWrite(motor1StepPin, LOW);
      delayMicroseconds(1);

      motor1Step += (motor1Target >= 0 ? 1.0 : -1.0)/SPU;
      motor1PrevStepTime = currentTime;
    }

    // Motor 2
    if (abs(motor2Step) < abs(motor2Target) && currentTime - motor2PrevStepTime >= motor2StepInterval) {
      digitalWrite(motor2StepPin, HIGH);
      delayMicroseconds(1);
      digitalWrite(motor2StepPin, LOW);
      delayMicroseconds(1);

      motor2Step += (motor2Target >= 0 ? 1.0 : -1.0)/SPU;
      motor2PrevStepTime = currentTime;
    }
  }

  pos[0] += motor1Step;
  pos[1] += motor2Step;
}

void go(uint8_t* payload, int length) {
  float x = read_float(payload, 0);
  float y = read_float(payload, 4);
  
  goTo(x, y);
}

const int MAX_EVENTS = 255; // Maximum number of events to store, adjust as needed
EventCallback eventCallbacks[MAX_EVENTS];
int eventCount = 0;

void on(String event, CallbackFunction callback) {
  if (eventCount < MAX_EVENTS) {
    eventCallbacks[eventCount].event = event;
    eventCallbacks[eventCount].callback = callback;
    eventCount++;
  } else {
    Serial.println("Max number of events reached. Cannot register new event.");
  }
}

bool triggerEvent(String event, uint8_t* payload, int payloadLength) {
  for (int i = 0; i < eventCount; i++) {
    if (eventCallbacks[i].event == event) {
      // want to pass payload and payloadLength, need to get response payload
      eventCallbacks[i].callback(payload, payloadLength);
      return true;
    }
  }

  Serial.println("No event registered.");
  return false;
}

int bufferIndex = 0;
uint8_t msgBuffer[100];

void readSerial() {
  if (Serial.available() > 0) {
    uint8_t incoming = Serial.read(); 
    if (incoming == 0x0A) { // \n terminated
      int offset;
      int i = 0;

      uint8_t msgLength = msgBuffer[i];
      uint8_t msgArr[msgLength];

      i++;
      while (i < 1 + msgLength) {
        msgArr[offset] = msgBuffer[i];
        i++;
        offset++;
      }

      uint8_t payloadLength = msgBuffer[i];
      uint8_t payload[payloadLength];

      offset = 0;
      i++;
      while (i < 1 + msgLength + 1 + payloadLength) {
        payload[offset] = msgBuffer[i];
        i++;
        offset++;
      }

      uint8_t msgCount = msgBuffer[i];

      bufferIndex = 0;

      String msg = String((char*)msgArr);

      bool triggered = triggerEvent(msg, payload, payloadLength);
      if (triggered) {
        uint8_t byteArray[] = {
          0x03, // 3
          0x61, 0x63, 0x6B, // ack
          0x00, // 0
          msgCount,
          0x0A
        }; 
        size_t arrayLength = sizeof(byteArray) / sizeof(byteArray[0]); // Calculate the length of the byte array

        Serial.write(byteArray, arrayLength);
      }
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

String byteArrayToString(byte arr[], int length) {
  String result = "";

  for (int i = 0; i < length; i++) {
    result += (char)arr[i]; // Convert each byte to a character and append it to the string
  }

  return result;
}

/*

if (msg == 0x00) { // "go"

  float x = read_float(msgBuffer, 1);
  float y = read_float(msgBuffer, 5);
  
  goTo(x, y);
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
  // servo.write(angle);

  Serial.print("servo: ");
  Serial.println(angle);
}

*/









