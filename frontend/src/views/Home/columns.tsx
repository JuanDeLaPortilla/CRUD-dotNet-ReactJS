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
    cell: ({row}) => {
      const product = row.original

      return (
        <div className="flex justify-end">
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
              <DropdownMenuItem className="flex items-center gap-2">
                <FiEdit/>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 focus:text-red-700">
                <FiTrash2/>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
