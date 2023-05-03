#include "stepperDriver.h"

// change pins
int pins_dir[N_AXIS] = { D5, D8 };
int pins_step[N_AXIS] = { D6, D7 };

uint32_t pins_dir_bm[N_AXIS];
uint32_t pins_step_bm[N_AXIS];

void stepper_init(void){
  for (int i = 0; i < N_AXIS; i++) {
    pinMode(pins_step[i], OUTPUT);
    pinMode(pins_dir[i], OUTPUT);
    pins_step_bm[i] = (uint32_t)(1 << pins_step[i]);
    pins_dir_bm[i] = (uint32_t)(1 << pins_dir[i]);
  }
}

void stepper_step(int i, boolean dir){
  if (dir) {
    sio_hw->gpio_set = pins_dir_bm[i];
  } else {
    sio_hw->gpio_clr = pins_dir_bm[i];
  }
  sio_hw->gpio_set = pins_step_bm[i];
  delayMicroseconds(10);
  sio_hw->gpio_clr = pins_step_bm[i];
}
