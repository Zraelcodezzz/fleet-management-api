import Ticket from '../models/ticketModel.js';
import Journey from '../models/journeyModel.js';
import User from '../models/userModel.js';
import { calculatePrice } from '../utils/priceCalculator.js'; // Utility function to calculate ticket price

// Create a new ticket
export const createTicket = async (req, res) => {
  const { journeyId, seatNumber } = req.body;
  const userId = req.user.id; // Assume `req.user` is set by authentication middleware

  try {
    // Check if the journey exists and if seats are available
    const journey = await Journey.findByPk(journeyId);
    if (!journey) return res.status(404).json({ message: 'Journey not found' });
    if (journey.availableSeats <= 0) return res.status(400).json({ message: 'No seats available' });

    // Create the ticket
    const price = calculatePrice(journey.baseFare); // Calculate price using a utility function
    const ticket = await Ticket.create({
      userId,
      journeyId,
      seatNumber,
      price,
      status: 'booked'
    });

    // Update available seats
    await journey.update({
      availableSeats: journey.availableSeats - 1
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

// Update ticket status
export const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    await ticket.update({ status });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket status', error });
  }
};

// Get all tickets for a user
export const getUserTickets = async (req, res) => {
  const userId = req.user.id; // Assume `req.user` is set by authentication middleware

  try {
    const tickets = await Ticket.findAll({ where: { userId } });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

// Get all tickets for a journey (Admin only)
export const getJourneyTickets = async (req, res) => {
  const { journeyId } = req.params;

  try {
    const tickets = await Ticket.findAll({ where: { journeyId } });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journey tickets', error });
  }
};

// Delete a ticket (Admin only)
export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    // Update available seats
    const journey = await Journey.findByPk(ticket.journeyId);
    if (journey) {
      await journey.update({
        availableSeats: journey.availableSeats + 1
      });
    }

    await ticket.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error });
  }
};
