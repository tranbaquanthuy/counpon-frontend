import { useState, useEffect } from 'react';
import axios from 'axios';
import BlindBoxGame from "./BlindBoxGame";

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
        api.get('/api/user').then((res) => setUser(res.data));
        api.get('/api/rewards').then((res) => setRewards(res.data));
    }, []);

    const redeemReward = async (rewardId: number) => {
        await api.post('/api/redeem', { rewardId });
        const updatedUser = await api.get('/api/user');
        setUser(updatedUser.data);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-sans">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                    <div className="mb-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-3xl">👤</div>
                    </div>
                    <h2 className="text-lg font-semibold">{user?.name}</h2>
                    <p className="text-2xl font-bold text-orange-500">{user?.points} POINTS</p>
                    <button className="mt-4 bg-gray-200 rounded px-4 py-1">Xem lịch sử điểm</button>
                    <button className="mt-2 bg-orange-400 text-white rounded px-4 py-1">Đổi điểm nhận quà</button>
                </div>

                {/* Order Detail */}
                <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h3>
                    <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>
                        <div>
                            <p className="font-semibold">Túi Tote</p>
                            <p>500.000đ</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">Tổng số tiền thanh toán: <span className="font-bold text-green-600">+500 điểm</span></p>
                    <div className="mt-4">
                        <p className="font-medium mb-2">Sử dụng điểm để giảm giá:</p>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="discount" />
                                <span>Dùng 100 điểm → Giảm 10.000đ</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="discount" />
                                <span>Dùng 200 điểm → Giảm 20.000đ</span>
                            </label>
                            <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded">Đổi ngay</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rewards + History */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Point History */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="font-semibold mb-4">Lịch sử điểm</h4>
                    <ul className="text-sm space-y-2">
                        <li className="flex justify-between">
                            <span>17/04/2025 - Mua hàng - #123</span><span>-500</span>
                        </li>
                        <li className="flex justify-between text-green-600">
                            <span>16/04/2025 - Đổi quà</span><span>+100</span>
                        </li>
                        <li className="flex justify-between">
                            <span>15/04/2025 - Mua hàng - #122</span><span>-300</span>
                        </li>
                    </ul>
                </div>

                {/* Redeem Options */}
                <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
                    <h4 className="font-semibold mb-4">Đổi điểm</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rewards.map((reward) => (
                            <div key={reward.id} className="border p-4 rounded-lg flex flex-col items-start justify-between">
                                <div>
                                    <p className="font-semibold text-orange-600">{reward.name}</p>
                                    <p className="text-sm">Đổi {reward.cost} điểm</p>
                                </div>
                                <button
                                    onClick={() => redeemReward(reward.id)}
                                    className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
                                >
                                    Đổi ngay
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BlindBoxGame></BlindBoxGame>
        </div>
    );
}
