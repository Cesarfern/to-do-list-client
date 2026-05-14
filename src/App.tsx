import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Lista} from "./components/Lista"
import {ListaCompletadas} from "./components/ListaCompletadas"
import {NuevaTarea} from "./components/NuevaTarea"
import {EditarTarea} from "./components/EditarTarea"
import {VerTarea} from "./components/VerTarea"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista/>} />
        <Route path="/completadas" element={<ListaCompletadas/>} />
        <Route path="/nuevatarea" element={<NuevaTarea/>} />
        <Route path="/editartarea/:id" element={<EditarTarea/>} />
        <Route path="/vertarea/:id" element={<VerTarea/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
