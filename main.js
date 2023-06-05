let j1 = 'Jugador 1'
let j2 = 'Jugador 2'

let equis = `before:content-[\'\'] before:block before:absolute before:w-5 before:rotate-45 before:top-1/2 before:right-1/2 before:-translate-y-1/2 before:translate-x-1/2 before:h-5/6 before:bg-red-500 after:content-[\'\'] after:block after:absolute after:w-5 after:-rotate-45 after:top-1/2 after:right-1/2 after:-translate-y-1/2 after:translate-x-1/2 after:h-5/6 after:bg-red-500`;
let circle = 'border border-8 border-green-500 rounded-full w-4/6 h-5/6';

const btnReset = document.getElementById('reset');
const btnPlay = document.getElementById('play');

const reset = () => {
    document.querySelectorAll('#celda').forEach((item, ind)=> {
        if(item.childNodes.length >= 1){
            item.removeChild(item.childNodes[0]);
            item.removeEventListener('click', (e) => pulsar(e, ind));
        }
    })
    tablero = Array(9);
    turno = 0;
    btnPlay.disabled = false;
}

const eventClick = (e) => {
    document.querySelectorAll('#celda').forEach((item, ind) => {
        if(e.target == item){
            pulsar(e, ind);
            item.removeEventListener('click', eventClick)
        }
    });
} 

const iniciarJuego = () => {
    document.querySelectorAll('#celda').forEach((item, ind) => {
        item.addEventListener('click', eventClick);
    });
    j1 = prompt('Jugador 1');
    j2 = prompt('Jugador 2');
    document.querySelector('#player1').innerHTML = j1;
    document.querySelector('#player2').innerHTML = j2;
    btnPlay.disabled = true
}

document.addEventListener('DOMContentLoaded', () => {   
    btnReset.addEventListener('click', reset);
    btnPlay.addEventListener('click', iniciarJuego);    
})

let turno = 0;
const ganar = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let tablero = new Array(9);

const craerIcono = (element, clases) => {
    const nodeIcon = document.createElement('div');
    arrayClasses = clases.split(' ');
    arrayClasses.forEach((clase) => {
        nodeIcon.classList.add(clase)
    });
    element.appendChild(nodeIcon);  
}

const pulsar = (e, pos) => {
    turno++;
    const btn = e.target;
    const checkPos = (turno % 2) ? j1 : j2;
    const childClasses = (turno % 2) ? equis : circle;
    if(turno % 2) { btn.classList.add('relative'); }
    craerIcono(btn, childClasses);
    tablero[pos] = checkPos;
    checkJugada()
}

const checkJugada = () => {
    let someWin = false;
    ganar.forEach(jugada => {
        if(tablero[jugada[0]] == tablero[jugada[1]] && tablero[jugada[0]] == tablero[jugada[2]] && tablero[jugada[0]]){
            document.getElementById('msg').classList.add('bg-green-500');
            document.querySelector('span').innerText = `Felicidades ${tablero[jugada[0]]} Ganaste`
            someWin = true;
            reset()
        }
    })
    if(someWin){
        return;
    }
    if(!tablero.includes(undefined)){
        document.getElementById('msg').classList.add('bg-red-500');
        document.querySelector('span').innerText = `NADIE GANA`
        return;
    }
}
