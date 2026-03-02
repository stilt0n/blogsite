import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <strong>
              <Link href="/">My Blog</Link>
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/">Posts</Link>
          </li>
          <li>
            <Link href="/subscribe">Subscribe</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
