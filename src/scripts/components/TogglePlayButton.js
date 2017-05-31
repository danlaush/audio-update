// var AudioUpdateModule = require('./AudioUpdateModule');

const SELECTORS = {
	togglePlay: 'togglePlay'
}

// Toggle Play Button is a <button> that controls the 
// global Responsive Voice media playback
class TogglePlayButton {
	constructor(props) {
		console.log('TogglePlayButton.constructor()');

        if(typeof props === 'undefined') props = {};
        this.playCallback = (typeof props.playCallback !== 'undefined') ? props.playCallback : 'text';

		this.play = true;
		this.dirty = false;
	}

	togglePlay() {
		console.log('TogglePlayButton.togglePlay()');
		var self = this;
		self.TogglePlayButton.innerHTML = '';
		if(self.play) { // currently playing
			responsiveVoice.pause()
			console.log('currently playing, will now pause');
			self.TogglePlayButton.appendChild(document.createTextNode('Click to Play'));
		} else { // currently paused
			responsiveVoice.resume()
			console.log('currently paused, will now play');
			self.TogglePlayButton.appendChild(document.createTextNode('Click to Pause'));
		}
		self.play = !self.play;
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