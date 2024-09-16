import Message from '../../../models/message';
import connectToDB from '../../../utils/db';

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === 'GET') {
    const { senderId, receiverId } = req.query;

    try {
      const messages = await Message.find({})
      
/*         $or:sendsend [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ]
      }).sort({ timestamp: 1 }); */

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load messages' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
