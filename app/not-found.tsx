import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-100 mb-6">
        <Shield className="h-8 w-8 text-navy-500" aria-hidden="true" />
      </div>
      <h1 className="text-6xl font-black text-navy-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-navy-900 mb-3">
        Seite nicht gefunden
      </h2>
      <p className="text-navy-500 mb-8 max-w-sm">
        Die angeforderte Seite existiert nicht. Bitte überprüfen Sie die URL
        oder kehren Sie zur Startseite zurück.
      </p>
      <Link href="/" className="btn-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Zur Startseite
      </Link>
    </div>
  );
}
