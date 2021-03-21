const month = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'] 
const monthMini = ['jan.','fev.','mar.','abr.','maio.','jun.','jul.','ago.','set.','out.','nov.','dez.'] 

export function NormalizeData(date,type) {
    if (date) {
        if (type==='normal'||!type) return (`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
        else if (type==='string') return (`${date.getDate()} de ${month[date.getMonth()]} de ${date.getFullYear()}`)
    } else return date
}