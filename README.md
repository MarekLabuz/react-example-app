## Example React App using iTunes API

### Usage
Install ```$ yarn install```

Tests: ```$ npm test```

Build: ```$ npm run build```

Run server: ```$ npm start```

### About App
Application uses iTunes API to search for songs by name. 
While writing a song name, api calls are triggered automatically. 
In case of a successful search, the results are displayed in a form of list.
Each song in the list can be "liked" by clicking the heart icon. Second click reverts the "like" action.
By the bottom of the page, there is a button that navigates between the "search song" and "favourities songs" (liked) views.

### Implementation
The application is implemented in React 16 and Redux. To handle asynchronous redux actions I have used redux-thunk, which
is perfect for such simple usecases. In order to create something more complex I would use more sophisticated tools (redux-saga, redux-cycles, etc.)
Api calls are debounced so that they wouldn't be triggered on every input change. Although a user has to wait just a little longer for an api call to be triggered,
this technique prevents from many redundant api calls.

### Future Works
One of the improvements that could be implemented is infinite scroll. It would alter a fixed number of displayed items in the list as long as the api provides such a functionality.
Moreover, more actions besides "like" actions can be added, for instance "listen" or "buy".
