//evento inicia quando HTML inicial for completamente carregado 
document.addEventListener('DOMContentLoaded', function(){

    //array de meses
    const monthsBr = ['janeiro', 'feveireiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    const tableDays = document.getElementById('dias');

    function GetDaysCalendar(mes, ano){
        document.getElementById('mes').innerHTML = monthsBr[mes];
        document.getElementById('ano').innerHTML = ano;

        //cria uma nova data com base nos valores de ano e mes
        //getDay pega o dia atual (0 a 6) começando no 0 como domingo
        //-1 é subtraído do getDay(), sendo segunda-feira = 0, para usarmos nos indices das colunas
        let firstDayOfWeek = new Date(ano, mes, 1).getDay()-1;

        //descobrir o ultimo dia do mes atual
        //Ao passar o valor 0 como o terceiro argumento do construtor, 
        //estamos indicando que queremos o último dia do mês anterior ao mês especificado, 
        //que é o mesmo que o último dia do mês atual.
        let getLastDayThisMonth = new Date(ano, mes+1,0).getDate();

        //loop para popular o calendario
        //calendario de 6 semanas de 7 dias (6x7 = 42);
        for(var i = -firstDayOfWeek, index = 0; i < (42-firstDayOfWeek); i++, index++){
            let dt = new Date(ano, mes, i);
            let dtNow = new Date();
            let dayTable = tableDays.getElementsByTagName('td')[index];
            //remove as classes css
            dayTable.classList.remove('mes-anterior');
            dayTable.classList.remove('proximo-mes');
            dayTable.classList.remove('dia-atual');
            dayTable.innerHTML = dt.getDate();


            //verifica qual o dia atual
            if(dt.getFullYear() == dtNow.getFullYear() && dt.getMonth() == dtNow.getMonth() &&
            dt.getDate() == dtNow.getDate()){
                dayTable.classList.add('dia-atual');
            }

            //todos os dias que não são do mes atual recebe uma classe personalizada javascript
            if(i < 1){
                dayTable.classList.add('mes-anterior');
            }
            if(i > getLastDayThisMonth){
                dayTable.classList.add('proximo-mes');
            }
        }

    }

    //chama a função acima passando o ano e o mes
    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    GetDaysCalendar(mes, ano);

    //pega os botoes pelo id e armazena em variaveis
    const botao_proximo = document.getElementById('btn_prev');
    const botao_anterior = document.getElementById('btn_ant');

    //passa para o proximo mes
    botao_proximo.onclick = function(){
        mes++;

        if(mes > 11){
            mes = 0;
            ano++;
        }
        GetDaysCalendar(mes, ano);
    }

    //passa para o mes anterior
    botao_anterior.onclick = function(){
        mes--;
        if(mes < 0){
            mes = 11;
            ano--;
        }
        GetDaysCalendar(mes, ano);
    }
    
})