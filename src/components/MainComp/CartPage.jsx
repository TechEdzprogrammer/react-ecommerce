import { useContext} from "react";
import { CartContext } from "../context/CartContext";
import styles from '../stylesheets/cartPage.module.css';
import NavBar from "../SubComponents/NavBar";
import Footer from "../SubComponents/Footer";
import { Link } from "react-router-dom";

function CartPage() {
  const {cartProducts, setCartProducts} = useContext(CartContext);

  return(
    <>
        <NavBar/>
        <section className={styles.cartSection}>
        <h3 className={styles.heading}><strong>Your Cart</strong></h3>
            {cartProducts.map((e,index) => {
              return(
                <div key={index} className={styles.productDiv}>
                    <img src={e.keyboard_img_url} alt="keyboard image" width={200} />
                    <div className={styles.details}>
                      <h6>Product</h6>
                      <p>{e.keyboard_name}</p>
                    </div>
                    <div className={styles.details}>
                      <h6>Price</h6>
                      <p>₱{e.keyboard_price}</p>
                    </div>                     
                    <Link className={styles.link} to={`/checkoutPage/${e.id}`}><button className={`btn btn-warning ${styles.checkoutbutton}`}>Checkout</button></Link>
                    <button className={`btn btn-danger  ${styles.deletebutton}`} onClick={() => {setCartProducts(cartProducts.filter(element =>{
                      return element.id !== e.id;
                    }))}}>Delete</button>
                </div>
              );
            })}
        </section>   
        <Footer/>
    </>
  )
}

export default CartPage;
