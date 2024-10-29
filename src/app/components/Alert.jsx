// components/Alert.js
import { useState, useEffect } from "react";

export default function Alert({
  type = "primary",
  message,
  autoDismiss = false,
  duration = 3000,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, duration]);

  if (!visible) return null;

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={() => setVisible(false)}
        aria-label="Close"
      ></button>
    </div>
  );
}
