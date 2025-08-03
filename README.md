# 📄 ResumePro – AI-Powered Resume Builder

![Deployment](https://img.shields.io/badge/Live--Demo-Click%20Here-brightgreen)
[🌐 Visit Live App](https://resumepro-frontend.vercel.app/#/landing)

ResumePro is a modern resume builder SaaS platform built with Angular 20 and Node.js. It allows users to create, edit, preview, and download professional resumes with customizable templates and premium features.

---

## 🔥 Features

| Feature | Description |
|--------|-------------|
| 🔐 **JWT Auth** | Signup & Login with secure token |
| 📄 **Resume Builder** | Editable fields with drag & drop |
| 🎨 **Template Switcher** | Classic / Modern / Minimal |
| 🌗 **Dark/Light Mode** | System-detect + toggle switch |
| 🎨 **Color & Font Picker** | Live resume customization |
| 📥 **PDF Export** | Print-ready resume download (premium) |
| 💳 **Razorpay Payments** | ₹99 Premium unlock with Razorpay |
| 🖼️ **Live Preview** | Resume preview updates instantly |
| 🧠 **Ready for AI integration** | Suggestion fields planned soon |

---

## 🚀 Tech Stack

- **Frontend**: Angular 20, Angular Material, SCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Payments**: Razorpay
- **PDF Generation**: html2pdf.js
- **Deployed On**: Vercel (Frontend) + Render (Backend)

---

## 📦 Installation (Frontend)

```bash
git clone https://github.com/SrinivasSadula/resume-enhancer-frontend.git
cd resume-enhancer-frontend
npm install
ng serve
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
