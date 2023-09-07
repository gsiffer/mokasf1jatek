import { Error, Register, Landing, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Profile,
  Stats,
  Locations,
  SharedLayout,
  MyDrivers,
  Constructors,
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
          <Route index element={<Stats />} />
          <Route path="my-drivers" element={<MyDrivers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="locations" element={<Locations />} />
          <Route path="constructors" element={<Constructors />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
