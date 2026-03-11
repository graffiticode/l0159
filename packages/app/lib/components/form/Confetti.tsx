// SPDX-License-Identifier: MIT
import React from 'react'; React;

export const Confetti = () => {
  const confettiPieces = Array.from({ length: 100 }); // Number of confetti pieces
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {
        confettiPieces.map((_, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 animate-fall"
            style={{
              left: `${Math.random() * 100}vw`, // Random horizontal position
              width: `${Math.random() * 5 + 5}px`, // Random width between 5px and 10px
              height: `${Math.random() * 5 + 5}px`, // Random height between 5px and 10px
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
              animationDelay: "0s", //`${Math.random() * 3}s`, // Random delay
              animationDuration: `${Math.random() * 3 + 3}s` // Random duration for variety
             }}
          ></div>
        ))
      }
    </div>
  );
};
