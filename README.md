
# Address Similarity Checker

This project uses Google's Gemini AI to compare two addresses and determine if they refer to the same location. It returns a **match status (true/false)** and a **confidence score (0-100)** indicating how similar the addresses are.

## 🚀 Features

- **Direct Match Detection:** If addresses are exactly the same, it returns `match: true, confidence: 100`.
- **Smart Address Comparison:** Uses AI to handle minor differences like abbreviations, missing words, or different formats.
- **Neighborhood-Level Analysis:** Can determine if two addresses are close to each other (same area but different exact locations).
- **Optimized for Efficiency:** If the addresses are identical, it skips the AI call to save resources.

---

## 📌 How It Works

1. **Standardizes Addresses:** Converts both addresses to lowercase and trims extra spaces.
2. **Direct Match Check:** If both addresses are the same, it returns `{ "match": true, "confidence": 100 }` immediately.
3. **AI-Based Comparison:** If addresses differ, it uses **Google's Gemini AI** to analyze their similarity based on:
   - Identical addresses → **`confidence: 100`**
   - Minor differences (abbreviations, formatting) → **`confidence: 90-99`**
   - Nearby locations (same neighborhood) → **`confidence: 70-89`**
   - Different cities → **`confidence: 90-100`**
4. **Returns a JSON Response:** AI generates a structured response with `match` and `confidence`.

---

## 🔥 API Usage

### **📌 Endpoint:**  
`POST /api/compare-addresses`

### **👥 Request Body (JSON)**
```json
{
  "address1": "Connaught Place, Delhi",
  "address2": "Rajiv Chowk Metro, Delhi"
}
```

### **📤 Response Example**
```json
{
  "match": false,
  "confidence": 75
}
```

### **Other Examples**

| Address 1 | Address 2 | Match | Confidence |
|-----------|----------|--------|------------|
| "1600 Amphitheatre Parkway, Mountain View, CA" | "Googleplex, 1600 Amphitheatre Pkwy, Mountain View, CA" | `true` | `95-99` |
| "Connaught Place, Delhi" | "Rajiv Chowk Metro, Delhi" | `false` | `75-85` |
| "450 Serra Mall, Stanford, CA" | "250 Hamilton Ave, Palo Alto, CA" | `false` | `90-100` |

---

## 📊 How Confidence is Calculated

| Confidence Score | Meaning |
|-----------------|---------|
| **100** | Addresses are **identical**. |
| **90-99** | Addresses refer to the **same place with slight differences** (e.g., abbreviations, missing words). |
| **70-89** | Addresses are in the **same area/neighborhood** but not exactly the same location. |
| **90-100** | Addresses are **in different cities or far apart**. |

---






















## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
