import axios from 'axios';
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

interface LayoutsProps {
    auth?: boolean;
    children: any;
}           

const Layouts: React.FC<LayoutsProps> = ({children, auth}) => {
    const router = useRouter()

    // FETCH
    // const logout = async () => {
    //     await fetch('http://localhost:4500/user/logout', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         credentials: 'include',

    //     })
    //     await router.push('/login')
    // }

    // AXIOS:
    const logout = async () => {
        await axios.post('http://localhost:4500/user/logout',{}, 
        {withCredentials: true, headers: {'Content-Type': 'application/json'}} )
        await router.push('/login')
    }

    let menu;
    
    if(!auth){
        menu = (
                <div className="flex items-center gap-x-5 md:gap-x-8">
                    <div className="hidden md:block">
                        <Link className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/login">Login</Link>
                    </div>
                    <div className="hidden md:block">
                        <Link className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/register">Register</Link>
                    </div>
                </div>
        )
    } else {
        menu = (
            <div className="flex items-center gap-x-5 md:gap-x-8">
                <div onClick={logout} className="group cursor-pointer inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600" href="/register">
                    <span>Выйти <span className="hidden lg:inline">сейчас</span></span>
                </div>
            </div>
    )
    }
  return (
    <>
    <header className="py-10 w-full fixed top-0 left-0">
        <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="w-full relative z-50 flex justify-between">
                <div className="flex items-center md:gap-x-12">
                    <Link aria-label="Home" href="/">
                        Home
                    </Link>
                    <div className="flex flex-row gap-6">
                        <Link href='' className="inline-block cursor-pointer rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" >Features</Link>
                        <Link href='' className="inline-block cursor-pointer rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" >Testimonials</Link>
                        <Link href='' className="inline-block cursor-pointer rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" >Pricing</Link>
                    </div>
                </div>
                {menu}
            </nav>
        </div>
    </header>
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-10  ${inter.className}`}
    >

      {
        children
      }
    </main>
    </>
  )
};

export default Layouts;
