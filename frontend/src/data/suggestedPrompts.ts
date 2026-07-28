export interface SuggestedPrompt {
  id: string
  title: string
  prompt: string
}

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: 'explain-fastapi',
    title: 'Explain FastAPI',
    prompt: 'Explain FastAPI and why it is popular for building APIs.',
  },
  {
    id: 'learn-python',
    title: 'Help me learn Python',
    prompt: 'Help me learn Python. Where should I start as a beginner?',
  },
  {
    id: 'create-rest-api',
    title: 'Create a REST API',
    prompt: 'Show me how to create a simple REST API.',
  },
  {
    id: 'explain-genai',
    title: 'Explain Generative AI',
    prompt: 'Explain Generative AI in simple terms.',
  },
]
