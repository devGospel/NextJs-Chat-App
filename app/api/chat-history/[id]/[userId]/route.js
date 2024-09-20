import {connectToDB} from '../../../../../utils/db'
import Message from '../../../../../models/message'

// pages/api/messages/[id]/[userId].js

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');

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

    return new Response(JSON.stringify({ success: true, messages }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server error", error }), {
      status: 500,
    });
  }
};