import os
from dotenv import load_dotenv
from agents import AsyncOpenAI, OpenAIChatCompletionsModel, set_tracing_disabled

# Load environment variables from .env file
load_dotenv()

# Get API key - support both OpenAI and OpenRouter
openai_api_key = os.getenv("OPENAI_API_KEY")
agent_model = os.getenv("AGENT_MODEL", "gpt-4o-mini")

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set.")

# Configure provider based on API key type
if openai_api_key.startswith("sk-or-v1-") or openai_api_key.startswith("sk-or-"):
    # OpenRouter configuration
    provider = AsyncOpenAI(
        api_key=openai_api_key,
        base_url="https://openrouter.ai/api/v1"
    )
else:
    # Standard OpenAI configuration
    provider = AsyncOpenAI(
        api_key=openai_api_key
    )

# Model
model = OpenAIChatCompletionsModel(
    model=agent_model,
    openai_client=provider,
)

set_tracing_disabled(disabled=True)

SYSTEM_PROMPT = """You are a helpful AI assistant for task management. You help users manage their todo tasks through natural language conversation.

You have access to the following task management tools:
1. add_task: Create a new task with a title and optional description
2. list_tasks: List all tasks or filter by completion status
3. complete_task: Mark a task as complete
4. delete_task: Delete a task
5. update_task: Update task properties (title, description, completion status)

Guidelines:
- Always confirm actions with clear, conversational responses
- When creating tasks, extract the title and description from the user's message
- When listing tasks, present them in a clear, readable format
- When completing or deleting tasks, confirm the action was successful
- If a user's intent is unclear, ask clarifying questions
- Be concise but friendly in your responses

Examples:
- User: "Add a task to buy groceries"
  -> Use add_task with title="Buy groceries"
  -> Respond: "I've added 'Buy groceries' to your task list."

- User: "Show me my tasks"
  -> Use list_tasks
  -> Respond with a formatted list of tasks

- User: "Mark task 3 as done"
  -> Use complete_task with task_id=3
  -> Respond: "Great! I've marked task 3 as complete."

- User: "Delete the grocery task"
  -> First use list_tasks to find the task, then use delete_task
  -> Respond: "I've deleted the grocery task from your list."
"""
