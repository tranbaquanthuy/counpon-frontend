
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  name: string;
  points: number;
}

interface Reward {
  id: number;
  name: string;
  cost: number;
}

export default function RewardSystem() {
  const [user, setUser] = useState<User | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    axios.get('/api/user').then(res => setUser(res.data));
    axios.get('/api/rewards').then(res => setRewards(res.data));
  }, []);

  const redeemReward = async (rewardId: number) => {
    await axios.post('/api/redeem', { rewardId });
    const updatedUser = await axios.get('/api/user');
    setUser(updatedUser.data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Hệ thống đổi điểm</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Thông tin người dùng</h2>
        <p>Tên: {user?.name}</p>
        <p>Điểm hiện có: {user?.points}</p>
      </div>
      <div>
        <h2>Phần thưởng</h2>
        {rewards.map(reward => (
          <div key={reward.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <p><strong>{reward.name}</strong> - {reward.cost} điểm</p>
            <button onClick={() => redeemReward(reward.id)}>Đổi ngay</button>
          </div>
        ))}
      </div>
    </div>
  );
}
