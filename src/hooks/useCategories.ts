import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchCategoriesThunk,
  openCreateModal,
  setPage,
  setPageSize,
  setSearch,
  setSort,
} from "../features/categories/categoriesSlice";

export function useCategories() {
  const dispatch = useAppDispatch();
  const {
    status,
    items,
    total,
    pageNumber,
    pageSize,
    search,
    error,
    sortColumn,
    sortDirection,
  } = useAppSelector((s) => s.categories);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState(search);
  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== search) {
        dispatch(setSearch(searchTerm));
        dispatch(setPage(1));
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, search, dispatch]);

  useEffect(() => {
    dispatch(fetchCategoriesThunk({ pageNumber, pageSize, search }));
  }, [dispatch, pageNumber, pageSize, search]);

  const onPrev = () => {
    if (pageNumber > 1) dispatch(setPage(pageNumber - 1));
  };

  const onNext = () => {
    const totalPages = Math.ceil(total / pageSize);
    if (pageNumber < totalPages) dispatch(setPage(pageNumber + 1));
  };

  const toFirstPage = () => dispatch(setPage(1));

  const toLastPage = () => {
    const totalPages = Math.ceil(total / pageSize);
    dispatch(setPage(totalPages));
  };

  const handlePageSizeChange = (size: number) => {
    dispatch(setPageSize(size));
  };

  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const sortedItems = useMemo(() => {
    let processed = safeItems;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      processed = processed.filter(
        (i) =>
          i.name.toLowerCase().includes(lower) ||
          (i.description && i.description.toLowerCase().includes(lower))
      );
    }

    if (!sortColumn) return processed;

    return [...processed].sort((a, b) => {
      let valA = (a as any)[sortColumn];
      let valB = (b as any)[sortColumn];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [safeItems, sortColumn, sortDirection, searchTerm]);

  const handleSort = (column: string) => {
    const isSameColumn = sortColumn === column;
    const newDirection =
      isSameColumn && sortDirection === "asc" ? "desc" : "asc";
    dispatch(setSort({ column, direction: newDirection }));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const openCreate = () => dispatch(openCreateModal());

  const isFirstPage = pageNumber <= 1;
  const isLastPage =
    safeItems.length < pageSize && pageNumber * pageSize >= total;

  return {
    status,
    items: sortedItems,
    total,
    pageNumber,
    pageSize,
    search: searchTerm,
    error,
    sortColumn,
    sortDirection,
    previewImage,

    setPreviewImage,
    handleSearch,
    handleSort,

    openCreate,

    onPrev,
    onNext,
    toFirstPage,
    toLastPage,
    handlePageSizeChange,
    isFirstPage,
    isLastPage,
  };
}
