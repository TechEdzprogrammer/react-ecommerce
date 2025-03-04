import { useEffect, useState } from "react";
import NavBar from "../SubComponents/NavBar";
import { useParams } from "react-router-dom";
import styles from '../stylesheets/checkoutPage.module.css';
import Footer from "../SubComponents/Footer";


function CheckoutPage(){
    const {id} = useParams();
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isSetOrder, setOrder] = useState(false);
    useEffect(()=>{
        async function getProduct(){
            const product = await fetch(`http://mechanicalkeyboardapi.mooo.com/keyboard_details?id=${id}`);
            const productData = await product.json();
            setSelectedProduct(productData);
        }
        getProduct();
    });

    function getTotalPrice(e){
        setOrder(true);
        setTotalPrice(e.target.value * selectedProduct.keyboard_price);
    }

    function placeOrder(){
        if(isSetOrder){
            window.alert('Order is place');
        }
        else{
            window.alert('Insert number of quantity');
        }
    }
    
    return(
        <>
            <NavBar/>
            <section className={styles.productContainer}>
                
                <h3 className={styles.heading}><strong>Checkout Product</strong></h3>
                <div className={styles.productDiv}> 
                    <img src={selectedProduct.keyboard_img_url} alt="keyboard" width={200} />
                    <div className={styles.details}>
                        <h6>Product</h6>
                        <p>{selectedProduct.keyboard_name}</p>
                    </div>
                    <div className={styles.details}>
                        <h6>Price</h6>
                        <p>₱{selectedProduct.keyboard_price}</p>
                    </div>
                    <div className={styles.details}>
                        <h6>Quantity</h6>
                        <input type="text" onChange={getTotalPrice}/>
                    </div>
                    <div className={styles.details}>
                        <h6>Total Price</h6>
                        <p>₱{totalPrice}.00</p>
                    </div>
                    <button className={`btn btn-warning ${styles.placeOrder}`} onClick={placeOrder}>Place Order</button>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default CheckoutPage;