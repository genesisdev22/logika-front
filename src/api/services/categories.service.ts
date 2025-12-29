import { createHttpClient } from "../http/httpClient";
import { endpoints } from "../http/endpoints";
import { env } from "../../utils/env";
import type {
  CategoryListParams,
  CreateCategoryPayload,
} from "../../features/categories/categories.types";

type RawListResponse = {
  items?: any[];
  data?: any[];
  total?: number;
  totalCount?: number;
} & Record<string, unknown>;

const categoriesClient = createHttpClient({
  baseURL: env.actionsBaseUrl,
  onUnauthorized: () => {
    window.location.href = "/login";
  },
} as any);

function mapCategory(
  raw: any
): import("../../features/categories/categories.types").Category {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    status: raw.status,
    image: raw.icon, // API returns "icon", mapping to "image" property in our type
    createdAt: raw.createdAt,
  };
}

export const categoriesService = {
  list: async (params: CategoryListParams) => {
    const { pageNumber, pageSize, search } = params;

    const { data } = await categoriesClient.get<RawListResponse>(
      endpoints.categoriesAdminList,
      {
        params: {
          pageNumber,
          pageSize,
          search,
          q: search,
          name: search,
          keyword: search,
        },
      }
    );

    console.log("Categories API Response Data:", data);

    const responseBody = data as any;
    const paginationRoot = responseBody.data || {};
    const rawItems = paginationRoot.data || [];

    if (!Array.isArray(rawItems)) {
      console.error("Critical: 'data.data.data' is not an array.", rawItems);
      return { items: [], total: 0 };
    }

    const items = rawItems.map(mapCategory);
    const total = Number(paginationRoot.totalElements ?? items.length);

    return { items, total };
  },

  create: async (payload: CreateCategoryPayload) => {
    // If file exists, use FormData
    if (payload.file) {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("status", String(payload.status));
      if (payload.color_hex) formData.append("color", payload.color_hex);
      formData.append("icon", payload.file);

      const { data } = await categoriesClient.post(
        endpoints.categoriesAdminAdd,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    }

    // Otherwise JSON
    const { data } = await categoriesClient.post(
      endpoints.categoriesAdminAdd,
      payload
    );
    return data;
  },
};
