export function EmailVerification(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(email.trim()) ) { 
        return true
    } else {
        return false
    }  
}
export function TotalNumVerification(str,num) {
    if (str) {
        var patt1 = /[0-9]/g;
        var result = str.match(patt1);
        if (result) {
            var allNum = ('').concat(...result);
            if (num === allNum.length) return true
        }
        return false
    }
    return false
}