import { BrowserRouter, Routes, Route } from "react-router-dom";
import { route } from "../variables/routes.contants";
import { Layout } from "../Layout/Layout";
import { HomePage, ErrorPage } from "design/pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
