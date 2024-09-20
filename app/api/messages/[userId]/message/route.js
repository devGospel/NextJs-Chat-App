import {connectToDB} from '../../../../../utils/db';
import Message from '../../../../../models/message';

export const POST = async (request) => {
  try {
    console.log("here")
    // Parse the request body to get the message data
    const { senderId, receiverId, text } = await request.json();

    // Validate required fields
    if (!senderId || !receiverId || !text) {
      return new Response(JSON.stringify({ success: false, error: 'All fields are required' }), { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Create a new message
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content: text,
      timestamp: Date.now(),
    });

    // Save the message to the database
    await newMessage.save();

    // Return the saved message in a successful response
    return new Response(JSON.stringify({ success: true, data: newMessage }), { status: 201 });
  } catch (error) {
    console.log("Error: " + error)
    return new Response("Failed to send message", { status: 500 });
  }
};
