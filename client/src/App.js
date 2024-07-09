import { Error, Register, Landing, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Profile,
  Stats,
  Locations,
  SharedLayout,
  MyDrivers,
  Constructors,
  Drivers,
  Excel,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/my-drivers" replace />} />
          {/* <Route index element={<Stats />} /> */}
          <Route path="stats" element={<Stats />} />
          <Route path="my-drivers" element={<MyDrivers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="locations" element={<Locations />} />
          <Route path="constructors" element={<Constructors />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="excel" element={<Excel />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
