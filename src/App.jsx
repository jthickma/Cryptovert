import Converter from './components/Converter';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-start/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-end/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="py-8 md:py-12 text-center px-4">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
              Cryptovert
            </h1>
          </div>
          <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
            Convert between cryptocurrencies and fiat currencies instantly with live market rates
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-start justify-center px-4 pb-8">
          <Converter />
        </main>

        {/* Footer */}
        <footer className="py-6 text-center border-t border-border-custom/30">
          <p className="text-xs text-text-secondary/40">
            Cryptovert &copy; {new Date().getFullYear()} &middot; Real-time cryptocurrency conversion
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
