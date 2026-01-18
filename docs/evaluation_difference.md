# JavaScript Quirks: The `{} + []` Discrepancy

In JavaScript, the same snippet of code can return two completely different types depending on the environment's **Parser State**.

---

## ⚡️ The Summary Table

| Input | Environment | Interpretation | Result |
| :--- | :--- | :--- | :--- |
| `{} + []` | **Node.js REPL** | Expression + Expression | `"[object Object]"` |
| `{} + []` | **Chrome Console** | Statement + Unary Plus | `0` |

---

## 🔍 Why it Happens

### 1. The "Object" Path (Node.js)
Node.js often wraps your input in parentheses internally or evaluates it as a single expression.
* `{}` is seen as an **Object Literal**.
* `+` is seen as **Addition**.
* `[]` is seen as an **Array Literal**.

**The Logic:**
1. Both sides are converted to primitives.
2. `String({})` → `"[object Object]"`
3. `String([])` → `""`
4. Result: `"[object Object]""`

### 2. The "Block" Path (Browser DevTools)
Chrome’s console interprets the first `{` at the start of a line as the beginning of a **Code Block**.
* `{}` is seen as an **Empty Block** (does nothing).
* The parser finishes that statement and moves to the next part: `+ []`.
* `+` is now a **Unary Plus operator** (coerces value to a Number).

**The Logic:**
1. The block `{}` is ignored.
2. The expression `+[]` is evaluated.
3. `Number([])` → `0`
4. Result: `0`

