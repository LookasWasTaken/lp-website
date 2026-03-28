function Footer() {
  const anno = new Date().getFullYear();

  const social = [
    { label: "GitHub", href: "https://github.com/tuousername" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tuousername" },
    { label: "Email", href: "mailto:tua@email.com" },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-bold text-white tracking-tight">
          luca<span className="text-violet-400">.</span>dev
        </span>

        <span className="text-xs text-gray-600">
          © {anno} Luca — built with React & Tailwind
        </span>

        <div className="flex items-center gap-6">
          {social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-violet-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
