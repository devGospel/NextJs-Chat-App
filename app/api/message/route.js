import Message from '../../../models/message';
import {connectToDB} from '../../../utils/db';

export const GET = async (request) => {
  try {
      await connectToDB()

    const { senderId, receiverId } = req.query;
      const messages = await Message.find({})
      
/*         $or:sendsend [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ]
      }).sort({ timestamp: 1 }); */

      return new Response(JSON.stringify(messages), { status: 200 })
    } catch (error) {
      return new Response("Failed to load messages", { status: 500 })
    }
}



