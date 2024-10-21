export const config = {
  API_URL:
    process.env.VERCEL_ENV === "production"
      ? "https://todo-app-server-3jo80m8xf-bmricardas-projects.vercel.app"
      : "http://localhost:8000",
};
