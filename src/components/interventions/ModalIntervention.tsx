import {Modal, Text} from "@simplybusiness/mobius";
import {InterventionProps} from "../../types";
import "./Interventions.css";

export const ModalIntervention = (props: InterventionProps) => {
  // Extract intervention data fields
  const {firstName, onDismiss} = props;

  return (
    <Modal
      isOpen={true}
      onClose={onDismiss}
      animation="fade"
      className="mobius-intervention"
    >
      <Modal.Header>Popup Intervention</Modal.Header>
      <Modal.Content>
        <Text elementType="p">
          Hey <span className="highlight">{firstName}</span>, we thought you
          would like some popups in your popups.
        </Text>
      </Modal.Content>
    </Modal>
  );
};
