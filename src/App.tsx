import { useAppDispatch, useAppSelector } from "./store/hook";
import { RootState } from "./store/store";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProductTablePage from "./pages/ProductTablePage";
import "./App.css";
import { jwtDecode } from "jwt-decode";


// Check if the token is expired
const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  interface JwtPayload {
    token_type: string; 
    exp: number;       
    iat: number;        
    jti: string;        
    user_id: number;    
    username: string;   
    email: string;      
    role: string;       
  }

  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};


function PrivateRoute({ element, ...rest }: { element: React.ReactElement }) {
  const token = localStorage.getItem('accessToken');
  console.log("jnkn", token)
  
  if (isTokenExpired(token)) {
    localStorage.removeItem('accessToken');
    return  <Navigate to="/auth" />; 
  }

  return element;
}

function App() {

  const dispatch = useAppDispatch();
  const { loading, error, auth } = useAppSelector(
    (state: RootState) => state.auth
  );

  

    return (
      <Router>
        <Routes>
          <Route path="/product" element={<PrivateRoute element={<ProductTablePage />}/>} />
          <Route path="/" element={<PrivateRoute element={<HomePage />}/>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    );

}

export default App;
