import { AnyFieldApi } from "@tanstack/react-form-nextjs";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  const errors = field.state.meta.errors.flatMap((error) => error?.message);
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <span className="text-xs text-red-600">{errors.join(",")}</span>
      ) : null}
    </>
  );
}
