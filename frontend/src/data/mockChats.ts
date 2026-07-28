import type { Conversation } from '../types/chat'

/**
 * Seed conversations shown on first run so the sidebar isn't empty.
 * Once the user interacts, real state takes over and is persisted to localStorage.
 */
export const mockConversations: Conversation[] = [
  {
    id: 'seed-python-learning',
    title: 'Python Learning',
    createdAt: '2026-07-20T09:00:00.000Z',
    updatedAt: '2026-07-20T09:12:00.000Z',
    messages: [
      {
        id: 'seed-python-learning-1',
        role: 'user',
        content: 'Help me learn Python',
        createdAt: '2026-07-20T09:00:00.000Z',
        status: 'sent',
      },
      {
        id: 'seed-python-learning-2',
        role: 'assistant',
        content:
          "Sure! Python is a great first language. Start with variables, loops, and functions, then move on to lists, dictionaries, and classes. Want me to put together a short roadmap?",
        createdAt: '2026-07-20T09:00:05.000Z',
        status: 'sent',
      },
    ],
  },
  {
    id: 'seed-fastapi-help',
    title: 'FastAPI Help',
    createdAt: '2026-07-19T14:30:00.000Z',
    updatedAt: '2026-07-19T14:45:00.000Z',
    messages: [
      {
        id: 'seed-fastapi-help-1',
        role: 'user',
        content: 'Create a REST API',
        createdAt: '2026-07-19T14:30:00.000Z',
        status: 'sent',
      },
      {
        id: 'seed-fastapi-help-2',
        role: 'assistant',
        content:
          'FastAPI makes this straightforward. Define a route with `@app.get("/items/{id}")`, add a Pydantic model for request/response validation, and FastAPI handles the rest — including automatic docs at `/docs`.',
        createdAt: '2026-07-19T14:30:08.000Z',
        status: 'sent',
      },
    ],
  },
  {
    id: 'seed-genai-roadmap',
    title: 'GenAI Roadmap',
    createdAt: '2026-07-17T11:00:00.000Z',
    updatedAt: '2026-07-17T11:20:00.000Z',
    messages: [
      {
        id: 'seed-genai-roadmap-1',
        role: 'user',
        content: 'Explain Generative AI',
        createdAt: '2026-07-17T11:00:00.000Z',
        status: 'sent',
      },
      {
        id: 'seed-genai-roadmap-2',
        role: 'assistant',
        content:
          'Generative AI refers to models that create new content — text, images, code, audio — rather than just classifying or predicting existing data. Large language models like the ones powering this chat are trained on huge text corpora to predict and generate coherent language.',
        createdAt: '2026-07-17T11:00:06.000Z',
        status: 'sent',
      },
    ],
  },
  {
    id: 'seed-rest-api-questions',
    title: 'REST API Questions',
    createdAt: '2026-07-14T16:00:00.000Z',
    updatedAt: '2026-07-14T16:05:00.000Z',
    messages: [
      {
        id: 'seed-rest-api-questions-1',
        role: 'user',
        content: 'Explain FastAPI',
        createdAt: '2026-07-14T16:00:00.000Z',
        status: 'sent',
      },
      {
        id: 'seed-rest-api-questions-2',
        role: 'assistant',
        content:
          'FastAPI is a modern Python web framework for building APIs quickly. It uses type hints for validation, generates interactive docs automatically, and is built on Starlette and Pydantic for high performance.',
        createdAt: '2026-07-14T16:00:04.000Z',
        status: 'sent',
      },
    ],
  },
]
