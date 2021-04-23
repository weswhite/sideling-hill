import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
//@ts-ignore
import styles from "../styles/Cart.module.css";
import { useCart } from "../hooks/use-cart";
import products from "../products.json";
import Table from "../components/Table";
import Footer from "../components/Footer";

const columns = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "pricePerUnit",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  },
];

export default function Home() {
  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map(({ id, quantity, pricePerUnit }) => {
    const product = products.find(({ id: pid }) => pid === id);
    const { title } = product || {};

    const Quantity = () => {
      function handleOnSubmit(e) {
        e.preventDefault();

        const { currentTarget } = e;
        const inputs: any[] = Array.from(currentTarget.elements);

        const quantity = inputs.find((input) => input.name === "quantity")
          ?.value;

        updateItem({
          id,
          quantity: quantity && parseInt(quantity),
        });
      }

      return (
        <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
          <input
            name="quantity"
            type="number"
            min={0}
            defaultValue={quantity}
          />
          <button className={styles.button}>Update</button>
        </form>
      );
    };
    return {
      id,
      title,
      quantity: <Quantity />,
      pricePerUnit: pricePerUnit.toFixed(2),
      total: (quantity * pricePerUnit).toFixed(2),
    };
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Sideling Hill</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>
      <Footer />
    </div>
  );
}
