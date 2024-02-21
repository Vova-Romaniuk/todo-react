import axios, { AxiosInstance } from "axios";

interface ApiClientConfig {
	baseURL: string;
	responseType: "json";
}

export const apiClient: AxiosInstance = axios.create({
	baseURL: "",
	responseType: "json",
} as ApiClientConfig);
