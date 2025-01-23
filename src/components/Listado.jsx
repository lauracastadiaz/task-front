import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";


export const Listado = ({tasks, deleteTask, setTaskToEdit, toggleTaskCompleted }) => {
  if (!Array.isArray(tasks)) {
    return <p className="text-center text-gray-50 text-lg">No hay tareas disponibles</p>; // Muestra un mensaje si tasks no es un arreglo
  }
  if (tasks.length === 0) {
    return <p className="text-center text-gray-50 text-lg">No hay tareas disponibles</p>;
  }
  return (
      <>
      <div className="overflow-x-auto max-w-full">
      <Table className="table-auto border border-solid border-indigo-200 p-5 rounded-lg space-y-10 bg-slate-200 w-full">
        <TableHead>
          <TableHeadCell className="text-xs sm:text-base">ID</TableHeadCell>
          <TableHeadCell className="text-xs sm:text-base">Título</TableHeadCell>
          <TableHeadCell className="text-xs sm:text-base">Descripción</TableHeadCell>
          <TableHeadCell className="text-xs sm:text-base">Estado</TableHeadCell>
          <TableHeadCell className="text-xs sm:text-base">
            <span className="sr-only">Editar</span>
          </TableHeadCell>
          <TableHeadCell className="text-xs sm:text-base">
            <span className="sr-only">Borrar</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {tasks.map((task) => (
          <TableRow className="bg-white border-gray-700 dark:bg-gray-800" key={task.id}>
            <TableCell className={`whitespace-nowrap font-medium ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 dark:text-white"
                  }`}>
              {task.id}
              </TableCell>
            <TableCell className={`whitespace-nowrap font-medium ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 dark:text-white"
                  }`}>
              {task.title}
            </TableCell>
            <TableCell className={`${
                    task.completed ? "text-gray-500 line-through" : ""
                  }hidden sm:table-cell`}>{task.description}</TableCell>
            <TableCell>
              {/* Checkbox para cambiar el estado de completado */}
              <input className="cursor-pointer" type="checkbox" checked={task.completed}  
              onChange={() => toggleTaskCompleted(task.id, !task.completed)} />
            </TableCell>
            {/* Botones Editar y Eliminar en pantallas grandes */}
            <TableCell className="hidden sm:table-cell">
              <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              onClick={() => setTaskToEdit(task)}
              >
                Editar
              </button>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <button className="font-medium text-red-900 hover:underline dark:text-red-300"
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
                  deleteTask(task.id);
                }
              }}>
                Eliminar
              </button>
            </TableCell>

              {/* Botones Editar y Eliminar en pantallas pequeñas (se reorganiza en una sola celda) */}
              <TableCell className="sm:hidden w-full flex flex-col space-y-2 items-center">
                  <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => setTaskToEdit(task)}>
                    Editar
                  </button>
                  <button className="font-medium text-red-900 hover:underline dark:text-red-300"
                    onClick={() => {
                      if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
                        deleteTask(task.id);
                      }
                    }}>
                    Eliminar
                  </button>
                </TableCell>



          </TableRow>
          ))}
          
        </TableBody>
      </Table>
      </div>
      
      </>
  );
};

