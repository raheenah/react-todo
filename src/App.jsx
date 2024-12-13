import React, { useState, useEffect, Suspense } from "react";
import Loader from "./components/Loader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import GitHubProfile from "./pages/GitHubProfile";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const GitHubProfile = React.lazy(() =>
  delay(2000).then(() => import("./pages/GitHubProfile"))
);
const TodoDetailsPage = React.lazy(() =>
  delay(2000).then(() => import("./components/TodoDetails"))
);

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Define your routes here */}
            <Route path='/' element={<GitHubProfile />} />
            <Route path='/todo/:id' element={<TodoDetailsPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;