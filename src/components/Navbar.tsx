import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
  const {data:session} = useSession( {required: true, } );
    const loading = session === undefined;

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">Task Manager</h1>
        <div className="hidden md:block">
          {session && !loading && (
            <span className="text-sm">Welcome, {session.user?.name || " "}</span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {session && !loading ? (
          <>
            <div className="hidden md:block">
              <button
                className="px-3 py-2 rounded-md bg-gray-600 text-white"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
            <div className="md:hidden">
              <button className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 text-gray-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <button
            className="px-3 py-2 rounded-md bg-gray-600 text-white"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
