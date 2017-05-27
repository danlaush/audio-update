(function() {
    console.log('loading the audio update');



    function AudioUpdate(config) {
	    const SELECTORS = {
			textPreview: 'textPreview',
			textInput: 'textInput',
			updateScriptButton: 'updateScript',
			playButton: 'play'
		}
    	this.text = config.text || "Good morning Daniel";
    	this.voice = config.voice || "UK English Female";
    	this.SELECTORS = SELECTORS;

    	this.init();
    }

    AudioUpdate.prototype.init = function() {
    	console.log('AudioUpdate.init()');
    	// This uses several similar terms for similar items.
    	// text: The string stored in AudioUpdate which gets read out
    	// textPreview: The HTML displayed to the user of the text which will get read out
    	// 				Separated from `text` so it can be styled if so desired
    	// textInput: Temporary text field for generating `text`. Will be componentised.
    	var self = this;
    	self.textPreview = document.getElementById(self.SELECTORS.textPreview);
    	self.textPreview.innerHTML = self.text;
    	self.textInput = document.getElementById(self.SELECTORS.textInput);
    	self.textInput.value = self.text;
    	self.updateScriptButton = document.getElementById(self.SELECTORS.updateScriptButton);
    	self.updateScriptButton.addEventListener('click', self.updateScript.bind(this));
    	self.playButton = document.getElementById(self.SELECTORS.playButton);
    	self.playButton.addEventListener('click', self.speak.bind(this));
    }

    AudioUpdate.prototype.updateScript = function() {
    	console.log('AudioUpdate.updateScript()');
    	this.text = this.textInput.value;
    	this.textPreview.innerHTML = this.textInput.value; // 
    }

    AudioUpdate.prototype.speak = function() {
    	console.log('AudioUpdate.speak()');
    	console.log(this.text);
    	responsiveVoice.speak(this.text, this.voice);
    }

    var newUpdate = new AudioUpdate({
    	text: 'Good morning Daniel'
    });

    // newUpdate.speak();

})();