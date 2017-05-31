var AudioUpdateModule = require('./AudioUpdateModule');
var TogglePlayButton = require('./components/TogglePlayButton');

const SELECTORS = {
	textPreview: 'textPreview',
	modulesContainer: 'modules',
	mediaControlsContainer: 'mediaControls',
	textInput: 'textInput',
	updateScriptButton: 'updateScript',
	playButton: 'play',
	stopButton: 'stop',
	saveButton: 'save',
	loadButton: 'load',
	deleteButton: 'delete',
	addModuleButton: 'addModule'
}

class AudioUpdate {
	constructor() {
		console.log('AudioUpdate.constructor()');
		// This uses some similar terms for similar items.
		// text: The string stored in AudioUpdate which gets read out
		// textPreview: The HTML displayed to the user of the text which will get read out
		// 				Separated from `text` so it can be styled if so desired
		var self = this;

		self.textPreview = document.getElementById(SELECTORS.textPreview);
		self.modulesContainer = document.getElementById(SELECTORS.modulesContainer);
		self.mediaControlsContainer = document.getElementById(SELECTORS.mediaControlsContainer);

		self.playButton = document.getElementById(SELECTORS.playButton);
		self.playButton.addEventListener('click', self.speak.bind(this));

		self.stopButton = document.getElementById(SELECTORS.stopButton);
		self.stopButton.addEventListener('click', self.stopSpeaking.bind(this));

		self.saveButton = document.getElementById(SELECTORS.saveButton);
		self.saveButton.addEventListener('click', self.saveChanges.bind(this));

		self.deleteButton = document.getElementById(SELECTORS.deleteButton);
		self.deleteButton.addEventListener('click', self.deleteFromStorage.bind(this));

		self.addModuleButton = document.getElementById(SELECTORS.addModuleButton);
		self.addModuleButton.addEventListener('click', self.addModule.bind(this));

		
		self.data = this.loadFromStorage();
		if(self.data === null) {
			self.init();
		}

		self.buildModulesFromData();
		self.renderModules();
		self.updateText();
		self.updateTextPreview();

		// Stop voices when leaving/reloading the page
		window.addEventListener("unload", function(e){
			responsiveVoice.cancel();
		}, false);
		
		var togglePlay = new TogglePlayButton({
			playCallback: this.speak
		});
		console.log('togglePlay: ', togglePlay);
		self.mediaControlsContainer.appendChild(togglePlay.render());
	}

	// Runs the first time Audio Update runs in the browser
	// as determined by the presence of localStorage
	init() {
		console.log('AudioUpdate.init()');
		var defaultProps = {
			modules: [
				{type: 'text', text: 'Good morning Daniel.'},
				{type: 'date', text: 'Today is {dddd} {MMM} {Do} .'},
				{type: 'weather', text: 'BOM says it will rain this afternoon, with a high of 18 degrees. Remember to bring an umbrella.'},
				{type: 'news', text: 'Here are a selection of headlines from the BBC. Trump unveils new plan to fight inflation. Syria crisis worsening, says UNHCR.'},
				{type: 'calendar', text: 'Remember you have an early appointment today - Coffee with Ben at 8:15 AM.'}
			]
		}
		this.data = defaultProps;
		this.saveToStorage();
	}

	// constructs modules on load
	buildModulesFromData() {
		console.log('AudioUpdate.buildModulesFromData()');
		var self = this;
		this.modules = this.data.modules.map(function(moduleData) {
			var module = new AudioUpdateModule(moduleData);
			return module;
		});
	}

	// 
	renderModules() {
		console.log('AudioUpdate.renderModules()');
		var self = this;
		for(var module of self.modules) {
			self.modulesContainer.appendChild(module.render());
		}
	}

	// replaces this.modules with an Array of Objects using data from the DOM
	// TODO: actually update existing modules instead of dump & replace
	updateModules() {
		console.log('AudioUpdate.updateModules()');
		// loop through modules in DOM and extract type & text
		var modules = this.modulesContainer.getElementsByClassName('module');
		this.modules = Array.prototype.map.call(modules, function(module) {
			return new AudioUpdateModule({
				type: module.dataset.moduleType,
				text: module.querySelectorAll('textarea')[0].value
			});
		});
	}

	addModule() {
		console.log('AudioUpdate.addModule()');
		var newModule = new AudioUpdateModule();
		this.modulesContainer.appendChild(newModule.render());
	}

	updateText() {
		console.log('AudioUpdate.updateText()');
		var text = '';
		// tried to use Array reduce but had problems with the accumulator & objects
		// broken: return acc.renderText() + " " + module.renderText() + " ";
		for(var index in this.modules) {
			text += this.modules[index].renderText() + ' ';
		}
		this.text = text;
	}

	updateTextPreview() {
		console.log('AudioUpdate.updateTextPreview()');
		this.textPreview.innerHTML = this.text;
	}

	updateData() {
		console.log('AudioUpdate.updateData()');
		var data = {};
		// TODO store voice
		data.modules = this.modules.map(function(module) {
			return module.getData();
		});
		this.data = data;
	}

	saveChanges() {
		console.log('AudioUpdate.saveChanges()');
		this.updateModules();
		this.updateData();
		this.saveToStorage();
		this.updateText();
		this.updateTextPreview();
	}

	saveToStorage() {
		console.log('AudioUpdate.saveToStorage()');
		var self = this;
		if (typeof(Storage) !== "undefined") {
			// Code for localStorage/sessionStorage.
			localStorage.setItem('audio-update', JSON.stringify(self.data));
		} else {
			// Sorry! No Web Storage support..
			alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
		}
	}

	loadFromStorage() {
		console.log('AudioUpdate.load()');
		if (typeof(Storage) !== "undefined") {
			var data = JSON.parse(localStorage.getItem('audio-update'));
			return data;
		} else {
			alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
		}
		return;
	}

	deleteFromStorage() {
		console.log('AudioUpdate.delete()');
		if (typeof(Storage) !== "undefined") {
			localStorage.removeItem('audio-update');
		} else {
			alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
		}
	}

	speak() {
		console.log('AudioUpdate.speak()');
		responsiveVoice.speak(this.text, this.voice);
	}

	stopSpeaking() {
		console.log('AudioUpdate.stopSpeaking()');
		responsiveVoice.cancel();
	}
}

module.exports = AudioUpdate;