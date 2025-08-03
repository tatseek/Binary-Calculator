# 🧮 Binary Calculator

A simple and elegant **Binary Calculator** built using **HTML**, **CSS**, and **JavaScript**. It allows users to perform basic arithmetic operations — **Addition, Subtraction, Multiplication**, and **Division** — on binary numbers with instant results.

---

## 🚀 Features

- 🔢 **Input binary numbers only** (0s and 1s)
- ➕ ➖ ✖️ ➗ Supports basic operations: `+`, `−`, `×`, `÷`
- 📟 Displays both the **binary expression** and the **binary result**
- 🚫 Prevents invalid input (e.g., decimal digits, symbols)
- 💡 Built using **pure HTML, CSS, and JavaScript** (no libraries)

---

## 📁 File Structure

```
📂 binary-calculator/
├── index.html        # Main calculator UI
├── style.css         # Styles for layout and design
├── script.js         # JavaScript logic
├── README.md         # This file
```

---

## 🛠️ How to Use

1. **Clone or download** this repository.
2. Open `Binary_Calculator.html` in any modern web browser.
3. Enter binary numbers and choose operations to calculate.
4. Result is displayed in **binary format**.

---

## 💻 Technologies Used

- **HTML5** – Structuring calculator interface
- **CSS3** – Styling and responsive layout
- **Vanilla JavaScript** – Handling logic and binary operations

---

## 🧠 How It Works

- Takes binary inputs from two operands
- Converts them to decimal using `parseInt(bin, 2)`
- Performs the operation
- Converts the result back to binary using `.toString(2)`

**Example**:
```
Input:  1010 + 0011
Logic:  10 + 3 = 13
Output: 1101
```

---

## ✅ Validations

- Allows only `0` and `1` for number inputs
- Alerts user on invalid or empty operations
- Disables operations if inputs are incomplete

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and share!

---

## 🙌 Acknowledgments

- Inspired by learning projects and beginner-friendly JavaScript challenges
- Special thanks to online communities and contributors

---

