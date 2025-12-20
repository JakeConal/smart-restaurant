import axios from 'axios';
import type { Table, CreateTableDto, UpdateTableDto, TableFilters, QRCodeData } from '@/types/table';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Table CRUD Operations
export const tableApi = {
  // Get all tables with optional filters
  getAll: async (filters?: TableFilters): Promise<Table[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const response = await apiClient.get(`/api/admin/tables?${params.toString()}`);
    return response.data;
  },

  // Get single table by ID
  getById: async (id: string): Promise<Table> => {
    const response = await apiClient.get(`/api/admin/tables/${id}`);
    return response.data;
  },

  // Create new table
  create: async (data: CreateTableDto): Promise<Table> => {
    const response = await apiClient.post('/api/admin/tables', data);
    return response.data;
  },

  // Update table
  update: async (id: string, data: UpdateTableDto): Promise<Table> => {
    const response = await apiClient.put(`/api/admin/tables/${id}`, data);
    return response.data;
  },

  // Update table status
  updateStatus: async (id: string, status: 'active' | 'inactive'): Promise<Table> => {
    const response = await apiClient.patch(`/api/admin/tables/${id}/status`, { status });
    return response.data;
  },

  // Delete table
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/tables/${id}`);
  },
};

// QR Code Operations
export const qrApi = {
  // Generate/Regenerate QR code for a table
  generate: async (tableId: string): Promise<QRCodeData> => {
    const response = await apiClient.post(`/api/admin/tables/${tableId}/qr/generate`);
    return response.data;
  },

  // Regenerate QR code
  regenerate: async (tableId: string): Promise<QRCodeData> => {
    const response = await apiClient.post(`/api/admin/tables/${tableId}/qr/regenerate`);
    return response.data;
  },

  // Bulk regenerate all active tables
  regenerateAll: async (): Promise<{ count: number; tables: Table[] }> => {
    const response = await apiClient.post('/api/admin/tables/qr/regenerate-all');
    return response.data;
  },

  // Download QR code as PNG
  downloadPNG: async (tableId: string): Promise<Blob> => {
    const response = await apiClient.get(`/api/admin/tables/${tableId}/qr/download?format=png`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Download QR code as PDF
  downloadPDF: async (tableId: string): Promise<Blob> => {
    const response = await apiClient.get(`/api/admin/tables/${tableId}/qr/download?format=pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Download all QR codes as ZIP
  downloadAllZIP: async (): Promise<Blob> => {
    const response = await apiClient.get('/api/admin/tables/qr/download-all?format=zip', {
      responseType: 'blob',
    });
    return response.data;
  },

  // Download all QR codes as PDF
  downloadAllPDF: async (): Promise<Blob> => {
    const response = await apiClient.get('/api/admin/tables/qr/download-all?format=pdf', {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Helper function to download blob as file
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
