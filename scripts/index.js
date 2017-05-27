(function() {
    console.log('loading the audio update');

    function AudioUpdate(config) {

    	this.text = config.text || "Good morning Daniel";
    	this.voice = config.voice || "UK English Female";

    	this.init();
    }

    AudioUpdate.prototype.init = function() {
    	console.log('AudioUpdate.init()');
    	var self = this;
    	self.playButton = document.getElementById('play');
    	self.playButton.addEventListener('click', self.speak.bind(this));
    }

    AudioUpdate.prototype.speak = function() {
    	console.log('AudioUpdate.speak()');
    	console.log(this.text);
    	responsiveVoice.speak(this.text, this.voice);
    }

    var newUpdate = new AudioUpdate({
    	text: 'Hello, Daniel'
    });

    // newUpdate.speak();

})();