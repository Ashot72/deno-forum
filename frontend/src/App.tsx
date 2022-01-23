import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

import strings from "./en-us";
import "office-ui-fabric-core/dist/css/fabric.min.css";
import { AppStateProvider } from "./Contexts/AppContext";
import NavBar from "./Components/shared/NavBar";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

initializeIcons();

const Forums = React.lazy(() => import("./Components/Forums/ForumsView"));
const Topics = React.lazy(() => import("./Components/Topics/TopicsView"));
const Posts = React.lazy(() => import("./Components/Posts/PostsView"));

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <NavBar />
      <React.Suspense
        fallback={<Spinner size={SpinnerSize.large} label={strings.Loading} />}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Forums />} />
            <Route path="/topics/:fid" element={<Topics />} />
            <Route path="/posts/:fid/:tid" element={<Posts />} />
            <Route path="*" element={<Forums />} />
          </Routes>
        </BrowserRouter>
      </React.Suspense>
    </AppStateProvider>
  );
};

export default App;
