# Formify – WebForm-Builder

Formify is a **full-featured online form builder** inspired by Google Forms, developed using **React** and **Firebase**.  
It allows you to **create, customize, and manage forms** with powerful design options, branching logic, real-time collaboration, and detailed analytics — all inside a polished, responsive interface.

---

## 🚀 Features

### 📝 Form Creation
- Multiple question types: Short answer, Paragraph, MCQ, Checkbox, Dropdown, Linear scale, Grid, Date, Time, File Upload.
- Sections & branching logic (go to section based on answer).
- Question-level validation (required, regex, min/max).
- Quiz mode with points & answer keys.

### 🎨 Customization
- Light/Dark/System themes.
- Custom accent hue, corner radius, font scale, and wallpapers.
- RTL & Urdu/Nastaʿlīq typography support.

### 📊 Responses & Analytics
- Live responses table.
- CSV export.
- Auto-generated charts (bar, pie) for multiple choice questions.
- Response summaries.

### 🔗 Sharing
- Public form link generation.
- Bookmarkable editor links.
- Import/Export JSON form schema.

### 🔒 Authentication & Permissions
- Firebase Authentication (Anonymous, Email/Password).
- Firestore-based permissions and response limits.

### 📱 UI & UX
- Chrome-inspired shell with tabs, omnibox, bookmarks.
- Mobile-friendly, responsive design.
- PWA-ready for offline use.

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS, Framer Motion
- **Backend & Auth:** Firebase Authentication
- **Database:** Firebase Firestore

---

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/sabbas-ctrl/Formify-WebForm-Builder
cd Formify-WebForm-Builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Firestore**, **Authentication**, and **Storage**.
   - Copy your Firebase config into `src/lib/firebase.ts`.

4. **Run the development server**
```bash
npm run dev
```

---

## 📸 Screenshots

### Form Editor  
![Form Editor Screenshot](docs/screenshots/form-editor.png)

### Live Preview  
![Live Preview Screenshot](docs/screenshots/form-preview.png)

---

## 💡 Why Formify?
While Google Forms is great, **Formify** gives you:
- **Full visual customization** for branding and theme control.
- **Firebase integration** for secure, real-time data.
- **Open-source flexibility** to host and modify your own form system.

---

## 🔍 Keywords (SEO)
`google forms clone` &nbsp; `react form builder` &nbsp; `firebase form app` &nbsp; `custom form creator` &nbsp; `open source google forms alternative` &nbsp; `pwa form builder` &nbsp; `formify`
