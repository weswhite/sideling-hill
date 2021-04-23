import Head from "next/head";
//@ts-ignore
import styles from "../../styles/Product.module.css";
import { useCart } from "../../hooks/use-cart";
import products from "../../products.json";
import Footer from "../../components/Footer";

const Product = ({ product }) => {
  const { id, title, image, price, description } = product;
  const { addToCart } = useCart();
  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - Sideling Hill</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>
        <div>
          <h1>{title}</h1>
          <p className={styles.description}>{description}</p>
          <p className={styles.description}>${price.toFixed(2)}</p>
          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Add to Cart
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;

export async function getStaticProps({ params }) {
  const product = products.find(({ id }) => `${id}` === `${params.productId}`);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    const { id } = product;
    return {
      params: {
        productId: id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
