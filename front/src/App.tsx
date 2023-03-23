import { ValidationMessage } from './components/atoms'

function App() {
  return (
    <div className="App">
      <ValidationMessage text="Success" color="success" />
      <ValidationMessage />
    </div>
  )
}
export default App
