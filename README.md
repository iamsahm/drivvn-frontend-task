# Drivvn Frontend Task

The task was briefed as follows. I've added comments to the code to explain my thought process, planning and the decisions I made.
This is my first time using TypeScript, I would love feedback on how I can improve my use of it!

## Introduction

This is a simple task to create a suitable single page application front-end incorporating:

-   user interaction
-   interrogating an API - namely the **Deck of Cards API** (https://deckofcardsapi.com)
-   logic
-   displaying text and images
-   testing

The solution **must** use HTML, CSS and JavaScript. You can use whatever framework or dependencies you require - e.g. React, Vue.js, Bootstrap, Tailwind CSS. You could even use no external dependencies - it's up to you.

<!-- Use Next.js and React with Jest -->

## Minimum Requirements

<!-- Here's the MVP, develop these features first, don't touch the Optional Requirements until later -->

**TIP:** Read the documentation for the Deck of Cards API carefully

<!-- read the api and make some notes about the routes i will use for it

https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
Returns JSON:
{
  "success": true,
  "deck_id": "3p40paa87x90",
  "shuffled": true,
  "remaining": 52
}

NB the deck_id won't work after 2 weeks if no action has been used, maybe put this in the readme at the end?

Store that deck_id in a variable and use it to draw cards with:
https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

Returns JSON:
{
    "success": true,
    "deck_id": "kxozasf3edqu",
    "cards": [
        {
            "code": "6H",
            "image": "https://deckofcardsapi.com/static/img/6H.png",
            "images": {
                          "svg": "https://deckofcardsapi.com/static/img/6H.svg",
                          "png": "https://deckofcardsapi.com/static/img/6H.png"
                      },
            "value": "6",
            "suit": "HEARTS"
        },
        {
            "code": "5S",
            "image": "https://deckofcardsapi.com/static/img/5S.png",
            "images": {
                          "svg": "https://deckofcardsapi.com/static/img/5S.svg",
                          "png": "https://deckofcardsapi.com/static/img/5S.png"
                      },
            "value": "5",
            "suit": "SPADES"
        }
    ],
    "remaining": 50
}
-->

-   Initialise a shuffled single deck of cards
<!--
do the new deck call, store the deckId
on page load, make a request to https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
set the deckId to a const.
-->
-   Provide a button that will 'draw' a card from that deck
<!--
do the draw call with 1, store the card in state

function DrawCard
fetch to https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1
set newCard to the response

Button
onClick DrawCard
-->

-   Display an image of the newly drawn card, with an image of the previous card to its left (if there is no previous card, display a placeholder)
<!-- two divs, placeholder left div with some image, on draw, the incoming card from the draw function populates the right div. On next draw, the card in the right div populates the left div

function moveOldCard
set oldCard to the current card in newCard

before setting newCard to the response in drawCard, call moveOldCard

pass down newCard and oldCard to the table component.

Table component just renders the cards passed to it

<div className="table">
  <div className="left">
    <img src={oldCard.image} alt={oldCard.code} />
  </div>
  <div className="right">
    <img src={newCard.image} alt={newCard.code} />
  </div>

-->

-   If the _value_ of the newly drawn card matches the previous one, display the message `SNAP VALUE!`
<!-- If the "value" of both cards in state is the same, display 'SNAP VALUE!'

function isSnapValue
return newCard.value === oldCard.value

call this after set newCard in drawCard

-->

-   If the _suit_ of the newly drawn card matches the previous one, display the message `SNAP SUIT!`
<!-- If the "suit" of both cards in state is the same, display 'SNAP SUIT!' 
function isSnapSuit
return newCard.suit === oldCard.suit

call this after set newCard in drawCard

-->

-   If neither the value nor suit match, display no message
-   Once all 52 cards have been drawn, remove the button and instead display the total number of value matches and the total number of suit matches
<!-- add a counter, tracking occurances of snap value or snap suit. Maybe just pass this to a component with display:none and on 52 cards drawn, set the button display none and the value/suit matches to display something? -->
-   A suite of suitable tests should be created for these requirements
<!--
test the components individually, maybe add a fixture for the cards in the codebase?
add cypress, make it click everything and see that the things are there/not there? -->

## UI Wireframes

<!-- Use these as guides for the styling once the code is working -->

<p align="center">
  <img src="https://user-images.githubusercontent.com/659658/111351711-5def5f00-867b-11eb-8550-797762f6b1f1.png" alt="Frontend task UI"/>
</p>

## Optional Requirements

-   A counter, displaying the current card number (or how many cards are left) - e.g. `Card 12 of 52` or `29 cards remaining`
-   The probability that the next card drawn will either be a value or suit match (this requires keeping track of what cards have already been drawn)
-   Some animation and/or sound effects

## Submission

Here's what you'll need to send us:

-   A link to a **public** GitHub repo that you have created, containing the code
-   It should contain a suite of tests (using whichever test framework you prefer)
-   It should also contain a README.md file explaining how to run the app and its tests
-   You may also send us a link to a location hosting your code (for example, Netlify)

**The task should take around 2-3 hours.**

# Next.js + Jest

This example shows how to configure Jest to work with Next.js.

This includes Next.js' built-in support for Global CSS, CSS Modules and TypeScript. This example also shows how to use Jest with the App Router and React Server Components.

> **Note:** Since tests can be co-located alongside other files inside the App Router, we have placed those tests in `app/` to demonstrate this behavior (which is different than `pages/`). You can still place all tests in `__tests__` if you prefer.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-jest&project-name=with-jest&repository-name=with-jest)

## How to Use

Quickly get started using [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app#readme)!

In your terminal, run the following command:

```bash
npx create-next-app --example with-jest with-jest-app
```

```bash
yarn create next-app --example with-jest with-jest-app
```

```bash
pnpm create next-app --example with-jest with-jest-app
```

## Running Tests

```bash
npm test
```
