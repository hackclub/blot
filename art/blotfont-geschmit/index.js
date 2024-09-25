/*
@title: Blot Font
@author: geschmit
@snapshot: blotfont_logo.png
*/

/**
 * BlotFont - A demo of the BlotFont library
 * This is a demo of my BlotFont library I wrote for the Hack Club Blot, which
 * makes drawing text easy to do.
 *
 * Originally, this was a standalone program which ran independently. As of
 * writing, however, it's been reimplemented in the toolkit and made
 * even easier to use!
 *
 * You can find the original here: https://github.com/geschmit/blotfont
 *
 */

setDocDimensions(850, 900)
drawLines([
  ...bt.text("Introducing:\nThe Hack Club Blot!\n", [48, 789], 14),
  ...bt.text(
    `-> What is it?
  ****************************
  
  
  
  
  
  -> How do you get one?
  ****************************`,
    [48, 665],
    7
  ),
  ...bt.text(
    `
  The Blot is an experimental, DIY drawing machine, created by 
  Hack Club to demonstrate programatic art creation. Although
  it is possible to 3D print all the parts needed, kits are 
  available for all high schoolers who can submit a piece of 
  artwork to the Blot website!
  
  
  
  
    
  1. Create it!
      Go to https://blot.hackclub.com/ to learn how to
      draw using the Blot's easy to use code framework.
      
  2. PR it!
      Clone the source repo, add your code and open a
      new pull request with your additions for a Hack
      Club staff to review.
  
  3. Build it!
      If your submission is accepted, Hack Club will
      ship you a kit with all the parts needed to make
      your own drawing machine(a >$150 value!)`,
    [30, 616],
    4.75,
    [2.75, 5]
  ),
  ...bt.text(`drawn w/ blot by geschmit`, [652, 10], 3)
])