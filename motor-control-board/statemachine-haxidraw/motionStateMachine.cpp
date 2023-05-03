#include "motionStateMachine.h"
#include "stepperDriver.h"

// stopping criteria... state machine is not perfect,
#define POS_EPSILON 0.01F
#define VEL_EPSILON 1.0F
#define TICK_INTERVAL 1000.0F

#define PIN_DEBUG_CLK 26

#define ALARM_DT_NUM 1
#define ALARM_DT_IRQ TIMER_IRQ_1

float delT = 0.001F;
uint32_t delT_us = 1;
volatile uint8_t mode = MOTION_MODE_POS;
volatile float pos[N_AXIS];
volatile float vel[N_AXIS];
volatile float accel[N_AXIS];

float maxAccel[N_AXIS];
float maxVel[N_AXIS];                    
float absMaxVelocity[N_AXIS];

float posTarget[N_AXIS];
float velTarget[N_AXIS];

volatile float delta[N_AXIS];
volatile float stepModulo[N_AXIS];
volatile float distanceToTarget[N_AXIS];
volatile float stopDistance[N_AXIS];

void motion_init(uint16_t microsecondsPerIntegration){
  delT = (float)(microsecondsPerIntegration) / 1000000.0F;
  delT_us = microsecondsPerIntegration;

  for (int i=0; i < N_AXIS; i++) {
    pos[i] = 0.f;
    vel[i] = 0.f;
    accel[i] = 0.f;
    maxAccel[i] = 5000.f;
    absMaxVelocity[i] = 1.0F / delT;
    maxVel[i] = absMaxVelocity[i];
    posTarget[i] = 0.f;
    velTarget[i] = 0.f;
    delta[i] = 0.f;
    stepModulo[i] = 0.f;
    distanceToTarget[i] = 0.f;
    stopDistance[i] = 0.f;
  }

  hw_set_bits(&timer_hw->inte, 1u << ALARM_DT_NUM);
  irq_set_exclusive_handler(ALARM_DT_IRQ, alarm_dt_Handler);
  irq_set_enabled(ALARM_DT_IRQ, true);
  timer_hw->alarm[ALARM_DT_NUM] = (uint32_t) (timer_hw->timerawl + delT_us);
}

void alarm_dt_Handler(void){
  hw_clear_bits(&timer_hw->intr, 1u << ALARM_DT_NUM);
  timer_hw->alarm[ALARM_DT_NUM] = (uint32_t) (timer_hw->timerawl + delT_us);
  motion_integrate();
}

void motion_integrate(void) {
  for (int i = 0; i < N_AXIS; i++) {
    distanceToTarget[i] = posTarget[i] - pos[i];
    stopDistance[i] = (vel[i] * vel[i]) / (2.f * maxAccel[i]);
    if (abs(distanceToTarget[i] - delta[i]) < POS_EPSILON) {
      delta[i] = 0.f;
      vel[i] = 0.f;
      accel[i] = 0.f;
      continue;
    }
    if (stopDistance[i] >= abs(distanceToTarget[i])) {    
      if (vel[i] <= 0.f) {                           
        accel[i] = maxAccel[i];                     
      } else {                                 
        accel[i] = -maxAccel[i];                   
      }
    } else {
      if(distanceToTarget[i] > 0.0F){
        accel[i] = maxAccel[i];
      } else {
        accel[i] = -maxAccel[i];
      }
    }

    vel[i] += accel[i] * delT;

    if (vel[i] >= maxVel[i]) {
      accel[i] = 0.f;
      vel[i] = maxVel[i];
    } else if (vel[i] <= -maxVel[i]) {
      accel[i] = 0.f;
      vel[i] = -maxVel[i];
    }

    delta[i] = vel[i] * delT;
    pos[i] += delta[i];

    stepModulo[i] += delta[i];
    if(stepModulo[i] >= 1.f) {
      stepper_step(i, true);
      stepModulo[i] -= 1.0F;
    } else if (stepModulo[i] <= -1.0F) {
      stepper_step(i, false);
      stepModulo[i] += 1.0F;
    }
    
  }
} // end integrator

void motion_setPositionTarget(int i, float _targ, float _maxVel, float _maxAccel) {
  noInterrupts();
  maxAccel[i] = _maxAccel;
  maxVel[i] = _maxVel;
  posTarget[i] = _targ;
  interrupts();
}

void motion_setPosition(int i, float _pos) {
  pos[i] = _pos;
}

void motion_getCurrentStates(int i, motionState_t* statePtr) {
  noInterrupts();
  statePtr->pos = pos[i];
  statePtr->vel = vel[i];
  statePtr->accel = accel[i];
  interrupts();
}
