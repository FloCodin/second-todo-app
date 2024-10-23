import Link from "next/link";

const Navbar = () => {
    return (
        <div className="w-full bg-indigo-600 flex  justify-evenly ">
                <li className="hover:text-black font-extrabold text-xl">
                    <Link href="/">Todos</Link>
                </li>
                <li className="hover:text-black font-extrabold text-xl">
                    <Link href="/users/">Users</Link>
                </li>
                <li className="hover:text-black font-extrabold text-xl">
                    <Link href="/roles/">Roles</Link>
                </li>

        </div>
    );
};

export default Navbar;