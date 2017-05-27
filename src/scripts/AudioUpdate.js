var AudioUpdateModule = require('./AudioUpdateModule');

const SELECTORS = {
	textPreview: 'textPreview',
	modulesContainer: 'modules',
	textInput: 'textInput',
	updateScriptButton: 'updateScript',
	playButton: 'play'
}

class AudioUpdate {
	constructor(props) {
		console.log('AudioUpdate.constructor()');
		if(typeof props === 'undefined') var props = {};

		// this.text = "Something to export plus " + new AudioUpdateModule().myPrint();
		this.text = (typeof props.text !== 'undefined') ? props.text : 'Good morning Daniel';
		this.voice = (typeof props.voice !== 'undefined') ? props.voice : 'UK English Female';
		this.modulesData = (typeof props.modulesData !== 'undefined') ? props.modulesData : {};
		this.modules = [];
		this.SELECTORS = SELECTORS;

		this.init();
	}

	init() {
		// This uses several similar terms for similar items.
		// text: The string stored in AudioUpdate which gets read out
		// textPreview: The HTML displayed to the user of the text which will get read out
		// 				Separated from `text` so it can be styled if so desired
		// textInput: Temporary text field for generating `text`. Will be componentised.
		var self = this;
		
		this.textPreview = document.getElementById(self.SELECTORS.textPreview);
		self.modulesContainer = document.getElementById(self.SELECTORS.modulesContainer);
		self.update();

		self.updateScriptButton = document.getElementById(self.SELECTORS.updateScriptButton);
		self.updateScriptButton.addEventListener('click', self.update.bind(this));
		self.playButton = document.getElementById(self.SELECTORS.playButton);
		self.playButton.addEventListener('click', self.speak.bind(this));
	}

	update() {
		console.log('AudioUpdate.update()');
		this.text = "";
		this.modulesContainer.innerHTML = '';
		for(var key in this.modulesData) {
			var module = new AudioUpdateModule(this.modulesData[key]);
			this.text += module.text + ' ';
			this.modules.push(module);
			this.modulesContainer.appendChild(module.render());

		}
		this.updateTextPreview();
	}

	updateTextPreview() {
		// Set up text preview
		this.textPreview.innerHTML = this.text;
	}

	speak() {
		console.log('AudioUpdate.speak()');
		responsiveVoice.speak(this.text, this.voice);
	}

	myPrint() {
		console.log('AudioUpdate.myPrint()');
		return this.text;
	}
}

module.exports = AudioUpdate;