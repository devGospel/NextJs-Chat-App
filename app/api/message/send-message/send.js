import Message from '../../../models/message';
import connectToDB from '../../../utils/db';

export const POST = async (request) => {
  try {
      await connectToDB()

      const message = new Message({
        content,
        sender,
        receiver,
      });

      await message.save();
      return new Response(JSON.stringify(message), { status: 200 })
    } catch (error) {
      return new Response("Failed to send message", { status: 500 })
    }

}



