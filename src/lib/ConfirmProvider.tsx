// src/lib/ConfirmProvider.tsx
import React, { createContext, useContext, useRef, useState, ReactNode } from "react"
import { createPortal } from "react-dom"

type ConfirmOptions = {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmColor?: string
}

type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>

export const ConfirmContext = createContext<ConfirmFunction | null>(null)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const resolver = useRef<(value: boolean) => void>()

  const confirm: ConfirmFunction = (opts) => {
    setOptions(opts)
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve
    })
  }

  const close = (result: boolean) => {
    setOptions(null)
    resolver.current?.(result)
  }

  // Modal styles (inline)
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  }

  const dialogStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    maxWidth: "400px",
    width: "90%",
    fontFamily:"sans-serif"
  }

  const buttonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  }

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#e0e0e0",
    color: "#333",
    marginRight: "0.5rem",
  }

  const confirmButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: options?.confirmColor || "#2563eb", // blue default
    color: "white",
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {options &&
        createPortal(
          <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message">
            <div style={dialogStyle}>
              <h2 id="confirm-title" style={{ marginBottom: "1rem" }}>
                {options.title || "Confirm"}
              </h2>
              <p id="confirm-message" style={{ marginBottom: "1.5rem" }}>
                {options.message}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={cancelButtonStyle} onClick={() => close(false)}>
                  {options.cancelText || "Cancel"}
                </button>
                <button style={confirmButtonStyle} onClick={() => close(true)}>
                  {options.confirmText || "OK"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext)
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider")
  }
  return context
}
