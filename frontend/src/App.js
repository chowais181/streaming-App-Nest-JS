import { useState } from "react";
import Index from "./components/Index";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const isLogged = localStorage.getItem("userToken");

  return (
    <>
      <Index
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isLogged={isLogged}
      />
    </>
  );
}

export default App;
