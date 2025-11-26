import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import WhatsappBoton from "../components/WhatsappBoton";
import { Outlet } from "react-router-dom";
import MyNavbarCli from "../components/MyNavbarCli";

export default function UsoAplicacionLayout() {
  return (
    <>
      <MyNavbarCli />
      <main>
        <Outlet />
      </main>
    </>
  );
}
