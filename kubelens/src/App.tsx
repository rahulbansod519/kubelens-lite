import EditorPanel from './components/editor/EditorPanel'
import GraphPanel from './components/graph/GraphPanel'
import ValidationPanel from './components/validation/ValidationPanel'
import InspectorPanel from './components/sideBar/InspectorPanel'


function App() {

  return (
    <>
     <div className='h-screen flex flex-col bg-slate-950 text-white'>
        <header className='h-14 border-b border-slate-800 flex items-center px-4'>
          <h1 className='text-xl font-bold'>
            Kubelens
          </h1>
        </header>

        <main className='flex-1 grid grid-cols-2 overflow-hidden'>
          <section className='border-r border-slate-800'>
            <EditorPanel />
          </section>
          <section >
            <GraphPanel />
          </section>
         
        </main>
          <InspectorPanel />
        <footer className='h-40 border-t border-slate-800'>
          <ValidationPanel />
        </footer>
     </div>
    </>
  )
}

export default App
 