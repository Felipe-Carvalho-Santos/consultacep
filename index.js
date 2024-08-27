(function(){
    'use strict';

    let $cep = document.querySelector('[data-js="cep"]');
    let $button = document.querySelector('[data-js="button"]');

    let $logradouro = document.querySelector('[data-js="logradouro"]');
    let $bairro = document.querySelector('[data-js="bairro"]');
    let $estado = document.querySelector('[data-js="estado"]');
    let $cidade = document.querySelector('[data-js="cidade"]');
    let $cepResult = document.querySelector('[data-js="cepResult"]');
    let $ddd = document.querySelector('[data-js="ddd"]');
    let $status = document.querySelector('[data-js="status"]');



    let resultCep = '';
 
  
    $button.addEventListener('click', function(e){
        e.preventDefault();

        resultCep = $cep.value.split(/\D/).join('');
    
        $status.textContent = `Buscando informações para o CEP: ${resultCep}...`;


        var ajax = new XMLHttpRequest();

      
        ajax.open('GET', `https://viacep.com.br/ws/${resultCep}/json`);
        ajax.send();
        


        let response = '';

        ajax.addEventListener('readystatechange', function() {
        
            if( requestChangeOk() ) {

                
                try {
                    response = JSON.parse(ajax.responseText);
                    
                }
                catch(e) {
                    response = ajax.responseText;
                    
                }


                if(!response.erro) {
                    $logradouro.textContent = response.logradouro;
                    $bairro.textContent = response.bairro;
                    $estado.textContent = response.uf;
                    $cidade.textContent = response.localidade;
                    $cepResult.textContent = response.cep;
                    $ddd.textContent = response.ddd;

                    $status.textContent = `Endereço referente ao CEP: ${resultCep}`;
                    
                } else {
                    $logradouro.textContent = "N/a";
                    $bairro.textContent = "N/a";
                    $estado.textContent = "N/a";
                    $cidade.textContent = "N/a";
                    $cepResult.textContent = "N/a";
                    $ddd.textContent = "N/a";

                    $status.textContent = `Não encontramos o endereço para o CEP: ${resultCep}.`;
                }
            } else if (ajax.readyState === 4 && ajax.status !== 200) {
                console.log("Erro na requisição.");
            
                $status.textContent = `Erro ao buscar as informações para o CEP: ${resultCep}.`;
                $logradouro.textContent = "";
                $bairro.textContent = "";
                $estado.textContent = "";
                $cidade.textContent = "";
                $cepResult.textContent = "";
                $ddd.textContent = "";
            }
    
            
        }, false);
    
        function requestChangeOk() {
            return ajax.readyState === 4 && ajax.status === 200;
        }

    });

}())