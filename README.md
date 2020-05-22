This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Run App

After cloning the repo onto your machine, navigate to the repo and run `npm install` to install any necessary packages

Then you can run `npm start` which will start the application.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Summary Questions

What were the most difficult tasks?<br />

- I wanted to move away from default focus states as much as possible since I think they look kind of ugly, but clear focus states are critical for visually-impaired users. Coming up with a unified design pattern for all the focusable elements that was still accessible took some time and lots of tweaking until I was happy with it.

Did you learn anything new while completing this assignment?<br />

- I learned about CSS grids. I don't think I'd really used them much before.
- I learned about `useHistory`, which made client-side routing easier while maintaining state.
- I got a refresher on CSS media queries, which was helpful. I haven't used them in a while since most of that is abstracted out of our frontend development at work.

What did you not have time to add? What work took the up majority of your time?<br />

- I didn't add a "order confirmation" page that would show list of the movies a user submitted. This page would be shown when the user clicks "Submit" on the checkout page.
- Testing! I would add unit tests to test some of the functionality, test that the correct components are being rendered, and that pages are transitioning to the correct URLs when the corresponding buttons are clicked.
- Pagination of search results would be a nice feature. The API only returns 10 movie results at a time, but we could fetch subsequent "pages" of movies from the API when the users clicks a button, for example.
- I also would have added some sort of transition animation between the search and checkout pages. When clicking "Check out" the search page content would slide left off of the screen while the confirmation page content would slide in from the right, similar to how native apps function when moving between pages.

- The task that took the longest was coming up with a relatively consistent design that was still visually accessible to color blind or visually-impaired users. A color scheme of blues and white, rounded buttons and inputs, and white rounded borders are what I settled on.

How could the application be improved?<br />

- There are some accessibility improvements to make, like providing instructions on how to navigate the search results when something is typed into the search bar and the autosuggest options appear. Similarly, more labels and aria-labels would help describe the app better when using a screen reader.
- Redux would have been useful for keeping track of the selected movies, but it felt like overkill for a small application like this, so I kept track of the selected movies by using `useState` at the `App.tsx` level and passing the results into the two page components.
- The application could look a little better and more intuitive on desktop - it currently looks like a mobile site that was expanded to also work on larger screens. It's functional, but not the prettiest. For example, I probably wouldn't rely on a sticker footer on larger screens.
- When a user unselects a movie on the checkout page, the movie could still show up there instead of disappearing. Then the user wouldn't have to go back to the search page to search for it and select it again.
- A lot of the copy could be improved to be clearer.
