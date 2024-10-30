import "./App.css";
import Header from "./components/Header";
import PpfCalculator from "./components/PpfCalculator";

function App() {
  return (
    <div className="flex flex-col px-1 w-full h-screen bg-gray-100 items-center">
      <Header />
      {/* <span className="bg-red-500 w-full">1</span> */}
      <PpfCalculator/>
    </div>
  );
}

export default App;
