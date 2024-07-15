import {api_definition} from "../../const/api";
import {useEffect, useState} from "react";
import {TProduct} from "../../types/product.ts";
import {DataTable} from "./data-table.tsx";
import {columns} from "./columns.tsx";
import {Link} from "react-router-dom";
import {buttonVariants} from "../../components/ui/button"
import {FiPlus} from "react-icons/fi";
import {cn} from "../../lib/utils.ts";

export const Home = () => {
  const [products, setProducts] = useState<TProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_definition('Product/List'))
        const data = await response.json()
        if (!data) return
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, []);

  return (
    <section>
      <header className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Productos</h1>
        <Link
          className={cn(
            buttonVariants({variant: "default", size: "sm"}),
            "flex items-center gap-2")}
          to='/'>
          <FiPlus size={16}/>
          Nuevo Producto
        </Link>
      </header>
      <DataTable columns={columns} data={products}/>
    </section>
  )
}
