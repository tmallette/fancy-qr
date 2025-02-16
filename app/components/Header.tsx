import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return <header className="w-full bg-black text-white shadow">
    <div className="w-90% mx-5% flex items-center justify-between py-4">
      <nav className="flex space-x-4">
        <Link href={'/'} className="text-xl font-bold transition marker:duration-300 ease-in-out hover:scale-110 flex flex-row items-center">
          <Image src={ '/images/logo.png'} alt={'Logo image.'} width={64} height={64} style={{ width: '32px', height: 'auto'}} className="mr-2" /> 
          Fancy QR
        </Link>
      </nav>
      <nav className="flex space-x-4">
        <Link href={'/about'} className="font-bold transition marker:duration-300 ease-in-out hover:scale-110">About</Link>
      </nav>
    </div>
  </header>
};