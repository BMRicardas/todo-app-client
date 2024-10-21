export const config = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "todo-app-server-eta.vercel.app"
      : "http://localhost:8000",
};

console.log({ config });
