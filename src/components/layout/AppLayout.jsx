import Header from "./Header";

function AppLayout({ children }) {
  return (
    <div
      className="
        min-h-screen 
        bg-gray-100 text-gray-800 
        dark:bg-gray-950 dark:text-gray-100
        transition-colors duration-300
      "
    >
      
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {children}
      </main>

    </div>
  );
}

export default AppLayout;