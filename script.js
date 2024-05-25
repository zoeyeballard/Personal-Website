document.addEventListener("DOMContentLoaded", function() {
    // Your existing slideshow code
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";  
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }

    var timeoutID;

    function loading() {
        timeoutID = setTimeout(showPage, 3000);
    }

    function showPage() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    }

    loading(); // Assuming you want to call the loading function on DOMContentLoaded
});

class Typewriter {
    constructor(elementId, phrases, sleepTime = 100) {
        this.el = document.getElementById(elementId);
        this.phrases = phrases.map(phrase => "‎ " + phrase); // Add a leading space to each phrase
        this.sleepTime = sleepTime;
        this.curPhraseIndex = 0;
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async writeLoop() {
        while (true) {
            let curWord = this.phrases[this.curPhraseIndex];

            // Typing effect
            for (let i = 0; i < curWord.length; i++) {
                this.el.innerText = curWord.substring(0, i + 1);
                await this.sleep(this.sleepTime);
            }

            // Pause after typing the word
            await this.sleep(this.sleepTime * 10);

            // Deleting effect (delete down to the single space)
            for (let i = curWord.length; i > 1; i--) {
                this.el.innerText = curWord.substring(0, i - 1);
                await this.sleep(this.sleepTime);
            }

            // Move to the next word
            this.curPhraseIndex = (this.curPhraseIndex + 1) % this.phrases.length;

            // Pause before starting to type the next word
            await this.sleep(this.sleepTime * 5);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const phrases = ["engineer", "developer", "artist", "adventurer", "writer"];
    const typewriter = new Typewriter("typewriter", phrases);
    typewriter.writeLoop();
});
