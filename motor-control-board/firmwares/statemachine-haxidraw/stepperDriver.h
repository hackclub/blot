#ifndef STEPPER_DRIVER_H_
#define STEPPER_DRIVER_H_

#include <Arduino.h>
#include "pico/stdlib.h"
#include "hardware/pwm.h"

#define N_AXIS 2

void stepper_init(void);
void stepper_step(int i, boolean dir);

#endif
