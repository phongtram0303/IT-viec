import {Route, Routes} from "react-router-dom";
import './App.css';
import LayoutDefault from "../src/Layout/LayoutDefault";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Search from "./pages/Search";
import JobDetail from "./pages/JobDetail";
import DetailCompany from "./pages/Company/DetailCompany";
import PrivateRouter from "./components/PrivateRouter";
import Logout from "./pages/Logout";
import LayoutAdmin from "./Layout/LayoutAdmin";
import Dashboard from "./pages/Private/Dashboard";
import DetailInfoCompany from "./pages/Private/DetailInfoCompany";
import JobManager from "./pages/Private/JobManager";
import CVManager from "./pages/Private/CVManager";
import DetailJob from "./pages/Private/DetailJob";
import CreateJob from "./pages/Private/CreateJob";
import DetatailCV from "./pages/Private/DetailCV";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signUp" element={<SignUp/>}/>
          <Route path="search" element={<Search/>}/>
          <Route path="jobs/:id" element={<JobDetail/>}/>
          <Route path="company/:id" element={<DetailCompany/>}/>
          <Route path="logout" element={<Logout/>}/>
        </Route>
        <Route element={<PrivateRouter/>}>
            <Route path="admin" element={<LayoutAdmin/>}>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="infoCompany" element={<DetailInfoCompany/>}/>
              <Route path="jobManager" element={<JobManager/>}/>
              <Route path="cvManager" element={<CVManager/>}/>
              <Route path="create-job" element={<CreateJob/>}/>
              <Route path="detail-job/:id" element={<DetailJob/>}/>
              <Route path="detail-cv/:id" element={<DetatailCV/>}/>
            </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
