import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
import SlidingPanel from "../../components/SlidingPanel";
import { useAppContext } from "../../context/appContext";
import LocationForm from "../../components/LocationForm";
import ConstructorForm from "../../components/ConstructorForm";
import DriverForm from "../../components/DriverForm";

const SharedLayout = () => {
  const { slidingPanel } = useAppContext();
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
      <SlidingPanel isPanelSlide={slidingPanel.isPanelSlide}>
        {slidingPanel.panelName === "location" && <LocationForm />}
        {slidingPanel.panelName === "constructor" && <ConstructorForm />}
        {slidingPanel.panelName === "driver" && <DriverForm />}
      </SlidingPanel>
    </Wrapper>
  );
};

export default SharedLayout;
