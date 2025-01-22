import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";


export const Listado = ({tasks, deleteTask, setTaskToEdit, toggleTaskCompleted }) => {
  if (!Array.isArray(tasks)) {
    return <p className="text-center text-gray-50 text-lg">No hay tareas disponibles</p>; // Muestra un mensaje si tasks no es un arreglo
  }
  return (
      <>
      <div className="overflow-x-auto">
      <Table className="border border-solid border-indigo-200 p-5 rounded-lg space-y-10 bg-slate-200">
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Título</TableHeadCell>
          <TableHeadCell>Descripción</TableHeadCell>
          <TableHeadCell>Estado</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Editar</span>
          </TableHeadCell>
          <TableHeadCell>
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
                  }`}>{task.description}</TableCell>
            <TableCell>
              {/* Checkbox para cambiar el estado de completado */}
              <input type="checkbox" checked={task.completed}  
              onChange={() => toggleTaskCompleted(task.id, !task.completed)} />
            </TableCell>
            <TableCell>
              <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              onClick={() => setTaskToEdit(task)}
              >
                Editar
              </button>
            </TableCell>
            <TableCell>
              <button className="font-medium text-red-900 hover:underline dark:text-red-300"
              onClick={() => deleteTask(task.id)}>
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

