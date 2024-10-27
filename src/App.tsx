import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { CorporateLoginPage } from './pages/auth/CorporateLoginPage';

// Layouts and Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { CorporateLayout } from './components/corporate/CorporateLayout';
import { UserLayout } from './components/user/UserLayout';

// Admin Pages
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Companies } from './pages/admin/Companies';
import { Users } from './pages/admin/Users';
import { Profiles } from './pages/admin/Profiles';
import { Plans } from './pages/admin/Plans';
import { Advantages } from './pages/admin/Advantages';
import { ProfileDetails } from './pages/admin/ProfileDetails';
import { Domains } from './pages/admin/Domains';
import { Reports } from './pages/admin/Reports';
import { Logs } from './pages/admin/Logs';
import { Settings } from './pages/admin/Settings';
import { Analytics } from './pages/admin/Analytics';
import { Support as AdminSupport } from './pages/admin/Support';

// Corporate Pages
import { Dashboard as CorporateDashboard } from './pages/corporate/Dashboard';
import { Users as CorporateUsers } from './pages/corporate/Users';
import { Profiles as CorporateProfiles } from './pages/corporate/Profiles';
import { Reports as CorporateReports } from './pages/corporate/Reports';
import { Advantages as CorporateAdvantages } from './pages/corporate/Advantages';
import { Settings as CorporateSettings } from './pages/corporate/Settings';
import { Support as CorporateSupport } from './pages/corporate/Support';

// User Pages
import { Dashboard as UserDashboard } from './pages/user/Dashboard';
import { UserProfiles } from './pages/user/UserProfiles';
import EditProfile from './pages/user/EditProfile';
import { UserAdvantages } from './pages/user/UserAdvantages';
import { UserReports } from './pages/user/UserReports';
import { UserSupport } from './pages/user/UserSupport';
import { UserSubscription } from './pages/user/UserSubscription';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/corporate" element={<CorporateLoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="companies" element={<Companies />} />
            <Route path="users" element={<Users />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="plans" element={<Plans />} />
            <Route path="advantages" element={<Advantages />} />
            <Route path="profile-details" element={<ProfileDetails />} />
            <Route path="domains" element={<Domains />} />
            <Route path="reports" element={<Reports />} />
            <Route path="logs" element={<Logs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="support" element={<AdminSupport />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* Corporate Routes */}
          <Route path="/corporate" element={
            <ProtectedRoute allowedRoles={['corporate']}>
              <CorporateLayout />
            </ProtectedRoute>
          }>
            <Route index element={<CorporateDashboard />} />
            <Route path="users" element={<CorporateUsers />} />
            <Route path="profiles" element={<CorporateProfiles />} />
            <Route path="reports" element={<CorporateReports />} />
            <Route path="advantages" element={<CorporateAdvantages />} />
            <Route path="settings" element={<CorporateSettings />} />
            <Route path="support" element={<CorporateSupport />} />
            <Route path="*" element={<Navigate to="/corporate" replace />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserLayout />
            </ProtectedRoute>
          }>
            <Route index element={<UserDashboard />} />
            <Route path="profiles" element={<UserProfiles />} />
            <Route path="profiles/:id" element={<EditProfile />} />
            <Route path="advantages" element={<UserAdvantages />} />
            <Route path="reports" element={<UserReports />} />
            <Route path="support" element={<UserSupport />} />
            <Route path="subscription" element={<UserSubscription />} />
            <Route path="*" element={<Navigate to="/user" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}