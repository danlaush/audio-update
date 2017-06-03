# Project Task List

These are not in order. And probably don't make much sense.

- [x] Set up repo
- [x] Add responsive voice to page
- [x] Set up Tasker profile to open web page
- [x] ~~BUG: When Tasker opens the web page, sound doesn't autoplay. Play button works fine.~~
- [ ] Add flag to autoplay
- [x] Add text module
- [x] Add datetime module (moment?)
- [x] Add customisable module system
- [x] Modules: move module into div, ensure correct text is being extracted
- [x] Add text generation button
- [x] Add text pause button
- [x] ~~Add text rewind button(?)~~
- [x] Add module class to store info about script modules
- [x] Get save/load with localStorage working
- [x] Transpile ES6 so it can require and arrow function and class and all that
- [x] Migrate original code to classes/modules
- [x] App should wait to play if ResponsiveVoice has not been loaded
- [ ] BUG: AudioUpdateModule: Date module: filter out punctionation ({dddd}, should be passing test)
- [x] Allow user to add new AudioUpdateModules
- [ ] Allow user to delete AudioUpdateModules
- [x] Change save() to save text to AudioUpdate instead of directly updating textPreview
- [ ] Allow user to drag and drop modules to set order
- [ ] Allow user to select voice type from a dropdown ([voice list available here](https://responsivevoice.org/))
- [ ] Make it not look like shit
- [ ] Add versioning system to invalidate/transform old save data if structure changes
- [x] BUG: Save button doesn't trigger update of textPreview
- [ ] Feature: ResponsiveVoice cuts text up into <100 char sections. Find a way to visualise+suggest ways to improve your text to improve your experience with the automated voice. When not managed, speech can feel stilted and awkward when it pauses to fetch the next 100chars of speech.
- [x] BUG: ResponsiveVoice doesn't stop when browser refreshes
- [x] ~~TogglePlayButton [extends HTMLElement](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements/Custom_Elements_with_Classes)? To add functionality directly to DOM elements, have access to more data about element~~
- [ ] Alert user if they try to close without saving
- [ ] Make module controls (Save, Delete, Add) a floating button like Android
