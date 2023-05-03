#ifndef STEPPER_DRIVER_H_
#define STEPPER_DRIVER_H_

#include <Arduino.h>
#include "pico/stdlib.h"
#include "hardware/pwm.h"

#define N_AXIS 2

// this is the "limit" pin
#define PIN_BUT 27

void stepper_init(void);
void stepper_step(uint8_t microSteps, boolean dir);
void stepper_setCScale(float scale);

#endif
