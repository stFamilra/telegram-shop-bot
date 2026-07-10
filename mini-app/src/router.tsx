import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CatalogPage } from "./pages/Catalog/CatalogPage";
import { CartPage } from "./pages/Cart/CartPage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CatalogPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <CatalogPage />,
//   },
//   // {
//   //   path: "/product/:id",
//   //   element: <ProductDetailPage />,
//   // },
//   // {
//   //   path: "/cart",
//   //   element: <CartPage />,
//   // },
//   // {
//   //   path: "/checkout",
//   //   element: <CheckoutPage />,
//   // },
// ]);
