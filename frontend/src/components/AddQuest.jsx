import { useState } from 'react';

export default function AddQuest({ onAddQuest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    xp: 25,
    category: 'Fitness',
    difficulty: 'Easy',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'xp' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (onAddQuest) {
      onAddQuest({
        ...formData,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString(),
      });
    }

    setFormData({
      title: '',
      description: '',
      xp: 25,
      category: 'Fitness',
      difficulty: 'Easy',
    });
    setIsOpen(false);
  };

  return (
    <div className="add-quest-wrapper">
      {!isOpen ? (
        <button className="btn-add-quest" onClick={() => setIsOpen(true)}>
          + New Quest
        </button>
      ) : (
        <form className="add-quest-form" onSubmit={handleSubmit}>
          <h4>Embark on a New Quest</h4>

          <div className="form-group">
            <label htmlFor="title">Quest Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. Read 20 pages of a book"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              rows={2}
              placeholder="Add extra quest lore or details..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Fitness">Fitness</option>
                <option value="Knowledge">Knowledge</option>
                <option value="Productivity">Productivity</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Chores">Chores</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Epic">Epic</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="xp">XP Reward</label>
              <input
                id="xp"
                name="xp"
                type="number"
                min="5"
                max="500"
                value={formData.xp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Accept Quest
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
