# Step 1

## So you wanna learn React?

- Well good for you, React is a pretty useful framework to learn, for a lot of practical reasons.
- We shall be approach React from a functional programming paradigm and how React enables you to compose your UI using pure functions.
- Ideally, if we visualise our UI we usually get a tree of components (at the lowest level of abstraction, the DOM)
  ![image](/assets/dom-tree.png)
- In order to think of this tree in the functional paradigm, simply replace each unit with a function. What would such a function depend on?

  - Information that is gets from its parent about "what" to render
  - All the possible ways in which the user can interact with it and modify it's "state".
  - And a way to merge the two sets of information in a single view

- Another quirk or feature, depending on your data binding philosophy, is the one way data flow that react enforces. Basically all the functions that make up the UI are always called in the same direction, top -> down!
