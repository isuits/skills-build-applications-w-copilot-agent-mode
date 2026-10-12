import { Request, Response, Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const entries = await Leaderboard.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ points: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id)
      .populate('user', 'name email')
      .populate('team', 'name');
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

export default router;
