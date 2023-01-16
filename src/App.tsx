import { QueryClientProvider } from 'react-query'
import { QueryClient } from 'react-query'
import './App.css'
import FormCreateCache from './components/FormCreateCache';

function App() {

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <FormCreateCache/>
    </QueryClientProvider>
  )
}

export default App
