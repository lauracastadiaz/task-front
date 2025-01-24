
export const Listado = ({
  tasks,
  deleteTask,
  setTaskToEdit,
  toggleTaskCompleted,
  toggleTaskCompletedAll,
  allCompleted
}) => {
  if (!Array.isArray(tasks)) {
    return (
      <p className="text-center text-gray-50 text-lg">
        No hay tareas disponibles
      </p>
    ); // Muestra un mensaje si tasks no es un arreglo
  }
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-50 text-lg">
        No hay tareas disponibles
      </p>
    );
  }
  return (
    <>
      <div className="relative overflow-hidden sm:rounded-lg ">
        <div className="overflow-x-auto">
        <table className="table-auto border border-solid border-indigo-200 bg-slate-800 w-full text-sm text-left text-gray-500 dark:text-gray-400 w-ful">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    checked= {allCompleted}
                    onChange={(e) => toggleTaskCompletedAll(e.target.checked)}
                    
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 hidden sm:table-cell">
                ID
              </th>
              <th scope="col" className="px-4 py-3">
                Título
              </th>
              <th scope="col" className="px-4 py-3">
                Descripción
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Acción</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map((task) => (
              <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" key={task.id}>
                <td className="w-4 px-4 py-3">
                  {/* Checkbox para cambiar el estado de completado */}
                  <div className="flex items-center">
                    <input
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        toggleTaskCompleted(task.id, !task.completed)
                      }
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <th
                  scope="row"
                  className={`px-4 py-2 hidden sm:table-cell ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  
                    {task.id}
                  
                </th>
                <td
                  className={`px-4 py-2 ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  
                    {task.title}
                  
                </td>
                <td
                  className={` ${
                    task.completed ? "text-gray-500 line-through" : ""
                  }`}
                >
                  
                    {task.description}
                  
                </td>

                <td className="px-4 py-2 flex items-center justify-end">
                  <button
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-cyan-300 hover:underline dark:text-cyan-500 rounded-lg focus:outline-none dark:hover:text-cyan-500"
                    onClick={() => setTaskToEdit(task)}
                  >
                    Editar
                  </button>
                </td>
                <td className="px-4 py-2 flex items-center justify-end">
                  <button
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-red-900 hover:underline dark:text-red-300 rounded-lg focus:outline-none dark:hover:text-red-300"
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};
