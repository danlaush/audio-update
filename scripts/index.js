(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioUpdateModule = require('./AudioUpdateModule');

var SELECTORS = {
	textPreview: 'textPreview',
	modulesContainer: 'modules',
	textInput: 'textInput',
	updateScriptButton: 'updateScript',
	playButton: 'play'
};

var AudioUpdate = function () {
	function AudioUpdate(props) {
		_classCallCheck(this, AudioUpdate);

		console.log('AudioUpdate.constructor()');
		if (typeof props === 'undefined') var props = {};

		// this.text = "Something to export plus " + new AudioUpdateModule().myPrint();
		this.text = typeof props.text !== 'undefined' ? props.text : 'Good morning Daniel';
		this.voice = typeof props.voice !== 'undefined' ? props.voice : 'UK English Female';
		this.modulesData = typeof props.modulesData !== 'undefined' ? props.modulesData : {};
		this.modules = [];
		this.SELECTORS = SELECTORS;

		this.init();
	}

	_createClass(AudioUpdate, [{
		key: 'init',
		value: function init() {
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
	}, {
		key: 'update',
		value: function update() {
			console.log('AudioUpdate.update()');
			this.text = "";
			this.modulesContainer.innerHTML = '';
			for (var key in this.modulesData) {
				var module = new AudioUpdateModule(this.modulesData[key]);
				this.text += module.text + ' ';
				this.modules.push(module);
				this.modulesContainer.appendChild(module.render());
			}
			this.updateTextPreview();
		}
	}, {
		key: 'updateTextPreview',
		value: function updateTextPreview() {
			// Set up text preview
			this.textPreview.innerHTML = this.text;
		}
	}, {
		key: 'speak',
		value: function speak() {
			console.log('AudioUpdate.speak()');
			responsiveVoice.speak(this.text, this.voice);
		}
	}, {
		key: 'myPrint',
		value: function myPrint() {
			console.log('AudioUpdate.myPrint()');
			return this.text;
		}
	}]);

	return AudioUpdate;
}();

module.exports = AudioUpdate;

},{"./AudioUpdateModule":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioUpdateModule = function () {
    function AudioUpdateModule(props) {
        _classCallCheck(this, AudioUpdateModule);

        if (typeof props === 'undefined') props = {};

        this.type = typeof props.type !== 'undefined' ? props.type : 'text';
        this.text = typeof props.text !== 'undefined' ? props.text : 'Good morning';

        this.init();
    }

    _createClass(AudioUpdateModule, [{
        key: 'init',
        value: function init() {
            console.log('AudioUpdateModule.init()');
        }
    }, {
        key: 'render',
        value: function render() {
            console.log('AudioUpdateModule.render()');
            var container = document.createElement('div');
            container.className = 'module';
            var label = document.createElement('label');
            var labelText = document.createTextNode('Text');
            // label.htmlFor = key;
            label.appendChild(labelText);
            var el = document.createElement('input');
            // el.id = key;
            el.value = this.text;
            label.appendChild(el);
            container.appendChild(label);

            return container;
        }
    }, {
        key: 'renderText',
        value: function renderText() {
            console.log('AudioUpdateModule.render()');
            var container = document.createElement('div');
            return container;
        }
    }, {
        key: 'renderDate',
        value: function renderDate() {
            console.log('AudioUpdateModule.render()');
            var container = document.createElement('div');
            return container;
        }
    }, {
        key: 'myPrint',
        value: function myPrint() {
            console.log('AudioUpdateModule.myPrint()');
            return this.text;
        }
    }]);

    return AudioUpdateModule;
}();

module.exports = AudioUpdateModule;

},{}],3:[function(require,module,exports){
'use strict';

var AudioUpdate = require('./AudioUpdate');
console.log('loading the audio update');
var myUpdate = new AudioUpdate({
	text: 'Good morning Daniel',
	modulesData: [{ type: 'text', text: 'Good morning Daniel.' }, { type: 'date', text: 'Today is Sunday, May 28th.' }]
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

},{"./AudioUpdate":1}]},{},[3]);
