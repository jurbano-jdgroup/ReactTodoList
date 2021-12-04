import 'bootstrap/dist/css/bootstrap.css'
import './assets/style.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout'
import RouterConfig from './layout/RouterConfig'

function App() {
  return (
    <Layout>
      <Router>
        <RouterConfig />
      </Router>
    </Layout>
  );
}

export default App