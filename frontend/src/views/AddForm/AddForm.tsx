import {api_definition} from "../../const/api";
import {TProduct} from "../../types/product";

import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";

import {Skeleton} from "../../components/ui/skeleton";
import {Button, buttonVariants} from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import {Input} from "../../components/ui/input"

import {toast} from "sonner";

const formSchema = z.object({
  name: z.string({required_error: "¡El nombre es requerido!"})
    .min(1, {message: "¡El nombre es requerido!"})
    .max(250, {message: "¡El nombre no puede superar los 250 caracteres!"}),
  price: z.preprocess((value) => {
    if (typeof value === "string") {
      return parseFloat(value);
    }
    return value;
  }, z.number({required_error: "¡El precio es requerido!"})
    .min(1, {message: "¡El precio es requerido!"})),
})

export const AddForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get('id');

  const [product, setProduct] = useState<TProduct | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TProduct>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0
    }
  });

  const onSubmit = (values: TProduct) => {
    let method = 'POST'

    if (product !== null) {
      values.id = product.id
      method = 'PUT'
    }

    const add = async () => {
      setIsFetching(true)
      try {
        const response = await fetch(api_definition('Product'), {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })

        if (response.status == 200 || response.status == 201 || response.status == 204) {
          if (product != null) {
            toast.success("Producto editado con éxito", {position: "top-right"});
          } else {
            toast.success("Producto creado con éxito", {position: "top-right"})
          }
          navigate("/")
        } else {
          setError("Error al guardar el producto. Por favor, intenta nuevamente.")
        }

      } catch (error) {
        setError("Error al guardar el producto. Por favor, intenta nuevamente.")
      } finally {
        setIsFetching(false)
      }
    }

    add()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return

        const response = await fetch(api_definition(`Product?id=${id}`))
        const data = await response.json()

        if (!data) return

        setProduct(data)
        form.reset(data)

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, form]);

  if (isLoading) {
    return (
      <Skeleton/>
    );
  }

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-xl font-bold">
          {
            product == null
              ? "Crear Producto"
              : "Editar Producto"
          }
        </h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/*Name*/}
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Manzanas" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          {/*Price*/}
          <FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10.5" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            {/*Submit*/}
            <Button type="submit" disabled={isFetching}>
              {product == null
                ? "Crear Producto"
                : "Guardar Cambios"
              }
            </Button>

            {/*Cancel*/}
            <Link to="/" className={buttonVariants({variant: "secondary"})}>
              Cancelar
            </Link>
          </div>
        </form>
      </Form>

      {error && (
        toast.error(error, {position: "top-right"})
      )}
    </section>
  )
}
