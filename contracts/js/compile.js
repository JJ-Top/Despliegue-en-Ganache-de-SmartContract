//modulo nativo de node que no se instala pero si hay que requerirlo. Path Sirve para acceder rutas en la ubicación
const path = require('path');
//modulo nativo de node que no se instala pero si hay que requerirlo. FS sirve para leer y escribir archivos en la ubicación
const fs = require('fs');
//requerimos el compilador solc
const solc = require('solc');


const MyCoinPath = path.join (__dirname, '../Mycoin.sol');
const code = fs.readFileSync(MyCoinPath, 'utf8');

console.log("MyCoinPath");
console.log(MyCoinPath);

console.log("code");
console.log(code);


//Transpilar
//el compilador de solc requiere que le pasemos a la hora de compilar un objeto que especifique cuales van a ser las entradas y las salidas
const input = {     
    language: 'Solidity',
    sources:{
        'MyCoin.sol': {
            content: code
        }
    },
    settings:{
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

//vamos a compilar, cuando se compila vamos a necesitar acceder al abi y al bytecode. La forma mas facil de acceder es con un objeto json
//el objeto input de js lo tenemos que convertir a string JSON
const output = JSON.parse(solc.compile(JSON.stringify(input) ) )
//output tiene un string JSON dentro de la cual esta el bytecode y el abi (abi informa los parametros, funciones y retornos del smartcontract)
//el abi lo usa el web3 para realcionarse con el s.c.
//el web3 necesita abi y direccion del contrato para interactuar con el
//para el deploy solo necesita el bytecode

console.log(output);

//exportar el modulo
module.exports = {
    abi: output.contracts['MyCoin.sol'].MyCoin.abi,
    bytecode: output.contracts['MyCoin.sol'].MyCoin.evm.bytecode.object
}
