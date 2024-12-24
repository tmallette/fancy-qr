export function Header() {
  return (
    <header className="w-full bg-white shadow">
      <div className="w-90% mx-5% flex items-center justify-between py-4">
        <div className="text-xl font-bold">
          <a href="/">Fancy QR</a>
        </div>

        <nav className="flex space-x-4">
          <a href="/about" className="text-gray-700 hover:text-black">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
