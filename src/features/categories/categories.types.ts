export type CategoryStatus = 1 | 0;

export type Category = {
  id: string;
  name: string;
  description: string;
  status: CategoryStatus;
  image?: string;
  createdAt: string;
};

export type CategoryListParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
};

export type CategoryListResponse = {
  items: Category[];
  total: number;
  pageNumber: number;
  pageSize: number;
};

export type CreateCategoryPayload = {
  name: string;
  description: string;
  status: CategoryStatus;
  color_hex?: string;
  file?: File;
};
