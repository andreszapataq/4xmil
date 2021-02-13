// VARIABLES GLOBALES
const totalMensual = "$4.720.040";
let cupoNequi = 0;
let cupoDaviplata = 0;
let totalSaldo = 0;
let fechaActual = new Date();

let usuario = document.getElementById('user');
let fecha = document.getElementById('mes-actual')
let cupoMensual = document.getElementById('cupo-mensual');
cupoMensual.textContent = totalMensual;
let saldoMes = document.getElementById('saldo-mes');

// BANK 1 ELEMENTS
let saldoBank1 = document.getElementById('overviewcard-bank1');
let inputsBank1 = document.getElementById('inputs-bank1');
let fechaBank1 = document.getElementById('fechaBank1');
let conceptoBank1 = document.getElementById('conceptoBank1');
let valorBank1 = document.getElementById('valorBank1');
let listHistory1 = document.getElementById('list-history1');
let cuentaID1 = '';

// BANK 2 ELEMENTS
let saldoBank2 = document.getElementById('overviewcard-bank2');
let inputsBank2 = document.getElementById('inputs-bank2');
let fechaBank2 = document.getElementById('fechaBank2')
let conceptoBank2 = document.getElementById('conceptoBank2');
let valorBank2 = document.getElementById('valorBank2');
let listHistory2 = document.getElementById('list-history2');
let cuentaID2 = '';

// FORMATEA LAS CIFRAS CON '$' Y SEPARADOR DE MILES
const formatNumber = (num) => {
    return '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

let meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

let mes = meses[fechaActual.getMonth()];
let anio = fechaActual.getFullYear();

fecha.textContent = `${mes} ${anio}`;

fechaBank1.valueAsDate = fechaActual;
fechaBank2.valueAsDate = fechaActual;

// TRAE EL NOMBRE DE USUARIO
fetch('http://localhost:4000/api/v1/usuarios')
    .then(response => response.json())
    .then(data => {
        // console.log(data.data);
        let user = data.data[0].nombre;
        usuario.textContent = user;
    });

// ACTUALIZA LOS CUPOS DESDE LA DB
function cupoUpdate(res) {
    saldoBank1.textContent = '';
    saldoBank2.textContent = '';
    res.data.map(caca => {
        if(caca.banco === 'Nequi') {
            cupoNequi = caca.cupo;
            saldoBank1.textContent = formatNumber(caca.cupo);
            cuentaID1 = caca._id;
        } else {
            cupoDaviplata = caca.cupo;
            saldoBank2.textContent = formatNumber(caca.cupo);
            cuentaID2 = caca._id;
        }
    });
    totalSaldo = cupoNequi + cupoDaviplata;
    saldoMes.textContent = formatNumber(totalSaldo);
}

// TRAE LOS CUPOS
function cupos() {
    fetch('http://localhost:4000/api/v1/cuentas')
    .then(res => res.json())
    .then(response => {
        cupoUpdate(response);
    });
}

// ACTUALIZA LOS REGISTROS DESDE LA DB
function historialUpdate(res) {
    listHistory1.textContent = '';
    listHistory2.textContent = '';
    res.data.map(history => {
        if(history.cuenta.banco === 'Nequi') {
            listHistory1.appendChild(createReg(history));
        } else {
            listHistory2.appendChild(createReg(history));
        }
    });
}

// TRAE LOS REGISTROS
function historial() {
    fetch('http://localhost:4000/api/v1/historial')
    .then(res => res.json())
    .then(response => {
        historialUpdate(response);
    });
}

cupos();
historial();

// NEQUI FORM MANAGER
inputsBank1.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let formData1 = {
        fecha: fechaBank1.value,
        concepto: conceptoBank1.value,
        valor: valorBank1.value,
        banco: 'Nequi',
        cuenta: cuentaID1
    }

fetch('http://localhost:4000/api/v1/historial', {
    method: 'POST',
    body: JSON.stringify(formData1),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(res => res.json())
.then(response => {
    historialUpdate(response);
    cupos();
    // cupoNequi = response.nuevoCupo;
    // saldoBank1.textContent = formatNumber(cupoNequi);
    // saldoMes.textContent = formatNumber(cupoNequi + cupoDaviplata);
    // listHistory1.insertBefore(createReg(response.data), listHistory1.firstChild);
    // console.log('Success', response)
})
.catch(error => console.error('Error:', error))

// fechaBank1.value = '';
conceptoBank1.value = '';
valorBank1.value = '';

}, false);

// DAVIPLATA FORM MANAGER
inputsBank2.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let formData2 = {
        fecha: fechaBank2.value,
        concepto: conceptoBank2.value,
        valor: valorBank2.value,
        banco: 'DaviPlata',
        cuenta: cuentaID2
    }

fetch('http://localhost:4000/api/v1/historial', {
    method: 'POST',
    body: JSON.stringify(formData2),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(res => res.json())
.then(response => {
    historialUpdate(response);
    cupos();
    // cupoDaviplata = response.nuevoCupo;
    // saldoBank2.textContent = formatNumber(cupoDaviplata);
    // saldoMes.textContent = formatNumber(cupoNequi + cupoDaviplata);
    // listHistory2.insertBefore(createReg(response.data), listHistory2.firstChild);
    // console.log('Success', response)
})
.catch(error => console.error('Error:', error))

// fechaBank2.value = '';
conceptoBank2.value = '';
valorBank2.value = '';

}, false);

// CREADOR DE REGISTROS
function createReg(history) {
    let reg1 = document.createElement('div');
            reg1.className = 'reg1';
            
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            let p3 = document.createElement('p');

            p1.className = 'date';
            p2.className = 'description';
            p3.className = 'value';

            const dateOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };

            dateOptions.timeZone = 'UTC';

            let p1Text = document.createTextNode(new Date(history.fecha).toLocaleString("es-CO", dateOptions));
            let p2Text = document.createTextNode(history.concepto);
            let p3Text = document.createTextNode(formatNumber(history.valor));

            p1.appendChild(p1Text);
            p2.appendChild(p2Text);
            p3.appendChild(p3Text);
            
            reg1.appendChild(p1);
            reg1.appendChild(p2);
            reg1.appendChild(p3);

            return reg1;
}

// API & AJAX
let apiLocation = document.getElementById('api_location');
apiLocation.addEventListener('click', (e) => {
    e.preventDefault();
    myLocation();
}, false);

function myLocation() {
    const xhr = new XMLHttpRequest();
    const url = 'https://api.github.com/users/andreszapataq';

    xhr.onload = () => {
        if(xhr.status === 200) {
            // let el = document.getElementById('footer_position').innerHTML = xhr.responseText;
            const data = JSON.parse(xhr.response);
            document.getElementById('api_response').textContent = data.location;
            console.log(xhr.response);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
};