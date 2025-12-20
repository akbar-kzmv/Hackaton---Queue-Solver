import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <strong>QueueGov</strong>
            <nav>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </nav>
        </header>
    )
}

export default Header;
