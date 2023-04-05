export default () => ({
  server: { port: process.env.PORT || 8080 },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});
