import { useState } from 'react';
import './BlindBoxGame.css'; // Import the CSS file for animations

export default function BlindBoxGame() {
    const [prizes] = useState([
        'Gift Card',
        'Headphones',
        'Tote Bag',
        'Coffee Mug',
        'Notebook',
        'Keychain',
        'Pen',
        'Sticker Pack',
        'Surprise Box',
    ]);
    const [selectedBox, setSelectedBox] = useState<number | null>(null);
    const [revealedPrize, setRevealedPrize] = useState<string | null>(null);

    const handleBoxClick = (index: number) => {
        if (selectedBox === null) {
            setSelectedBox(index);
            setRevealedPrize(prizes[index]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 font-sans">
            <h1 className="text-2xl font-bold text-center mb-6">Blind Box Game</h1>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleBoxClick(index)}
                        className={`w-24 h-24 bg-orange-200 rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-500 ${
                            selectedBox === index ? 'selected-box' : 'hover:scale-105'
                        }`}
                    >
                        {selectedBox === index ? (
                            <span className="text-lg font-bold">{revealedPrize}</span>
                        ) : (
                            <span className="text-3xl">🎁</span>
                        )}
                    </div>
                ))}
            </div>
            {revealedPrize && (
                <div className="mt-6 text-center">
                    <p className="text-lg font-semibold">You won: {revealedPrize}!</p>
                </div>
            )}
        </div>
    );
}