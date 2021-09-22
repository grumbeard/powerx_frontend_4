export const AppShell = ({children}) => {
  return (
    <>
    <header className="md:sticky md:top-0 bg-indigo-800 md:z-10">
      <div className="px-4">
        <div className="flex justify-center items-center py-2 max-w-7xl mx-auto">
          <span className="text-white text-lg">Movies</span>
        </div>
      </div>
    </header>
    <main>
      {children}
    </main>
    </>
  );
};