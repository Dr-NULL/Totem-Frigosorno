import moment from "moment"

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
        let out = moment().format("YYYY/MM/DD HH:mm:ss")
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
}
export default Log
