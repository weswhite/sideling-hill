import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
//@ts-ignore
import styles from "./Nav.module.css";

import { useCart } from "../../hooks/use-cart";

const Nav: React.FC = () => {
  const { subtotal } = useCart();
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>
        <Link href="/">
          <a>Sideling Hill Hackle</a>
        </Link>
      </p>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a>
            <FaShoppingCart /> ${subtotal.toFixed(2)}
          </a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
