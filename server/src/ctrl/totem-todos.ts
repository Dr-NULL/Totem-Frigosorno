import { EndPoint } from '../tool/end-point';
import { Totem } from '../models/totem';
import { Not } from 'typeorm';

export const totemTodos = new EndPoint()
totemTodos.method = 'get'
totemTodos.path = '/totem/todos'
totemTodos.callback = async (req, res) => {
    try {
        let data: Array<Totem> = []
        if (req.ip != '127.0.0.1') {
            data = await Totem.find({
                where: {
                    ip: Not('127.0.0.1')
                }
            })

        } else {
            data = await Totem.find()
            
        }

        res.api.send(data)
    } catch (err) {
        res.api.catch(err)
    }
}