# How to Get a Blot!

So you just found out about this cool robotic drawing machine which you can build yourself, but how can you get one? The Blot is paid for by Hack Club, including shipping, but you should check for customs fees in your country before ordering. [^1]
[^1]: Customs fees aren't covered by Hack Club, so please look into how much customs is for an electronics kit order being shipped from the US if you are based outside the US.

**Prefer a video instead? You can find that [here!](https://youtu.be/AmbjNEPuv14)**

## 1) Make a unique piece of generative art

The first step is to make some generative art like that seen in [the gallery](https://blot.hackclub.com/gallery). You can follow [these guides](https://blot.hackclub.com/guides) to learn how to do that!

To get a Blot, your artwork needs to meet the following criteria (*subject to change*):

- Your artwork must be beautiful. It has to be something aesthetically interesting.
- Your artwork must be generative. 
  - You should expose some parameters at the top of your code which can adjust the art. This could be `setRandSeed` or some other variable used in your piece. This shold allow you to create multiple versions
- Your artwork must be drawable by the Blot machine.
  - This means it can't be too busy and have many overlapping lines.
  - It should fit within the workarea.
- Your artwork must be original.
  - You can't just copy an existing piece of art and mess with the numbers.
  - That being said, you can take inspiration from other art and remix a few pieces together.

I recommend trying to create a [figurative](https://en.wikipedia.org/wiki/Figurative_art) piece, which depicts a real life thing.
A key to being successful is being intentional with what you make. Sketch something out and have it in mind before you program it.




<details>
<summary>Here are some examples of some <b>acceptable pieces</b></summary>

![Screenshot 2024-02-16 at 3 02 04 PM](https://github.com/hackclub/blot/assets/27078897/f84f186b-6d9d-467b-baad-fd18eea89991)

<img width="351" alt="Screenshot 2024-02-13 at 4 59 34 PM" src="https://github.com/hackclub/blot/assets/27078897/ea296584-5615-414f-93c9-5a4992928b72">

</details>

<details>
<summary>Here are examples of some pieces which would <b>not be accepted</b></summary>

- an abstract piece generated in a very straightforward manner

![Screenshot 2024-02-16 at 3 06 05 PM](https://github.com/hackclub/blot/assets/27078897/24e1d26b-1d09-4336-830d-b437ecf8bd10)

- an svg just dropped into the editor with no algorithmic process

</details>


Most art takes about 15-20 hours of work to get into the gallery, so make sure to spend time improving and iterating on your project before submitting.

## 2) Make a PR with your original artwork

Once you have made some art you can make a pull request (PR) onto this repo with that program.
These are the steps you need to take to make a PR.

### 2.0) Add metadata to your `index.js` file

Make sure to include this info in a comment at the top of your file.

```js
/*
@title: yourTitle
@author: yourName
@snapshot: the name of the snapshot file you want in the gallery
*/
```

__NOTE__
- Make sure your snapshot matches the name of an image in the `snapshots` folder you submit with `.png` like `example1.png`

### 2.1) Download your program

- Hover over `download`
- Click `js`

<img width="1411" alt="Screenshot 2023-09-15 at 3 41 39 PM" src="https://github.com/hackclub/blot/assets/27078897/6d23dfc8-8768-4134-a24d-e276e2c67b52">


## 2.2) Place your program in a folder with at least 3 snapshots

- Create a folder called `{yourArtworkName}-{yourName}`.
- Inside that folder create a `snapshots` folder with **at least 3 screenshots** of your work.
- Place the code for your artwork in an `index.js` file.

__NOTE__
- DO NOT USE SPACES in any folder name or file.
- Make sure you `snapshots` folder is lowercase `snapshots` not `Snapshots`

**Make sure there are no spaces in your directory or file names!**

The directory structure can be seen below:

<img width="729" alt="Screenshot 2023-09-15 at 3 34 15 PM" src="https://github.com/hackclub/blot/assets/27078897/07be7b3e-f0ad-4fab-a316-52fa3ef919c4">

Refer to [this example](https://github.com/hackclub/blot/tree/main/art/square-disarray-leo) for the directory structure.

### 2.3) Fork the Blot repo

[Click here to fork the Blot repo.](https://github.com/hackclub/blot/fork)

### 2.4) Upload your artwork

- Open the "art" folder within your fork
- Click "Add File"
- Select "Upload Files"
- Add your directory and click "Commit changes"
  
<img width="1273" alt="Screenshot 2023-09-15 at 3 40 12 PM" src="https://github.com/hackclub/blot/assets/27078897/161ca980-c100-41c7-8252-bf3602cff072">

### 2.5) Make a PR

- On your fork's page, click on "Contribute"
- Select "Open Pull Request"
- Click "Create Pull Request"
- Name your pull request with the name of your directory (`{yourArtworkName}-{yourName}`)
- In the body, describe your artwork and your experience coding.
- Please add an image of your artwork to the pull request.
- Click "Create Pull Request"
- Fill out the checkboxes in the PR

Your PR will be reviewed by people in the BLOT community. We aren't evaluating it based on style,
we're looking to see if you put effort and creativity into your work.
Don't worry if this is the first program you have ever written, if you worked hard (at least ~8 hrs) and are proud of the result then it's probably good.
If you are an experienced programmer, then we challenge you to show us how nice generative art can be.

### 2.6) Give us a star on GitHub if you like the project (optional)

<img width="603" alt="Screenshot 2024-04-18 at 1 13 24 PM" src="https://github.com/hackclub/blot/assets/27078897/6beb04a5-6f1e-4eba-be43-cc8135d5d0e0">

## 3) Fill out the order form

Once your PR is merged, we'll give you a link to fill out an order form so we can send you the parts for your machine.

## 4) Build your Blot

Once you get your machine, build it and have it make your art!
