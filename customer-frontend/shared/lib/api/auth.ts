import { apiClient } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
}

export class AuthApi {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/customer/login", data);
    return response.data;
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/customer/signup", data);
    return response.data;
  }

  async googleLogin(queryParams?: URLSearchParams): Promise<void> {
    const params = queryParams ? `?${queryParams.toString()}` : "";
    window.location.href = `${apiClient.defaults.baseURL}/auth/customer/google${params}`;
  }

  async forgotPassword(
    data: ForgotPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await apiClient.post(
      "/auth/customer/forgot-password",
      data,
    );
    return response.data;
  }

  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<{ message: string }> {
    const response = await apiClient.post(
      "/auth/customer/reset-password",
      data,
    );
    return response.data;
  }
}

export const authApi = new AuthApi();
