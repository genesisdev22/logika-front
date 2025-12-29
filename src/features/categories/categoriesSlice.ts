import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoriesService } from "../../api/services/categories.service";
import { getApiErrorMessage } from "../../utils/error";
import type { Category, CreateCategoryPayload } from "./categories.types";

type CategoriesState = {
  status: "idle" | "loading" | "error";
  items: Category[];
  total: number;

  pageNumber: number;
  pageSize: number;
  search: string;

  creating: boolean;
  error?: string;

  isCreateModalOpen: boolean;

  sortColumn?: string;
  sortDirection: "asc" | "desc";
};

const initialState: CategoriesState = {
  status: "idle",
  items: [],
  total: 0,
  pageNumber: 1,
  pageSize: 10,
  search: "",
  creating: false,
  isCreateModalOpen: false,
  sortDirection: "asc",
};

export const fetchCategoriesThunk = createAsyncThunk(
  "categories/list",
  async (
    params: { pageNumber: number; pageSize: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await categoriesService.list(params);
      return { ...res, ...params };
    } catch (e: any) {
      return rejectWithValue(
        getApiErrorMessage(e, "No se pudo cargar el listado de categorías.")
      );
    }
  }
);

export const createCategoryThunk = createAsyncThunk(
  "categories/create",
  async (payload: CreateCategoryPayload, { rejectWithValue }) => {
    try {
      const res = await categoriesService.create(payload);
      return res;
    } catch (e: any) {
      return rejectWithValue(
        getApiErrorMessage(e, "No se pudo crear la categoría.")
      );
    }
  }
);

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setPage: (s, a: PayloadAction<number>) => {
      s.pageNumber = a.payload;
    },
    setPageSize: (s, a: PayloadAction<number>) => {
      s.pageSize = a.payload;
      s.pageNumber = 1;
    },
    setSearch: (s, a: PayloadAction<string>) => {
      s.search = a.payload;
      s.pageNumber = 1;
    },
    openCreateModal: (s) => {
      s.isCreateModalOpen = true;
      s.error = undefined;
    },
    closeCreateModal: (s) => {
      s.isCreateModalOpen = false;
      s.error = undefined;
    },
    setSort: (
      s,
      a: PayloadAction<{ column: string; direction: "asc" | "desc" }>
    ) => {
      s.sortColumn = a.payload.column;
      s.sortDirection = a.payload.direction;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchCategoriesThunk.pending, (s) => {
      s.status = "loading";
      s.error = undefined;
    });
    b.addCase(fetchCategoriesThunk.fulfilled, (s, a) => {
      s.status = "idle";
      s.items = a.payload.items;
      s.total = a.payload.total;
      s.pageNumber = a.payload.pageNumber;
      s.pageSize = a.payload.pageSize;
      s.search = a.payload.search ?? s.search;
    });
    b.addCase(fetchCategoriesThunk.rejected, (s, a) => {
      s.status = "error";
      s.error = (a.payload as string) ?? "Error inesperado";
    });

    b.addCase(createCategoryThunk.pending, (s) => {
      s.creating = true;
      s.error = undefined;
    });
    b.addCase(createCategoryThunk.fulfilled, (s) => {
      s.creating = false;
      s.isCreateModalOpen = false;
    });
    b.addCase(createCategoryThunk.rejected, (s, a) => {
      s.creating = false;
      s.error = (a.payload as string) ?? "Error inesperado";
    });
  },
});

export const {
  setPage,
  setPageSize,
  setSearch,
  openCreateModal,
  closeCreateModal,
  setSort,
} = slice.actions;

export default slice.reducer;
