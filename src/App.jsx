import React, { useState, useEffect, Suspense } from "react";
import Loader from "./components/Loader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
// import Home from "./pages/Home";
// import ErrorTest from "./pages/ErrorBoundary";
// import GitHubProfile from "./pages/GitHubProfile";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Home = React.lazy(() =>
  delay(1000).then(() => import("./pages/HomePage"))
);
const TodoDetailsPage = React.lazy(() =>
  delay(1000).then(() => import("./components/TodoDetails"))
);
const NotFoundPage = React.lazy(() =>
  delay(1000).then(() => import("./pages/404page"))
);
const ErrorTest = React.lazy(() =>
  delay(1000).then(() => import("./pages/ErrorBoundary"))
);
const NavBar = React.lazy(() =>
  delay(1000).then(() => import("./components/NavBar"))
);
const Footer = React.lazy(() =>
  delay(1000).then(() => import("./components/Footer"))
);
const Todos = React.lazy(() =>
  delay(1000).then(() => import("./components/Todos"))
);

function App() {
  return (
    <div>
      <Router>
        <ErrorBoundary fallback={ <ErrorTest/>}>
          <Suspense fallback={<Loader />}>
            <NavBar />
            <Routes>

              <Route path='/' element={<Home />}>
                <Route index element={<Todos />} />
                <Route path='/todo/:id' element={<TodoDetailsPage />} />
              </Route>
              <Route path='/error-boundry-page' element={<ErrorTest />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;