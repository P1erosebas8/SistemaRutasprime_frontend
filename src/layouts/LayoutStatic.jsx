import React from "react";
import MyFooter from "../components/MyFooter";
import WhatsappBoton from "../components/WhatsappBoton";
import { Outlet } from "react-router-dom";
import MyNavbarCli from "../components/MyNavbarCli";

export default function LayoutStatic() {
  return (
    <>
      <MyNavbarCli />
      <main>
        <Outlet />
      </main>
      <WhatsappBoton />
      <MyFooter />
    </>
  );
}
