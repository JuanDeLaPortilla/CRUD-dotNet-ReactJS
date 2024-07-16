import {ILayoutProps} from "../interfaces/layoutProps.ts";
import {Link} from "react-router-dom";

export const Layout = ({children}: ILayoutProps) => {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link
                to="/"
                className="text-xl font-bold flex items-center lg:ml-2.5"
              >
                <span className="self-center whitespace-nowrap ml-2">
                  CRUD ReactJs
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex overflow-hidden bg-white pt-16">
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto"
        >
          <main>
            <div className="pt-6 px-4">
              <div className="w-full min-h-[calc(100vh-230px)]">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 container-fluid flex flex-col">
                  <div className="row justify-center">
                    <div className="lg:col-10 md:col-11 col lg:px-8 md:px-1">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <p className="text-center text-sm text-gray-500 my-10">
            &copy; 2024-{new Date().getFullYear()}{" "}
            <Link to="https://www.linkedin.com/in/juan-de-la-portilla-cardenas/"
                  className="hover:underline"
                  target="_blank">
              Juan De La Portilla
            </Link>
            . Todos los derechos reservados.
          </p>
        </div>
      </div>
    </>
  );
}
