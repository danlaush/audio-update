var TogglePlayButton = require('./components/TogglePlayButton');

const SELECTORS = {
	voiceControlsContainer: 'voiceControls',
	togglePlayButton: 'togglePlay',
	stopButton: 'stop',
	voicesList: 'voicesList'
}

class VoiceControls {
	constructor(props) {
		console.log('VoiceControls.constructor()');

        if(typeof props === 'undefined') props = {};
		if(typeof props.audioUpdate === 'undefined') {
			return new Error("props.audioUpdate not defined");
		}

		var self = this;
		self.audioUpdate = props.audioUpdate;
		self.container = document.getElementById(SELECTORS.voiceControlsContainer);

		self.togglePlayButton = document.getElementById(SELECTORS.togglePlayButton);

		self.stopButton = document.getElementById(SELECTORS.stopButton);
		self.stopButton.addEventListener('click', self.stopSpeaking.bind(this));

		self.togglePlayButton = new TogglePlayButton({
			element: self.togglePlayButton,
			voiceControls: self,
			audioUpdate: self.audioUpdate
		});

		self.voicesList = document.getElementById(SELECTORS.voicesList);
		var voices = self.getVoices();
		var voicesHtml = voices.map(function(voice) {
			var option = document.createElement('option');
			option.value = voice.name;
			option.innerHTML = voice.name;
			return option.outerHTML;
		});
		console.log(self.voicesList);
		self.voicesList.innerHTML = voicesHtml.join();

		// Stop voices when leaving/reloading the page
		window.addEventListener("unload", function(e){
			responsiveVoice.cancel();
		}, false);
	}

	getVoices() {
		return responsiveVoice.getVoices();
	}

	speak() {
		console.log('VoiceControls.speak()');
		var self = this;
		responsiveVoice.speak(
			self.audioUpdate.getText(), 
			self.audioUpdate.getVoice(),
			{
				onend: self.reset.bind(self)
			}
		);
	}

	pause() {
		console.log('VoiceControls.pause()');
		responsiveVoice.pause();
	}

	resume() {
		console.log('VoiceControls.resume()');
		responsiveVoice.resume();
	}

	reset() {
		this.togglePlayButton.reset();
	}

	stopSpeaking() {
		console.log('VoiceControls.stopSpeaking()');
		responsiveVoice.cancel();
		this.togglePlayButton.reset();
	}

	render() {
		console.log('VoiceControls.render()');
		var self = this;
		// self.container.appendChild(self.TogglePlayButton.render());
	}
}

module.exports = VoiceControls;