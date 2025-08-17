import { ThemeSwitch } from "./mode-toggle";

export default function Header() {
    return (
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-30 shadow-lg">
            <div className="container mx-auto px-4 py-2">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center gap-4">
                        <img src="/logo.png" alt="logo" className="h-8" />
                        <h2 className="text-xl font-bold">Mini Seller Console</h2>
                    </div>
                    <ThemeSwitch />
                </div>
            </div>
        </header>
    )
}




