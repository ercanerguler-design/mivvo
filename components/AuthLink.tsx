'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function AuthLink({ href, children, className, style }: AuthLinkProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    // Analiz sayfaları için üyelik kontrolü
    if (href.includes('/analysis/')) {
      if (status === 'loading') {
        e.preventDefault();
        return;
      }
      
      if (!session) {
        e.preventDefault();
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(href)}`);
        return;
      }
    }
  };

  return (
    <Link 
      href={href} 
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
