import Robot from "./Robot";
import MapDashboard from "./MapDashboard";
import { useSideBarContext } from "../../contexts/SideBarMenuContext";
import defDash from "./defaultDashboardCss.module.css";
import ParamButtonPosition from "./ParamButtonPosition.jsx";

const DefaultDashboard = () => {
  const { isOpen } = useSideBarContext();

  return (
    <>
      <div className={defDash["defDash"]}>
        <div className={isOpen ? defDash["sideAndDash"] : defDash["onlyDash"]}>
          <div className={defDash["robot"]}>
            <Robot />
          </div>
          <div className={defDash["lineHorizontal"]}>
            <hr />
          </div>
          <div className={defDash["paramScreenMarkerPos"]}>
            <ParamButtonPosition />
          </div>
          <div className={defDash["lineVertical"]}></div>
          <div className={defDash["map"]}>
            <MapDashboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDashboard;
