import {TProduct} from "../../types/product.ts";
import {ColumnDef, FilterFn, Row, SortDirection} from "@tanstack/react-table"
import {Button} from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {FiChevronDown, FiChevronUp, FiEdit, FiMoreHorizontal, FiTrash2} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog.tsx";
import {api_definition} from "../../const/api";
import {toast} from "sonner";

const productFilterFn: FilterFn<TProduct> = (
  row: Row<TProduct>,
  _,
  filterValue: string
) => {
  filterValue = filterValue.toLowerCase()

  const filterParts = filterValue.split(" ")
  const rowValues =
    `${row.original.id} ${row.original.name} ${row.original.price}`.toLowerCase()

  return filterParts.every((part) => rowValues.includes(part))
}

export const SortedIcon = ({isSorted}: { isSorted: false | SortDirection }) => {
  if (isSorted === "asc") {
    return <FiChevronUp className="ml-2 h-4 w-4"/>
  }

  if (isSorted === "desc") {
    return <FiChevronDown className="ml-2 h-4 w-4"/>
  }

  return null
}

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <SortedIcon isSorted={column.getIsSorted()}/>
        </Button>
      )
    }
  },
  {
    accessorKey: "name",
    filterFn: productFilterFn,
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <SortedIcon isSorted={column.getIsSorted()}/>
        </Button>
      )
    }
  },
  {
    accessorKey: "price",
    header: ({column}) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Precio
            <SortedIcon isSorted={column.getIsSorted()}/>
          </Button>
        </div>

      )
    },
    cell: ({row}) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("es-pe", {
        style: "currency",
        currency: "PEN",
      }).format(price)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: function CellComponent({row}) {
      const navigate = useNavigate();
      const product = row.original

      const deleteProduct = (id: number) => {
        const fetchData = async () => {
          const response = await fetch(api_definition(`Product?id=${id}`), {
            method: "DELETE"
          })

          if (response.status === 200 || response.status === 201 || response.status === 204) {
            navigate("/?success=true")
          } else {
            toast.error("Error al eliminar el producto. Por favor, intenta nuevamente.", {position: "top-right"})
          }
        }

        fetchData()
      }

      return (
        <div className="flex justify-end">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-600">
                  <span className="sr-only">Abrir menu</span>
                  <FiMoreHorizontal size="16"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <Link
                  to={{
                    pathname: '/add',
                    search: `?id=${product.id}`,
                  }}
                >
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <FiEdit/>
                    Editar
                  </DropdownMenuItem>
                </Link>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="flex items-center gap-2 focus:text-red-700 cursor-pointer">
                    <FiTrash2/>
                    Eliminar
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-2">Eliminar Producto</DialogTitle>
                <DialogDescription>
                  ¿Está seguro de eliminar este producto? Esta acción no se puede revertir.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose className="flex justify-end items-center gap-2" asChild>
                  <div>
                    <Button variant="destructive" onClick={() => deleteProduct(product.id)}>Eliminar</Button>
                    <Button variant="secondary">Cancelar</Button>
                  </div>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]
