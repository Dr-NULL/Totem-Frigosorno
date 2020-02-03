import PDFKit from 'pdfkit';

import { Venta } from '../models/venta';
import { Totem } from '../models/totem';
import { CONFIG } from '../.';

import { File } from '../tool/file';
import { join } from 'path';
import moment from 'moment';
import CmdPrinter from 'cmd-printer';
import Barcode from '../tool/barcode';

export function makeVoucher (venta: Venta, totem: Totem) {
    return new Promise((resolve, reject) => {
        // Cancel if not printer provided
        if (totem.printerName == null) {
            return
        }
    
        // Create a Filename
        const filename = join(
            CONFIG.folder.root + '/'
                + CONFIG.folder.pdf,
            'v'
                + String(venta.correlat)
                + moment().format('YYYYMMDD - hhmmss') 
                + '.pdf'
        )
    
        // Create a new PDF document
        let data = Buffer.from([])
        let pdf = new PDFKit({
            layout: 'portrait',
            margin: 0,
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
            try {
                CmdPrinter.printRemote(
                    filename,
                    totem.printerIp,
                    totem.printerName,
                    {
                        adjust: 'noscale',
                        color: 'monocrome'
                    }
                )
    
                // Matar Archivo
                file.kill()
                resolve()
            } catch {
                reject(new Error(
                    `Imposible conectar con la impresora "${totem.printerName}".`
                ))
            }
        })
    
        // Build the document
        let pingFang = join(
            CONFIG.folder.root,
            'data',
            'PingFang.ttf'
        )
        let code128 = join(
            CONFIG.folder.root,
            'data',
            'code128.ttf'
        )

        pdf.fontSize(25)
        pdf.font(pingFang)
        pdf.text(
            venta.tipoAte.cod + venta.correlat,
            mm(15),
            mm(2),
            {
                width: mm(50),
                align: 'center'
            }
        )

        let rut = venta.typedRut
        if (rut == null) {
            rut = venta.cliente.rut
        }
        
        pdf.font(code128)
        pdf.fontSize(55)
        pdf.text(
            Barcode.to128(rut),
            mm(0),
            mm(12),
            {
                width: mm(80),
                align: 'center'
            }
        )
        pdf.fontSize(18)
        pdf.font(pingFang)
        pdf.text(
            rut,
            mm(15),
            mm(34),
            {
                width: mm(50),
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