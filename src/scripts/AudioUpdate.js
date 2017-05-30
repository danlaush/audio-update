var AudioUpdateModule = require('./AudioUpdateModule');

const SELECTORS = {
	textPreview: 'textPreview',
	modulesContainer: 'modules',
	textInput: 'textInput',
	updateScriptButton: 'updateScript',
	playButton: 'play',
	saveButton: 'save',
	loadButton: 'load',
	deleteButton: 'delete'
}

class AudioUpdate {
	constructor() {
		console.log('AudioUpdate.constructor()');
		var self = this;

		self.textPreview = document.getElementById(SELECTORS.textPreview);
		self.modulesContainer = document.getElementById(SELECTORS.modulesContainer);

		self.playButton = document.getElementById(SELECTORS.playButton);
		self.playButton.addEventListener('click', self.speak.bind(this));

		self.saveButton = document.getElementById(SELECTORS.saveButton);
		self.saveButton.addEventListener('click', self.saveChanges.bind(this));

		self.loadButton = document.getElementById(SELECTORS.loadButton);
		self.loadButton.addEventListener('click', self.loadFromStorage.bind(this));

		self.deleteButton = document.getElementById(SELECTORS.deleteButton);
		self.deleteButton.addEventListener('click', self.deleteFromStorage.bind(this));

		
		self.data = this.loadFromStorage();
		if(self.data === null) {
			self.init();
		}

		self.buildModulesFromData();
		self.renderModules();
		self.updateText();
		self.updateTextPreview();
		// This uses several similar terms for similar items.
		// text: The string stored in AudioUpdate which gets read out
		// textPreview: The HTML displayed to the user of the text which will get read out
		// 				Separated from `text` so it can be styled if so desired
		// textInput: Temporary text field for generating `text`. Will be componentised.
		
		// self.update();

		// self.updateScriptButton = document.getElementById(SELECTORS.updateScriptButton);
		// self.updateScriptButton.addEventListener('click', self.update.bind(this));
	}

	// Runs the first time Audio Update runs in the browser
	// as determined by the presence of localStorage
	init() {
		console.log('AudioUpdate.init()');
		var defaultProps = {
			modules: [
				{type: 'text', text: 'Good morning Daniel.'},
				{type: 'date', text: 'Today is {dddd} {MMM} {Do}'}
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

	// loop through 
	renderModules() {
		console.log('AudioUpdate.renderModules()');
		var self = this;
		for(var module of self.modules) {
			self.modulesContainer.appendChild(module.render());
		}
	}

	// returns an Array of Objects, with updated data from the DOM
	updateModules() {
		console.log('AudioUpdate.updateModules()');
		// loop through modules in DOM and extract type & text
		var modules = this.modulesContainer.getElementsByClassName('module');
		this.modules = Array.prototype.map.call(modules, function(module) {
			// This map should create AudioUpdateModules?
			// Functionality below should be stored in AudioUpdateModule as getData()
			return new AudioUpdateModule({
				type: module.dataset.moduleType,
				text: module.querySelectorAll('input')[0].value
			});
		});
	}

	updateText() {
		console.log('AudioUpdate.updateText()');
		var text = this.modules.reduce(function(acc, module) {
			return acc.renderText() + " " + module.renderText() + " ";
		});
		this.text = text;
	}

	updateTextPreview() {
		console.log('AudioUpdate.updateTextPreview()');
		this.textPreview.innerHTML = this.text;
	}

	updateData() {
		console.log('AudioUpdate.updateData()');
		var data = {};
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

	myPrint() {
		console.log('AudioUpdate.myPrint()');
		return this.text;
	}
}

module.exports = AudioUpdate;