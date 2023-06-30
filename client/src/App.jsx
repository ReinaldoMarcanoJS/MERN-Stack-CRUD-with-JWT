import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/authContext"

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from "./pages/HomePage"
import TaskPage from "./pages/TaskPage"
import TaskFormPage from "./pages/TaskFormPage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./ProtectedRoute"
import { TaskProvider } from "./context/TasksContext"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Navbar />
          <main className="container content-container w-full px-10 md:px-0 m-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App