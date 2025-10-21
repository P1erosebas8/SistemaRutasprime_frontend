import React from "react";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";
import WhatsappBoton from "../components/WhatsappBoton";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <MyNavbar />
      <main>
        <Outlet />
      </main>
      <WhatsappBoton />
      <MyFooter />
    </>
  );
}
