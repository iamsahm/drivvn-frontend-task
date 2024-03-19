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

<!-- read the api and make some notes about the urls i will use from it

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
https://deckofcardsapi.com/api/deck/4lpebrva18xp/draw/?count=2

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

-->

-   If the _suit_ of the newly drawn card matches the previous one, display the message `SNAP SUIT!`
<!-- If the "suit" of both cards in state is the same, display 'SNAP SUIT!' 
function isSnapSuit
return newCard.suit === oldCard.suit

call this and isSnapValue after set newCard in drawCard
pass both to the table component
update the table component to display a message if either of these are true

-->

-   If neither the value nor suit match, display no message
-   Once all 52 cards have been drawn, remove the button and instead display the total number of value matches and the total number of suit matches
<!-- add a counter, tracking occurances of snap value and snap suit. Maybe just pass this to a component with display:none and on 52 cards drawn, set the button display none and the value/suit matches to display something?

Turns out the API returns a status:false if you try to get a new card when the deck has run out:
{"success": false, "deck_id": "4lpebrva18xp", "cards": [], "remaining": 0, "error": "Not enough cards remaining to draw 1 additional"}

... this won't completely fufil the brief because it would require drawCard to be pressed once more after 52 draws. I should count the success returns from the data and set gameOver to true when it reaches 52. I could also make the fetch request an additional time after 52 draws to make sure the success:false is returned and throw an error if it doesn't

make an isGameOver variable and set it in the drawcard function-->

-   A suite of suitable tests should be created for these requirements
<!--
test the components individually, maybe add a fixture for the cards in the codebase?
add cypress, make it click everything and see that the things are there/not there?
^ not really necessary, i can do it with Jest.-->

## UI Wireframes

<!-- Use these as guides for the styling once the code is working -->

<p align="center">
  <img src="https://user-images.githubusercontent.com/659658/111351711-5def5f00-867b-11eb-8550-797762f6b1f1.png" alt="Frontend task UI"/>
</p>

## Optional Requirements

-   A counter, displaying the current card number (or how many cards are left) - e.g. `Card 12 of 52` or `29 cards remaining`
<!-- simple counter, could use the return from the API or do a count internal to the component -->
-   The probability that the next card drawn will either be a value or suit match (this requires keeping track of what cards have already been drawn)
<!-- basic maths, put it in it's own component, TDD it -->
-   Some animation and/or sound effects
<!-- not sure how to do this, look into it -->

## Submission

Here's what you'll need to send us:

-   A link to a **public** GitHub repo that you have created, containing the code
-   It should contain a suite of tests (using whichever test framework you prefer)
-   It should also contain a README.md file explaining how to run the app and its tests
-   You may also send us a link to a location hosting your code (for example, Netlify)

**The task should take around 2-3 hours.**

## Additional improvements

-   The draw card button should be disabled while the fetch request is in progress to avoid multiple requests being made at once.
<!-- -   add a loading state to the button, disable it while the fetch request is in progress -->
-   Add CI using NX, Dave mentioned it was used at Drivvn
<!-- -   look into NX, it's overkill for this task but would be interesting to learn -->
-   Find a way to deploy the extension branch separately?
<!-- -   Vercel probably has a solution for this -->
