// var AudioUpdate = require('./AudioUpdateModule');

const SELECTORS = {
	togglePlay: 'togglePlay',
	playTest: 'playTest'
}

// Toggle Play Button is a <button> that controls the 
// global Responsive Voice media playback
class TogglePlayButton {
	constructor(props) {
		console.log('TogglePlayButton.constructor()');
		var self = this;
        if(typeof props === 'undefined') props = {};


		if(typeof props.element === 'undefined') {
			return new Error("props.element not defined");
		}
		if(typeof props.audioUpdate === 'undefined') {
			return new Error("props.audioUpdate not defined");
		}
		if(typeof props.voiceControls === 'undefined') {
			return new Error("props.voiceControls not defined");
		}

		self.element = props.element;
		self.element.addEventListener('click', self.togglePlay.bind(this));

		self.audioUpdate = props.audioUpdate;
		self.voiceControls = props.voiceControls;
		self.isPlaying = false;
		self.isClean = true;
		self.text = 'Click to Play';
		self.element.innerHTML = self.text;
	}

	togglePlay() {
		console.log('TogglePlayButton.togglePlay()');
		if(this.isClean) {
			this.firstPlay();
			return;
		}
		this.innerHTML = '';
		if(this.isPlaying) {
			this.voiceControls.pause()
		} else { // currently paused
			this.voiceControls.resume()
		}
		this.setText();
		this.renderText();
		this.isPlaying = !this.isPlaying;
	}

	firstPlay() {
		console.log('TogglePlayButton.firstPlay()');
		var self = this;
		self.setText();
		self.renderText();
		self.voiceControls.speak();
		self.isClean = false;
		self.isPlaying = true;
	}

	prePlay() {
		console.log('TogglePlayButton.prePlay()');
	}

	reset() {
		console.log('TogglePlayButton.reset()');
		this.setText('Play');
		this.renderText();
		this.isClean = true;
		this.isPlaying = false;
	}

	setText(text) {
		console.log('TogglePlayButton.setText()');
		if(text) {
			this.text = text;
			return;
		}
		if(this.isPlaying === false) {
			this.text = 'Pause';
		} else { // isPaused
			this.text = 'Play';
		}
	}

	renderText() {
		console.log('TogglePlayButton.renderText()');
		this.element.innerHTML = this.text;
	}
}

module.exports = TogglePlayButton;