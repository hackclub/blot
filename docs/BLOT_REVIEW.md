# Reviewing Blots

This document describes how to review a Blot submission.
It corresponds to the this file on [how to make a Blot submission](https://github.com/hackclub/blot/blob/main/docs/GET_A_BLOT.md).

# Submission Criteria

The primary question to have in mind as a reviewer is "Did this person apply earnest effort in pushing themselves to learn something new?"

The general criteria is that the art piece is 

- original
- beautiful/interesting to look at
- algorithmic is some way

The first point is somewhat obvious though still can take some effort to check. 
Verify that the code was not copied from the gallery or somewhere like Turtle Toy.
Also try to evaluate if the user overly relied on ChatGPT or some other LLM. 
It's acceptable to use these tools but the piece should be more involved than simply asking a single prompt and copying what comes out.
If you are on the fence as to whether the program was ai-generated ask the submitter to make some specific changes.
Try to specify tasks which may not be easily prompt-able (it's a moving target what these might be). 
For example if they drew a bunch of straight lines as blades of grass ask them to give the grass some thickness and bends. 

The second point about making something beautiful is subjective but can be satisfied at a variety of skill levels.
This is also trying to encourage submitters to not just copy algorithms or generic visualizations. 
By encouraging people to incorporate aesthetics and composition we also encourage them to incorporate more of their individuality and thought.

This last point on being algorithmic is to prevent simply specifiying points in curves manually.
To check if something is algorithmic look for the use of functions and variables.
This point is clearly satisfied if there is a variable clearly specified that can be adjusted to change a drawing or if drawings are automatically varied through randomness.
A piece may not be random on each generation if parameterization is provided through hardcoded variables or if the random seed is set.

# Reviewing PRs

Submissions are made as GitHub PRs.

First find an open submission.

<img width="1269" alt="Screenshot 2024-07-03 at 2 51 54 PM" src="https://github.com/hackclub/blot/assets/27078897/dd079924-00d2-4ec0-8454-d9d420f9855f">

A submission with good effort will typically include some comment from the author. You don't have to automatically reject a submission if it doesn't have a description.

<img width="731" alt="Screenshot 2024-07-03 at 2 52 53 PM" src="https://github.com/hackclub/blot/assets/27078897/1caddc1d-9749-4927-bd29-dffa4f2dd0e1">

Mark the submission as such with the `submission` label.

<img width="260" alt="Screenshot 2024-07-03 at 2 53 54 PM" src="https://github.com/hackclub/blot/assets/27078897/5158af1c-090f-4c91-97bf-cfb8a6cb71b2">

Check the submitted files in the `Files changed` tab.

![Screenshot 2024-07-10 at 10 03 14 PM](https://github.com/hackclub/blot/assets/27078897/c0e3e1df-14dd-416a-abda-c773162a4a82)

Make sure the metadata snapshot exists and that the snapshots folder is named `snapshots`.

The metadata in the above example is

```
/*
@title: BinaryComputer
@author: NotRewd
@snapshot: image-1.png
*/
```

The JavaScript file should be named `index.js`.

There can be no spaces in any of the folder or filenames.

If there are any errors you can note them to the submitter and ask for corrections. If an error is small (like a misreferenced filename) I sometimes just fix it for the submitter. Many submitters are new and the mechanics of GitHub (while a great skill) are not the most important thing about starting to code.

Review the submission for the above submission criteria. If you find the submission doesn't meet the criteria explain how so to the submitter in the `Conversation` tab.

If the submission is close to being acceptable then request the user make some specific changes.

If specific changes can not be suggested that make the submission acceptable then close the PR. It is nice to give some positive encouragement to the submitter and let them know they can submit again in the future.

Requesting changes should be done using the "Code Review" GitHub feature, marking "Request changes" for any PR that isn't ready to be merged:

![](https://cloud-3exn8zq44-hack-club-bot.vercel.app/0screenshot_2024-07-19_at_12.14.41.png)

# Accepting PRs

To accept a PR.

Apply the `approved` label.

![Screenshot 2024-07-10 at 10 09 13 PM](https://github.com/hackclub/blot/assets/27078897/0ffb37e0-3490-430b-9c4c-a0f8dec50600)

Comment in the conversation what you appreciate about the piece. Congratulate the Hack Clubber and provide them with the order link. You may still make suggestions about ways to improve the piece too or offer challenges. Here is an example comment:

```
I like how you rendered a simple geometric element in perspective and then transformed it into a recognizable and some what whimsical object. Your code is also very well organized.

Congrats this definitely earns a Blot. You can order it [here](https://airtable.com/appv0BzBY2APyIXj6/shrhpWVXN5imMzUmw). 

Do you think you could tie together the code that appears on the screen with the object in the viewing window? Maybe you could write a programming language for this computer?
```

The order link is

```
https://airtable.com/appv0BzBY2APyIXj6/shrhpWVXN5imMzUmw
```

It's best to hyperlink it.

Merge the PR.

The best practice when merging PRs is to checkout the branch locally to make sure everything still runs properly. After merging check the gallery to make sure the gallery image is referenced properly.









