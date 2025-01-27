import {Modal, Text} from "@simplybusiness/mobius";
import {InterventionProps} from "../../types";

export const ModalIntervention = (props: InterventionProps) => {
  // Extract intervention data fields
  const {firstName} = props;
  // Build content
  const content = `Hey ${firstName}, we thought you would like some popups in your popups.`;
  // Render custom UX
  return (
    <Modal isOpen={true} onClose={() => {}} animation="fade">
      <Modal.Header>Popup Intervention</Modal.Header>
      <Modal.Content>
        <Text elementType="p">{content}</Text>
      </Modal.Content>
    </Modal>
  );
};
