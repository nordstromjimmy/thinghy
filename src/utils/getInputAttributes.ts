export function getInputAttributes(fieldType: string): {
  type: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
} {
  switch (fieldType) {
    case "email":
      return { type: "email", inputMode: "email" };
    case "phone":
      return { type: "tel", inputMode: "tel" };
    case "number":
    case "currency":
    case "rating":
    case "location":
      return { type: "url", inputMode: "url" };
    case "duration":
      return { type: "text", inputMode: "text" };
    case "url":
      return { type: "url", inputMode: "url" };
    case "date":
      return { type: "date" };
    case "datetime":
      return { type: "datetime-local" };
    case "color":
      return { type: "color" };
    case "password":
      return { type: "password" };
    default:
      return { type: "text", inputMode: "text" };
  }
}
