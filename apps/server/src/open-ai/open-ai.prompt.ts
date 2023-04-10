export const prompt = (text: string) =>
  `create a task with due date (in the future from today), priority and output a JSON string for: ${text}. The result should be in this form: {"name":"string", "dueDate": "date", "priority": number, |tags": ["string"]}. Tags should be in the same language as the text. Priority should be a number between 0 and 3 or 'null'. Due date should be in the future from today.`;