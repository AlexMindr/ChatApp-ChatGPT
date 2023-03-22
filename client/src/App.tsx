import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from "@/components/chat";
import Login from "@/components/login";
import { useState } from "react";

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);

  const isAuth = Boolean(user) && Boolean(secret);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/chat" />
              ) : (
                <Login setUser={setUser} setSecret={setSecret} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuth ? (
                user && secret && <Chat user={user} secret={secret} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
