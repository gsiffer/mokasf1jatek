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
  TeamStandings,
} from "./pages/dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
  // Choose the backend based on the environment (mobile or desktop)
  const backend = window.matchMedia("(pointer: coarse)").matches
    ? TouchBackend
    : HTML5Backend;

  return (
    <BrowserRouter>
      <DndProvider backend={backend}>
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
            <Route path="team-standings" element={<TeamStandings />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
