import './App.css';
import { Routes, Route } from 'react-router-dom';
import PetPage from './pages/PetPage';
import Profile from './pages/Profile';
import Search from './pages/Search';
import AddPet from './pages/AddPet';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyPets from './pages/MyPets';
import HomeLoggedIn from './pages/HomeLoggedIn';
import EditPet from './pages/EditPet';
import UsersListAdm from './pages/UsersListAdm';
import MyPetsListAdm from './components/MyPetsListAdm';
import UserPets from './pages/UserPets';

function App() {
  return (
    <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/add-pet' element = {<AddPet/>}/>
      <Route exact path='/dashboard' element = {<Dashboard/>}/>
      <Route exact path='/my-pets' element = {<MyPets/>}/>
      <Route exact path='/pet-page/:id' element = {<PetPage/>}/>
      <Route exact path='/edit-pet/:id' element = {<EditPet/>}/>
      <Route exact path='/profile' element = {<Profile/>}/>
      <Route exact path='/search' element = {<Search/>}/>
      <Route exact path = '/logged' element = {<HomeLoggedIn/>}/>
      <Route exact path = '/adm/users' element = {<UsersListAdm/>}/>
      <Route exact path = '/adm/pet-list' element = {<MyPetsListAdm/>}/>
      <Route exact path = '/adm/user-pets/:id' element = {<UserPets/>}/>
    </Routes>
  );
}

export default App;
