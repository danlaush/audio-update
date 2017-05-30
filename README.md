# audio-update
A tool to deliver an automated, customisable audio update. Combine and craft news, weather, time & date, and more to create the audio update that's right for you. Wake up in the morning


## Goal
In the morning, be woken up by the morning update. The audio script is a customizable set of modules that have audio output, such as the weather, news updates, music, or custom text. Each day, a program generates new text-based content (latest news, calendar events & meetings) sent to a TTS service and automatically generates a new audio file.

## Example

* Text: "Good morning, Neneh and Dan."
* Date/Time: "It is 6:45 in the morning on Tuesday May 18th."
* Weather: "BOM says it will rain this afternoon, with a high of 18 degrees. Remember to bring an umbrella."
* News: "Here are a selection of headlines from the BBC. Trump unveils new plan to fight inflation. Syria crisis worsening, says UNHCR."
* Calendar: "Remember you have an early appointment today - Coffee with Ben at 8:15 AM.

## Process

* User navigates to website
* User drags and drops modules in a list
* User clicks play to test audio track
* User sets schedule when update should play (weekdays at 6:45am, etc)
* User saves their changes
* User sets up [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en) to open the webpage at a given time

## Challenges

Text To Speech (TTS)

* Option 1: JS TTS lib https://responsivevoice.org/ - Easy to use (I know js) but doesn't generate a file, uses web browser media api to play directly. Would have to use a headless browser on a server to generate the file by playing the text and recording it in real time. Takes too long.
* ~~Option 2: Something Google TTS? Would have to break into several small TTS snippets and combine.~~
* ~~Option 3: Something in Android that can do this? Java D:~~

Playing media

* ~~Option 1: Native alarm. Already use it/easy to use, would set ringtone to particular audio file and overwrite that file every day. Challenges: Have to figure out how to write to android disk. Java?? D:~~
* ~~Option 2: Tasker. Can queue up downloading of new file every day (wget or similar?) and then queue audio file to play at a given time. Tasker costs money, harder to share with others.~~
* ~~Option 3: Build an app where the user can schedule download and play media. Takes the most time but best for sharing.~~
* ~~Option 4: Tasker. Can set up a voice command to "Play the morning update". AutoVoice is like custom Ok Google.~~ https://www.lifehacker.com.au/2013/09/how-to-create-custom-voice-commands-with-tasker-and-autovoice/
* Option 5: Tasker. Open WebView and run custom javascript. Could open website and play saved config.

Speaker

* Option 1: Bluetooth speaker. Best sound quality, but need it to stay on all night.
* Option 2: Phone speaker. Easiest to use, not as loud/good quality.

Scheduling text fetch command to generate audio script

* ~~Option 1: Set up node server that saves user config and can schedule generating the audio file shortly before the phone will download it. More complex in the long run, having to run the fetch on the server and then wait with it until the phone requests it.~~
* ~~Option 2: App on the phone manages scheduling, audio script structure, fetching remote data (news/weather), generating text string, and playing media. Node server simply accepts text strings and returns an audio file. Would it even be possible to do TTS on the phone? No idea how to program that...~~
* Option 3: Web front end to manage script modules & play audio. No generating files, no storage (except localstorage). Tasker can open the page with an autoplay flag, and the app loads config from local storage, generates the text script with updated remote data (weather, news, calendar) and plays the audio when it's ready.










