import { Outlet } from "react-router-dom";
import { CartButton } from "./Cart/CartButton";

export const Layout = () => {
  return (
    <>
      <Outlet />
      <CartButton />
    </>
  );
};
