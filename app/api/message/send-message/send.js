import Message from '../../../models/message';
import connectToDB from '../../../utils/db';

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === 'POST') {
    const { content, sender, receiver } = req.body;

    try {
      const message = new Message({
        content,
        sender,
        receiver,
      });

      await message.save();
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


