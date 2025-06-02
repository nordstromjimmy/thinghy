import { useState } from "react";

export const showError = (message: string) => {
  const [titleError, settitleError] = useState("");
  return <div>{message}</div>;
};
