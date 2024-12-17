// import './App.css'
import Electricity from './components/Electricity'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {

  return (
    <>
    <MantineProvider>
      <Electricity/>
    </MantineProvider>
    </>
  )
}

export default App
