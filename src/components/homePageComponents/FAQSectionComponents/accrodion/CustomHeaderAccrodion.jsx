import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useContext } from "react";
import AccordionContext from "react-bootstrap/AccordionContext";
import { NormalTextSecondary } from "../../../common/texts/NormalText";

const ToggleIcon = ({ eventKey }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const isOpen = activeEventKey === eventKey;
  return <NormalTextSecondary>{isOpen ? "-" : "+"}</NormalTextSecondary>;
};

 const CustomHeaderAccrodion = ({ eventKey, question }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <div
      onClick={decoratedOnClick}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <NormalTextSecondary>{question}</NormalTextSecondary>
      <ToggleIcon eventKey={eventKey} />
    </div>
  );
};
export default CustomHeaderAccrodion ;