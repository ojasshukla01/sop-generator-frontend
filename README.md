# 🖥️ SOP Generator Frontend

This is the frontend application for the SOP Generator, designed to provide users with an intuitive interface to generate personalized Statements of Purpose (SOPs). Built with React and Vite, it seamlessly integrates with the backend API to deliver a smooth user experience.

## 🌟 Features

- Responsive and user-friendly interface
- Form inputs for collecting user details
- Integration with backend API for SOP generation
- Real-time feedback and loading indicators
- Styled using Tailwind CSS for rapid UI development

## 🛠️ Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Package Manager:** npm

## 📁 Project Structure

```
sop-generator-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── FormComponent.jsx
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ojasshukla01/sop-generator-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd sop-generator-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173/`.

## 🔗 Backend Integration

Ensure the backend API is running and accessible. The frontend communicates with the backend to fetch generated SOPs based on user input. Update the API endpoint in the frontend code if necessary.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ojas Shukla**  
Data Engineer | Cloud-Native Enthusiast | FastAPI Specialist  
[LinkedIn](https://linkedin.com/in/ojasshukla01) · [GitHub](https://github.com/ojasshukla01)
