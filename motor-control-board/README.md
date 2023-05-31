# [Motor Control Board](https://leomcelroy.com/svg-pcb/?file=https://github.com/hackclub/haxidraw/blob/main/motor-control-board/circuit/motor-control-board.js)

Ultimately the idea is that each device will have it's own little board which we network together through Modular Things.

For development purposes (and for the sake of doing due diligence) I decided to make a single control board as well which the two steppers and single servo and plug into. It saves money because the board only requires one Xiao instead of three. I decided to use SVG PCB to design the board because I'm pretty comfortable with the software (because I wrote it). Additionally, a community contributor to the project (Kris) recently added Gerber export which I was eager to use.

https://www.snapeda.com/parts/102010388/Seeed%20Technology%20Co.%2C%20Ltd/view-part/?ref=search&t=xiao Xiao board

![Seeeduino-XIAO-pinout-1](https://user-images.githubusercontent.com/27078897/228574704-c915e09c-e003-4cff-96e2-54516c05eefa.jpg) (_Seeduino XIAO pinout_)

![stepper motor driver](https://user-images.githubusercontent.com/27078897/228574724-5ba97131-4382-4651-a72e-8aebf1cabaaa.jpg) (_A4988 Stepstick Stepper Motor Driver Module_)

![Screen Shot 2023-03-29 at 10 39 46 AM](https://user-images.githubusercontent.com/27078897/228574762-d211bedb-085e-42d4-ab3a-5761f78e579d.png) (_board design in SVGPCB_)

<img width="1228" alt="tracespace view" src="https://user-images.githubusercontent.com/27078897/228574940-f192d2ad-80f3-4d30-a1b3-9cd271ae8c55.png">

([_tracespace.io/view_](https://tracespace.io/view))

## Bill of Materials

| Quantity | Thing                                                                                                                                            | Supplier                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| 1        | 100uf aluminum electrolytic capacitor (EEE-FN1H101V)                                                                                             | [Mouser](https://www.mouser.com/ProductDetail/Panasonic/EEE-FN1H101V?qs=OlC7AqGiEDkqWr496XIoYQ%3D%3D)   |
| 1        | .1uf capactior ceramic (CC1206KRX7R9BB104)                                                                                                       | [Mouser](https://www.mouser.com/ProductDetail/YAGEO/CC1206KRX7R9BB104?qs=AgBp2OyFlx9LH1KRd7TZVQ%3D%3D)  |
| 1        | circuit board ([design here](https://leomcelroy.com/svg-pcb/?file=https://raw.githubusercontent.com/hackclub/drawing-thing/main/motor-board.js)) | [JLCPCB](https://jlcpcb.com)                                                                            |
| 3        | A4988 Stepstick Stepper Motor Driver Module                                                                                                      | [Amazon](https://www.amazon.com/gp/product/B07BND65C8?smid=A30QSGOJR8LMXA)                              |
| 1        | 3-pin male header (for servo)                                                                                                                    | Generic                                                                                                 |
| 4        | 4-pin male header                                                                                                                                | Generic                                                                                                 |
| 1        | RP2040 Xiao board (with two 7-pin male headers soldered on)                                                                                      | [Seeed Studio](https://www.seeedstudio.com/XIAO-RP2040-v1-0-p-5026.html)                                |
| 1        | USB-C Female Input 15V DC Fixed Voltage Power Module 5A                                                                                          | [Amazon](https://www.amazon.com/gp/product/B08NFKV2LD/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1) |
