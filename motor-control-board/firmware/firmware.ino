#include <Servo.h>

#define SPU 400
#define PIN_SERVO D4

Servo servo;

typedef uint8_t (*CallbackFunction)(uint8_t*, int, uint8_t*);

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

  on("light", onLight);
  on("go", go);
  on("servo", moveServo);

  pinMode(motor1StepPin, OUTPUT);
  pinMode(motor1DirPin, OUTPUT);
  pinMode(motor2StepPin, OUTPUT);
  pinMode(motor2DirPin, OUTPUT);

  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  readSerial();
}

uint8_t onLight(uint8_t* payload, int length, uint8_t* reply) {
  uint8_t value = payload[0];

  // Serial.println("light it up");

  digitalWrite(PIN_LED, value);

  return 0;
}


/* ------------------------------------------------------------ */

int bufferIndex = 0;
uint8_t msgBuffer[100];

void readSerial() {
  while (Serial.available() > 0) {
    uint8_t incoming = Serial.read(); 

    msgBuffer[bufferIndex] = incoming;

    if (incoming != 0) {
      bufferIndex++;
      continue; // Proceed to the next byte if current byte is not null
    }

    // Serial.print("RECEIVED: ");
    // for (int i = 0; i < bufferIndex; i++) {
    //   Serial.print(msgBuffer[i]);
    //   Serial.print(", ");
    // }
    // Serial.println("DONE");

    // Now we have a full message, perform COBS decoding
    uint8_t decoded[bufferIndex];
    cobs_decode(decoded, msgBuffer, bufferIndex);

    // Serial.print("DECODED: ");
    // for (int i = 0; i < bufferIndex; i++) {
    //   Serial.print(decoded[i]);
    //   Serial.print(", ");
    // }
    // Serial.println("DONE");

    // Parse the decoded message
    int i = 0;

    uint8_t msgLength = decoded[i];
    // Serial.print("MSG-LENGTH: ");
    // Serial.println(msgLength);

    uint8_t msgArr[msgLength];
    i++;
    while (i < 1 + msgLength) {
      msgArr[i-1] = decoded[i];
      i++;
    }

    // Serial.print("MSGARR: ");
    // for (int i = 0; i < msgLength; i++) {
    //   Serial.print(msgArr[i]);
    //   Serial.print(", ");
    // }
    // Serial.println("MSGARR-END");

    uint8_t payloadLength = decoded[i];
    uint8_t payload[payloadLength];
    i++;
    while (i < 1 + msgLength + 1 + payloadLength) {
      payload[i-1-msgLength-1] = decoded[i];
      i++;
    }

    uint8_t msgCount = decoded[i];

    // String msg = String((char*)msgArr);
    String msg = byteArrayToString(msgArr, msgLength);

    // Serial.println(msg);

    // Serial.print("PAYLOAD: ");
    // for (int i = 0; i < payloadLength; i++) {
    //   Serial.print(payload[i]);
    //   Serial.print(", ");
    // }
    // Serial.println("PAYLOAD-END");

    // Serial.print("MSGCOUNT: ");
    // Serial.println(msgCount);

    bool triggered = triggerEvent(msg, payload, payloadLength, msgCount);

    bufferIndex = 0; // Reset the buffer for the next message
  }
}

/* ------------------------------------------------------------ */



const int MAX_EVENTS = 255; // Maximum number of events to store, adjust as needed
EventCallback eventCallbacks[MAX_EVENTS];
int eventCount = 0;

const int REPLY_PAYLOAD_LENGTH = 255;
uint8_t reply[REPLY_PAYLOAD_LENGTH];

void on(String event, CallbackFunction callback) {
  if (eventCount < MAX_EVENTS) {
    eventCallbacks[eventCount].event = event;
    eventCallbacks[eventCount].callback = callback;
    eventCount = (eventCount + 1) % MAX_EVENTS;
  } else {
    // Serial.println("Max number of events reached. Wrapping events.");
  }
}

bool triggerEvent(String event, uint8_t* payload, int payloadLength, uint8_t msgCount) {
  for (int i = 0; i < eventCount; i++) {
    if (eventCallbacks[i].event == event) {
      // want to pass payload and payloadLength, need to get response payload
      uint8_t reply_length = eventCallbacks[i].callback(payload, payloadLength, reply);

      sendAck(msgCount, reply, reply_length);
      return true;
    }
  }

  // Serial.println(" No event registered.");
  return false;
}

void sendAck(uint8_t msgCount, uint8_t* reply, uint8_t length) {
  int arrayLength = 6 + length;
  uint8_t byteArray[arrayLength];

  byteArray[0] = 0x03;
  byteArray[1] = 0x61;
  byteArray[2] = 0x63;
  byteArray[3] = 0x6B;
  byteArray[4] = length;
  for (int i = 0; i < length; i++) {
    byteArray[i+5] = reply[i];
  }
  byteArray[5+length] = msgCount;
  byteArray[5] = msgCount;
      
  uint8_t byteArrayEncoded[arrayLength + 2]; // +2 for possible COBS overhead
  cobs_encode(byteArrayEncoded, byteArray, arrayLength);

  Serial.write(byteArrayEncoded, arrayLength + 2);
}

/* ------------------------------------------------------------ */

void cobs_encode(uint8_t *dst, const uint8_t *src, size_t len) {
    size_t read_index = 0;
    size_t write_index = 1;
    size_t code_index = 0;
    uint8_t code = 1;

    while (read_index < len) {
        if (src[read_index] == 0) {
            dst[code_index] = code;
            code = 1;
            code_index = write_index++;
            read_index++;
        } else {
            dst[write_index++] = src[read_index++];
            code++;
            if (code == 0xFF) {
                dst[code_index] = code;
                code = 1;
                code_index = write_index++;
            }
        }
    }

    dst[code_index] = code;

    // Add trailing zero
    if (write_index < len + 2) {
        dst[write_index] = 0;
    }
}

void cobs_decode(uint8_t *dst, const uint8_t *src, size_t len) {
    size_t i, j, dst_i = 0;
    for (i = 0; i < len;) {
        uint8_t code = src[i++];
        for (j = 1; j < code && i < len; j++) {
            dst[dst_i++] = src[i++];
        }
        if (code < 0xFF && dst_i < len) {
            dst[dst_i++] = 0;
        }
    }
}

/* ------------------------------------------------------------ */

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

/* ------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------ */


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

uint8_t go(uint8_t* payload, int length, uint8_t* reply) {
  float x = read_float(payload, 0);
  float y = read_float(payload, 4);
  
  goTo(x, y);

  return 0;
}

uint8_t moveServo(uint8_t* payload, int length, uint8_t* reply) {
  float angle = read_float(payload, 0);
  
  servo.write(angle);

  return 0;
}



