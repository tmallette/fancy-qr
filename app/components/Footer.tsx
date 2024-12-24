export function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-4 mt-80px">
      <div className="container mx-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} QR code Gen. All rights reserved.
      </div>
    </footer>
  );
}
