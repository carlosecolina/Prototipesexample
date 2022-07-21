
//Cosntructores 
function Seguro(marca,year,tipo) {
    this.marca = marca;
    this.year = year;   
    this.tipo = tipo;

}

//Realiza la cotizacion con los datos 
Seguro.prototype.cotizarSeguro = function(){
    console.log(this.marca);

    let cantidad;
    const base = 2000
    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;




        default:
            break;
    }

    //leer el year 
    const diferencia = new Date().getFullYear() - this.year;
    //cada year que la diferencia sea mayor el costo se va a reducir un 3% en el seguro 
    cantidad -= ((diferencia * 3) * cantidad ) / 100 ; 
    
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
}
function UI() {
    
}

//llena las opciones de los years 
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max -20

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


//Muestra alertas en la pantalla 
UI.prototype.mostrarMensaje = (mensaje , tipo) => {
    const div = document.createElement('div');

    if(tipo==='error') {
        div.classList.add('mensaje' , 'error');
    }
    else {
        div.classList.add('mensaje' , 'correcto');
    }

    div.classList.add('mensaje' , 'mt-10');
    div.textContent = mensaje ;

    //insertar en el html 
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}


UI.prototype.mostrarResultado = (total,seguro) =>{
    const {marca, year, tipo } = seguro;

    let textoMarca ;
    switch(marca) {
        case '1':
            textoMarca = 'Americano'
            break;

        case '2':
            textoMarca = 'Asiatico '
            break;

        case '3':
            textoMarca = 'Europeo'
            break;

        default:
            break;
    }
    //crear el resultado 
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class= "header">Tu resumen </p>
    <p class="font-bold "> Marca: <span class= "font-normal">  ${textoMarca} </span></p>
    <p class="font-bold "> Year: <span class= "font-normal">  ${year} </span></p>
    <p class="font-bold "> Tipo de Seguro : <span class= "font-normal capitalize">  ${tipo} </span></p>
    <p class="font-bold "> total: <span class= "font-normal"> $ ${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    const spinner = document.querySelector('#cargando')
    spinner.style.display= 'block';

    setTimeout(() => {
        spinner.style.display = 'none';// se borra el spiner y luego se muestra el resultado 
        resultadoDiv.appendChild(div);
    }, 3000);

    
}

//instaciar ui 
const ui = new UI();



document.addEventListener("DOMContentLoaded", (seguro, total )=>{
    ui.llenarOpciones();// llena el select con los years 
});


eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro );
}

function cotizarSeguro(e){
    e.preventDefault();
    //leer la marca seleccionada 
    
    const marca = document.querySelector('#marca').value ;
    
    //leer el year seleccionado 
    const year = document.querySelector('#year').value ; 


    // leer el tipo de cobertura 
    const tipo = document.querySelector('input[name="tipo"]:checked').value; 
    

    if(marca === '' || year === '' || tipo === '' )
    {
        ui.mostrarMensaje('Todos los campos Son obligatorios ', 'error');
        return ;
    }

    ui.mostrarMensaje('Cotizando...  ', 'exito');
    //ocultar la cotizaciones previas 
    const resultados = document.querySelector('#resultado div');
    if (resultados != null  ){
        resultados.remove();
    }


    //instanciar el seguro 
    const seguro = new Seguro(marca, year, tipo );
    const total = seguro.cotizarSeguro();
    console.log(seguro)

    //utilizar el protityoe qye va a cotizar\
    ui.mostrarResultado(total, seguro) ; 
    
}