const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;
let score = 0;
let gameOver = false;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;

    let upInterval = setInterval(() =>{
        if(position >= 200){
            clearInterval(upInterval);
            //descida
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
    
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else{
            //subida
            position += 60;
        
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1900;
    let randomTime = Math.random() * 2000;

    if(gameOver){
        return;
    }

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = 1900 + 'px';

    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if(cactusPosition <= -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            score += 10;
        } 
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Game Over
            clearInterval(leftInterval);
            gameOver = true;
            let fimDeJogo = "<h1 class='game-over'>Fim de Jogo.</h1><p class='game-over'>Pontuação: " +score +".</p>";
            fimDeJogo += '</br><div class="flex"> <button onClick="document.location.reload(true)"><img src="refresh-page-option.png" width="24" height="24" /></button></div>';
            document.body.innerHTML = fimDeJogo;
        } 
        else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20);

    setTimeout(createCactus, randomTime);

}

createCactus();
document.addEventListener('keyup', handleKeyUp);