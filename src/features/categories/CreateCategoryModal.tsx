import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import Alert from "../../components/ui/Alert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeCreateModal,
  createCategoryThunk,
  fetchCategoriesThunk,
} from "./categoriesSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload } from "react-icons/fi";
import "../../styles/features/CreateCategoryModal.css";

const IconUpload = FiUpload as any;

const schema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  description: z
    .string()
    .min(1, "Descripción requerida")
    .max(200, "Máximo 200 caracteres"),
  color_hex: z.string().min(1, "Color requerido"),
  active: z.boolean().default(true),
  file: z.any().refine((val) => val && val.length > 0, "Icono requerido"),
});

type FormValues = z.infer<typeof schema>;

export default function CreateCategoryModal() {
  const dispatch = useAppDispatch();
  const { isCreateModalOpen, creating, error, pageNumber, pageSize, search } =
    useAppSelector((s) => s.categories);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { active: true, name: "", description: "", color_hex: "" },
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isCreateModalOpen) {
      reset({ name: "", description: "", color_hex: "", active: true });
      setSuccessMessage(null);
    }
  }, [isCreateModalOpen, reset]);

  const colorHex = watch("color_hex");
  const descriptionValue = watch("description");

  const onClose = () => dispatch(closeCreateModal());

  const onSubmit = async (values: FormValues) => {
    setSuccessMessage(null);
    const payload = {
      name: values.name,
      description: values.description,
      color_hex: values.color_hex || undefined,
      status: values.active ? 1 : 0,
      file: values.file && values.file[0] ? values.file[0] : undefined,
    } as const;

    const result = await dispatch(createCategoryThunk(payload));
    if (createCategoryThunk.fulfilled.match(result)) {
      dispatch(fetchCategoriesThunk({ pageNumber, pageSize, search }));
      setSuccessMessage("¡Categoría creada exitosamente!");
    }
  };

  return (
    <Modal open={isCreateModalOpen} title="Crear categoría" onClose={onClose}>
      {error ? <Alert message={error} /> : null}
      {successMessage ? (
        <Alert message={successMessage} type="success" />
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
        <div className="form-group">
          <label className="form-label">Nombre de la categoría*</label>
          <input
            className="input-field"
            placeholder="Escribe el nombre de la buena acción"
            {...register("name")}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Descripción de la buena acción*</label>
          <textarea
            className="textarea-field"
            rows={4}
            placeholder="Escribe aquí..."
            {...register("description")}
            maxLength={200}
          />
          <div className="char-counter">
            {descriptionValue?.length || 0}/200 caracteres
          </div>
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Color de la categoría*</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              className="color-picker"
              value={colorHex || "#000000"}
              onChange={(e) =>
                setValue("color_hex", e.target.value, { shouldValidate: true })
              }
            />
            <input
              type="text"
              className="input-field"
              placeholder="#000000"
              {...register("color_hex")}
            />
          </div>
          {errors.color_hex && (
            <span className="error-message">{errors.color_hex.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Icono / Imagen*</label>
          <div className="file-upload-box">
            <input
              type="file"
              id="icon-upload"
              accept=".svg, .png, .jpg, .jpeg, .webp"
              {...register("file")}
              hidden
            />
            <label htmlFor="icon-upload" className="upload-label">
              <IconUpload size={24} />
              <span>Subir archivo</span>
            </label>
            {watch("file") && watch("file")[0] && (
              <span className="file-name">{watch("file")[0].name}</span>
            )}
          </div>
          {errors.file && (
            // @ts-ignore
            <span className="error-message">{errors.file.message}</span>
          )}
        </div>

        <div className="form-group">
          <div className="switch-container">
            <label className="switch">
              <input type="checkbox" {...register("active")} />
              <span className="slider"></span>
            </label>
            <span className="switch-label-text">Activo</span>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={creating}
            className="btn-submit"
            style={{
              backgroundColor: isValid ? "#1e1b4d" : "#d1d5db",
              color: isValid ? "#ffffff" : "#ffffff",
              cursor: isValid ? "pointer" : "not-allowed",
              opacity: creating ? 0.7 : 1,
            }}
          >
            {creating ? "Creando..." : "Crear"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
