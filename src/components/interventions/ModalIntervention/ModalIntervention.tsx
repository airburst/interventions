import {Modal, Text} from "@simplybusiness/mobius";
import {InterventionProps} from "../../../types";
import "./ModalIntervention.css";

export const ModalIntervention = (props: InterventionProps) => {
  // Extract intervention data fields
  const {firstName} = props;
  // Build content
  // Render custom UX
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      animation="fade"
      className="mobius-modal-intervention"
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
