import {connectToDB} from '../../../../utils/db'
import Prompt from '../../../../models/prompt'

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt) return new Response('Prompt not found'
            , {status: 404}
        )
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 })
    }
} 


export const PATCH = async(request, {params}) => {
    const {prompt, tag} = await request.json();

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response('Prompt not found',
            {status: 404}
        )

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })

    }
}


export const DELETE = async (request, { params }) => {
    try {
        // Ensure you're connected to the database
        await connectToDB();

        // Find the document by ID and remove it
        const deletedPrompt = await Prompt.findByIdAndRemove(params.id);

        // If the prompt is not found, return a 404 error
        if (!deletedPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // If successful, return a success message
        return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200 });

    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
};