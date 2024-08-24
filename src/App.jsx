import './App.css';
import TokenSelector from "./components/TokenSelector";

function App() {
  return (
    <div className='min-h-full'>
      <header className="bg-white shadow">
        <div className='flex justify-between items-center px-4 py-6'>
          <div className="">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Web3 Domains</h1>
          </div>
          <div>
            <TokenSelector />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        </div>
      </main>
    </div>
  )
}

export default App
