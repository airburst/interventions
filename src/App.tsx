import {Text} from "@simplybusiness/mobius";
import "./App.css";
import {AlertIntervention} from "./components/interventions/AlertIntervention";
import {ModalIntervention} from "./components/interventions/ModalIntervention";
import {TextIntervention} from "./components/interventions/TextIntervention";
import {InterventionWrapper} from "./components/InterventionWrapper";
import {InterventionsProviderSSE} from "./contexts/InterventionsProvider";

function App() {
  return (
    <main>
      <InterventionsProviderSSE>
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
          <TextIntervention />
        </InterventionWrapper>

        <InterventionWrapper name="alert-002">
          <AlertIntervention />
        </InterventionWrapper>

        <InterventionWrapper name="popup-003">
          <ModalIntervention />
        </InterventionWrapper>
      </InterventionsProviderSSE>
    </main>
  );
}

export default App;
