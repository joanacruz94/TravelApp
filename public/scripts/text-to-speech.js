let lang = "pt-PT";
function startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = lang;
    recognition.start();
    recognition.onresult = function(e) {
        const $speechT = document.getElementById("speech-text");
        $speechT.value = e.results[0][0].transcript;
        recognition.stop();
    };
    recognition.onerror = function(e) {
        recognition.stop();
    }
    }
}