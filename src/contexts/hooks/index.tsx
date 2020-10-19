import { AuthProvider, ProtectRoute } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ProtectRoute>{children}</ProtectRoute>
  </AuthProvider>
);

export default AppProvider;
