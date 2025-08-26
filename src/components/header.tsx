import { Logo } from '@/components/icons/logo';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b bg-card shadow-sm">
      <div className="container mx-auto flex items-center gap-3">
        <Logo />
        <h1 className="text-xl font-semibold text-foreground font-headline tracking-tight">C-Insight</h1>
      </div>
    </header>
  );
}
