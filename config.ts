export const config = {
  // Use environment variable in production, localhost in development
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://todo-app-server-3jo80m8xf-bmricardas-projects.vercel.app"
      : "http://localhost:8000",
};
