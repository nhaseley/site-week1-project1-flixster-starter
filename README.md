📝 **NOTE** Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Week 1 Assignment: Flixster

Submitted by: **Nya Haseley-Ayende**

Estimated time spent: **18** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](ADD_LINK_HERE)

### Application Features

#### Core Features

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### Stretch Features

- [ ] Deploy website using GitHub Pages.
- [x] Allow user to view more details about a movie within a popup.
* Half implemented, made the popup but was unable to extract the movie details for each card individually, due to my movieContainer.
- [x] Improve the user experience through CSS & animation.
* Added a popup menu when you click a button for movie details
- [ ] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [x] Implement anything else that you can get done to improve the app functionality!

Other features I added:
* Toggle through pages (previous page AND next page), with accessibility
* New movies are not added to the bottom, but to the page entirely (Movies from previous searches are wiped)

### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, `ADD_EMBEDDED_CODE_HERE`. Make sure the video or gif actually renders and animates when viewing this README. (🚫 Remove this paragraph after adding walkthrough video)

`ADD_EMBEDDED_CODE_HERE`

### Reflection

- Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, I felt well prepared especially after lab 3. The discussions on animations, css styling, html structure, and javascript walkthrough coding sessions proved most useful.

- If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have done a few more attempts to make the popup for each movie to include the description for that particular movie as another cool addition to my feature. Right now, it just displays a manual message as a popup. This is because I tried to implement the popup in javascript, but was unsuccessful so I moved to making it in HTML. However, I could not figure out how to get my variables in javascript to be recognized in HTML, so I could not display the message as the movie description for a particular movie, since that was a variable local to my script file, even with integration on my script line in HTML. With more time, I believe I could have found another way to implement this, similarly to how we were able to create "BUTTON" objects in javascript instead of HTML.

Something else that I really tried to think about how to implement (but was unsuccessful) is some sort of drop-down menu that would show the results during a search that most aligned with the input characters so far and generate those movie images accordingly, similar to how google search will give you a preview into the search so you don't have to type out the whole string. However, I could not figure out how to implement drop-down menus in javascript (instead of HTML so I could use my state.searchTerm variable to generate images accordingly), so I glanced over this idea.

Similarly, I almost implemented was the search feature that would generate the images as you type the input string into the search bar, but was unsuccessful for the same reason as above. With more time and discussion with the peers that I know implemented this feature, though, I am sure I would have been able to resolve this issue.

- Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I did not have a project demo this time around.

### Open-source libraries used

- Add any links to open-source libraries used in your project.
https://www.w3docs.com/snippets/javascript/how-to-create-a-popup-form-using-javascript.html


### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

My peers Pierre (for closing out search button) and Roberta (for pop-up display guidance) helped me implement specific features I had some troubles with. And, of course, my instructors helped greatly throughout the debugging sessions the past couple days as well.