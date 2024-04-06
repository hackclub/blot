# How to Get a Blot

So you just found out about this cool robotic drawing machine which you can build yourself, but how can you get one? The Blot is paid for by Hack Club, including shipping, but you should check for customs fees in your country before ordering. [^1]
[^1]: Customs fees aren't covered by Hack Club, so please look into how much customs is for an electronics kit order being shipped from the US if you are based outside the US.

# 1) Make a unique piece of generative art

The first step is to make some generative art like that seen in [the gallery](https://blot.hackclub.com/gallery).

You can learn how to use the editor and make art by following some of [these guides](https://blot.hackclub.com/guides).

Some criteria your art needs to meet:

- Your artwork must be beautiful. It has to be something aestetically interesting.
- Your artwork must be algorithmic.
  - It must be able to create multiple versions. To demonstrate this, **submit 3 snapshots**.
  - You should expose some parameters at the top of your code which can adjust the art. This could be `setRandSeed` or some other variable used in your piece.
- Your artwork must be original.
- Your artwork must be drawable by the Blot machine.
  - This means it can't be too busy and have many overlapping lines.
  - It should fit within the workarea.
- Your artwork must be original.
  - You can't just copy an existing piece of art and mess with the numbers.
  - That being said, you can take inspiration from other art and remix a few pieces together.

I reccomend trying to create a [figurative](https://en.wikipedia.org/wiki/Figurative_art) piece, which depicts a real life thing.
A key to being successful is being intentional with what you make. Sketch something out and have it in mind before you program it.

Here are some examples of some **acceptable pieces**:

![Screenshot 2024-02-16 at 3 02 04 PM](https://github.com/hackclub/blot/assets/27078897/f84f186b-6d9d-467b-baad-fd18eea89991)

<img width="351" alt="Screenshot 2024-02-13 at 4 59 34 PM" src="https://github.com/hackclub/blot/assets/27078897/ea296584-5615-414f-93c9-5a4992928b72">

Here are some examples of some pieces which would **not be accepted**:

- an abstract piece generated in a very straightforward manner

![Screenshot 2024-02-16 at 3 06 05 PM](https://github.com/hackclub/blot/assets/27078897/24e1d26b-1d09-4336-830d-b437ecf8bd10)

- an svg just dropped into the editor with no algorithmic process


# 2) Make a PR with your original artwork

Once you have made some art you can make a pull request (PR) onto this repo with that program.
These are the steps you need to take to make a PR.

## 2.0) Add metadata to your `index.js` file

Make sure to include this info in a comment at the top of your file.

```js
/*
@title: yourTitle
@author: yourName
@snapshot: the name of the snapshot file you want in the gallery
*/
```

## 2.1) Download your program

- Hover over `download`
- Click `js`

<img width="1411" alt="Screenshot 2023-09-15 at 3 41 39 PM" src="https://github.com/hackclub/blot/assets/27078897/6d23dfc8-8768-4134-a24d-e276e2c67b52">


## 2.2) Place your program in a folder with at least 3 snapshots

- Create a folder called `{yourArtworkName}-{yourName}`.
- Inside that folder create a `snapshots` folder with **at least 3 screenshots** of your work.
- Place the code for your artwork in an `index.js` file.

**Make sure there are no spaces in your directory or file names!**

The directory structure can be seen below:

<img width="729" alt="Screenshot 2023-09-15 at 3 34 15 PM" src="https://github.com/hackclub/blot/assets/27078897/07be7b3e-f0ad-4fab-a316-52fa3ef919c4">

Refer to [this example](https://github.com/hackclub/blot/tree/main/art/square-disarray-leo) for the directory structure.

## 2.3) Fork the Blot repo

[Click here to fork the Bzzlot repo.](https://github.com/hackclub/blot/fork)

## 2.4) Upload your artwork

- Open the "art" folder within your fork
- Click "Add File"
- Select "Upload Files"
- Add your directory and click "Commit changes"
  
<img width="1273" alt="Screenshot 2023-09-15 at 3 40 12 PM" src="https://github.com/hackclub/blot/assets/27078897/161ca980-c100-41c7-8252-bf3602cff072">

## 2.5) Make a PR

- On your fork's page, click on "Contribute"
- Select "Open Pull Request"
- Click "Create Pull Request"
- Name your pull request with the name of your directory (`{yourArtworkName}-{yourName}`)
- In the body, describe your artwork and your experience coding.
- Please add an image of your artwork to the pull request.
- Click "Create Pull Request"

Your PR will be reviewed by people in the BLOT community. We aren't evaluating it based on style,
we're looking to see if you put effort and creativity into your work.
Don't worry if this is the first program you have ever written, if you worked hard (at least ~8 hrs) and are proud of the result then it's probably good.
If you are an experienced programmer, then we challenge you to show us how nice generative art can be.

# 3) Fill out the order form

Once your PR is merged, we'll give you a link to fill out an order form so we can send you the parts for your machine.

# 4) Build your Blot

Once you get your machine, build it and have it make your art!
