#include <Servo.h>

#define SPU 400

#define PIN_SERVO D4

// #define TERMINATOR 0x0A

Servo servo;

// Define a struct to hold commands and payloads
struct Command {
  String event;
  uint8_t* payload;
  int payloadLength;
  uint8_t msgCount;
};

// Define a queue to hold incoming commands
#define MAX_COMMANDS 50
Command commandQueue[MAX_COMMANDS];
int queueStart = 0;
int queueEnd = 0;

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
  servo.attach(PIN_SERVO);
  
  Serial.begin(9600);

  pinMode(motor1StepPin, OUTPUT);
  pinMode(motor1DirPin, OUTPUT);
  pinMode(motor2StepPin, OUTPUT);
  pinMode(motor2DirPin, OUTPUT);

  on("go", go);
  on("servo", moveServo);
}

void loop() {

  readSerial();

  if (queueStart != queueEnd) {
    bool triggered = triggerEvent(commandQueue[queueStart].event, commandQueue[queueStart].payload, commandQueue[queueStart].payloadLength);
    if (triggered) {
      sendAck(commandQueue[queueStart].msgCount);
    }
    queueStart = (queueStart + 1) % MAX_COMMANDS;
  }
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
  // Serial.print(x);
  // Serial.print(" , ");
  // Serial.print(y);
  // Serial.println(" , moved in firmware");
}

void moveServo(uint8_t* payload, int length) {
  float angle = read_float(payload, 0);
  
  servo.write(angle);
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
    // Serial.println("Max number of events reached. Cannot register new event.");
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

  // Serial.print(event);
  // Serial.println(" No event registered.");
  return false;
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


void cobs_encode(uint8_t *dst, const uint8_t *src, size_t len) {
    if (len == 0) return;
    size_t read_idx = 0;
    size_t write_idx = 1;
    size_t code_idx = 0;
    uint8_t code = 1;

    while (read_idx < len) {
        if (src[read_idx] == 0) {
            dst[code_idx] = code;
            code = 1;
            code_idx = write_idx++;
            read_idx++;
        } else {
            dst[write_idx++] = src[read_idx++];
            code++;
            if (code == 0xFF) {
                dst[code_idx] = code;
                code = 1;
                code_idx = write_idx++;
            }
        }
    }

    dst[code_idx] = code;
}

void cobs_decode(uint8_t *dst, const uint8_t *src, size_t len) {
    if (len == 0) return;
    size_t read_idx = 0;
    size_t write_idx = 0;
    uint8_t code;
    uint8_t i;

    while (read_idx < len) {
        code = src[read_idx];

        if (read_idx + code > len && code != 1) {
            return; // Input is malformed.
        }

        read_idx++;

        for (i = 1; i < code; i++) {
            dst[write_idx++] = src[read_idx++];
        }
        if (code != 0xFF && read_idx != len) {
            dst[write_idx++] = '\0';
        }
    }
}


const int MAX_BUFFER_SIZE = 100;
const int MAX_MSG_LENGTH = 50;
const int MAX_PAYLOAD_LENGTH = 50;

int bufferIndex = 0;
uint8_t msgBuffer[MAX_BUFFER_SIZE + 2]; // Increased by 2 for possible COBS overhead

void readSerial() {
  while (Serial.available() > 0) {
    uint8_t incoming = Serial.read(); 
    if (bufferIndex >= MAX_BUFFER_SIZE) {
      bufferIndex = 0; // Reset the buffer index if buffer is full
      return;
    }

    msgBuffer[bufferIndex++] = incoming;

    if (incoming != 0) {
      continue; // Proceed to the next byte if current byte is not null
    }

    // cobsPrint("complete");


    // Now we have a full message, perform COBS decoding
    uint8_t decoded[MAX_BUFFER_SIZE];
    cobs_decode(decoded, msgBuffer, bufferIndex);


    // Parse the decoded message
    int i = 0;

    uint8_t msgLength = decoded[i++];
    if (msgLength > MAX_MSG_LENGTH || i + msgLength > bufferIndex) {
      // Message length is too large or out of buffer, possibly a corrupted message
      bufferIndex = 0; // Reset the buffer
      return;
    }

    uint8_t msgArr[MAX_MSG_LENGTH];
    memcpy(msgArr, decoded + i, msgLength); // Copy the message
    i += msgLength;

    uint8_t payloadLength = decoded[i++];
    if (payloadLength > MAX_PAYLOAD_LENGTH || i + payloadLength > bufferIndex) {
      // Payload length is too large or out of buffer, possibly a corrupted message
      bufferIndex = 0; // Reset the buffer
      return;
    }

    uint8_t payload[MAX_PAYLOAD_LENGTH];
    memcpy(payload, decoded + i, payloadLength); // Copy the payload
    i += payloadLength;

    uint8_t msgCount = decoded[i];

    String msg = String((char*)msgArr);

    commandQueue[queueEnd].event = msg;
    commandQueue[queueEnd].payload = payload;
    commandQueue[queueEnd].payloadLength = payloadLength;
    commandQueue[queueEnd].msgCount = msgCount;
    queueEnd = (queueEnd + 1) % MAX_COMMANDS;

    // At this point, the message and payload have been extracted from the buffer
    bufferIndex = 0; // Reset the buffer for the next message
  }
}

void sendAck(uint8_t msgCount) {
  uint8_t byteArray[] = {
    0x03, // 3
    0x61, 0x63, 0x6B, // ack
    0x00, // 0
    msgCount
  }; 

  size_t arrayLength = sizeof(byteArray) / sizeof(byteArray[0]);
    
  uint8_t byteArrayEncoded[arrayLength + 2]; // +2 for possible COBS overhead
  cobs_encode(byteArrayEncoded, byteArray, arrayLength);

  Serial.write(byteArrayEncoded, arrayLength + 2);
}

void cobsPrint(const String& message) {
  // Convert the message to a byte array
  int length = message.length();
  uint8_t byteArray[length + 1]; // +1 for the null terminator
  message.getBytes(byteArray, length + 1);

  // Prepare the buffer for the encoded message
  uint8_t encoded[length + 2]; // +2 for possible COBS overhead
  
  // Perform COBS encoding
  cobs_encode(encoded, byteArray, length + 1);

  // Send the encoded message
  Serial.write(encoded, length + 2); // Write the encoded bytes
}






