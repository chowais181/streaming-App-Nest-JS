import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Header from "./Navbar/Header";
import VideoList from "./Video/VideoList";
import Video from "./Video/Video";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./Routing/PrivateRoute";
import PublicRoute from "./Routing/PublicRoute";
import PageNotFound from "./Routing/PageNotFound";

export default function Index(props) {
  const { isLoggedIn, setLoggedIn, isLogged } = props;
  // const isLogged = localStorage.getItem("userToken");

  console.log(isLogged ? true : false);

  // console.log()

  return (
    <div>
      <BrowserRouter>
        <Header setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
        {isLogged ? (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <VideoList setLoggedIn={setLoggedIn} />
                </PrivateRoute>
              }
            />
            <Route
              path="/video"
              element={
                <PrivateRoute>
                  <VideoList setLoggedIn={setLoggedIn} />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/video/:id"
              element={
                <PrivateRoute>
                  <Video />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/404"
              element={
                <PublicRoute>
                  <PageNotFound />
                </PublicRoute>
              }
            />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                // <PublicRoute>
                <SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
                // </PublicRoute>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                // <PublicRoute>
                <SignUp />
                // </PublicRoute>
              }
            ></Route>
            <Route
              path="/404"
              element={
                // <PublicRoute>
                <PageNotFound />
                // </PublicRoute>
              }
            />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}
