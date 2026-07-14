import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}