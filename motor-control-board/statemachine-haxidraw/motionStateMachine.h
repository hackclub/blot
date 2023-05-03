#ifndef MOTION_STATE_MACHINE_H_
#define MOTION_STATE_MACHINE_H_

#include <Arduino.h>
#include <hardware/timer.h>
#include <hardware/irq.h>

#define MOTION_MODE_POS 0
#define MOTION_MODE_VEL 1

// struct for a handoff, 
typedef struct motionState_t {
  float pos;
  float vel;
  float accel;
} motionState_t;

void motion_init(uint16_t microsecondsPerIntegration);

void motion_integrate(void);
void alarm_dt_Handler(void);

void motion_setPositionTarget(int i, float _targ, float _maxVel, float _maxAccel);
void motion_setVelocityTarget(int i, float _targ, float _maxAccel);
void motion_setPosition(int i, float _pos);

void motion_getCurrentStates(int i, motionState_t* statePtr);

#endif 
