(function() {
    console.log('loading the audio update');

    function playText() {

    	var text = document.getElementById('update').textContent;
    console.log('text: ', text);
    	responsiveVoice.speak(text);
    }

    playText();
    document.getElementById('play').addEventListener('click', playText);
})();