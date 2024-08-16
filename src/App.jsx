import "./App.css";
import Formula from "./components/formula";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function App() {
  return (
    <section className="tw-container tw-mx-auto">
      <h2>Seymur Burdadi isleyir</h2>
      <Formula name={"New Formula"}></Formula>
    </section>
  );
}

export default App;
