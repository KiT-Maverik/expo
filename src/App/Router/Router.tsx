import { BrowserRouter, Routes, Route } from "react-router-dom";
import { route } from "constants";
import { Layout } from "design/templates";
import { HomePage } from "design/pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.home} element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
