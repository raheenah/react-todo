import React, { useState, useEffect, Suspense } from "react";
import Loader from "./components/Loader";
// import GitHubProfile from "./pages/GitHubProfile";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const GitHubProfile = React.lazy(() =>
  delay(2000).then(() => import("./pages/GitHubProfile"))
);

function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <GitHubProfile />
      </Suspense>
    </div>
  );
}

export default App;
