import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React, { Suspense,lazy } from 'react';
import { AuthProvider } from './hooks/authContext';
import Layout from './components/Layout';
import ProtectedRoute from './utils/protectedRoute';
import App from './App';
import './index.css';
import { Notice } from './containers';

const LazyLogin = lazy(() => import('./containers/admin/login'));
const LazyDashboard = lazy(() => import('./containers/admin/dashboard'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      {/* Place AuthProvider inside the Router */}
      <AuthProvider>
        <Layout />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/adminlogin" element={<Suspense fallback={<div>Loading...</div>}><LazyLogin /></Suspense>} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<div>Loading...</div>}><LazyDashboard /></Suspense>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
