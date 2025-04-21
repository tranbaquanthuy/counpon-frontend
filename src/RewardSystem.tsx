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

    const api = axios.create({
        baseURL: 'https://coupon-h929.onrender.com',
    });

    useEffect(() => {
        api.get('/api/user').then(res => setUser(res.data));
        api.get('/api/rewards').then(res => setRewards(res.data));
    }, []);

    const redeemReward = async (rewardId: number) => {
        await api.post('/api/redeem', { rewardId });
        const updatedUser = await api.get('/api/user');
        setUser(updatedUser.data);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Hệ thống đổi điểm</h1>
            <div style={styles.userInfo}>
                <h2 style={styles.subHeading}>Thông tin người dùng</h2>
                <p style={styles.userDetail}>Tên: <strong>{user?.name}</strong></p>
                <p style={styles.userDetail}>Điểm hiện có: <strong>{user?.points}</strong></p>
            </div>
            <div style={styles.rewardsContainer}>
                <h2 style={styles.subHeading}>Phần thưởng</h2>
                {rewards.map(reward => (
                    <div key={reward.id} style={styles.rewardCard}>
                        <p style={styles.rewardName}><strong>{reward.name}</strong></p>
                        <p style={styles.rewardCost}>Chi phí: {reward.cost} điểm</p>
                        <button
                            style={styles.redeemButton}
                            onClick={() => redeemReward(reward.id)}
                        >
                            Đổi ngay
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Styling
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '900px',
        margin: '0 auto',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        fontSize: '2rem',
        marginBottom: '20px',
    },
    subHeading: {
        color: '#333',
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    userInfo: {
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#f4f7fa',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    userDetail: {
        fontSize: '1.1rem',
        marginBottom: '5px',
    },
    rewardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    rewardCard: {
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    rewardName: {
        fontSize: '1.2rem',
        color: '#444',
        marginBottom: '10px',
    },
    rewardCost: {
        fontSize: '1rem',
        color: '#888',
        marginBottom: '15px',
    },
    redeemButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    },
};

// Add hover effect for the button
styles.redeemButton = {
    ...styles.redeemButton,
    ':hover': {
        backgroundColor: '#0056b3',
    },
};

