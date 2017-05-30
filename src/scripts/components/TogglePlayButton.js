// var AudioUpdateModule = require('./AudioUpdateModule');

const SELECTORS = {
	togglePlay: 'togglePlay'
}

// Toggle Play Button is a <button> that controls the 
// global Responsive Voice media playback
class TogglePlayButton {
	constructor() {
		console.log('TogglePlayButton.constructor()');

		this.play = true;
		this.dirty = false;
	}

	togglePlay() {
		console.log('TogglePlayButton.togglePlay()');
		// if(!this.dirty) {
		// 	console.log('first play');
		// 	responsiveVoice.speak()
		// }
		var self = this;
		self.play = !self.play;
		self.TogglePlayButton.innerHTML = '';
		if(self.play) { // currently playing
			responsiveVoice.pause()
			console.log('pause');
			self.TogglePlayButton.appendChild(document.createTextNode('Click to Play'));
		} else { // currently paused
			responsiveVoice.resume()
			console.log('play');
			self.TogglePlayButton.appendChild(document.createTextNode('Click to Pause'));
		}
	}

	render() {
		var self = this;
		self.TogglePlayButton = document.createElement('button');
		self.TogglePlayButton.classList = "button button--toggle-play";
		self.TogglePlayButton.appendChild(document.createTextNode('Click to Pause'));
		self.TogglePlayButton.addEventListener('click', self.togglePlay.bind(this));
		return self.TogglePlayButton;
	}
}

module.exports = TogglePlayButton;