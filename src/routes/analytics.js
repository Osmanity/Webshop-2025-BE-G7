import express from 'express';
import Order from '../models/Order.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Middleware to check admin access
router.use(isAdmin);

// Get monthly revenue for the last 12 months
router.get('/revenue-per-month', async (req, res) => {
  try {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), 1);
    
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: oneYearAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      }
    ]);

    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const revenueByMonth = {};
    monthlyRevenue.forEach(item => {
      const monthName = monthNames[item._id.month - 1];
      const year = item._id.year;
      const key = `${monthName}-${year}`;
      revenueByMonth[key] = item.total;
    });

    res.json(revenueByMonth);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue data', error: error.message });
  }
});

// Get top 5 customers by total spending
router.get('/top-customers', async (req, res) => {
  try {
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: { totalSpent: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          username: '$userDetails.username',
          totalSpent: 1,
          _id: 0
        }
      }
    ]);

    res.json(topCustomers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top customers', error: error.message });
  }
});

export default router; 