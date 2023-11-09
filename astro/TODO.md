## Current

Let's fix right now:

- Recaptcha
- Remix to save edits not redirecting properly (even though it works locally)
- Remove unnecessary buttons in toolbar when logged in

- Replace assembly images with local links (instead of raw.githubusercontent.com links) for caching purposes
- Fix 3D gallery in virtual-gallery (revert to previous commit; I must have made some rename that broke it)
- Get <MobileUnsupported/> to actually show up for the editor (or just have the preview show up?)
- Fix "3D gallery" link on /gallery
- Get better images for the gallery and the guides (at least, have them adhere to some common theme)
- Get ThreeDModel.astro working on front page (and maybe place in a different location, depending on preference
- Fix timeline scroll on front page
- Media queries for front page
- Logout button preferably in Navbar.astro
- Redesign modal in editor so for example, you can actually see share link, which currently is offscreen

* main page

  - landing
  - editor
  - workshops
    - open in editor
  - gallery
    - 3d maze
    - 2d
  - assembly
  - how to submit art
    - get in gallery
    - get machine

* download flipping
  - png
  - svg
* bezier widget
* console for controlling machine
  - run machine -> stop machine
* file naming
* move incompatible browser to when you connect machine
* add examples tab

# MAYBE

- better console logging
- infinite loops

- display sense of scale
  - [x] show mouse position
  - add grid

# DONE

- add `drawTurtles` back
- `createTurtle`
- zooming
- render svg document dimensions
  - `setDocumentDimensions(w, h)`
- drag and drop
  - svg
  - js
- download svg
- jarring when opening and closing warning panel
- rendering optimization - meet perf of previous editor
- make download menu with js, svg
