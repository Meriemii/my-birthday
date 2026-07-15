/* ============================================
   SETUP
   ============================================ */

history.scrollRestoration = "manual";
console.clear();

console.log(`
✦ Curious, aren't you?

Most visitors only see what's on the page.
Some look underneath.

Flag 1:
flag{welcome_to_the_source}

(six more are hiding in this project.
 comments, attributes, styles, storage -- look around.

 one of them isn't hiding in a FILE at all.
 it only exists for a moment, at runtime,
 and only if you're already watching when it happens.)
`);

/* flag 5 -- lives only in localStorage.
   Application tab > Local Storage, not Console or view-source. */
localStorage.setItem("mrmi_notes", "ZmxhZ3tsb2NhbF9zdG9yYWdlX2RldGVjdGl2ZX0=");


setTimeout(() => {

    console.clear();

    console.log(`
Still here? Good.

That flag above was real, by the way --
this message just clears the clutter.

🙂
`);

},10000);

function createBubbles() {
    const bubblesContainer = document.querySelector(".bubbles");

    for(let i=0;i<35;i++){

        const bubble=document.createElement("div");
        bubble.classList.add("bubble");

        const size=Math.random()*6+3;

        bubble.style.width=size+"px";
        bubble.style.height=size+"px";

        bubble.style.left=Math.random()*100+"vw";
        bubble.style.animationDuration=Math.random()*18+14+"s";
        bubble.style.animationDelay=-(Math.random()*25)+"s";
        bubble.style.opacity=Math.random()*0.15+0.08;

        bubblesContainer.appendChild(bubble);
    }
}

window.addEventListener("load", () => {

    window.scrollTo(0, 1);

    document.body.classList.add("lock-scroll");

    createBubbles();
    createPetals();
    setupScrollProgress();
    setupReveal();
    setupCardTilt();
    setupHeroParallax();

});


/* ---- new: falling petals in the hero ---- */
function createPetals(){

    const hero = document.querySelector(".hero");
    if(!hero) return;

    const layer = document.createElement("div");
    layer.className = "petals";
    hero.appendChild(layer);

    const glyphs = ["✦","❀","✿"];

    for(let i=0;i<14;i++){

        const petal = document.createElement("span");
        petal.className = "petal";
        petal.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];

        petal.style.fontSize = (Math.random()*10+10)+"px";
        petal.style.left = Math.random()*100+"%";
        petal.style.setProperty("--drift", (Math.random()*160-80)+"px");
        petal.style.animationDuration = (Math.random()*10+14)+"s";
        petal.style.animationDelay = -(Math.random()*20)+"s";
        petal.style.opacity = (Math.random()*0.35+0.25);

        layer.appendChild(petal);

    }

}


/* ---- new: thin gold progress bar reflecting scroll position ---- */
function setupScrollProgress(){

    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    const update = () => {

        const scrollTop = window.scrollY;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const pct = docHeight > 0 ? (scrollTop/docHeight)*100 : 0;
        bar.style.width = pct+"%";

    };

    window.addEventListener("scroll", update, { passive:true });
    update();

}


/* ---- new: fade-and-rise reveal for cards as they scroll into view ---- */
function setupReveal(){

    const targets = document.querySelectorAll(
        ".intro-card, .rating-card, .message-card"
    );

    targets.forEach(el => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);

            }

        });

    }, { threshold: 0.2 });

    targets.forEach(el => revealObserver.observe(el));

}


/* ---- new: subtle 3D tilt on memory cards while hovering ---- */
function setupCardTilt(){

    document.addEventListener("mousemove", (e) => {

        const card = e.target.closest(".memory-card");
        if(!card || card.classList.contains("matched")) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y/rect.height) - 0.5) * -14;
        const rotateY = ((x/rect.width) - 0.5) * 14;

        card.style.transform =
            `translateY(-5px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    document.addEventListener("mouseout", (e) => {

        const card = e.target.closest(".memory-card");
        if(!card) return;

        card.style.transform = "";

    });

}


/* ---- new: gentle parallax drift for the hero decor as the mouse moves ---- */
function setupHeroParallax(){

    const heroSection = document.querySelector(".hero");
    const arc = document.querySelector(".arc");
    const content = document.querySelector(".hero-content");

    if(!heroSection) return;

    heroSection.addEventListener("mousemove", (e) => {

        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left)/rect.width - 0.5;
        const y = (e.clientY - rect.top)/rect.height - 0.5;

        if(arc){
            arc.style.transform = `translate(${x*24}px, ${y*24}px)`;
        }

        if(content){
            content.style.transform = `translate(${x*-10}px, ${y*-10}px)`;
        }

    });

    heroSection.addEventListener("mouseleave", () => {

        if(arc) arc.style.transform = "";
        if(content) content.style.transform = "";

    });

}



function sparkleBurst(container, count = 6){

    if(!container) return;

    const burst = document.createElement("div");
    burst.className = "sparkle-burst";

    for(let i=0;i<count;i++){

        const piece = document.createElement("span");
        piece.className = "sparkle-piece";
        piece.textContent = "✦";

        piece.style.left = Math.random()*90+"%";
        piece.style.top = Math.random()*70+20+"%";
        piece.style.animationDelay = (Math.random()*0.4)+"s";
        piece.style.fontSize = (Math.random()*0.7+0.7)+"rem";

        burst.appendChild(piece);

    }

    container.appendChild(burst);

    setTimeout(()=>{

        burst.remove();

    },2200);

}

const button=document.querySelector(".start");

button.addEventListener("click",()=>{

    document.body.classList.remove("lock-scroll");

    document.querySelector("#chapter1").scrollIntoView({
        behavior:"smooth"
    });

});

const chapters = document.querySelectorAll(".chapter");
const indicator = document.querySelector(".indicator");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const id = entry.target.id;

            chapters.forEach(chapter => {

                chapter.classList.remove("active");
                chapter.removeAttribute("aria-current");

                if(chapter.dataset.target === id){

                    chapter.classList.add("active");
                    chapter.setAttribute("aria-current","true");

                    indicator.style.left =
                        chapter.offsetLeft +
                        chapter.offsetWidth / 2 -
                        indicator.offsetWidth / 2 + "px";

                }

            });

        }

    });

},{
    threshold:0.55
});

document.querySelectorAll("section").forEach(section=>{
    observer.observe(section);
});


chapters.forEach(chapter => {

    chapter.addEventListener("click", () => {

        const target = document.querySelector("#"+chapter.dataset.target);

        if(target){

            target.scrollIntoView({ behavior:"smooth" });

        }

    });

});



const chapter1 = document.querySelector("#chapter1");
const intro = chapter1.querySelector(".intro-card");
const game = document.querySelector(".memory-game");
const begin = document.querySelector(".begin-btn");

begin.addEventListener("click",()=>{

    intro.classList.add("hide");

    setTimeout(()=>{

        intro.classList.add("hidden");

        game.classList.remove("hidden");

        requestAnimationFrame(()=>{
            game.classList.add("show");
        });

    },700);

});



const flowers = [

    {
        name:"asiatic",
        image:"asiatic_lily.jpg"
    },

    {
        name:"rose",
        image:"black_lily.jpg"
    },

    {
        name:"iris",
        image:"easter_lily.jpg"
    },

    {
        name:"camellia",
        image:"martagon_lily.jpg"
    },

    {
        name:"magnolia",
        image:"oriental_lily.jpg"
    },

    {
        name:"jasmine",
        image:"peach_lily.jpg"
    },

    {
        name:"peony",
        image:"stargazer_lily.jpg"
    },

    {
        name:"gardenia",
        image:"tiger_lily.jpg"
    }

];




const deck = [...flowers, ...flowers]
    .sort(() => Math.random() - 0.5);



    const memoryGame = document.querySelector(".memory-game");
    const finishCard = document.querySelector(".memory-finish");
    const nextButton = document.querySelector(".next-btn");
    

 deck.forEach(flower=>{

    const card=document.createElement("div");

    card.className="memory-card";

    card.dataset.name=flower.name;

    card.setAttribute("role","button");
    card.setAttribute("tabindex","0");
    card.setAttribute("aria-label","Flip card");

    card.innerHTML=`

        <div class="card-inner">

            <div class="card-face card-front">

                <img src="back.jpg" alt="fXRzaWdvbG9lYWhjcmFfdHhldF90bGF7Z2FsZg==">

            </div>

            <div class="card-face card-back">

                <img src="${flower.image}" alt="">

            </div>

        </div>

    `;

    memoryGame.appendChild(card);

});



let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;



document.querySelectorAll(".memory-card").forEach(card=>{

    card.addEventListener("click",flipCard);


    card.addEventListener("keydown",(e)=>{

        if(e.key==="Enter" || e.key===" "){

            e.preventDefault();
            flipCard.call(card);

        }

    });

});



function flipCard(){

    if(lockBoard) return;

    if(this===firstCard) return;

    this.classList.add("flip");

    if(!firstCard){

        firstCard=this;

        return;

    }

    secondCard=this;

    checkMatch();

}


function checkMatch(){

    lockBoard=true;

    const matched =
        firstCard.dataset.name === secondCard.dataset.name;

    if(matched){

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matches++;

    score.textContent = `Pairs Found: ${matches} / 8`;
    if(matches === 8){

        memoryGame.style.opacity = "0.2";
score.style.opacity = "0.2";

    setTimeout(() => {

        finishCard.classList.remove("hidden");

      requestAnimationFrame(() => {

       finishCard.classList.add("show");
       sparkleBurst(finishCard);

 });

   nextButton.classList.remove("hidden");
   requestAnimationFrame(() => {

    nextButton.classList.add("show");

});

        

    }, 500);

}



    resetTurn();

}
    else{

        setTimeout(()=>{

            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetTurn();

        },900);

    }

}


function resetTurn(){

    firstCard=null;
    secondCard=null;
    lockBoard=false;

}

const score = document.createElement("p");

score.className = "memory-score";
score.textContent = "Pairs Found: 0 / 8";

memoryGame.prepend(score);

nextButton.addEventListener("click", () => {

    document.querySelector("#chapter2").scrollIntoView({
        behavior: "smooth"
    });

});




const gameContainer = document.querySelector(".tic-tac-toe");
const board = document.querySelector(".board");
const turnIndicator = document.querySelector(".turn-indicator");

const winningCombinations = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];


let cells = document.querySelectorAll(".cell");
let currentPlayer = "✦";
let gameOver = false;

for(let i = 0; i < 9; i++){

    const cell = document.createElement("div");

    cell.className = "cell";

    cell.dataset.index = i;

    cell.setAttribute("role","button");
    cell.setAttribute("tabindex","0");
    cell.setAttribute("aria-label","Board cell "+(i+1));

    board.appendChild(cell);

}

cells = document.querySelectorAll(".cell");

cells.forEach(cell => {

    cell.addEventListener("click", playerMove);


    cell.addEventListener("keydown",(e)=>{

        if(e.key==="Enter" || e.key===" "){

            e.preventDefault();
            playerMove.call(cell);

        }

    });

});


const chapter2 = document.querySelector("#chapter2");
const intro2 = chapter2.querySelector(".intro-card");
const playBtn = document.querySelector(".play-btn");



const ticFinish = document.querySelector(".tic-finish");
const finishTitle = document.querySelector(".finish-title");
const finishText = document.querySelector(".finish-text");
const playAgainBtn = document.querySelector(".play-again");
const nextBtn = ticFinish.querySelector(".next-btn");



playBtn.addEventListener("click", () => {

   intro2.classList.add("hide");

    setTimeout(() => {

       intro2.classList.add("hidden");

        gameContainer.classList.remove("hidden");

        requestAnimationFrame(() => {
            gameContainer.classList.add("show");
        });

    }, 700);

});


nextBtn.addEventListener("click", () => {

    document.querySelector("#chapter3").scrollIntoView({
        behavior: "smooth"
    });

});


function playerMove() {

    if(gameOver) return;

    if(this.textContent !== "") return;

    this.textContent = "✦";

    if(checkWinner("✦")){

    // this never gets logged or written anywhere.
    // if you happen to have devtools open right now, you're
    // about to pause here -- check the Scope panel.
    const _flag = atob("ZmxhZ3t5b3VfYnJva2VfaW50b19teV9zY29wZX0=");
    debugger;

    gameOver = true;

    finishTitle.textContent = "You beat Meriemii!";
    finishText.textContent =
    "Alright... maybe I was distracted.";

    gameContainer.classList.remove("show");

  setTimeout(() => {

    gameContainer.classList.add("hidden");

    ticFinish.classList.remove("hidden");

    requestAnimationFrame(() => {
        ticFinish.classList.add("show");
        sparkleBurst(ticFinish);
    });

    nextBtn.classList.remove("hidden");

},500);


    return;

}


if(checkDraw()){

    gameOver = true;

    finishTitle.textContent = "It's a Draw!";
    finishText.textContent =
    "Looks like neither of us could outsmart the other this time.";

    gameContainer.classList.remove("show");

    setTimeout(() => {

        gameContainer.classList.add("hidden");

        ticFinish.classList.remove("hidden");

        requestAnimationFrame(() => {
            ticFinish.classList.add("show");
        sparkleBurst(ticFinish);
        });

        nextBtn.classList.remove("hidden");

    },500);

    return;

}

    this.style.color = "#efe2bb";

    turnIndicator.textContent =
    "──────── ❀ Meriemii's Turn ❀ ────────";

    setTimeout(() => {

    maryMove();

},700);

}



function maryMove() {

    if(gameOver) return;

    const emptyCells = [...cells].filter(cell => cell.textContent === "");

    if(emptyCells.length === 0) return;

    const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    randomCell.textContent = "❀";

    if(checkWinner("❀")){

    gameOver = true;

   finishTitle.textContent = "Meriemii Wins!";
    finishText.textContent =
    "Told you I've been practicing!";



    gameContainer.classList.remove("show");

 setTimeout(() => {

    gameContainer.classList.add("hidden");

    ticFinish.classList.remove("hidden");

    requestAnimationFrame(() => {
        ticFinish.classList.add("show");
        sparkleBurst(ticFinish);
    });

    nextBtn.classList.remove("hidden");

  },500);


    return;

}


if(checkDraw()){

    gameOver = true;

    finishTitle.textContent = "It's a Draw!";
    finishText.textContent =
    "Looks like neither of us could outsmart the other this time.";

    gameContainer.classList.remove("show");

    setTimeout(() => {

        gameContainer.classList.add("hidden");

        ticFinish.classList.remove("hidden");

        requestAnimationFrame(() => {
            ticFinish.classList.add("show");
        sparkleBurst(ticFinish);
        });

        nextBtn.classList.remove("hidden");

    },500);

    return;

}


    randomCell.style.color = "#d8c08d";

    turnIndicator.textContent =
        "──────── ✦ Your Turn ✦ ────────";

}




function checkWinner(symbol){

    return winningCombinations.some(combo => {

        return combo.every(index => {

            return cells[index].textContent === symbol;

        });

    });

}



function checkDraw(){

    return [...cells].every(cell => cell.textContent !== "");

}



const quizData = [

{
question:"What's my favorite color?",

answers:[
"Red",
"It change every 3 weeks",
"Pink",
"White"
],

correct:1 ,

commentCorrect:"Lucky guess... or you've been paying attention.",

commentWrong:"Nope. My favorite color changes more often than the weather."

},

{
question:"What's my favorite season?",

answers:[
"Spring",
"Summer",
"Autumn",
"Winter"
],

correct:3,

commentCorrect:"Winter wins every single time.",

commentWrong:"Nope! Give me cold weather and cozy hoodies."

},

{
question:"Which flower do I love the most? ",

answers:[
"Rose",
"Tulip",
"Lily",
"Sunflower"
],

correct:2,

commentCorrect:"Of course it's the lily. ",

commentWrong:"Pretty flowers... but lilies own my heart. "

},

{
question:"I have an exam tomorrow. What's the first thing I do?",

answers:[
"Study calmly like a responsible student.",
"Cry for 5 minutes then start studying.",
"Go to sleep and trust my luck.",
"Have a full dramatic breakdown, then finally study."
],

correct:3,

commentCorrect:"Panic first. Productivity second. Every. Single. Time.",

commentWrong:"I wish I were that calm. "

},

{
question:"I say 'I'll sleep early tonight.' What actually happens? ",

answers:[
"I stay awake scrolling for 4 more hours.",
"I start a random project at 2 AM.",
"I actually go to sleep.",
"I forget sleeping exists."
],

correct:2,

commentCorrect:"Typical me",

commentWrong:"Honestly... that's usually what should happen."

},

{
question:"If someone sends me 'We need to talk.' What's my first thought?",

answers:[
"I create 37 fake scenarios in my head.",
"Okay.",
"I wonder what happened.",
"I ignore the message."
],

correct:0,

commentCorrect:"My brain instantly writes an entire Netflix series.",

commentWrong:"I overthink professionally."

},

{
question:"I finally finish a project. What's the first thing I do?",

answers:[
"Take a nap.",
"Move on immediately.",
"Stare at it for 20 minutes feeling proud.",
"Find one tiny bug and question my existence."
],

correct:2,

commentCorrect:"I have to admire it for a while before letting it go.",

commentWrong:"Nope. I stare at it like a proud parent."

},

{
question:"If I get one bug in my code...",

answers:[
"I fix it immediately.",
"Ask for help.",
"Spend an hour changing random things until it magically works.",
"Pretend the bug is a feature."
],

correct:2,

commentCorrect:"If changing random things fixes it... was it really random?",

commentWrong:"That's what responsible programmers do... probably."

},

{
question:"I say 'This will only take 10 minutes.' How long does it actually take?",

answers:[
"10 minutes.",
"30 minutes.",
"Three hours.",
"I never finish it."
],

correct:2,

commentCorrect:"Time works differently around me.",

commentWrong:"Minutes? That's adorable."

},

{
question:"If you had to describe me with one word?",

answers:[
"Cool.",
"Boring.",
"Chaotic.",
"Predictable."
],

correct:2,

commentCorrect:"Chaotic... but in a charming way.",

commentWrong:"Be honest... you knew that wasn't right."

}

];


const quizIntro = document.querySelector(".quiz-intro");
const quizBtn = document.querySelector(".quiz-btn");

const quizContainer = document.querySelector(".quiz-container");

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question");
const answersBox = document.querySelector(".answers");
const quizComment = document.querySelector(".quiz-comment");

const quizFinish = document.querySelector(".quiz-finish");
const quizFinishTitle =
document.querySelector(".quiz-finish-title");

const quizFinishText =
document.querySelector(".quiz-finish-text");

const quizScoreText =
document.querySelector(".quiz-score");

const quizNextBtn =
document.querySelector(".quiz-next-btn");

let currentQuestion = 0;
let quizScore = 0;

quizBtn.addEventListener("click",()=>{

    quizIntro.classList.add("hide");

    setTimeout(()=>{

        quizIntro.classList.add("hidden");

        quizContainer.classList.remove("hidden");

        requestAnimationFrame(()=>{

            quizContainer.classList.add("show");

        });

        loadQuestion();

    },700);

});

function loadQuestion(){

    const q = quizData[currentQuestion];

    questionNumber.textContent =
    `──────── ✦ Tiny Confession ${currentQuestion+1} / ${quizData.length} ✦ ────────`;

    questionText.textContent = q.question;

    quizComment.textContent="";

    answersBox.innerHTML="";

    q.answers.forEach((answer,index)=>{

        const btn=document.createElement("button");

        btn.className="answer";

        btn.textContent=answer;

        btn.onclick=()=>selectAnswer(btn,index);

        answersBox.appendChild(btn);

    });

}

function selectAnswer(button,index){

    const q=quizData[currentQuestion];

    document.querySelectorAll(".answer").forEach(btn=>{

        btn.disabled=true;

    });

    if(index===q.correct){

        quizScore++;

        button.classList.add("correct");

        quizComment.textContent=q.commentCorrect;

    }

    else{

        button.classList.add("wrong");

        quizComment.textContent=q.commentWrong;

    }

    setTimeout(()=>{

        currentQuestion++;

        if(currentQuestion<quizData.length){

            loadQuestion();

        }

        else{

            showQuizFinish();

        }

    },2000);

}


function showQuizFinish(){

    quizContainer.style.opacity=".15";

    quizContainer.style.pointerEvents="none";

    quizScoreText.textContent =
    `Score: ${quizScore} / ${quizData.length}`;

    if(quizScore===10){

        quizFinishTitle.textContent =
        "You know me better than I know myself.";

        quizFinishText.textContent =
        "Either we've been friends forever... or you've been taking notes.";

    }

    else if(quizScore>=8){

        quizFinishTitle.textContent =
        "I'm impressed.";

        quizFinishText.textContent =
        "You've definitely been paying attention.";

    }

    else if(quizScore>=6){

        quizFinishTitle.textContent =
        "Not bad at all.";

        quizFinishText.textContent =
        "You know the important things... mostly.";

    }

    else if(quizScore>=4){

        quizFinishTitle.textContent =
        "Hmm...";

        quizFinishText.textContent =
        "We should probably hang out more.";

    }

    else{

        quizFinishTitle.textContent =
        "That was... something.";

        quizFinishText.textContent =
        "Were you answering with your eyes closed? ";

    }

    setTimeout(()=>{

        quizFinish.classList.remove("hidden");

        requestAnimationFrame(()=>{

            quizFinish.classList.add("show");
            sparkleBurst(quizFinish);

        });

        quizNextBtn.classList.remove("hidden");

    },500);

}

quizNextBtn.addEventListener("click",()=>{

    document.querySelector("#chapter4")
    .scrollIntoView({

        behavior:"smooth"

    });

});

const comments = {

    drama:{
        1:"You probably don't know me...",
        2:"Two? I'm litrelly a Drama Queen.",
        3:"That's probably fair.",
        4:"You clearly know me.",
        5:"Rude... but accurate."
    },

    sleep:{
       1:"You think I don't sleep enough?",
       2:"I do enjoy my naps, okay?",
       3:"A healthy relationship with my bed.",
       4:"Sleep is one of my favorite hobbies.",
       5:"Correct. If you can't find me, I'm probably asleep."
    },

    coding:{
        1:"Ouch...",
        2:"I'm still learning!",
        3:"I'll take that.",
        4:"Thank you kindly.",
        5:"You've never seen my debugging sessions XD"
    },

    humor:{
        1:"That hurts.",
        2:"I'll work on my jokes.",
        3:"Fair enough.",
        4:"Glad I made you laugh.",
        5:"I'm basically a comedian."
    },

    coffee:{
      1:"Tea is clearly my true love.",
      2:"One cup is enough... sometimes.",
      3:"A respectable amount of caffeine.",
      4:"Coffee keeps the ideas flowing.",
      5:"At this point I'm 30% coffee."
    },

   kindness:{
     1:"That one hurts a little.",
     2:"I'll try harder.",
     3:"Fair enough.",
     4:"Aww, that's sweet.",
     5:"Stop, you're making me blush."
    },

    energy:{
     1:"I'm basically running on low battery.",
     2:"A little sleepy, but functional.",
     3:"Average human energy.",
     4:"Pretty energetic most days!",
     5:"Unlimited zoomies activated."
    },

    music:{
     1:"You clearly haven't seen my playlists.",
     2:"I'll accept the criticism... reluctantly.",
     3:"Fair enough.",
     4:"Good taste recognizes good taste.",
     5:"Exactly. My playlists never miss."
    },

   competitive:{
     1:"I totally don't care about winning.",
     2:"Maybe just a little.",
     3:"Depends who I'm playing.",
     4:"Losing motivates me.",
     5:"I will remember this victory forever."
    },

    vibes:{
        1:"Wow!",
        2:"Not my best day.",
        3:"Respectable.",
        4:"Awww thanks.",
        5:"You're too kind."
    }

};

const starsGroups = document.querySelectorAll(".stars");
const submitBtn = document.querySelector(".submit-rating");

const ratings = {};

starsGroups.forEach(group => {

    const stars = group.querySelectorAll("span");

    const commentBox =
        group.parentElement.querySelector(".rating-comment");

    stars.forEach(star => {

        // these were plain, click-only spans -- giving them the same
        // keyboard support as every other interactive element on the site
        star.setAttribute("role","button");
        star.setAttribute("tabindex","0");
        star.setAttribute("aria-label", star.dataset.value+" star"+(star.dataset.value==="1"?"":"s"));

        const rate = () => {

            const value = Number(star.dataset.value);

            ratings[group.dataset.category] = value;

            stars.forEach(s => s.classList.remove("active"));

            stars.forEach(s => {

                if(Number(s.dataset.value) <= value){

                    s.classList.add("active");

                }

            });

            commentBox.textContent =
                comments[group.dataset.category][value];

            if(Object.keys(ratings).length === starsGroups.length){

                submitBtn.classList.remove("hidden");

            }

        };

        star.addEventListener("click", rate);

        star.addEventListener("keydown",(e)=>{

            if(e.key==="Enter" || e.key===" "){

                e.preventDefault();
                rate();

            }

        });

    });

});



const ratingCard = document.querySelector(".rating-card");
const ratingFinish = document.querySelector(".rating-finish");
const ratingNext = document.querySelector(".rating-next");

submitBtn.addEventListener("click",()=>{

    ratingCard.style.opacity="0.2";

    setTimeout(()=>{

        ratingFinish.classList.remove("hidden");

        requestAnimationFrame(()=>{

            ratingFinish.classList.add("show");
            sparkleBurst(ratingFinish);

        });

        ratingNext.classList.remove("hidden");

    },500);

});


ratingNext.addEventListener("click",()=>{

    document.querySelector("#chapter5").scrollIntoView({

        behavior:"smooth"

    });

});


const messageCard = document.querySelector(".message-card");

const messageFinish = document.querySelector(".message-finish");

const sendMessage = document.querySelector(".send-message");


sendMessage.addEventListener("click",()=>{

    const message = document.querySelector("#visitor-message").value.trim();

    if(message === ""){

        alert("Leave me a little note first!");
        return;

    }

    sendMessage.disabled = true;

    emailjs.send(
        "service_559jo9b",
        "template_0c7w7ge",
        {

            name:
                document.querySelector("#visitor-name")?.value || "Anonymous",

            message: message,

            drama: ratings.drama || "-",

            sleep: ratings.sleep || "-",

            coding: ratings.coding || "-",

            humor: ratings.humor || "-",

            vibes: ratings.vibes || "-",

            energy: ratings.energy || "-",

            music: ratings.music || "-"

        }

    ).then(() => {

        messageCard.classList.add("hide");

        setTimeout(() => {

            messageCard.classList.add("hidden");

            messageFinish.classList.remove("hidden");

            requestAnimationFrame(() => {

                messageFinish.classList.add("show");
                sparkleBurst(messageFinish);

            });

        },700);

    }).catch(error => {

        console.log(error);

        alert("Something went wrong. Mind trying again?");

        sendMessage.disabled = false;

    });

});



