
##Separation of Concerns:

#model - 
this is the data model that will advance the state of the game according to Conway’s Rules. Uses a 1D array to map a matrix indexed as (x,y)-->[width*y+x] this allows is to use functionals much easier down the line. 

#controller - 
constructs model and delegates to view to render model to the DOM specified by a div id. Sets up event handlers for user facing UX elements.

#view - 
Generates array of divs to represent cells in their current state that can then be rendered to the DOM.


##Module dependency

#index.js - 
Depends on model, view, and controller
#model.js - 
No dependancies
#view.js -
Depends on model
#controller.js-
Depends on model and view (owns the model and delegates to view)

##Functionals
- used 1D array to index matrix and use map reduce paradigm where ever possible
- used event handler subscriber model to handle user input

##Tradeoffs
- used html and css instead of canvas which is more nuanced but has better performance
- chose to separate concerns by function of the code, models for the cell and board and rules are in the same file because it extrapolates  game logic from all other modules.






