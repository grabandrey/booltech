import { useState, useRef } from "react";

export default function FloatingHeartsButton({ scrollToSection, secondSectionRef }) {
    const [hearts, setHearts] = useState([]);
    const buttonRef = useRef(null);

    const spawnHeart = (e) => {
        const id = Date.now();

        // Determine position: event click or button center fallback
        const target = e?.target || buttonRef.current;
        const rect = target.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top;

        setHearts(prev => [...prev, { id, x, y }]);

        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== id));
        }, 2000);
    };

    return (
        <div style={{ textAlign: "center", paddingTop: "100px" }}>
            <button
                ref={buttonRef}
                onClick={() => {
                    spawnHeart();
                    scrollToSection(secondSectionRef);
                }}
                style={{ fontSize: "20px", padding: "10px 20px" }}
            >
                Take me down 👇💘
            </button>

            {hearts.map(({ id, x, y }) => (
                <span
                    key={id}
                    style={{
                        position: "fixed",
                        left: x,
                        top: y,
                        fontSize: "24px",
                        pointerEvents: "none",
                        transform: "translate(-50%, 0)",
                        animation: "floatUp 2s ease-out forwards"
                    }}
                >
          💖
        </span>
            ))}

            <style>{`
        @keyframes floatUp {
          0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-50%, -60px) scale(1.6); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
