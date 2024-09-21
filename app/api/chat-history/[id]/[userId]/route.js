import { connectToDB } from '../../../../../utils/db';
import Message from '../../../../../models/message';

// pages/api/messages/[id]/[userId].js

export const GET = async (request, { params }) => {
  const { id, userId } = params;

  console.log("Sender Id: " + id + " Receiver Id: " + userId);

  if (!id || !userId) {
    return new Response(JSON.stringify({ success: false, message: "Missing parameters" }), {
      status: 400,
    });
  }

  try {
    // Connect to the database
    await connectToDB();
   
    const messages = await Message.find({
      $or: [
        { sender: id, receiver: userId },
        { sender: userId, receiver: id }
      ]
    }).sort({ timestamp: 1 });

    console.log("Messages: "+messages)

    return new Response(JSON.stringify({ success: true, messages }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error", error }), {
      status: 500,
    });
  }
};
