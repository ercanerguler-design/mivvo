import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar(){
  const { data: session } = useSession();
  return (
    <nav className="nav">
      <div className="brand"><Link href="/">Mivvo</Link></div>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <Link className="badge" href="/panel">Panel</Link>
        {session && (
          <>
            <Link href="/dashboard/credits" className="badge">
              {(session.user as any)?.credits || 0} Kredi
            </Link>
          </>
        )}
        {session ? (
          <button className="btn secondary" onClick={()=>signOut({ callbackUrl: "/" })}>Çıkış</button>
        ) : (
          <button className="btn" onClick={()=>signIn("google", { callbackUrl: "/panel" })}>Google ile Giriş</button>
        )}
      </div>
    </nav>
  );
}
