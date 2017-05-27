(function() {
    console.log('loading the audio update');
    var text = document.getElementById('update').textContent;
    console.log('text: ', text);

    responsiveVoice.speak(text);
})();