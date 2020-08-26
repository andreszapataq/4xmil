const totalMensual = "$4.947.864";
const cupoNequi = 2314455;
const cupoDavivienda = 2633409;
const totalSaldo = cupoNequi + cupoDavivienda;

let cupoMensual = document.getElementById('cupo-mensual');
cupoMensual.textContent = totalMensual;

let saldoMes = document.getElementById('saldo-mes');
saldoMes.textContent = totalSaldo;

let saldoBank1 = document.getElementById('overviewcard-bank1');
saldoBank1.textContent = cupoNequi;

let saldoBank2 = document.getElementById('overviewcard-bank2');
saldoBank2.textContent = cupoDavivienda;