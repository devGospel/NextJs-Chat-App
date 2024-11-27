import {connectToDB} from '../../../../../utils/db';
import Message from '../../../../../models/message';

export const POST = async (request) => {
  try {
    const { senderId, receiverId, text } = await request.json();
    if (!senderId || !receiverId || !text) {
      return new Response(JSON.stringify({ success: false, error: 'All fields are required' }), { status: 400 });
    }
  
    await connectToDB();
 
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content: text,
      timestamp: Date.now(),
    });
   
    await newMessage.save();

  
    return new Response(JSON.stringify({ success: true, data: newMessage }), { status: 201 });
  } catch (error) {
    console.log("Error: " + error)
    return new Response("Failed to send message", { status: 500 });
  }
};
