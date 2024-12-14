import React, { useState, useEffect, Suspense } from "react";
import Loader from "./components/Loader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ErrorTest from "./pages/ErrorBoundary";
// import GitHubProfile from "./pages/GitHubProfile";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const GitHubProfile = React.lazy(() =>
  delay(2000).then(() => import("./pages/GitHubProfile"))
);
const TodoDetailsPage = React.lazy(() =>
  delay(2000).then(() => import("./components/TodoDetails"))
);
const NotFoundPage = React.lazy(() =>
  delay(2000).then(() => import("./pages/404page"))
);
const ErrorTest = React.lazy(() =>
  delay(2000).then(() => import("./pages/ErrorBoundary"))
);
const NavBar = React.lazy(() =>
  delay(2000).then(() => import("./components/NavBar"))
);
const Footer = React.lazy(() =>
  delay(2000).then(() => import("./components/Footer"))
);

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loader />}>
          <NavBar />
          <Routes>
            <Route path='/' element={<GitHubProfile />} />
            <Route path='/todo/:id' element={<TodoDetailsPage />} />
            <Route path='/error-boundry-page' element={<ErrorTest />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;