import Router from "./components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Loader from "components/Loader";
import ThemeContext from "context/ThemeContext";

function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth?.currentUser);
  const context = useContext(ThemeContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <div className={context.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;
