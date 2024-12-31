import { useState } from "react";

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: object | string;
  requireBasicAuth?: boolean; 
}

interface ApiResponse<T> {
  status: number;
  data: T;
  error?: string;
}

const BASE_URL = import.meta.env.VITE_BACK_BASE_URL;
const USERNAME = import.meta.env.VITE_API_USERNAME;
const PASSWORD = import.meta.env.VITE_API_PASSWORD;

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiRequest = async <T>(
    options: RequestOptions
  ): Promise<ApiResponse<T>> => {
    const { method, path, body, requireBasicAuth = true } = options;
    setLoading(true);
    setError(null);

    let authHeader = null;
    if (requireBasicAuth) {
      if (!USERNAME || !PASSWORD) {
        setLoading(false);
        setError("Credentials not found");
        return { status: 401, data: {} as T, error: "Credentials not found" };
      }
      const credentials = btoa(`${USERNAME}:${PASSWORD}`);
      authHeader = `Basic ${credentials}`;
    }

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (authHeader) {
        headers.Authorization = authHeader;
      }

      const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const status = response.status;

      let data: T = {} as T;

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          data = (await response.json()) as T;
        } else {
          data = (await response.text()) as unknown as T;
        }
      } else {
        const errorData = await response.json();
        return { status, data, error: errorData.message || "Error occurred" };
      }

      return { status, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      return { status: 500, data: {} as T, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { apiRequest, loading, error };
};
