import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={user ? <Chat /> : <Login />} />
        <Route path="/" element={user ? <Chat /> : <Login />} />
        <Route path="/login" element={user ? <Chat /> : <Login />} />
        <Route path="/register" element={user ? <Chat /> : <Register />} />
        <Route path="/*" element={<Chat />} />
      </Route>
    )
  );
  return (
    <>
      <ChatContextProvider user={user}>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ChatContextProvider>
    </>
  );
}

export default App;
