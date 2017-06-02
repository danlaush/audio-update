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


		if(typeof props.audioUpdate === 'undefined') {
			return new Error("props.audioUpdate not defined");
		}
		self.playTestButton = document.getElementById(SELECTORS.playTest);
		self.playTestButton.addEventListener('click', self.playTest.bind(this));

		self.audioUpdate = props.audioUpdate;
		self.isPlaying = false;
		self.isClean = true;
		self.text = 'Play';
	}

	togglePlay() {
		console.log('TogglePlayButton.togglePlay()');
		if(this.isClean) {
			this.firstPlay();
			return;
		}
		this.innerHTML = '';
		if(this.isPlaying) {
			responsiveVoice.pause()
		} else { // currently paused
			responsiveVoice.resume()
		}
		this.setText();
		this.renderText();
		this.isPlaying = !this.isPlaying;
	}

	firstPlay() {
		console.log('TogglePlayButton.firstPlay()');
		this.setText();
		this.renderText();
		responsiveVoice.speak(
			this.audioUpdate.getText(), 
			this.audioUpdate.getVoice(),
			{
				onend: this.resetPlay()
			}
		);
		this.isClean = false;
		this.isPlaying = true;
	}

	playTest() {
		console.log('TogglePlayButton.playTest()');
		var self = this;
		responsiveVoice.speak('Play a test script', 
			self.audioUpdate.getVoice(),
			{
				onstart: self.prePlay,
				onend: self.resetPlay
			}
		);
	}

	prePlay() {
		console.log('TogglePlayButton.prePlay()');
	}

	resetPlay() {
		console.log('TogglePlayButton.resetPlay()');
		this.setText();
		this.renderText();
		this.isClean = true;
		this.isPlaying = false;
	}

	setText() {
		console.log('TogglePlayButton.setText()');
		if(this.isPlaying === false) {
			this.text = 'Pause';
		} else { // isPaused
			this.text = 'Play';
		}
	}

	renderText() {
		console.log('TogglePlayButton.renderText()');
		this.TogglePlayButton.innerHTML = this.text;
	}
 
	render() {
		var self = this;
		self.TogglePlayButton = document.createElement('button');
		self.TogglePlayButton.classList = "button button--toggle-play";
		self.TogglePlayButton.innerHTML = this.text;
		self.TogglePlayButton.addEventListener('click', self.togglePlay.bind(this));
		return self.TogglePlayButton;
	}
}

module.exports = TogglePlayButton;