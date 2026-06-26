const lista = document.getElementById("timeline");

let elementoArrastrado = null;

lista.addEventListener("dragstart", (e) => {

    elementoArrastrado = e.target;
    e.target.classList.add("dragging");

});

lista.addEventListener("dragend", (e) => {

    e.target.classList.remove("dragging");

});

lista.addEventListener("dragover", (e) => {

    e.preventDefault();

    const despuesDelElemento =
        getDragAfterElement(lista, e.clientY);

    if(despuesDelElemento == null){

        lista.appendChild(elementoArrastrado);

    }else{

        lista.insertBefore(
            elementoArrastrado,
            despuesDelElemento
        );

    }

});

function getDragAfterElement(container, y){

    const elementos =
        [...container.querySelectorAll("li:not(.dragging)")];

    return elementos.reduce((closest, child) => {

        const box = child.getBoundingClientRect();

        const offset =
            y - box.top - box.height / 2;

        if(offset < 0 && offset > closest.offset){

            return {
                offset: offset,
                element: child
            };

        }else{

            return closest;

        }

    }, {
        offset: Number.NEGATIVE_INFINITY
    }).element;

}

document
.getElementById("checkBtn")
.addEventListener("click", verificar);

function verificar(){

    const ordenCorrecto = [

        "ENIAC",
        "Transistor",
        "Intel 4004",
        "IBM PC",
        "World Wide Web",
        "Era Moderna e Inteligencia Artificial"

    ];

    const elementos =
        [...document.querySelectorAll("#timeline li")];

    let puntos = 0;

    elementos.forEach((item,index)=>{

        if(item.textContent === ordenCorrecto[index]){

            puntos++;

        }

    });

    const resultado =
        document.getElementById("resultado");

    if(puntos === 6){

        resultado.className = "correcto";

        resultado.innerHTML = `
        🏆 ¡Perfecto!
        <br>
        Has ordenado correctamente toda la historia.
        `;

    }else{

        resultado.className = "incorrecto";

        resultado.innerHTML = `
        ❌ Obtuviste ${puntos}/6.
        <br>
        Intenta nuevamente.
        `;

    }

}