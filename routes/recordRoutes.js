import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} from "../controllers/recordcontroller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records
 */
router.get("/", protect, getRecords);


/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Salary
 *               amount:
 *                 type: number
 *                 example: 50000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: income
 *               category:
 *                 type: string
 *                 example: Job
 *             required:
 *               - title
 *               - amount
 *               - type
 *     responses:
 *       201:
 *         description: Record created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post("/", protect, authorize("admin"), createRecord);


/**
 * @swagger
 * /api/records/{id}:
 *   patch:
 *     summary: Update a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Salary
 *               amount:
 *                 type: number
 *                 example: 60000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *                 example: Job
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Record not found
 */
router.patch("/:id", protect, authorize("admin"), updateRecord);


/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Record deleted
 */
router.delete("/:id", protect, authorize("admin"), deleteRecord);

export default router;