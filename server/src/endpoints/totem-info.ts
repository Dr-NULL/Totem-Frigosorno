import { Totem } from '../models/totem';
import { EndPoint } from '../tool/end-point';

export const TOTEM_INFO = new EndPoint()
TOTEM_INFO.method = 'get'
TOTEM_INFO.path = '/totem/info'
TOTEM_INFO.callback = async (req, res) => {
    try {
        let totem: Totem = await Totem.findOne({ ip: req.ip })
        if (totem == null) {
            totem = new Totem()
            totem.ip = req.ip
        }

        res.api.send(totem)
    } catch (err) {
        res.api.catch(err)
    }
}