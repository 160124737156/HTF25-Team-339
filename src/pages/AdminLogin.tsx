import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import cbitLogo from '@/assets/cbit-logo.jpg';
const AdminLogin = () => {
  const navigate = useNavigate();
  const {
    login,
    isAdmin
  } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (isAdmin) {
    navigate('/admin/dashboard');
    return null;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    const success = login(username, password);
    if (success) {
      toast.success('Login successful!', {
        description: 'Redirecting to dashboard...'
      });
      navigate('/admin/dashboard');
    } else {
      toast.error('Login failed', {
        description: 'Invalid credentials. Try username: admin, password: admin123'
      });
    }
    setLoading(false);
  };
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="p-8 shadow-lg">
          <div className="text-center mb-8">
            {/* College Logo */}
            <div className="flex justify-center mb-4">
              
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Sign in to manage clubs and events</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="username" type="text" required value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="pl-10" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>Username: <span className="font-mono">admin</span></p>
              <p>Password: <span className="font-mono">admin123</span></p>
            </div>
          </form>
        </Card>
      </div>
    </div>;
};
export default AdminLogin;