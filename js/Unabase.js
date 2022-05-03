// EJERCICIO 1
function multiplica(a, b) {
  let c = 0;
  for(let i=1; i <= a; i++)
     c = c + b;
  return c;
}

console.log(multiplica(2,3))

// EJERCICIO 2
function elMayor(a) {
  let mayor = 0
  for(i = 0; i < a.length; i++){
      if (a[i] > mayor){
        mayor = a[i]
      }
  }
  return mayor
}
let arrgh = [4, 8, 2, 44, 15, 5, 78, 24]
console.log(elMayor(arrgh))

// EJERCICIO 3

function eliminarBlancos(a){
  for (const key in a) {
    if (a[key] === '' || a[key] === undefined || a[key] === null || a[key] === false || a[key] === 0) {
      delete a[key];
    }
  }
  return a
}

let ninja = {
  belt: undefined,
  name: 'bruce',
  lastname: 'lee',
  active: false,
  status: null,
  HP: 0,
  description: 'is so cool'
}

console.log(delEmptyKeys(ninja))

// EJERCICIO 4

function contarPalabras(str, find) {
  return (str.split(find)).length - 1;
}
contarPalabras("El texto esta escrito con texto que esta puro", "esta")

// EJERCICIO 5

function mayorMenor(val) {
  if (!isNaN(val)) {
    const orden = Object.values(val)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    return orden
  } else {
    let arrgh = Object.values(val)
    arrgh.sort()
    return arrgh
  }
}


let ninja = {
  belt: 'best one',
  name: 'bruce',
  lastname: 'lee',
  status: 'everywhere',
  description: 'is so cool'
}
/*const maxSpeed = {
    car: 300, 
    bike: 60, 
    motorbike: 200, 
    airplane: 1000,
    helicopter: 400, 
    rocket: 8 * 60 * 60
};*/
console.log(mayorMenor(ninja))

// EJERCICIO 6
function palindromo(a) {
  let reg = /[\W_]/g;
  var minusculas = a.toLowerCase().replace(reg, '');
  var reversa = minusculas.split('').reverse().join('');
  // devuelve true o false 
  return reversa === minusculas;
}