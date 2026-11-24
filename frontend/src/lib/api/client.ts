import createClient from "openapi-fetch";
// Note: schema.d.ts is generated from Django Ninja OpenAPI schema via `npx openapi-typescript http://localhost:8000/api/openapi.json -o src/lib/api/schema.d.ts`
import type { paths } from "./schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: "include", // Sends httpOnly cookies for session auth
  headers: {
    "Content-Type": "application/json",
  },
});
