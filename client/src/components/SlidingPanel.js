import React from "react";
import Wrapper from "../assets/wrappers/SlidingPanel";
import { useAppContext } from "../context/appContext";

/* SlidingPanel component 
props:
  - children: automatically passed to every component, 
      that can be used to render the content included between 
      the opening and closing tags when invoking a component.
  - isPanelSlide: it's a boolean to slide in and out the add/edit panel
*/
const SlidingPanel = ({ children, isPanelSlide }) => {
  const { slidePanel } = useAppContext();
  return (
    <Wrapper>
      <div
        className={`cover-box ${isPanelSlide && "cover-over"}`}
        onClick={() => slidePanel()}
      ></div>
      <div className={`panel-wrap ${isPanelSlide && "slide-in"}`}>
        <div className="panel">{children}</div>
      </div>
    </Wrapper>
  );
};

export default SlidingPanel;
