import React from "react"
import ReactDOM from "react-dom/client"
import { ConfirmProvider, useConfirm } from "./index"

const App = () => {
  const confirm = useConfirm()

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete file?",
      message: "Are you sure you want to delete this file? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "#dc2626",
    })

    if (ok) {
      //deletion logic + dialog closed
    } else {
      //dialog closed
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={handleDelete} style={{ padding: "0.75rem 1.5rem", fontSize: "1rem",fontFamily:'sans-serif' }}>
        Delete File
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfirmProvider>
    <App />
  </ConfirmProvider>
)
