//requerimos la libreria del nodo
const HDWalletProvider = require ('truffle-hdwallet-provider');

//requerir la libreria web3. Para nsubir el contrato a la web chain es una transaccion firmada
const Web3 = require ('web3');

//requerimos el abi y el bytecode del compile.js
//deploy va a integrar el archivo compile.js
console.log ('86');
const { abi, bytecode } = require('./compile');
console.log ('87');

const mnemonic = 'semilla1 s2 s 3s 4 s5 setc';
console.log ('88');
const provider = new HDWalletProvider(mnemonic, "http://localhost:8545");
console.log ('89');

const web3 = new Web3(provider);

console.log ('90');

const deploy = async() => {

    console.log ('91');
      const accounts = await web3.eth.getAccounts(); // guarda la cuenta que devuelve al desplegar el s.c.
      
      console.log ('abi');
      console.log (abi);

      console.log ('92');
      
      const argumentsConstructor = [
          "epa"
      //    "parametro 2",
      ]; 

      const gasEstimate = await new web3.eth.Contract(abi) 
                          .deploy({ data: bytecode, arguments: argumentsConstructor  }) 
                          .estimateGas({  from: accounts[0]  });

                          console.log ('93');

      const result = await new web3.eth.Contract(abi)  //transaccion como tal
                     .deploy({ data: bytecode , arguments: argumentsConstructor  }) 
                     .send({ gas: gasEstimate, from: accounts[0]  });
                     
                     console.log ('94');
       
                     console.log(result);

}
deploy();
