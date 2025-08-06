import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { QueryClientProvider, QueryClient} from "@tanstack/react-query";
import MainLayout from "./layouts/main-layout";
import ProtectedRoute from "./components/protected-route";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Todos from "./pages/todos";
import { useEffect } from "react";

const client = new QueryClient();

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login")
  }, [])

  return <></>
}

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1> Donezo - Md Zawad Tanzim</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<MainLayout />}>
				    <Route path="/todos" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
				  </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App