# 📘 react-use-confirming-dialog

A simple, promise-based React confirmation dialog hook — no dependencies, fully accessible, customizable, and easy to use.

---

## 🌌 Features

- Use like native `window.confirm()`, but better UX and accessibility  
- Promise-based: easily `await` the user response  
- Customizable title, message, button text, and colors  
- No UI dependencies — pure React + inline styles  
- Renders as a modal overlay using React portal

---


## Screenshots

![App Screenshot](https://github.com/MohamedKhalilHermassi/use-confirm-dialog/blob/main/assets/screenshots/screenshot_1.png)



## 🔧 Installation

```bash
npm install react-use-confirming-dialog
# or
yarn add react-use-confirming-dialog
```
## 🎲 Usage
Wrap your app with `ConfirmProvider` once:
```bash
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfirmProvider } from 'react-use-confirming-dialog'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfirmProvider>
    <App />
  </ConfirmProvider>
)
```
Then use the useConfirm hook anywhere inside your app:
in this newer version you can add your preffered font to each element in the dialog as shown in the code below:
```bash
import { useConfirm } from 'react-use-confirming-dialog'

export function DeleteButton() {
  const confirm = useConfirm()

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete file?",
      message: "Are you sure you want to delete this file? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "#dc2626",
      confirmTextFont: "monospace", // change with the font of your choice
      cancelTextFont: "monospace",
      dialogTextFont :"monospace"
    })


    if (ok) {
      // deletion logic + dialog closed
    } else {
      // dialog closed
    }
  }

  return <button onClick={handleDelete}>Delete File</button>
}


```

## 👾 API 

| Option | Type     | Default                |Description
| :-------- | :------- | :------------------------- |:--------|
| `title` | `string` | `"Confirm"` |Dialog title|
|`message`|`string`|**Required**|Confirmation message body |
|`confirmText`|`string`|`"OK"`|Text for confirm button|
|`cancelText`|`string`|`"Cancel"`|Text for cancel button|
|`confirmColor`|`string`|`#2563eb`|Background color of confirm button (CSS value)|

## 🔮 Live Demo
 - [CodeSandBox ](https://codesandbox.io/p/sandbox/drpnm8)

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
© Mohamed Khalil Hermassi

## 🃏 Contributing

Pull requests and issues are welcome!


## 👑 Badges


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## ☕  Buy me a coffee

If you find this package helpful and want to support its development, you can [buy me a coffee](https://buymeacoffee.com/mohamedkhalilhermassi)! Your support motivates me to keep improving and maintaining this project.
