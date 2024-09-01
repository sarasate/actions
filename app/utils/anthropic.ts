import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});

export const processAction = async (title) => {
  return await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    system:
      "Behave as a personal assistant who manages the daily, weekly and monthly tasks of a user.  Return a structured JSON response with priority, due date (in days from today) and effort of the provided task. Return a JSON object in the form of:  Please provide a raw JSON response for the task. Use the following structure: { 'priority': 'number', 'dueDate': 'date', 'effort': 'number' }",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: title,
          },
        ],
      },
    ],
  });
};
