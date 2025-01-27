import {Alert, Modal, Text} from "@simplybusiness/mobius";
import "./App.css";
import {InterventionWrapper} from "./components/InterventionWrapper";
import {InterventionsProvider} from "./contexts";

function App() {
  return (
    <main>
      <InterventionsProvider>
        <Text elementType="h1">Interventions Test</Text>

        <Text elementType="p">
          This is a test to see if the interventions are working.
        </Text>
        <Text elementType="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa odio
          placeat, fugit excepturi aperiam ipsum repudiandae quis, minus
          temporibus beatae eaque ea velit hic. Excepturi, aliquid facilis amet
          quod sunt odio voluptatum temporibus blanditiis ducimus aliquam?
          Voluptatibus molestias dolore, nemo, ipsum eum vero, corrupti
          distinctio aliquid repellendus totam quaerat consequatur.
        </Text>

        <InterventionWrapper name="text-001">
          <Text elementType="p">Intervention Text 001 is live!</Text>
        </InterventionWrapper>

        <InterventionWrapper name="alert-002">
          <Alert header="I am intervening!" show variant="info">
            This is an important piece of information inside Alert-002.
          </Alert>
        </InterventionWrapper>

        <InterventionWrapper name="popup-003">
          <Modal isOpen={true} onClose={() => {}} animation="fade">
            <Modal.Header>Intervention Popup 003</Modal.Header>
            <Modal.Content>
              <Text elementType="p">
                This is the content of the intervention popup 002.
              </Text>
            </Modal.Content>
          </Modal>
        </InterventionWrapper>
      </InterventionsProvider>
    </main>
  );
}

export default App;
