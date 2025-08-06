import express from "express";
const router = express.Router();
import prisma from "../db/index.js";

router.get('/', async (req, res) => {
    // Gets all the todos from the database
    const todos = await prisma.todo.findMany();
    // Responds back to the client with json with a success status and the todos array
    res.status(200).json({
        success: true,
        todos,
    });
});

// Define a POST route for creating a new todo
router.post('/', async (req, res) => {
    // Destructure `name` and `description` from the request body
    const { name, description } = req.body;
    try {
        // Use Prisma to create a new todo entry in the database
        const newTodo = await prisma.todo.create({
            data: {
                name,               // Set the name of the todo from the request
                description,        // Set the description of the todo from the request
                completed: false,   // Default value for `completed` is set to false
                userId: req.user.sub, // Assign the user ID
            },
        });
        
        // Check if the new todo was created successfully
        if (newTodo) {
            // Respond with a success status and include the ID of the newly created todo
            res.status(201).json({
                success: true,
                todo: newTodo.id,
            });
        } else {
            // Respond with a failure status if todo creation failed
            res.status(500).json({
                success: false,
                message: "Failed to create new todo",
            });
        }
    } catch (e) {
        // Log the error for debugging purposes
        console.log(e);
        // Respond with a generic error message if something goes wrong
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later",
        });
    }
});

//...GET and POST routes above

// Define a PUT route for marking a todo as completed
router.put("/:todoId/completed", async (req, res) => {
  const todoId = Number(req.params.todoId);
  const { completed } = req.body; // Get the completed value from the request

  try {
    const todo = await prisma.todo.update({
      where: { id: todoId },
      data: { completed }, // Set to true or false based on request
    });

    res.status(200).json({
      success: true,
      todo: todo.id,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

// Define a DELETE route for removing a todo by its ID
router.delete("/:todoId", async (req, res) => {
  // Extract the `todoId` from the route parameter and convert it to a number
  const todoId = Number(req.params.todoId);

  try {

    // task: In the DELETE route, fix the query so that it not only gets the todo by its ID but gets the todo by it’s ID AND completed is set to true.

    // First try to find the todo by ID and make sure it's completed
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        completed: true,
      },
    });

    // If no todo exists or it's not completed return an error
    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo not found or not marked as completed",
      });
    }


    // Use Prisma to delete the todo with the specified ID
    await prisma.todo.delete({
      where: {
        id: todoId, // Match the todo based on its unique ID
      },
    });

    // Respond with a success status and confirmation of the deletion
    res.status(200).json({
      success: true,
      todo: todoId, // Return the deleted todo's ID for reference
    });
  } catch (e) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
});

//...Rest of the code

export default router;

