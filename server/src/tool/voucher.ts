import PDFKit from 'pdfkit';

import { Venta } from '../models/venta';
import { Totem } from '../models/totem';
import { config } from '../.';

import { File } from '../tool/file';
import { join } from 'path';
import moment from 'moment';
import CmdPrinter from 'cmd-printer';

export const makeVoucher = (venta: Venta, totem: Totem) => {
    return new Promise((resolve, reject) => {
        // Cancel if not printer provided
        if (totem.printer == null) {
            return
        }
    
        // Create a Filename
        const filename = join(
            config.folder.root + '/'
                + config.folder.pdf,
            'v'
                + String(venta.correlat)
                + moment().format('YYYYMMDD - hhmmss') 
                + '.pdf'
        )
    
        // Create a new PDF document
        let data = Buffer.from([])
        let pdf = new PDFKit({
            margin: mm(5),
            size: [
                mm(80),
                mm(60)
            ]
        })
        pdf.on("data", (ev: Buffer) => {
            data = Buffer.concat([data, ev])
        })
        pdf.on("end", () => {
            // Create File
            let file = new File(filename)
            file.writeSync(data)
    
            // Print Document
            if (totem.ip == "127.0.0.1") {
                // Local
                CmdPrinter.getByNameSync(totem.printer)
                    .printSync(filename)
            } else {
                // Remoto
                CmdPrinter.printRemoteSync(
                    filename,
                    totem.ip,
                    totem.printer
                )
            }

            // Matar Archivo
            file.kill()
            resolve()
        })
    
        // Build the document
        pdf.fontSize(20)
        pdf.text(
            venta.tipoAte.cod + venta.correlat,
            mm(10),
            mm(10),
            {
                width: mm(60),
                align: 'center'
            }
        )
    
        pdf.end()
    })
}

function mm(len: number){
    len /= 25.4
    len *= 72

    return len
}