import { useAuth } from "@clerk/clerk-react";

class SecurityClient {
	constructor(auth) {
		this.baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
		this.auth = auth;

		// Default headers
		this.defaultHeaders = {
			"Content-Type": "application/json",
		};
	}

	// Method to get auth credentials from Clerk session
	async getAuthCredentials() {
		try {
			if (!this.auth) throw new Error("Authentication not initialized");

			const token = await this.auth.getToken();
			const userId = this.auth.userId;

			if (!token || !userId) throw new Error("Missing authentication details");

			return {
				token: `Bearer ${token}`,
				userId,
			};
		} catch (error) {
			console.error("Error getting auth credentials:", error);
			throw new Error("Authentication failed");
		}
	}

	// Generic fetch method
	async fetchRequest(method, path, body = null) {
		try {
			const { token, userId } = await this.getAuthCredentials();

			const config = {
				method,
				headers: {
					...this.defaultHeaders,
					Authorization: token,
					"X-User-Id": userId,
				},
			};

			if (body) {
				config.body = JSON.stringify(body);
			}

			const response = await fetch(`${this.baseUrl}${path}`, config);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			// Return null for 204 No Content
			if (response.status === 204) return null;

			return await response.json();
		} catch (error) {
			console.error(`Error in ${method} ${path} request:`, error);
			throw error;
		}
	}

	// GET request
	async get(path) {
		return this.fetchRequest("GET", path);
	}

	// POST request
	async post(path, body) {
		return this.fetchRequest("POST", path, body);
	}

	// PUT request
	async put(path, body) {
		return this.fetchRequest("PUT", path, body);
	}

	// DELETE request
	async delete(path, body = null) {
		return this.fetchRequest("DELETE", path, body);
	}

	// PATCH request (optional)
	async patch(path, body) {
		return this.fetchRequest("PATCH", path, body);
	}
}

export function useRestSecurityClient() {
	const auth = useAuth();
	return new SecurityClient(auth);
}
