(function() {
    console.log('loading the audio update');

    function playText() {

    	var text = document.getElementById('update').textContent;
    console.log('text: ', text);
    	responsiveVoice.speak(text, "UK English Male");
    }

    playText();
    document.getElementById('play').addEventListener('click', playText);
})();