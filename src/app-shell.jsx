import { Link } from 'react-router-dom';
import { useAuth } from 'domains/auth/auth.state';
import { LogoutButton } from 'domains/auth/components/logout-button';
import { Button } from 'components/button';

export const AppShell = ({children}) => {
  const { status } = useAuth();
  
  return (
    <>
    <header className="md:sticky md:top-0 bg-indigo-800 md:z-10">
      <div className="px-4 relative">
        {status === 'authenticated'
          ? <LogoutButton className="absolute right-10 top-1" variant="outline" />
          : <Link to="/login">
              <Button className="absolute right-10 top-1" variant="primary">Login</Button>
            </Link>
        }
        <div className="flex justify-center items-center py-2 max-w-7xl mx-auto">
          <h1 className="text-white">Movies</h1>
        </div>
      </div>
    </header>
    <main>
      {children}
    </main>
    </>
  );
};