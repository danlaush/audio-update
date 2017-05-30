# Project Task List

These are not in order. And probably don't make much sense.

- [x] Set up repo
- [x] Add responsive voice to page
- [x] Set up Tasker profile to open web page
- [ ] BUG: When Tasker opens the web page, sound doesn't autoplay. Play button works fine.
- [x] Add text module
- [x] Add datetime module (moment?)
- [x] Add customisable module system
- [x] Modules: move module into div, ensure correct text is being extracted
- [x] Add text generation button
- [ ] Add text pause button
- [ ] Add text rewind button(?)
- [x] Add module class to store info about script modules
- [x] Get save/load with localStorage working
- [x] Transpile ES6 so it can require and arrow function and class and all that
- [x] Migrate original code to classes/modules
- [ ] App should wait to play if ResponsiveVoice has not been loaded
- [ ] BUG: AudioUpdateModule: Date module: filter out punctionation ({dddd}, should be passing test)
- [ ] Allow user to add new AudioUpdateModules
- [x] Change save() to save text to AudioUpdate instead of directly updating textPreview
- [ ] Allow user to drag and drop modules to set order
- [ ] Allow user to select voice type from a dropdown ([voice list available here](https://responsivevoice.org/))
- [ ] Make it not look like shit
- [ ] Add flag to autoplay
- [ ] Add versioning system to invalidate/transform old save data if structure changes
- [x] BUG: Save button doesn't trigger update of textPreview
