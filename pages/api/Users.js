import dbConnect from '../../utils/dbConnect';
import User from '../../models/usuario';

dbConnect();

export default async (req, res) => {
  const {method} = req;

  switch(method){
    case 'GET':
        try {
            const usuarios = await User.find({});
            res.status(200).json({ success: true, data: usuarios });
        } catch (error) {
            res.status(400).json({ success: false});
        }
        break;
    case 'POST':
        try {
            const usuario = await User.create(req.body);
            res.status(201).json({ success: true, data: usuario });
        } catch (error) {
            res.status(400).json({ success: false});
        }
        break;
        default:
            res.status(400).json({ success: false});
        break;
  }

}