declare interface String {
    capitalize: (this: string) => string;
}

String.prototype.capitalize = function(this: string) {
    let i = 0
    let out = ''
    let caps = false
    
    while (i < this.length) {
        const ref = this.toLowerCase()
        const ch = ref[i]
        if (
            (    
                (i == 0) &&
                (ch.match(/[a-z]/gi) != null)
            ) ||
            (    
                (caps) &&
                (ch.match(/[a-z]/gi) != null)
            )
        ) {
            out += ch.toUpperCase()
            caps = false
        } else {
            out += ch;
            if (ch.match(/[a-z]/gi) == null) {
                caps = true
            }
        }

        i++
    }

    return out
};