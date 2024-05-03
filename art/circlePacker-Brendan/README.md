Circle Packer fills the page with circles suboptimally.

Most of the code was reused and adapted from a [project I did a year ago](https://github.com/Brelee2222/CLUCK/blob/main/src/frontend/dash/circlePacker.ts)

The packer works by attempting to fit circles in between two others. If the circle cannot be fit, the size is reduced is attempts to fit the circle again.

These are the following configurable values that will change how the blot will print:<br />
* targetAreaFill -- This value changes how much the circles need to fill of the area before the program stops generating circles.
* minCircleSize -- This value sets a minimum radius a circle needs to be in order to be shown/printed by the blot.
* bt.setRandSeed(seed); -- Sets a seed to the randomness.

