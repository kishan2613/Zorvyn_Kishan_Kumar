import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard analytics (Protected)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 50000
 *                 totalExpense:
 *                   type: number
 *                   example: 20000
 *                 netBalance:
 *                   type: number
 *                   example: 30000
 *                 categoryTotals:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: Food
 *                       total:
 *                         type: number
 *                         example: 5000
 *                 recent:
 *                   type: array
 *                   items:
 *                     type: object
 *                 monthlyTrends:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", protect, getDashboard);

export default router;