"use client";

import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { ContextProvider } from "../context/ContextAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <ContextProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </ContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
