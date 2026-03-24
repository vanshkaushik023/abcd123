 // Background music - continue playing
const music = document.getElementById('bg-music');
music.volume = 0.4;
music.play().catch(() => {});
document.addEventListener('click', function startOnInteraction() {
    music.play().catch(() => {});
    document.removeEventListener('click', startOnInteraction);
}, { once: true });

// Reasons database
const reasons = [
    {
        text: "Hey Liyah, good morning baby, it's a really special day, for us, but for me particularly. It's the birthday of the woman I love, and I want to make her feel special. I don't say this enough, but I'm actually so very grateful for having her. She's lowkey stuck with me, I'm not letting her go anywhere, I'd be damned if I ever did. That \"she\" is you, in case you were wondering.",
        image: "img1.jpeg"
    },
    {
        text: "And for your dearest attention, I mean every word here, nothing but sheer love behind all of them. No agenda, no expectations, you owe me nothing babyness. It's just that I love you so bad that I can't help but adore everything you do; from your iPad to your Stanley, to your rainbow coloured air fryer, I cherish them all.",
        image: "img2.jpeg"
    },
    {
        text: "I don't think anyone could be like you. The way you carry yourself and go about your day is actually so hot, never fails to amaze me. And on top of that, you're so niceness to everyone; always thinking of others before yourself. It's something you should probably work on, but honestly it's rare and it's so you. You're such an original person, never change, Liyah. And no, I'm not glazing you, this is all true.",
        image: "img3.jpeg"
    },
    {
        text: "I'm longing for the hatred you possess for your birthday to decrease upon reading this; even minutely would work. These little things adding up every year, and one day you'll probably love your birthday, because I'm not going to forget it ever. I don't know if me doing this is too much or too little for your birthday, honestly I think it's on the lesser side. I just hope that when it's finally time to give this to you, we're still together or at least in contact. Though I reckon I'd still find a way to send this over to you. Okay baby, I think it's time for me to go; until next year, Happy Birthday my Moroccan delight. Nadie como tú.",
        image: "img4.jpeg"
    }
];

// Button texts for each click
const buttonTexts = ["MyBaby", "Iloveu sobad", "Its js us", "Imissu always"];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with image on hover
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = reason.text;

    const imgOverlay = document.createElement('div');
    imgOverlay.className = 'gif-overlay';
    imgOverlay.innerHTML = `<img src="${reason.image}" alt="Memory">`;

    card.appendChild(text);
    card.appendChild(imgOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        reasonCounter.textContent = `${currentReasonIndex + 1} of ${reasons.length}`;

        currentReasonIndex++;

        // Update button text for next click
        if (currentReasonIndex < buttonTexts.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.3,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = buttonTexts[currentReasonIndex];
                    gsap.to(shuffleButton, { scale: 1, duration: 0.2 });
                }
            });
        }

        // After 4th reason shown, loop back to index.html on next click
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "I hope you like it!";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.removeEventListener('click', handleClick);
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'index.html';
                            }
                        });
                    });
                }
            });
        }

        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

function handleClick() {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
}

shuffleButton.addEventListener('click', handleClick);

// Floating elements
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

setInterval(createFloatingElement, 2000);ent.querySelector('.shuffle-button');
