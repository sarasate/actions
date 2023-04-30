export const prompt = (text: string) =>
  `create a task with due date (in the future from today), priority and output a JSON string for: ${text}. The result should be in this form: {"name":"string", "dueDate": "date", "priority": number, "duration": number (in minutes), |tags": ["string"]}. Tags should be in the same language as the text and nouns are preferred. Priority should be a number between 0 and 3. Todays date is ${new Date()}. The name should a summary of the task and ideally have a length of 2-3 words.`;
