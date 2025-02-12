let selectedValue = null;
let windiv=document.querySelector('.win');
windiv.style.display="none";
document.querySelector(".score").style.display="block";
document.addEventListener('DOMContentLoaded', () => {
    mainlayout(4);

    const dropdown = document.getElementById('options');
    dropdown.addEventListener('change', (event) => {
        selectedValue = Number(event.target.value);
        mainlayout(selectedValue);
    });
});

function mainlayout(numm) {
    const existingRows = document.querySelectorAll('.main-cont');
    existingRows.forEach(row => row.remove()); 

    let countb = 0;

    for (let i = 0; i < numm; i++) {
        const row = document.createElement('div');
        row.className = 'main-cont';
        const main_game_container= document.querySelector(`.main-game-container`);
        main_game_container.style.width=`${numm*120}px`;
        for (let j = 0; j < numm; j++) {
            const box = document.createElement('button');
            box.className = 'sub-cont box';
            box.id = `b${++countb}`;
            row.appendChild(box);
        }

        main_game_container.appendChild(row);
    }
    setmaingame(numm);
}

function setmaingame(numm) {
    const elements = [
        "fa-solid fa-heart", 
        "fa-solid fa-shield-halved", 
        "fa-solid fa-ghost", 
        "fa-solid fa-scroll",
        "fa-solid fa-gamepad", 
        "fa-solid fa-dragon", 
        "fa-solid fa-ring", 
        "fa-solid fa-hat-wizard",
        "fa-solid fa-wand-magic-sparkles", 
        "fa-solid fa-puzzle-piece", "fa-solid fa-dice", 
        "fa-solid fa-wand-sparkles",
        "fa-solid fa-vr-cardboard", 
        "fa-solid fa-skull-crossbones", 
        "fa-solid fa-hand-fist", 
        "fa-solid fa-dungeon",
        "fa-solid fa-house",
        "fa-solid fa-image",
        "fa-solid fa-mountain",
        "fa-solid fa-compass"
    ];

    const totalPairs = (numm * numm) / 2;
    const selectedIcons = elements.slice(0, totalPairs);

    const iconList = [...selectedIcons, ...selectedIcons];
    shuffleArray(iconList);

    for (let i = 0; i < iconList.length; i++) {
        const box = document.querySelector(`#b${i + 1}`);
        const icon = document.createElement('i');
        icon.className = iconList[i];
        box.appendChild(icon);
        box.dataset.icon = iconList[i];
    }

    mainstart(numm);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function mainstart(numm){
    let buttons = document.querySelectorAll(".sub-cont");
    let score = document.querySelector(".score");
    buttons.forEach(button => {
        button.style.color = '#2c2c2c'; // Initial color for the text (icon)
    });

    let tries = 0;
    let lastclicked = null;
    let count = 0;
    let iswait = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (iswait) return; 
            
            if (button.style.color === 'white' || button.style.color === 'black') return;

            if (lastclicked === null) {
                button.style.color = 'white';
                lastclicked = button;
            } else {
         
                iswait = true; 
                tries++;

                if (button.innerHTML === lastclicked.innerHTML) {
                
                    button.style.color = 'white';
                    changetoset(button, lastclicked); 
                    count++;
                    score.textContent = `Score: ${tries}`;
                    lastclicked = null;
                    iswait = false; 
                } else {
                    button.style.color = 'white';
                    score.textContent = `Score: ${tries}`;
                    setTimeout(() => {
                        button.style.color = '#2c2c2c';
                        lastclicked.style.color = '#2c2c2c';
                        lastclicked = null;
                        iswait = false;
                    }, 1000);
                }
            }

            if (count === (numm * numm) / 2) {
               buttons.forEach(button => {
                   setTimeout(() => {
                        button.style.display="none";
                        document.querySelector(".score").style.display="none";
                        document.querySelector(".score").textContent="Score: 0";
                        windiv.style.display="flex";
                        windiv.style.flexDirection="column";
                        let scorertext = document.querySelector('.win-score');
                        scorertext.textContent = `Score: ${tries}`;
                        setTimeout(() => {
                            document.querySelector(".score").style.display="block";
                            windiv.style.display="none";
                            mainlayout(numm);
                        },2000);
                   },500);
               })
            }
        });
    });

    function changetoset(btn1,btn2){
        setTimeout(()=>{
            buttons.forEach(button => {
                if(button.innerHTML===btn1.innerHTML){
                    button.style.color='black';
                }else if(button.innerHTML===btn2.innerHTML){
                    button.style.color='black';
                }
            })
        },1000);
    }
}
