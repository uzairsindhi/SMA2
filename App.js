
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './MyComponents/Header';
import Form from './MyComponents/Form';
import Footer from './MyComponents/Footer';
import StudentList from './MyComponents/StudentList';
import StudentCard from './MyComponents/StudentCard';
import SearchComponent from './MyComponents/SearchComponent';
import NavigationBar from './MyComponents/NavigationBar';
import MarkAndDeleteComponent from './MyComponents/MarkAndDeleteComponent.js';
import Homepage from './Homepage.js';
import './Form.css';
function App() {
  return (
    <Router>
      <>
        <Header />
        <NavigationBar />
        <Route>
          <Route path="/" exact component={Homepage} />
          <Route path="/student-list" component={StudentList} />
          <Route path="/enter-data" component={Form} />
          <Route path="/student-card" component={StudentCard} />
          <Route path="/delete-by-ID" component={MarkAndDeleteComponent} />
          <Route path="/Search" component={SearchComponent} />

          
        </Route>
        <Footer />
      </>
    </Router>
  );
}

export default App;
