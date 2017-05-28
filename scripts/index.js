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
	playButton: 'play',
	saveButton: 'save',
	loadButton: 'load',
	deleteButton: 'delete'
};

var AudioUpdate = function () {
	function AudioUpdate() {
		_classCallCheck(this, AudioUpdate);

		console.log('AudioUpdate.constructor()');
		var self = this;

		// this.text = "Something to export plus " + new AudioUpdateModule().myPrint();
		// this.text = (typeof props.text !== 'undefined') ? props.text : 'Good morning Daniel';
		// this.voice = (typeof props.voice !== 'undefined') ? props.voice : 'UK English Female';
		// this.modulesData = (typeof props.modulesData !== 'undefined') ? props.modulesData : {};
		// this.modules = [];
		self.SELECTORS = SELECTORS;
		self.textPreview = document.getElementById(self.SELECTORS.textPreview);
		self.modulesContainer = document.getElementById(self.SELECTORS.modulesContainer);

		self.playButton = document.getElementById(self.SELECTORS.playButton);
		self.playButton.addEventListener('click', self.speak.bind(this));

		self.saveButton = document.getElementById(self.SELECTORS.saveButton);
		self.saveButton.addEventListener('click', self.save.bind(this));

		self.loadButton = document.getElementById(self.SELECTORS.loadButton);
		self.loadButton.addEventListener('click', self.load.bind(this));

		self.deleteButton = document.getElementById(self.SELECTORS.deleteButton);
		self.deleteButton.addEventListener('click', self.delete.bind(this));

		self.data = this.load();
		if (self.data === null) {
			self.data = self.init();
		}

		self.buildModules();
		self.generateText();
		// This uses several similar terms for similar items.
		// text: The string stored in AudioUpdate which gets read out
		// textPreview: The HTML displayed to the user of the text which will get read out
		// 				Separated from `text` so it can be styled if so desired
		// textInput: Temporary text field for generating `text`. Will be componentised.

		// self.update();

		// self.updateScriptButton = document.getElementById(self.SELECTORS.updateScriptButton);
		// self.updateScriptButton.addEventListener('click', self.update.bind(this));
	}

	// Runs the first time Audio Update runs in the browser
	// as determined by the presence of localStorage


	_createClass(AudioUpdate, [{
		key: 'init',
		value: function init() {
			console.log('AudioUpdate.init()');
			var defaultProps = {
				modules: [{ type: 'text', text: 'Good morning Daniel.' }, { type: 'date', text: 'Today is Sunday, May 28th.' }]
			};
			this.modules = defaultProps.modules;
			this.save();
			return defaultProps;
		}

		// constructs modules on load

	}, {
		key: 'buildModules',
		value: function buildModules() {
			console.log('AudioUpdate.buildModules()');
			var self = this;
			this.modules = this.data.modules.map(function (moduleData) {
				var module = new AudioUpdateModule(moduleData);
				self.modulesContainer.appendChild(module.render());
				return module;
			});
		}

		// getAllModules() {
		// 	console.log('AudioUpdate.getAllModules()');
		// 	return this.modules;
		// }

	}, {
		key: 'generateText',
		value: function generateText() {
			console.log('AudioUpdate.generateText()');
			var text = this.modules.reduce(function (acc, module) {
				console.log('acc: ', acc);
				console.log('module: ', module);
				return acc.text += " " + module.text + " ";
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

	}, {
		key: 'updateTextPreview',
		value: function updateTextPreview() {
			console.log('AudioUpdate.updateTextPreview()');
			this.textPreview.innerHTML = this.text;
		}
	}, {
		key: 'save',
		value: function save() {
			console.log('AudioUpdate.save()');
			console.log(this.modules);
			var data = {};
			data.modules = this.data.map(function (module) {
				return module.getData();
			});
			console.log('data: ', data);
			if (typeof Storage !== "undefined") {
				// Code for localStorage/sessionStorage.
				localStorage.setItem('audio-update', JSON.stringify(data));
			} else {
				// Sorry! No Web Storage support..
				alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
			}
		}
	}, {
		key: 'load',
		value: function load() {
			console.log('AudioUpdate.load()');
			if (typeof Storage !== "undefined") {
				var data = JSON.parse(localStorage.getItem('audio-update'));
				// console.log('data: ', data);
				return data;
			} else {
				alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
			}
			return;
		}
	}, {
		key: 'delete',
		value: function _delete() {
			console.log('AudioUpdate.delete()');
			if (typeof Storage !== "undefined") {
				localStorage.removeItem('audio-update');
			} else {
				alert('Sorry, your browser doesn\'t support Local Storage. Please upgrade to a newer browser.');
			}
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
            console.log('AudioUpdateModule.renderText()');
            var container = document.createElement('div');
            return container;
        }
    }, {
        key: 'renderDate',
        value: function renderDate() {
            console.log('AudioUpdateModule.renderDate()');
            var container = document.createElement('div');
            return container;
        }
    }, {
        key: 'getData',
        value: function getData() {
            return {
                type: this.type,
                text: this.text
            };
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
var myUpdate = new AudioUpdate();
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

},{"./AudioUpdate":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9zY3JpcHRzL0F1ZGlvVXBkYXRlLmpzIiwic3JjL3NjcmlwdHMvQXVkaW9VcGRhdGVNb2R1bGUuanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLElBQUksb0JBQW9CLFFBQVEscUJBQVIsQ0FBeEI7O0FBRUEsSUFBTSxZQUFZO0FBQ2pCLGNBQWEsYUFESTtBQUVqQixtQkFBa0IsU0FGRDtBQUdqQixZQUFXLFdBSE07QUFJakIscUJBQW9CLGNBSkg7QUFLakIsYUFBWSxNQUxLO0FBTWpCLGFBQVksTUFOSztBQU9qQixhQUFZLE1BUEs7QUFRakIsZUFBYztBQVJHLENBQWxCOztJQVdNLFc7QUFDTCx3QkFBYztBQUFBOztBQUNiLFVBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0EsTUFBSSxPQUFPLElBQVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLE9BQUssV0FBTCxHQUFtQixTQUFTLGNBQVQsQ0FBd0IsS0FBSyxTQUFMLENBQWUsV0FBdkMsQ0FBbkI7QUFDQSxPQUFLLGdCQUFMLEdBQXdCLFNBQVMsY0FBVCxDQUF3QixLQUFLLFNBQUwsQ0FBZSxnQkFBdkMsQ0FBeEI7O0FBRUEsT0FBSyxVQUFMLEdBQWtCLFNBQVMsY0FBVCxDQUF3QixLQUFLLFNBQUwsQ0FBZSxVQUF2QyxDQUFsQjtBQUNBLE9BQUssVUFBTCxDQUFnQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUExQzs7QUFFQSxPQUFLLFVBQUwsR0FBa0IsU0FBUyxjQUFULENBQXdCLEtBQUssU0FBTCxDQUFlLFVBQXZDLENBQWxCO0FBQ0EsT0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBdWRpb1VwZGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4vQXVkaW9VcGRhdGVNb2R1bGUnKTtcblxuY29uc3QgU0VMRUNUT1JTID0ge1xuXHR0ZXh0UHJldmlldzogJ3RleHRQcmV2aWV3Jyxcblx0bW9kdWxlc0NvbnRhaW5lcjogJ21vZHVsZXMnLFxuXHR0ZXh0SW5wdXQ6ICd0ZXh0SW5wdXQnLFxuXHR1cGRhdGVTY3JpcHRCdXR0b246ICd1cGRhdGVTY3JpcHQnLFxuXHRwbGF5QnV0dG9uOiAncGxheScsXG5cdHNhdmVCdXR0b246ICdzYXZlJyxcblx0bG9hZEJ1dHRvbjogJ2xvYWQnLFxuXHRkZWxldGVCdXR0b246ICdkZWxldGUnXG59XG5cbmNsYXNzIEF1ZGlvVXBkYXRlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLmNvbnN0cnVjdG9yKCknKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHQvLyB0aGlzLnRleHQgPSBcIlNvbWV0aGluZyB0byBleHBvcnQgcGx1cyBcIiArIG5ldyBBdWRpb1VwZGF0ZU1vZHVsZSgpLm15UHJpbnQoKTtcblx0XHQvLyB0aGlzLnRleHQgPSAodHlwZW9mIHByb3BzLnRleHQgIT09ICd1bmRlZmluZWQnKSA/IHByb3BzLnRleHQgOiAnR29vZCBtb3JuaW5nIERhbmllbCc7XG5cdFx0Ly8gdGhpcy52b2ljZSA9ICh0eXBlb2YgcHJvcHMudm9pY2UgIT09ICd1bmRlZmluZWQnKSA/IHByb3BzLnZvaWNlIDogJ1VLIEVuZ2xpc2ggRmVtYWxlJztcblx0XHQvLyB0aGlzLm1vZHVsZXNEYXRhID0gKHR5cGVvZiBwcm9wcy5tb2R1bGVzRGF0YSAhPT0gJ3VuZGVmaW5lZCcpID8gcHJvcHMubW9kdWxlc0RhdGEgOiB7fTtcblx0XHQvLyB0aGlzLm1vZHVsZXMgPSBbXTtcblx0XHRzZWxmLlNFTEVDVE9SUyA9IFNFTEVDVE9SUztcblx0XHRzZWxmLnRleHRQcmV2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZi5TRUxFQ1RPUlMudGV4dFByZXZpZXcpO1xuXHRcdHNlbGYubW9kdWxlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuU0VMRUNUT1JTLm1vZHVsZXNDb250YWluZXIpO1xuXG5cdFx0c2VsZi5wbGF5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZi5TRUxFQ1RPUlMucGxheUJ1dHRvbik7XG5cdFx0c2VsZi5wbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZi5zcGVhay5iaW5kKHRoaXMpKTtcblxuXHRcdHNlbGYuc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuU0VMRUNUT1JTLnNhdmVCdXR0b24pO1xuXHRcdHNlbGYuc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGYuc2F2ZS5iaW5kKHRoaXMpKTtcblxuXHRcdHNlbGYubG9hZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuU0VMRUNUT1JTLmxvYWRCdXR0b24pO1xuXHRcdHNlbGYubG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGYubG9hZC5iaW5kKHRoaXMpKTtcblxuXHRcdHNlbGYuZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZi5TRUxFQ1RPUlMuZGVsZXRlQnV0dG9uKTtcblx0XHRzZWxmLmRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGYuZGVsZXRlLmJpbmQodGhpcykpO1xuXG5cdFx0XG5cdFx0c2VsZi5kYXRhID0gdGhpcy5sb2FkKCk7XG5cdFx0aWYoc2VsZi5kYXRhID09PSBudWxsKSB7XG5cdFx0XHRzZWxmLmRhdGEgPSBzZWxmLmluaXQoKTtcblx0XHR9XG5cblx0XHRzZWxmLmJ1aWxkTW9kdWxlcygpO1xuXHRcdHNlbGYuZ2VuZXJhdGVUZXh0KCk7XG5cdFx0Ly8gVGhpcyB1c2VzIHNldmVyYWwgc2ltaWxhciB0ZXJtcyBmb3Igc2ltaWxhciBpdGVtcy5cblx0XHQvLyB0ZXh0OiBUaGUgc3RyaW5nIHN0b3JlZCBpbiBBdWRpb1VwZGF0ZSB3aGljaCBnZXRzIHJlYWQgb3V0XG5cdFx0Ly8gdGV4dFByZXZpZXc6IFRoZSBIVE1MIGRpc3BsYXllZCB0byB0aGUgdXNlciBvZiB0aGUgdGV4dCB3aGljaCB3aWxsIGdldCByZWFkIG91dFxuXHRcdC8vIFx0XHRcdFx0U2VwYXJhdGVkIGZyb20gYHRleHRgIHNvIGl0IGNhbiBiZSBzdHlsZWQgaWYgc28gZGVzaXJlZFxuXHRcdC8vIHRleHRJbnB1dDogVGVtcG9yYXJ5IHRleHQgZmllbGQgZm9yIGdlbmVyYXRpbmcgYHRleHRgLiBXaWxsIGJlIGNvbXBvbmVudGlzZWQuXG5cdFx0XG5cdFx0Ly8gc2VsZi51cGRhdGUoKTtcblxuXHRcdC8vIHNlbGYudXBkYXRlU2NyaXB0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZi5TRUxFQ1RPUlMudXBkYXRlU2NyaXB0QnV0dG9uKTtcblx0XHQvLyBzZWxmLnVwZGF0ZVNjcmlwdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGYudXBkYXRlLmJpbmQodGhpcykpO1xuXHR9XG5cblx0Ly8gUnVucyB0aGUgZmlyc3QgdGltZSBBdWRpbyBVcGRhdGUgcnVucyBpbiB0aGUgYnJvd3NlclxuXHQvLyBhcyBkZXRlcm1pbmVkIGJ5IHRoZSBwcmVzZW5jZSBvZiBsb2NhbFN0b3JhZ2Vcblx0aW5pdCgpIHtcblx0XHRjb25zb2xlLmxvZygnQXVkaW9VcGRhdGUuaW5pdCgpJyk7XG5cdFx0dmFyIGRlZmF1bHRQcm9wcyA9IHtcblx0XHRcdG1vZHVsZXM6IFtcblx0XHRcdFx0e3R5cGU6ICd0ZXh0JywgdGV4dDogJ0dvb2QgbW9ybmluZyBEYW5pZWwuJ30sXG5cdFx0XHRcdHt0eXBlOiAnZGF0ZScsIHRleHQ6ICdUb2RheSBpcyBTdW5kYXksIE1heSAyOHRoLid9XG5cdFx0XHRdXG5cdFx0fVxuXHRcdHRoaXMubW9kdWxlcyA9IGRlZmF1bHRQcm9wcy5tb2R1bGVzO1xuXHRcdHRoaXMuc2F2ZSgpO1xuXHRcdHJldHVybiBkZWZhdWx0UHJvcHM7XG5cdH1cblxuXHQvLyBjb25zdHJ1Y3RzIG1vZHVsZXMgb24gbG9hZFxuXHRidWlsZE1vZHVsZXMoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLmJ1aWxkTW9kdWxlcygpJyk7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMubW9kdWxlcyA9IHRoaXMuZGF0YS5tb2R1bGVzLm1hcChmdW5jdGlvbihtb2R1bGVEYXRhKSB7XG5cdFx0XHR2YXIgbW9kdWxlID0gbmV3IEF1ZGlvVXBkYXRlTW9kdWxlKG1vZHVsZURhdGEpO1xuXHRcdFx0c2VsZi5tb2R1bGVzQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vZHVsZS5yZW5kZXIoKSk7XG5cdFx0XHRyZXR1cm4gbW9kdWxlO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gZ2V0QWxsTW9kdWxlcygpIHtcblx0Ly8gXHRjb25zb2xlLmxvZygnQXVkaW9VcGRhdGUuZ2V0QWxsTW9kdWxlcygpJyk7XG5cdC8vIFx0cmV0dXJuIHRoaXMubW9kdWxlcztcblx0Ly8gfVxuXG5cdGdlbmVyYXRlVGV4dCgpIHtcblx0XHRjb25zb2xlLmxvZygnQXVkaW9VcGRhdGUuZ2VuZXJhdGVUZXh0KCknKTtcblx0XHR2YXIgdGV4dCA9IHRoaXMubW9kdWxlcy5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBtb2R1bGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdhY2M6ICcsIGFjYyk7XG5cdFx0XHRjb25zb2xlLmxvZygnbW9kdWxlOiAnLCBtb2R1bGUpO1xuXHRcdFx0cmV0dXJuIGFjYy50ZXh0ICs9IFwiIFwiICsgbW9kdWxlLnRleHQgKyBcIiBcIjtcblx0XHR9KTtcblx0XHRzZWxmLnRleHRQcmV2aWV3LmlubmVySFRNTCA9IHRleHQ7XG5cdH1cblxuXHQvLyB1cGRhdGUoKSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLnVwZGF0ZSgpJyk7XG5cdC8vIFx0dGhpcy50ZXh0ID0gXCJcIjtcblx0Ly8gXHR0aGlzLm1vZHVsZXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cdC8vIFx0Zm9yKHZhciBrZXkgaW4gdGhpcy5tb2R1bGVzRGF0YSkge1xuXHQvLyBcdFx0dmFyIG1vZHVsZSA9IG5ldyBBdWRpb1VwZGF0ZU1vZHVsZSh0aGlzLm1vZHVsZXNEYXRhW2tleV0pO1xuXHQvLyBcdFx0dGhpcy50ZXh0ICs9IG1vZHVsZS50ZXh0ICsgJyAnO1xuXHQvLyBcdFx0dGhpcy5tb2R1bGVzLnB1c2gobW9kdWxlKTtcblx0Ly8gXHRcdHRoaXMubW9kdWxlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChtb2R1bGUucmVuZGVyKCkpO1xuXG5cdC8vIFx0fVxuXHQvLyBcdHRoaXMudXBkYXRlVGV4dFByZXZpZXcoKTtcblx0Ly8gfVxuXG5cdHVwZGF0ZVRleHRQcmV2aWV3KCkge1xuXHRcdGNvbnNvbGUubG9nKCdBdWRpb1VwZGF0ZS51cGRhdGVUZXh0UHJldmlldygpJyk7XG5cdFx0dGhpcy50ZXh0UHJldmlldy5pbm5lckhUTUwgPSB0aGlzLnRleHQ7XG5cdH1cblxuXHRzYXZlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdBdWRpb1VwZGF0ZS5zYXZlKCknKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLm1vZHVsZXMpO1xuXHRcdHZhciBkYXRhID0ge307XG5cdFx0ZGF0YS5tb2R1bGVzID0gdGhpcy5kYXRhLm1hcChmdW5jdGlvbihtb2R1bGUpIHtcblx0XHRcdHJldHVybiBtb2R1bGUuZ2V0RGF0YSgpO1xuXHRcdH0pO1xuXHRcdGNvbnNvbGUubG9nKCdkYXRhOiAnLCBkYXRhKTtcblx0XHRpZiAodHlwZW9mKFN0b3JhZ2UpICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHQvLyBDb2RlIGZvciBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2UuXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXVkaW8tdXBkYXRlJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBTb3JyeSEgTm8gV2ViIFN0b3JhZ2Ugc3VwcG9ydC4uXG5cdFx0XHRhbGVydCgnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBMb2NhbCBTdG9yYWdlLiBQbGVhc2UgdXBncmFkZSB0byBhIG5ld2VyIGJyb3dzZXIuJyk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZCgpIHtcblx0XHRjb25zb2xlLmxvZygnQXVkaW9VcGRhdGUubG9hZCgpJyk7XG5cdFx0aWYgKHR5cGVvZihTdG9yYWdlKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhdWRpby11cGRhdGUnKSk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnZGF0YTogJywgZGF0YSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWxlcnQoJ1NvcnJ5LCB5b3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgTG9jYWwgU3RvcmFnZS4gUGxlYXNlIHVwZ3JhZGUgdG8gYSBuZXdlciBicm93c2VyLicpO1xuXHRcdH1cblx0XHRyZXR1cm47XG5cdH1cblxuXHRkZWxldGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLmRlbGV0ZSgpJyk7XG5cdFx0aWYgKHR5cGVvZihTdG9yYWdlKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2F1ZGlvLXVwZGF0ZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbGVydCgnU29ycnksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBMb2NhbCBTdG9yYWdlLiBQbGVhc2UgdXBncmFkZSB0byBhIG5ld2VyIGJyb3dzZXIuJyk7XG5cdFx0fVxuXHR9XG5cblx0c3BlYWsoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLnNwZWFrKCknKTtcblx0XHRyZXNwb25zaXZlVm9pY2Uuc3BlYWsodGhpcy50ZXh0LCB0aGlzLnZvaWNlKTtcblx0fVxuXG5cdG15UHJpbnQoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLm15UHJpbnQoKScpO1xuXHRcdHJldHVybiB0aGlzLnRleHQ7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb1VwZGF0ZTsiLCJcbmNsYXNzIEF1ZGlvVXBkYXRlTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBpZih0eXBlb2YgcHJvcHMgPT09ICd1bmRlZmluZWQnKSBwcm9wcyA9IHt9O1xuXG4gICAgICAgIHRoaXMudHlwZSA9ICh0eXBlb2YgcHJvcHMudHlwZSAhPT0gJ3VuZGVmaW5lZCcpID8gcHJvcHMudHlwZSA6ICd0ZXh0JztcbiAgICAgICAgdGhpcy50ZXh0ID0gKHR5cGVvZiBwcm9wcy50ZXh0ICE9PSAndW5kZWZpbmVkJykgPyBwcm9wcy50ZXh0IDogJ0dvb2QgbW9ybmluZyc7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlTW9kdWxlLmluaXQoKScpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQXVkaW9VcGRhdGVNb2R1bGUucmVuZGVyKCknKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ21vZHVsZSc7XG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHZhciBsYWJlbFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnVGV4dCcpO1xuICAgICAgICAvLyBsYWJlbC5odG1sRm9yID0ga2V5O1xuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChsYWJlbFRleHQpO1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAvLyBlbC5pZCA9IGtleTtcbiAgICAgICAgZWwudmFsdWUgPSB0aGlzLnRleHQ7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcmVuZGVyVGV4dCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlTW9kdWxlLnJlbmRlclRleHQoKScpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcmVuZGVyRGF0ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlTW9kdWxlLnJlbmRlckRhdGUoKScpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXJcbiAgICB9XG5cbiAgICBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgICAgdGV4dDogdGhpcy50ZXh0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBteVByaW50KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQXVkaW9VcGRhdGVNb2R1bGUubXlQcmludCgpJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvVXBkYXRlTW9kdWxlOyIsIlxudmFyIEF1ZGlvVXBkYXRlID0gcmVxdWlyZSgnLi9BdWRpb1VwZGF0ZScpO1xuY29uc29sZS5sb2coJ2xvYWRpbmcgdGhlIGF1ZGlvIHVwZGF0ZScpOyBcbnZhciBteVVwZGF0ZSA9IG5ldyBBdWRpb1VwZGF0ZSgpO1xuLy8gY29uc29sZS5sb2cobXlVcGRhdGUubXlQcmludCgpKTtcblxuLy8gZnVuY3Rpb24gQXVkaW9VcGRhdGUoY29uZmlnKSB7XG4vLyAgICAgY29uc3QgU0VMRUNUT1JTID0ge1xuLy8gXHRcdHRleHRQcmV2aWV3OiAndGV4dFByZXZpZXcnLFxuLy8gXHRcdG1vZHVsZXNDb250YWluZXI6ICdtb2R1bGVzJyxcbi8vIFx0XHR0ZXh0SW5wdXQ6ICd0ZXh0SW5wdXQnLFxuLy8gXHRcdHVwZGF0ZVNjcmlwdEJ1dHRvbjogJ3VwZGF0ZVNjcmlwdCcsXG4vLyBcdFx0cGxheUJ1dHRvbjogJ3BsYXknXG4vLyBcdH1cbi8vIFx0dGhpcy50ZXh0ID0gY29uZmlnLnRleHQgfHwgXCJHb29kIG1vcm5pbmcgRGFuaWVsXCI7XG4vLyBcdHRoaXMudm9pY2UgPSBjb25maWcudm9pY2UgfHwgXCJVSyBFbmdsaXNoIEZlbWFsZVwiO1xuLy8gXHR0aGlzLm1vZHVsZXMgPSBjb25maWcubW9kdWxlcyB8fCB7fTtcbi8vIFx0dGhpcy5TRUxFQ1RPUlMgPSBTRUxFQ1RPUlM7XG5cbi8vIFx0dGhpcy5pbml0KCk7XG4vLyB9XG5cbi8vIEF1ZGlvVXBkYXRlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4vLyBcdGNvbnNvbGUubG9nKCdBdWRpb1VwZGF0ZS5pbml0KCknKTtcbi8vIFx0Ly8gVGhpcyB1c2VzIHNldmVyYWwgc2ltaWxhciB0ZXJtcyBmb3Igc2ltaWxhciBpdGVtcy5cbi8vIFx0Ly8gdGV4dDogVGhlIHN0cmluZyBzdG9yZWQgaW4gQXVkaW9VcGRhdGUgd2hpY2ggZ2V0cyByZWFkIG91dFxuLy8gXHQvLyB0ZXh0UHJldmlldzogVGhlIEhUTUwgZGlzcGxheWVkIHRvIHRoZSB1c2VyIG9mIHRoZSB0ZXh0IHdoaWNoIHdpbGwgZ2V0IHJlYWQgb3V0XG4vLyBcdC8vIFx0XHRcdFx0U2VwYXJhdGVkIGZyb20gYHRleHRgIHNvIGl0IGNhbiBiZSBzdHlsZWQgaWYgc28gZGVzaXJlZFxuLy8gXHQvLyB0ZXh0SW5wdXQ6IFRlbXBvcmFyeSB0ZXh0IGZpZWxkIGZvciBnZW5lcmF0aW5nIGB0ZXh0YC4gV2lsbCBiZSBjb21wb25lbnRpc2VkLlxuLy8gXHR2YXIgc2VsZiA9IHRoaXM7XG5cdFxuLy8gXHQvLyBTZXQgdXAgdGV4dCBwcmV2aWV3XG4vLyBcdHNlbGYudGV4dFByZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxmLlNFTEVDVE9SUy50ZXh0UHJldmlldyk7XG4vLyBcdHNlbGYudGV4dFByZXZpZXcuaW5uZXJIVE1MID0gc2VsZi50ZXh0O1xuXG4vLyBcdHNlbGYubW9kdWxlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuU0VMRUNUT1JTLm1vZHVsZXNDb250YWluZXIpO1xuXHRcbi8vIFx0Ly8gU2V0IHVwIG1vZHVsZXNcbi8vIFx0c2VsZi5jcmVhdGVNb2R1bGVzKCk7XG5cblxuLy8gXHRzZWxmLnVwZGF0ZVNjcmlwdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuU0VMRUNUT1JTLnVwZGF0ZVNjcmlwdEJ1dHRvbik7XG4vLyBcdHNlbGYudXBkYXRlU2NyaXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZi51cGRhdGVNb2R1bGVzLmJpbmQodGhpcykpO1xuLy8gXHRzZWxmLnBsYXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxmLlNFTEVDVE9SUy5wbGF5QnV0dG9uKTtcbi8vIFx0c2VsZi5wbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZi5zcGVhay5iaW5kKHRoaXMpKTtcbi8vIH1cblxuLy8gQXVkaW9VcGRhdGUucHJvdG90eXBlLnNhdmVEYXRhID0gZnVuY3Rpb24oKSB7XG4vLyBcdGNvbnNvbGUubG9nKCdBdWRpb1VwZGF0ZS5zYXZlRGF0YSgpJyk7XG4vLyBcdGNvbnNvbGUubG9nKCdtb2R1bGVzIHRvIHNhdmU6ICcsIHRoaXMubW9kdWxlcyk7XG4vLyBcdGlmICh0eXBlb2YoU3RvcmFnZSkgIT09IFwidW5kZWZpbmVkXCIpIHtcbi8vIFx0XHQvLyBDb2RlIGZvciBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2UuXG4vLyBcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1ZGlvLXVwZGF0ZS1tb2R1bGVzJywgdGhpcy5tb2R1bGVzKTtcbi8vIFx0fSBlbHNlIHtcbi8vIFx0XHQvLyBTb3JyeSEgTm8gV2ViIFN0b3JhZ2Ugc3VwcG9ydC4uXG4vLyBcdFx0YWxlcnQoJ1NvcnJ5LCB5b3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgTG9jYWwgU3RvcmFnZS4gUGxlYXNlIHVwZ3JhZGUgdG8gYSBuZXdlciBicm93c2VyLicpO1xuLy8gXHR9XG4vLyB9XG5cbi8vIEF1ZGlvVXBkYXRlLnByb3RvdHlwZS52aWV3RGF0YSA9IGZ1bmN0aW9uKCkge1xuLy8gXHRjb25zb2xlLmxvZygnQXVkaW9VcGRhdGUudmlld0RhdGEoKScpO1xuLy8gXHRjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXVkaW8tdXBkYXRlLW1vZHVsZXMnKSk7XG4vLyB9XG5cbi8vIEF1ZGlvVXBkYXRlLnByb3RvdHlwZS5jcmVhdGVNb2R1bGVzID0gZnVuY3Rpb24oKSB7XG4vLyBcdGNvbnNvbGUubG9nKCdBdWRpb1VwZGF0ZS5jcmVhdGVNb2R1bGVzKCknKTtcbi8vIFx0Zm9yICh2YXIga2V5IGluIHRoaXMubW9kdWxlcykge1xuLy8gXHRcdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vIFx0XHRjb250YWluZXIuaWQgPSBrZXkgKyAnTW9kdWxlQ29udGFpbmVyJztcbi8vIFx0XHRjb250YWluZXIuY2xhc3NOYW1lID0gJ21vZHVsZSc7XG4vLyBcdFx0dmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbi8vIFx0XHR2YXIgbGFiZWxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RleHQnKTtcbi8vIFx0XHRsYWJlbC5odG1sRm9yID0ga2V5O1xuLy8gXHRcdGxhYmVsLmFwcGVuZENoaWxkKGxhYmVsVGV4dCk7XG4vLyBcdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbi8vIFx0XHRlbC5pZCA9IGtleTtcbi8vIFx0XHRlbC52YWx1ZSA9IHRoaXMubW9kdWxlc1trZXldO1xuLy8gXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYWJlbCk7XG4vLyBcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGVsKTtcbi8vIFx0XHR0aGlzLm1vZHVsZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbi8vIFx0fVxuLy8gXHR0aGlzLnVwZGF0ZVNjcmlwdCgpO1xuLy8gfVxuXG4vLyBBdWRpb1VwZGF0ZS5wcm90b3R5cGUudXBkYXRlTW9kdWxlcyA9IGZ1bmN0aW9uKCkgeyAgICBcbi8vIFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLnVwZGF0ZU1vZHVsZXMoKScpO1xuLy8gXHRjb25zb2xlLmxvZyh0aGlzLm1vZHVsZXMpO1xuLy8gXHRjb25zb2xlLmxvZygnbG9vayB0aHJvdWdoIG1vZHVsZXMnKTtcbi8vIFx0Ly8gZXJhc2UgbW9kdWxlc1xuLy8gXHR0aGlzLm1vZHVsZXMgPSB7fTtcbi8vIFx0Ly8gZ2V0IG1vZHVsZXMgZnJvbSBkb21cbi8vIFx0Y29uc29sZS5sb2coJ3RoaXMubW9kdWxlc0NvbnRhaW5lci5jaGlsZHJlbjogJywgdGhpcy5tb2R1bGVzQ29udGFpbmVyLmNoaWxkcmVuLCB0aGlzLm1vZHVsZXNDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoKTtcbi8vIFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXNDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbi8vIFx0XHRjb25zb2xlLmxvZygnaTogJywgaSk7XG4vLyBcdFx0Y29uc29sZS5sb2codGhpcy5tb2R1bGVzQ29udGFpbmVyLmNoaWxkcmVuW2ldLnZhbHVlKTtcbi8vIFx0XHR2YXIga2V5ID0gdGhpcy5tb2R1bGVzQ29udGFpbmVyLmNoaWxkcmVuW2ldLmlkO1xuLy8gXHRcdHZhciB2YWx1ZSA9IHRoaXMubW9kdWxlc0NvbnRhaW5lci5jaGlsZHJlbltpXS52YWx1ZTtcbi8vIFx0XHR0aGlzLm1vZHVsZXNba2V5XSA9IHZhbHVlO1xuLy8gXHR9XG4vLyBcdGNvbnNvbGUubG9nKHRoaXMubW9kdWxlcyk7XG4vLyBcdHRoaXMuc2F2ZURhdGEoKTtcbi8vIFx0dGhpcy52aWV3RGF0YSgpO1xuLy8gXHR0aGlzLnVwZGF0ZVNjcmlwdCgpO1xuLy8gfVxuXG4vLyBBdWRpb1VwZGF0ZS5wcm90b3R5cGUudXBkYXRlU2NyaXB0ID0gZnVuY3Rpb24oKSB7XG4vLyBcdGNvbnNvbGUubG9nKCdBdWRpb1VwZGF0ZS51cGRhdGVTY3JpcHQoKScpO1xuLy8gXHR2YXIgdGV4dCA9IFwiXCI7XG4vLyBcdFx0Zm9yKHZhciBrZXkgaW4gdGhpcy5tb2R1bGVzKSB7XG4vLyBcdFx0XHR0ZXh0ICs9IHRoaXMubW9kdWxlc1trZXldICsgJyAnO1xuLy8gXHRcdH1cbi8vIFx0dGhpcy50ZXh0UHJldmlldy5pbm5lckhUTUwgPSB0ZXh0O1xuLy8gXHR0aGlzLnRleHQgPSB0ZXh0O1xuLy8gfVxuXG4vLyBBdWRpb1VwZGF0ZS5wcm90b3R5cGUuc3BlYWsgPSBmdW5jdGlvbigpIHtcbi8vIFx0Y29uc29sZS5sb2coJ0F1ZGlvVXBkYXRlLnNwZWFrKCknKTtcbi8vIFx0Y29uc29sZS5sb2codGhpcy50ZXh0KTtcbi8vIFx0cmVzcG9uc2l2ZVZvaWNlLnNwZWFrKHRoaXMudGV4dCwgdGhpcy52b2ljZSk7XG4vLyB9XG5cbi8vIHZhciBuZXdVcGRhdGUgPSBuZXcgQXVkaW9VcGRhdGUoe1xuLy8gXHR0ZXh0OiAnR29vZCBtb3JuaW5nIERhbmllbCcsXG4vLyBcdG1vZHVsZXM6IHtcbi8vIFx0XHR0ZXh0OiAnR29vZCBtb3JuaW5nIERhbmllbC4nLFxuLy8gXHRcdHRleHQyOiAnVG9kYXkgaXMgVGh1cnNkYXkuJ1xuLy8gXHR9XG4vLyB9KTtcblxuLy8gLy8gbmV3VXBkYXRlLnNwZWFrKCk7XG4iXX0=
