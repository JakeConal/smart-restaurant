import axios from "axios";
import type {
  Table,
  CreateTableDto,
  UpdateTableDto,
  TableFilters,
  QRCodeData,
} from "@/types/table";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Table CRUD Operations
export const tableApi = {
  // Get all tables with optional filters
  getAll: async (filters?: TableFilters): Promise<Table[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.location) params.append("location", filters.location);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);

    const response = await apiClient.get(
      `/api/admin/tables?${params.toString()}`,
    );
    return response.data;
  },

  // Get single table by ID
  getById: async (id: string): Promise<Table> => {
    const response = await apiClient.get(`/api/admin/tables/${id}`);
    return response.data;
  },

  // Create new table
  create: async (data: CreateTableDto): Promise<Table> => {
    const response = await apiClient.post("/api/admin/tables", data);
    return response.data;
  },

  // Update table
  update: async (id: string, data: UpdateTableDto): Promise<Table> => {
    const response = await apiClient.put(`/api/admin/tables/${id}`, data);
    return response.data;
  },

  // Update table status
  updateStatus: async (
    id: string,
    status: "active" | "inactive",
  ): Promise<Table> => {
    const response = await apiClient.patch(`/api/admin/tables/${id}/status`, {
      status,
    });
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
    const response = await apiClient.post(
      `/api/admin/tables/${tableId}/qr/generate`,
    );
    return response.data;
  },

  // Regenerate QR code
  regenerate: async (tableId: string): Promise<QRCodeData> => {
    const response = await apiClient.post(
      `/api/admin/tables/${tableId}/qr/regenerate`,
    );
    return response.data;
  },

  // Bulk regenerate all active tables
  regenerateAll: async (): Promise<{ count: number; tables: Table[] }> => {
    const response = await apiClient.post(
      "/api/admin/tables/qr/regenerate-all",
    );
    return response.data;
  },

  // Download QR code as PNG
  downloadPNG: async (tableId: string): Promise<Blob> => {
    const response = await apiClient.get(
      `/api/admin/tables/${tableId}/qr/download?format=png`,
      {
        responseType: "blob",
      },
    );
    return response.data;
  },

  // Download QR code as PDF
  downloadPDF: async (tableId: string): Promise<Blob> => {
    const response = await apiClient.get(
      `/api/admin/tables/${tableId}/qr/download?format=pdf`,
      {
        responseType: "blob",
      },
    );
    return response.data;
  },

  // Download all QR codes as ZIP
  downloadAllZIP: async (): Promise<Blob> => {
    const response = await apiClient.get(
      "/api/admin/tables/qr/download-all?format=zip",
      {
        responseType: "blob",
      },
    );
    return response.data;
  },

  // Download all QR codes as PDF
  downloadAllPDF: async (): Promise<Blob> => {
    const response = await apiClient.get(
      "/api/admin/tables/qr/download-all?format=pdf",
      {
        responseType: "blob",
      },
    );
    return response.data;
  },
};

// Helper function to download blob as file
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// ==================== MENU MANAGEMENT API ====================
import type {
  MenuCategory,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
  MenuCategoryFilters,
  MenuItem,
  CreateMenuItemDto,
  UpdateMenuItemDto,
  MenuItemFilters,
  MenuItemPhoto,
  ModifierGroup,
  CreateModifierGroupDto,
  UpdateModifierGroupDto,
  ModifierOption,
  CreateModifierOptionDto,
  UpdateModifierOptionDto,
  AttachModifierGroupDto,
  GuestMenuFilters,
  GuestMenuItem,
  GuestMenuCategory,
} from "@/types/menu";

// Menu Category Operations
export const menuCategoryApi = {
  // Get all categories with optional filters
  getAll: async (filters?: MenuCategoryFilters): Promise<MenuCategory[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);

    const response = await apiClient.get(
      `/api/admin/menu/categories?${params.toString()}`,
    );
    return response.data;
  },

  // Get single category by ID
  getById: async (id: string): Promise<MenuCategory> => {
    const response = await apiClient.get(`/api/admin/menu/categories/${id}`);
    return response.data;
  },

  // Create new category
  create: async (data: CreateMenuCategoryDto): Promise<MenuCategory> => {
    const response = await apiClient.post("/api/admin/menu/categories", data);
    return response.data;
  },

  // Update category
  update: async (
    id: string,
    data: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> => {
    const response = await apiClient.put(
      `/api/admin/menu/categories/${id}`,
      data,
    );
    return response.data;
  },

  // Update category status
  updateStatus: async (
    id: string,
    status: "active" | "inactive",
  ): Promise<MenuCategory> => {
    const response = await apiClient.patch(
      `/api/admin/menu/categories/${id}/status`,
      { status },
    );
    return response.data;
  },

  // Delete category (soft delete)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/menu/categories/${id}`);
  },
};

// Menu Item Operations
export const menuItemApi = {
  // Get all items with filters and pagination
  getAll: async (
    filters?: MenuItemFilters,
  ): Promise<{ items: MenuItem[]; total: number }> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.categoryId) params.append("categoryId", filters.categoryId);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.isChefRecommended !== undefined)
      params.append("chefRecommended", String(filters.isChefRecommended));
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));

    const response = await apiClient.get(
      `/api/admin/menu/items?${params.toString()}`,
    );
    return response.data;
  },

  // Get single item by ID
  getById: async (id: string): Promise<MenuItem> => {
    const response = await apiClient.get(`/api/admin/menu/items/${id}`);
    return response.data;
  },

  // Create new item
  create: async (data: CreateMenuItemDto): Promise<MenuItem> => {
    const response = await apiClient.post("/api/admin/menu/items", data);
    return response.data;
  },

  // Update item
  update: async (id: string, data: UpdateMenuItemDto): Promise<MenuItem> => {
    const response = await apiClient.put(`/api/admin/menu/items/${id}`, data);
    return response.data;
  },

  // Update item status
  updateStatus: async (
    id: string,
    status: "available" | "unavailable" | "sold_out",
  ): Promise<MenuItem> => {
    const response = await apiClient.patch(
      `/api/admin/menu/items/${id}/status`,
      { status },
    );
    return response.data;
  },

  // Delete item (soft delete)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/menu/items/${id}`);
  },
};

// Menu Item Photo Operations
export const menuPhotoApi = {
  // Upload photos for an item
  upload: async (itemId: string, files: File[]): Promise<MenuItemPhoto[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));

    const response = await apiClient.post(
      `/api/admin/menu/items/${itemId}/photos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  // Remove a photo
  delete: async (itemId: string, photoId: string): Promise<void> => {
    await apiClient.delete(`/api/admin/menu/items/${itemId}/photos/${photoId}`);
  },

  // Set primary photo
  setPrimary: async (
    itemId: string,
    photoId: string,
  ): Promise<MenuItemPhoto> => {
    const response = await apiClient.patch(
      `/api/admin/menu/items/${itemId}/photos/${photoId}/primary`,
    );
    return response.data;
  },
};

// Modifier Group Operations
export const modifierGroupApi = {
  // Get all modifier groups
  getAll: async (): Promise<ModifierGroup[]> => {
    const response = await apiClient.get("/api/admin/menu/modifier-groups");
    return response.data;
  },

  // Get single modifier group by ID
  getById: async (id: string): Promise<ModifierGroup> => {
    const response = await apiClient.get(
      `/api/admin/menu/modifier-groups/${id}`,
    );
    return response.data;
  },

  // Create new modifier group
  create: async (data: CreateModifierGroupDto): Promise<ModifierGroup> => {
    const response = await apiClient.post(
      "/api/admin/menu/modifier-groups",
      data,
    );
    return response.data;
  },

  // Update modifier group
  update: async (
    id: string,
    data: UpdateModifierGroupDto,
  ): Promise<ModifierGroup> => {
    const response = await apiClient.put(
      `/api/admin/menu/modifier-groups/${id}`,
      data,
    );
    return response.data;
  },

  // Delete modifier group
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/menu/modifier-groups/${id}`);
  },

  // Create option for a group
  createOption: async (
    groupId: string,
    data: CreateModifierOptionDto,
  ): Promise<ModifierOption> => {
    const response = await apiClient.post(
      `/api/admin/menu/modifier-groups/${groupId}/options`,
      data,
    );
    return response.data;
  },

  // Update option
  updateOption: async (
    optionId: string,
    data: UpdateModifierOptionDto,
  ): Promise<ModifierOption> => {
    const response = await apiClient.put(
      `/api/admin/menu/modifier-options/${optionId}`,
      data,
    );
    return response.data;
  },

  // Delete option
  deleteOption: async (optionId: string): Promise<void> => {
    await apiClient.delete(`/api/admin/menu/modifier-options/${optionId}`);
  },
};

// Menu Item Modifier Group Association
export const menuItemModifierApi = {
  // Attach modifier groups to an item
  attach: async (
    itemId: string,
    data: AttachModifierGroupDto,
  ): Promise<void> => {
    await apiClient.post(
      `/api/admin/menu/items/${itemId}/modifier-groups`,
      data,
    );
  },

  // Get modifier groups for an item
  getForItem: async (itemId: string): Promise<ModifierGroup[]> => {
    const response = await apiClient.get(
      `/api/admin/menu/items/${itemId}/modifier-groups`,
    );
    return response.data;
  },
};

// Guest Menu Operations (Read-only)
export const guestMenuApi = {
  // Get guest menu with filters
  getMenu: async (
    filters?: GuestMenuFilters,
  ): Promise<{ categories: GuestMenuCategory[]; items: GuestMenuItem[] }> => {
    const params = new URLSearchParams();
    if (filters?.q) params.append("q", filters.q);
    if (filters?.categoryId) params.append("categoryId", filters.categoryId);
    if (filters?.chefRecommended !== undefined)
      params.append("chefRecommended", String(filters.chefRecommended));
    if (filters?.sort) params.append("sort", filters.sort);
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));

    const response = await apiClient.get(`/api/menu?${params.toString()}`);
    return response.data;
  },
};
