
var AudioUpdate = require('./AudioUpdate');
console.log('loading the audio update'); 
var myUpdate = new AudioUpdate({
	text: 'Good morning Daniel',
	modulesData: [
		{type: 'text', text: 'Good morning Daniel.'},
		{type: 'date', text: 'Today is %d.'}
	]
});
// console.log(myUpdate.myPrint());

// function AudioUpdate(config) {
//     const SELECTORS = {
// 		textPreview: 'textPreview',
// 		modulesContainer: 'modules',
// 		textInput: 'textInput',
// 		updateScriptButton: 'updateScript',
// 		playButton: 'play'
// 	}
// 	this.text = config.text || "Good morning Daniel";
// 	this.voice = config.voice || "UK English Female";
// 	this.modules = config.modules || {};
// 	this.SELECTORS = SELECTORS;

// 	this.init();
// }

// AudioUpdate.prototype.init = function() {
// 	console.log('AudioUpdate.init()');
// 	// This uses several similar terms for similar items.
// 	// text: The string stored in AudioUpdate which gets read out
// 	// textPreview: The HTML displayed to the user of the text which will get read out
// 	// 				Separated from `text` so it can be styled if so desired
// 	// textInput: Temporary text field for generating `text`. Will be componentised.
// 	var self = this;
	
// 	// Set up text preview
// 	self.textPreview = document.getElementById(self.SELECTORS.textPreview);
// 	self.textPreview.innerHTML = self.text;

// 	self.modulesContainer = document.getElementById(self.SELECTORS.modulesContainer);
	
// 	// Set up modules
// 	self.createModules();


// 	self.updateScriptButton = document.getElementById(self.SELECTORS.updateScriptButton);
// 	self.updateScriptButton.addEventListener('click', self.updateModules.bind(this));
// 	self.playButton = document.getElementById(self.SELECTORS.playButton);
// 	self.playButton.addEventListener('click', self.speak.bind(this));
// }

// AudioUpdate.prototype.saveData = function() {
// 	console.log('AudioUpdate.saveData()');
// 	console.log('modules to save: ', this.modules);
// 	if (typeof(Storage) !== "undefined") {
// 		// Code for localStorage/sessionStorage.
// 		localStorage.setItem('audio-update-modules', this.modules);
// 	} else {
// 		// Sorry! No Web Storage support..
// 		alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
// 	}
// }

// AudioUpdate.prototype.viewData = function() {
// 	console.log('AudioUpdate.viewData()');
// 	console.log(localStorage.getItem('audio-update-modules'));
// }

// AudioUpdate.prototype.createModules = function() {
// 	console.log('AudioUpdate.createModules()');
// 	for (var key in this.modules) {
// 		var container = document.createElement('div');
// 		container.id = key + 'ModuleContainer';
// 		container.className = 'module';
// 		var label = document.createElement('label');
// 		var labelText = document.createTextNode('Text');
// 		label.htmlFor = key;
// 		label.appendChild(labelText);
// 		var el = document.createElement('input');
// 		el.id = key;
// 		el.value = this.modules[key];
// 		container.appendChild(label);
// 		container.appendChild(el);
// 		this.modulesContainer.appendChild(container);
// 	}
// 	this.updateScript();
// }

// AudioUpdate.prototype.updateModules = function() {    
// 	console.log('AudioUpdate.updateModules()');
// 	console.log(this.modules);
// 	console.log('look through modules');
// 	// erase modules
// 	this.modules = {};
// 	// get modules from dom
// 	console.log('this.modulesContainer.children: ', this.modulesContainer.children, this.modulesContainer.children.length);
// 	for (var i = 0; i < this.modulesContainer.children.length; i++) {
// 		console.log('i: ', i);
// 		console.log(this.modulesContainer.children[i].value);
// 		var key = this.modulesContainer.children[i].id;
// 		var value = this.modulesContainer.children[i].value;
// 		this.modules[key] = value;
// 	}
// 	console.log(this.modules);
// 	this.saveData();
// 	this.viewData();
// 	this.updateScript();
// }

// AudioUpdate.prototype.updateScript = function() {
// 	console.log('AudioUpdate.updateScript()');
// 	var text = "";
// 		for(var key in this.modules) {
// 			text += this.modules[key] + ' ';
// 		}
// 	this.textPreview.innerHTML = text;
// 	this.text = text;
// }

// AudioUpdate.prototype.speak = function() {
// 	console.log('AudioUpdate.speak()');
// 	console.log(this.text);
// 	responsiveVoice.speak(this.text, this.voice);
// }

// var newUpdate = new AudioUpdate({
// 	text: 'Good morning Daniel',
// 	modules: {
// 		text: 'Good morning Daniel.',
// 		text2: 'Today is Thursday.'
// 	}
// });

// // newUpdate.speak();
