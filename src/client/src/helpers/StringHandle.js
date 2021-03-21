export function AbreviarNome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [nome, ...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([nome, ...abr,latName].join(' ').length> limit) {
            return [nome, ...abreviaturas].join(' ');
        } else {
            return [nome, ...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function AbreviarSobrenome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([...abr,latName].join(' ').length> limit) {
            return [...abreviaturas].join(' ');
        } else {
            return [...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function InitialsName(fullName) {

    function abreviarControl() {
        return abreviar(fullName);
    }
      
    function abreviar(str) {
        const [...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}`);
        }, []);
        var abr = abreviaturas.slice(0,1)
        var latName = abreviaturas.slice(-1)
            return [...abr,latName].join('');
    }
            
    return abreviarControl()
}

export function Colocar3dots(value,maxlimit) {

    if ((value).length > maxlimit) {
        return (((value).substring(0,maxlimit-3)) + '...')
    } else {
        return value
    }
            
}

export function wordUpper(arrWords) {
	var ignore = ['de', 'da', 'das', 'do', 'dos','a','e','o'];
	
	for (var i in arrWords) {
		if (ignore.indexOf(arrWords[i]) === -1) {
			arrWords[i] = arrWords[i].charAt(0).toUpperCase() + arrWords[i].toLowerCase().slice(1);
		}
	}
	arrWords=arrWords.join(" ")
	return arrWords;
}

export function keepOnlyNumbers(str) {
    if (str) {
        var patt1 = /[0-9]/g;
        var result = str.match(patt1);
        if (result) {
            return ('').concat(...result);
        }
    } 
}

export function formatTel(num) {
    var length = (`${num}`).length;
    var telefoneFormatado = num;
    
    if (length === 10) {
    telefoneFormatado = '(' + (`${num}`).substring(0, 2) + ') ' + (`${num}`).substring(2, 6) + '-' + (`${num}`).substring(6, 10);
    } else if (length === 11) {
    telefoneFormatado = '(' + (`${num}`).substring(0, 2) + ') ' + (`${num}`).substring(2, 7) + '-' + (`${num}`).substring(7, 11);
    }
    return telefoneFormatado;
}

export function formatCPFeCNPJeCEPeCNAE(num) {
    var length = (`${num}`).length;
    var numFormat = num;
    
    if (length === 11) { //cpf
        numFormat = (`${num}`).substring(0, 3) + '.' + (`${num}`).substring(3, 6) + '.' + (`${num}`).substring(6, 9) + '-' + (`${num}`).substring(9, 11);
    } else if (length === 14) { //cnpj
        numFormat = (`${num}`).substring(0, 2) + '.' + (`${num}`).substring(2, 5) + '.' + (`${num}`).substring(5, 8) + '/' + (`${num}`).substring(8, 12) + '-' + (`${num}`).substring(12, 14);
    } else if (length === 8) { //cep
        numFormat = (`${num}`).substring(0, 5) + '-' + (`${num}`).substring(5, 8);
    } else if (length === 5) { //cnae
        numFormat = (`${num}`).substring(0, 2) + '.' + (`${num}`).substring(2, 4) + '-' + (`${num}`).substring(4, 5);
    }
    return numFormat;
}