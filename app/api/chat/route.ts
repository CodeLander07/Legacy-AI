import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create a Supabase client with the user's access token to respect RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: authHeader } },
      }
    );

    // Get the user to verify the token
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user's memories
    const { data: memories, error: dbError } = await supabase
      .from('memories')
      .select('title, content, tags')
      .eq('user_id', user.id);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
    }

    const memoryContext = memories?.map(m => 
      `Title: ${m.title}\nTags: ${m.tags?.join(', ')}\nContent: ${m.content}`
    ).join('\n\n');

    const systemPrompt = `You are LegacyAI, a helpful assistant that answers questions based ONLY on the user's stored memories.
    
    Here are the user's memories:
    ${memoryContext || 'No memories found.'}
    
    If the answer is not in the memories, say "I don't have a memory about that yet."
    Be warm, empathetic, and respectful.`;

    // Call Gemini API if key exists
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(`${systemPrompt}\n\nUser Question: ${message}`);
        const response = await result.response;
        const reply = response.text();
        
        return NextResponse.json({ reply });
      } catch (geminiError) {
        console.error('Gemini execution failed:', geminiError);
        return NextResponse.json({ 
          reply: "I'm having trouble connecting to the AI service right now. Please try again in a moment." 
        });
      }
    } else {
      // Placeholder response
      return NextResponse.json({ 
        reply: `(Placeholder: GEMINI_API_KEY missing)\n\nBased on your ${memories?.length || 0} memories, here is what I found:\n\nI see you asked about "${message}".\n\nI found these relevant memories:\n${memories?.slice(0, 3).map(m => `- ${m.title}`).join('\n')}` 
      });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
