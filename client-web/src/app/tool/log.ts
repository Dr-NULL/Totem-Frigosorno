export module Log {
    export function title(name: string) {
        let fill = ""
        while (fill.length < name.length) { fill += "=" }

        console.clear()
        console.log(` //===================${fill}===================\\\\`)
        console.log(`//--------------->>>  ${name}  <<<---------------\\\\`)
        console.log(`\\\\==================${fill}======================//\n`)
    }

    function show(label: string, text: string) {
        let now = new Date()
        let out = getDate()
        out += ` -> [${label}]: `
        out += text

        let data = out.split(/\n/gi)
        data.forEach((item, i) => {
            if (i == 0) {
                console.log(item)
            } else {
                ln(item)
            }
        })
    }

    export function ln(text: string = "") {
        let out = "                   "
        out += `            `
        out += text
        

        let data = out.split(/\n/gi)
        data.forEach((item, i) => {
            console.log(item)
        })
    }

    export function ev(text: string, timestamp: boolean = true) {
        show(" EV ", text)
    }

    export function ok(text: string, timestamp: boolean = true) {
        show(" OK ", text)
    }

    export function er(text: string, timestamp: boolean = true) {
        show("FAIL", text)
    }

    export function sep() {
        console.log(`---------------------------------------------------------------------------------\n`)
    }

    function getDate() {
        const data = new Date()
        let out = data.getFullYear().toString()
        out += '/' + addZero(data.getMonth() + 1, 2)
        out += '/' + addZero(data.getDate(), 2)

        out += ' ' + addZero(data.getHours(), 2)
        out += ':' + addZero(data.getMinutes(), 2)
        out += ':' + addZero(data.getSeconds(), 2)

        return out
    }

    function addZero(input: number, length: number) {
        let out = `${input}`
        while (out.length < length) {
            out = '0' + out
        }

        return out
    }
}
export default Log
