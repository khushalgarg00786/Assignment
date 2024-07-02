# Install the dependencies:
npm install

# Install Tailwind CSS and its dependencies:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install this package,
npm install uuid

# Task Manager

This is a simple Task Manager application built with React. It allows users to add, edit, delete, and mark tasks as completed. The tasks are saved in the browser's local storage, so they persist across page reloads.

## Features

- **Add Task**: Users can add new tasks.
        handleAdd: Function to handle adding a new task.
- **Edit Task**: Users can edit existing tasks.
       handleEdit: Function to handle the editing of a task.
- **Delete Task**: Users can delete tasks.
       handleDelete: Function to handle the deletion of a task.
- **Local Storage**: Tasks are saved in the browser's local storage, ensuring data persistence.
        saveToLS: Function to save the tasks array to local storage.
- **Complete Task**: Users can mark tasks as completed.
       If the isCompleted property of the task is false (the checkbox is unchecked), clicking the checkbox will mark it as true (the checkbox becomes checked,               indicating the task is completed).
       If the isCompleted property of the task is true (the checkbox is checked), clicking the checkbox will mark it as false (the checkbox becomes unchecked,               indicating the task is not completed).

  
