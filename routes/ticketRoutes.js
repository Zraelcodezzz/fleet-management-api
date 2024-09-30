import express from 'express';
import TicketController from '../controllers/ticketController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware to ensure only authenticated users can access these routes
router.use(authenticate);

// Route to create a ticket
router.post('/', async (req, res) => {
  try {
    const ticket = await TicketController.createTicket(req.body);
    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to get all tickets for the authenticated user
router.get('/', async (req, res) => {
  try {
    const tickets = await TicketController.getUserTickets(req.user.id); // Assuming `req.user.id` holds the authenticated user's ID
    res.status(200).json(tickets);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to get a specific ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await TicketController.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to update a ticket (for the user who booked it)
router.patch('/:id', async (req, res) => {
  try {
    const ticket = await TicketController.updateTicket(req.params.id, req.body);
    res.status(200).json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Route to delete a ticket
router.delete('/:id', async (req, res) => {
  try {
    await TicketController.deleteTicket(req.params.id);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
