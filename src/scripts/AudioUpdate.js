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

		// this.text = "Something to export plus " + new AudioUpdateModule().myPrint();
		// this.text = (typeof props.text !== 'undefined') ? props.text : 'Good morning Daniel';
		// this.voice = (typeof props.voice !== 'undefined') ? props.voice : 'UK English Female';
		// this.modulesData = (typeof props.modulesData !== 'undefined') ? props.modulesData : {};
		// this.modules = [];
		self.textPreview = document.getElementById(SELECTORS.textPreview);
		self.modulesContainer = document.getElementById(SELECTORS.modulesContainer);

		self.playButton = document.getElementById(SELECTORS.playButton);
		self.playButton.addEventListener('click', self.speak.bind(this));

		self.saveButton = document.getElementById(SELECTORS.saveButton);
		self.saveButton.addEventListener('click', self.save.bind(this));

		self.loadButton = document.getElementById(SELECTORS.loadButton);
		self.loadButton.addEventListener('click', self.load.bind(this));

		self.deleteButton = document.getElementById(SELECTORS.deleteButton);
		self.deleteButton.addEventListener('click', self.delete.bind(this));

		
		self.data = this.load();
		if(self.data === null) {
			self.data = self.init();
		} else {
			self.buildModules();
		}

		self.generateText();
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
		this.buildModules();
		this.save();
		return defaultProps;
	}

	// constructs modules on load
	buildModules() {
		console.log('AudioUpdate.buildModules()');
		var self = this;
		this.modules = this.data.modules.map(function(moduleData) {
			var module = new AudioUpdateModule(moduleData);
			self.modulesContainer.appendChild(module.render());
			return module;
		});
	}

	// returns an Array of AudioUpdateModules, with updated data from the DOM
	getAllModules() {
		console.log('AudioUpdate.getAllModules()');
		// loop through modules in DOM and extract type & text
		var modules = this.modulesContainer.getElementsByClassName('module');
		var modulesData = Array.prototype.map.call(modules, function(module) {
			// This map should create AudioUpdateModules?
			// Functionality below should be stored in AudioUpdateModule as getData()
			return {
				type: module.dataset.moduleType,
				text: module.querySelectorAll('input')[0].value
			}
		});
		return modulesData;
	}

	generateText() {
		console.log('AudioUpdate.generateText()');
		var text = this.modules.reduce(function(acc, module) {
			console.log('acc: ', acc);
			console.log('module: ', module.renderText());
			return acc.renderText() + " " + module.renderText() + " ";
		});
		self.textPreview.innerHTML = text;
	}

	// update() {
	// 	console.log('AudioUpdate.update()');
	// 	this.text = "";
	// 	this.modulesContainer.innerHTML = '';
	// 	for(var key in this.modulesData) {
	// 		var module = new AudioUpdateModule(this.modulesData[key]);
	// 		this.text += module.text + ' ';
	// 		this.modules.push(module);
	// 		this.modulesContainer.appendChild(module.render());

	// 	}
	// 	this.updateTextPreview();
	// }

	updateTextPreview() {
		console.log('AudioUpdate.updateTextPreview()');
		this.textPreview.innerHTML = this.text;
	}

	save() {
		console.log('AudioUpdate.save()');
		var data = {};
		data.modules = this.getAllModules();
		this.data = data;
		if (typeof(Storage) !== "undefined") {
			// Code for localStorage/sessionStorage.
			localStorage.setItem('audio-update', JSON.stringify(data));
			this.generateText();
		} else {
			// Sorry! No Web Storage support..
			alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
		}
	}

	load() {
		console.log('AudioUpdate.load()');
		if (typeof(Storage) !== "undefined") {
			var data = JSON.parse(localStorage.getItem('audio-update'));
			// console.log('data: ', data);
			return data;
		} else {
			alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
		}
		return;
	}

	delete() {
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