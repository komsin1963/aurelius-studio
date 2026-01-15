import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Aurelius Studio</h1>
      <p>By Komsin</p>
      <nav>
        <Link href="/studio3">ไปที่ Studio 3 (AI Generator)</Link> | 
        <Link href="/studio4">ไปที่ Studio 4</Link>
      </nav>
    </div>
  );
}