import {Knight} from './modules/knight'
let mode = 'none';
let startLocation;
let endLocation;
let prevEnd;
const knight = document.querySelector('.knight');
const knightButton = document.querySelector('.knight-but');
const endButton = document.querySelector('.end-but');
const travailButton = document.querySelector('.travail')
const ghostKnight = document.querySelector('.ghostknight')
const ghostFlag = document.querySelector('.ghostflag')

function disableAll() {
    knightButton.classList.remove('selected');
    endButton.classList.remove('selected');
    travailButton.classList.remove('selected');

}
function travail() {
    const displayKnight = new Knight(startLocation);
    const path = displayKnight.moveToLocation(endLocation).positions;
    let index = 0;
    mode = 'travailing';
    let prevX = 0;
    let prevY = 0;
    let timeout = setInterval(()=> {

        if (index == path.length - 1) {
            console.log('Final location')
            startLocation = endLocation;
            clearInterval(timeout);
            mode = 'none';
            knight.style.transform = `translate(0,0)`;
            document.querySelector(`[data-row="${path[index][0]}"][data-column="${path[index][1]}"]`)
            .appendChild(knight);
            disableAll();
            return
        }

        console.log(path[index])
        index++;
        const newP = animate(path[index - 1],path[index], prevX, prevY);
        console.log(newP)
        prevX = +newP[0];
        prevY = +newP[1];
        
    }, 750);


    
    
}

function animate(current, next, prevX, prevY) {   
    const x = +next[0] - +current[0];
    
    const y = +next[1] - +current[1];
    knight.style.transform = `translate(${prevY + +(y * 75)}px, ${prevX + +(x * 75)}px)`;
    
    return [prevX + +(x* 75) , prevY + +(y * 75)];

}
knightButton.addEventListener('click', (e)=> {
    if (mode === 'none') {
    disableAll();
    knightButton.classList.add('selected');
    mode = 'selectKnight';
}

});

endButton.addEventListener('click', (e)=> {
    if (mode === 'none') {
        disableAll();
        endButton.classList.add('selected');
        mode = 'selectSquare';
    }
});

travailButton.addEventListener('click', ()=> {
    disableAll();
    travailButton.classList.add('selected');
    if (startLocation && endLocation) {
        //travail
        travail()
    }
})

function squareClick(e) {
    if (mode == 'travailing') return;
    
    switch (mode) {
        case 'selectKnight':
            disableAll();
            mode = 'none';
            ghostKnight.classList.add('hidden');
            e.currentTarget.appendChild(knight);
            knight.classList.remove('hidden');
            startLocation = [+e.currentTarget.getAttribute('data-row'), +e.currentTarget.getAttribute('data-column')];

            break;
        case 'selectSquare':
            disableAll();
            mode = 'none';
            ghostFlag.classList.add('hidden')
            e.currentTarget.classList.add('target');
            if (prevEnd) {
                prevEnd.classList.remove('target');
            }

            prevEnd = e.currentTarget;
            endLocation = [+e.currentTarget.getAttribute('data-row'), +e.currentTarget.getAttribute('data-column')];
            break;

    }
}

function ghostHover(e) {
    console.log(mode)
    if (mode == 'travailing') return;
    
    switch (mode) {
        case 'selectKnight':
            e.currentTarget.appendChild(ghostKnight);
            ghostKnight.classList.remove('hidden');
            break;
        case 'selectSquare':
            e.currentTarget.appendChild(ghostFlag);
            ghostFlag.classList.remove('hidden');
            break;
    }
        
}

function ghostLeave(e) {
    console.log('left')
    if (mode == 'travailing') return;
    switch (mode) {
        case 'selectKnight':
            e.currentTarget.removeChild(ghostKnight);
            ghostKnight.classList.add('hidden');
            break;
        case 'selectSquare':
            e.currentTarget.removeChild(ghostFlag);
            ghostFlag.classList.add('hidden');
            break;
    }
}

function createGrid(parent) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('square');
            if (i % 2 == 0 && j % 2 == 1 || i% 2 == 1 && j% 2 == 0) {
                newSquare.classList.add('black');
                
            }
            newSquare.setAttribute('data-row', i);
            newSquare.setAttribute('data-column', j);
            newSquare.addEventListener('click', squareClick);
            newSquare.addEventListener('mouseleave', ghostLeave);
            newSquare.addEventListener('mouseenter', ghostHover);
            
            parent.appendChild(newSquare);
        }
    }
}

const grid = document.querySelector('.grid');
createGrid(grid);



