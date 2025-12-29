import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiLink,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiArrowUp,
  FiArrowDown,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { BsArrowDownUp } from "react-icons/bs";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import CreateCategoryModal from "../features/categories/CreateCategoryModal";
import { useCategories } from "../hooks/useCategories";
import "../styles/pages/CategoriesPage.css";

const IconSearch = FiSearch as any;
const IconFilter = FiFilter as any;
const IconEdit = FiEdit2 as any;
const IconTrash = FiTrash2 as any;
const IconLink = FiLink as any;
const IconChevronLeft = FiChevronLeft as any;
const IconChevronRight = FiChevronRight as any;
const IconUser = FiUser as any;
const IconSort = BsArrowDownUp as any;
const IconArrowUp = FiArrowUp as any;
const IconArrowDown = FiArrowDown as any;
const IconChevronsLeft = FiChevronsLeft as any;
const IconChevronsRight = FiChevronsRight as any;

export default function CategoriesPage() {
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
  } = useCategories();

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column)
      return <IconSort size={14} style={{ opacity: 0.3 }} />;
    return sortDirection === "asc" ? (
      <IconArrowUp size={14} />
    ) : (
      <IconArrowDown size={14} />
    );
  };

  return (
    <div className="categories-container">
      <h1 className="page-title">Categorias</h1>

      <div className="tabs-container">
        <div className="tab active">Categorias</div>
        <div className="tab">Tipos</div>
        <div className="tab">Evidencias</div>
      </div>

      <div className="controls-container">
        <div className="search-filter-wrapper">
          <div className="search-box">
            <IconSearch className="search-icon" size={18} />
            <input
              className="search-input"
              placeholder="Buscar"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <IconFilter size={18} />
            Filtros
          </button>
        </div>

        <button className="create-button" onClick={openCreate}>
          Crear tipo de categoría
        </button>
      </div>

      {error ? <Alert message={error} /> : null}

      <div className="table-container">
        {status === "loading" && (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <Loader />
          </div>
        )}

        {status !== "loading" && (
          <>
            <table className="custom-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}>
                    <div className="th-content">
                      Nombre de la categoria
                      {renderSortIcon("name")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("image")}>
                    <div className="th-content">
                      Icono de la categoria
                      {renderSortIcon("image")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    <div className="th-content">
                      Estado
                      {renderSortIcon("status")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("description")}>
                    <div className="th-content">
                      Descripción
                      {renderSortIcon("description")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("createdAt")}>
                    <div className="th-content">
                      Fecha de creación
                      {renderSortIcon("createdAt")}
                    </div>
                  </th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      No hay categorías disponibles.
                    </td>
                  </tr>
                ) : (
                  items.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 500 }}>{c.name}</td>
                      <td>
                        <div className="icon-placeholder">
                          {c.image ? (
                            <img
                              src={c.image}
                              alt="icon"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                cursor: "pointer",
                              }}
                              onClick={() => setPreviewImage(c.image!)}
                            />
                          ) : (
                            <IconUser size={16} />
                          )}
                        </div>
                      </td>
                      <td style={{ padding: 10 }}>
                        <span
                          className={`status-badge ${c.status === 1 ? "status-active" : "status-inactive"}`}
                        >
                          {c.status === 1 ? "Activo" : "Inactivo"}
                        </span>
                      </td>

                      <td>
                        <div className="description-cell">
                          {c.description || "-"}
                        </div>
                      </td>
                      <td>
                        {new Date(c.createdAt || Date.now())
                          .toLocaleDateString("es-ES", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="action-btn" title="Editar">
                            <IconEdit size={18} />
                          </button>
                          <button className="action-btn" title="Eliminar">
                            <IconTrash size={18} />
                          </button>
                          <button className="action-btn" title="Ver">
                            <IconLink size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="table-footer">
              <div className="footer-left">
                <span>Resultados por página</span>
                <select
                  className="page-size-select"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="footer-right">
                <span>
                  {total === 0 ? 0 : (pageNumber - 1) * pageSize + 1} -{" "}
                  {Math.min(pageNumber * pageSize, total)} de {total}
                </span>
                <div className="pagination-controls">
                  <button
                    className="pagination-btn"
                    onClick={toFirstPage}
                    disabled={isFirstPage}
                  >
                    <IconChevronsLeft />
                  </button>
                  <button
                    className="pagination-btn"
                    onClick={onPrev}
                    disabled={isFirstPage}
                  >
                    <IconChevronLeft />
                  </button>
                  <button
                    className="pagination-btn"
                    onClick={onNext}
                    disabled={isLastPage}
                  >
                    <IconChevronRight />
                  </button>
                  <button
                    className="pagination-btn"
                    onClick={toLastPage}
                    disabled={isLastPage}
                  >
                    <IconChevronsRight />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <CreateCategoryModal />

      {previewImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxHeight: "80vh",
              maxWidth: "80vw",
              borderRadius: 8,
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      )}
    </div>
  );
}
