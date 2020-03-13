"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log;
(function (Log) {
    function title(name) {
        let fill = "";
        while (fill.length < name.length) {
            fill += "=";
        }
        console.clear();
        console.log(` //===================${fill}===================\\\\`);
        console.log(`//--------------->>>  ${name}  <<<---------------\\\\`);
        console.log(`\\\\==================${fill}======================//\n`);
    }
    Log.title = title;
    function show(label, text) {
        let now = new Date();
        let out = getDate();
        out += ` -> [${label}]: `;
        out += text;
        let data = out.split(/\n/gi);
        data.forEach((item, i) => {
            if (i == 0) {
                console.log(item);
            }
            else {
                ln(item);
            }
        });
    }
    function ln(text = "") {
        let out = "                   ";
        out += `            `;
        out += text;
        let data = out.split(/\n/gi);
        data.forEach((item, i) => {
            console.log(item);
        });
    }
    Log.ln = ln;
    function ev(text, timestamp = true) {
        show(" EV ", text);
    }
    Log.ev = ev;
    function ok(text, timestamp = true) {
        show(" OK ", text);
    }
    Log.ok = ok;
    function er(text, timestamp = true) {
        show("FAIL", text);
    }
    Log.er = er;
    function sep() {
        console.log(`---------------------------------------------------------------------------------\n`);
    }
    Log.sep = sep;
    function getDate() {
        const data = new Date();
        let out = data.getFullYear().toString();
        out += '/' + addZero(data.getMonth() + 1, 2);
        out += '/' + addZero(data.getDate(), 2);
        out += ' ' + addZero(data.getHours(), 2);
        out += ':' + addZero(data.getMinutes(), 2);
        out += ':' + addZero(data.getSeconds(), 2);
        return out;
    }
    function addZero(input, length) {
        let out = `${input}`;
        while (out.length < length) {
            out = '0' + out;
        }
        return out;
    }
})(Log = exports.Log || (exports.Log = {}));
exports.default = Log;
