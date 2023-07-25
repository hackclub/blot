import cv2
import math
import numpy as np
import pyautogui
import time
import pyautogui

cv2.namedWindow("preview")

vc = cv2.VideoCapture(3)

control = True

dt = 0

time.sleep(1)
if vc.isOpened():
    rval, frame = vc.read()
else:
    rval = False

currTime = time.time()
lastTime = time.time()

while rval:
    lower = np.array([250, 250, 250], dtype="uint8")
    upper = np.array([252, 252, 252], dtype="uint8")
    mask = cv2.inRange(frame, lower, upper)

    cnts = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]

    for c in cnts:
        x,y,w,h = cv2.boundingRect(c)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0,0,255), 2)
    if (len(cnts) > 0):
        c = max(cnts, key = cv2.contourArea)
        b = cv2.boundingRect(c)
        x, y = b[0] / 640, b[1] / 480
        currTime = time.time()
        dt = currTime - lastTime
        lastTime = currTime
        if control:
            if not (0.45 < x < 0.55):
                pyautogui.moveTo(2256 - x * 2256, y * 1504, 0, _pause=False)
            else:
                pyautogui.moveTo(2256/2, 1504/2, dt, _pause=False)
            if (x < 0.2): pyautogui.press('s', _pause=False)
            if (y > 0.8): pyautogui.press('w', _pause=False)
    cv2.imshow("preview", frame)
    cv2.imshow("preview2", mask)
    rval, frame = vc.read()
    key = cv2.waitKey(20)
    if key == 27:
        break

cv2.destroyWindow("preview")
vc.release()