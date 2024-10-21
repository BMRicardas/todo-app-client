export const config = {
  API_URL:
    process.env.VERCEL_ENV === "production"
      ? "https://todo-app-server-6mz5sr6zn-bmricardas-projects.vercel.app/"
      : "http://localhost:8000",
};

console.log({ config });
