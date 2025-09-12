import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar(){
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="nav">
      <div className="brand">
        <Link href="/">Mivvo</Link>
      </div>
      
      <div className="nav-menu">
        <Link href="/services" className="nav-link">Hizmetler</Link>
        <Link href="/pricing" className="nav-link">Fiyatlandırma</Link>
        <Link href="/about" className="nav-link">Hakkımızda</Link>
        <Link href="/faq" className="nav-link">SSS</Link>
        <Link href="/contact" className="nav-link">İletişim</Link>
      </div>
      
      <div className="nav-actions">
        <Link className="badge" href="/panel">Panel</Link>
        {session && (
          <>
            <Link href="/dashboard/credits" className="badge credits-badge">
              {(session.user as any)?.credits || 0} Kredi
            </Link>
          </>
        )}
        {session ? (
          <div className="user-menu">
            <span className="user-name">Merhaba, {session.user?.name?.split(' ')[0]}</span>
            <button className="btn btn-secondary" onClick={()=>signOut({ callbackUrl: "/" })}>
              Çıkış
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={()=>signIn("google", { callbackUrl: "/panel" })}>
            <span>🔐</span>
            Google ile Giriş
          </button>
        )}
      </div>
      
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="/services" className="mobile-nav-link">Hizmetler</Link>
          <Link href="/pricing" className="mobile-nav-link">Fiyatlandırma</Link>
          <Link href="/about" className="mobile-nav-link">Hakkımızda</Link>
          <Link href="/contact" className="mobile-nav-link">İletişim</Link>
          <Link href="/panel" className="mobile-nav-link">Panel</Link>
          {session ? (
            <button className="mobile-nav-link" onClick={()=>signOut({ callbackUrl: "/" })}>
              Çıkış
            </button>
          ) : (
            <button className="mobile-nav-link" onClick={()=>signIn("google", { callbackUrl: "/panel" })}>
              Google ile Giriş
            </button>
          )}
        </div>
      )}
      
      <style jsx>{`
        .nav-menu {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        
        .nav-link {
          color: var(--ink);
          font-weight: 500;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        
        .nav-link:hover {
          color: var(--primary);
        }
        
        .nav-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .credits-badge {
          background: var(--primary);
          color: white;
        }
        
        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .user-name {
          font-size: 14px;
          color: var(--muted);
        }
        
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .mobile-menu-toggle span {
          width: 25px;
          height: 2px;
          background: var(--ink);
          transition: all 0.3s ease;
        }
        
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid var(--ring);
          box-shadow: var(--shadow-lg);
          padding: 16px;
          flex-direction: column;
          gap: 12px;
        }
        
        .mobile-nav-link {
          padding: 12px 16px;
          color: var(--ink);
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.2s ease;
          background: none;
          border: none;
          text-align: left;
          font-size: 16px;
          width: 100%;
          cursor: pointer;
        }
        
        .mobile-nav-link:hover {
          background: #f8fafc;
        }
        
        @media (max-width: 768px) {
          .nav-menu,
          .nav-actions {
            display: none;
          }
          
          .mobile-menu-toggle {
            display: flex;
          }
          
          .mobile-menu {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
