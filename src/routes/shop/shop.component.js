import SHOP_DATA from "../../shop-data.json"
import { UserContext } from "../../context/user.context"
import { ProductContext } from "../../context/products.context"
import { useContext } from "react"
import ProductCard from "../../components/product-card/product-card.component"
import './shop.styles.scss'
const Shop = () => {
    const { products } = useContext(ProductContext)
    return (<div className="products-container">
        {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
        ))}
    </div>)
}
export default Shop
