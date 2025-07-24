# 🚀 Basic Flow Builder UI

This project is a simple yet extensible Flow Builder built with Reactflow. It allows users to create chatbot flows by connecting different message nodes. The application supports drag-and-drop functionality, node connections, and real-time editing of message content.  

<img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" /> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> 


## 🌟 UI/UX Features

### **1. Text Node**  
- Supports **Text Message** nodes (extensible for future node types).  
- Multiple Text Nodes can be added to a single flow.  
- Nodes are added via **drag-and-drop** from the Nodes Panel.  

### **2. Nodes Panel**  
- Houses all supported node types (currently only **Message Node**).  
- Designed to be **extensible** for future node additions.  

### **3. Edge**  
- Connects two nodes to define the flow sequence.  

### **4. Source Handle**  
- Origin of a connecting edge.  
- **Only one edge** can originate from a source handle.  

### **5. Target Handle**  
- Destination of a connecting edge.  
- **Can accept multiple edges** from different sources.  

### **6. Settings Panel**  
- Replaces the Nodes Panel when a node is selected.  
- Allows editing the **text content** of the selected Text Node.  

### **7. Save Button**  
- Saves the current flow configuration.  
- **Displays an error** if:  
  - There are multiple nodes.  
  - More than one node has an **empty target handle** (disconnected node).  

## 🛠 Technologies Used  

| Technology      | Function in the Project                                 |  
|-----------------|---------------------------------------------------------|  
| **React**       | Core library for building the UI and flow interactions. |  
| **TypeScript**  | Ensures type safety and better code maintainability.    |  
| **React Flow**  | Provides the drag-and-drop flow builder functionality.  |  
| **Tailwind CSS**| Styling and responsive layout.                          |  

## 📜 Repository Standards  

- **ESLint & Prettier** for code consistency.  
- **TypeScript Strict Mode** (`strict: true` in `tsconfig.json`).  
- **Modular Components** for easy scalability.   

## 🏗 Available Scripts  

- **`npm start`** – Runs the app in development mode.  
- **`npm run build`** – Builds the app for production.  
- **`npm run lint`** – Checks for ESLint errors.  
- **`format`** - Checks if files adhere to the Prettier formatting rules.
- **`format:fix`** - Auto-formats files to match Prettier rules.
- **`prepare`** - Initializes Husky for commit hooks.
- **`lint-staged`** - Runs formatting and linting on staged files before

## 🔥 Future Enhancements  

✅ **Add more node types** (e.g., buttons, images, conditional logic).  
✅ **Undo/Redo functionality** for flow editing.  
✅ **Export/Import flows** (JSON support).  
✅ **Real-time collaboration** (WebSocket integration).   

## 📸 Preview

<img width="1920" height="1080" alt="Flow Builder UI" src="https://github.com/user-attachments/assets/c5732f32-5d31-4fd0-a60a-849a01fd1138" />
