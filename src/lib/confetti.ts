import confetti from "canvas-confetti";

export function triggerCelebrationConfetti() {
  if (typeof window === "undefined") return;

  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7", "#ec4899", "#3b82f6", "#10b981"]
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  } catch (err) {
    console.warn("Confetti effect skipped:", err);
  }
}
