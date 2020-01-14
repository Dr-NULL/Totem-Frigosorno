import { Totem } from '../models/totem';
import { EndPoint } from '../tool/end-point';

export const totemInfo = new EndPoint()
totemInfo.method = 'get'
totemInfo.path = '/totem/info'
totemInfo.callback = async (req, res) => {
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