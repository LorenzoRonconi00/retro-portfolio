const links = [
    { href: '#about', label: 'About' },
    { href: '#tech', label: 'Tech' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

export function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex gap-6 px-6 py-2 rounded-full bg-card/80 backdrop-blur border border-border text-sm">
            {links.map((l) => (
                <a key={l.href} href={l.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                </a>
            ))}
        </nav>
    );
}