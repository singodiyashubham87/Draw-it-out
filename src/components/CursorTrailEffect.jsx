import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const trailRef = useRef([]);
  const trailLength = 20;
  const animationFrameRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      for (let i = trailLength - 1; i > 0; i--) {
        const currentDot = trailRef.current[i];
        const previousDot = trailRef.current[i - 1];
        currentDot.style.transform = previousDot.style.transform;
      }

      trailRef.current[0].style.transform = `translate(${clientX}px, ${clientY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateTrail = () => {
      for (let i = 1; i < trailLength; i++) {
        const currentDot = trailRef.current[i];
        const previousDot = trailRef.current[i - 1];
        const currentTransform = currentDot.style.transform;
        const previousTransform = previousDot.style.transform;

        const currentCoords = currentTransform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
        const previousCoords = previousTransform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);

        if (currentCoords && previousCoords) {
          const [_, currentX, currentY] = currentCoords.map(Number);
          const [__, previousX, previousY] = previousCoords.map(Number);

          const newX = currentX + (previousX - currentX) * 0.4; // Increase this factor to make dots follow more closely
          const newY = currentY + (previousY - currentY) * 0.4;

          currentDot.style.transform = `translate(${newX}px, ${newY}px)`;
        }
      }
      animationFrameRef.current = requestAnimationFrame(updateTrail);
    };

    animationFrameRef.current = requestAnimationFrame(updateTrail);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {[...Array(trailLength)].map((_, index) => {
        const size = 22 - index * 0.6; // Decrease size for each dot
        const opacity = 1 - index * 0.07; // Decrease opacity for each dot
        return (
          <div
            key={index}
            ref={(el) => (trailRef.current[index] = el)}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(72, 76, 76, 0.5), rgba(176, 213, 251, 0.5))',
              opacity: opacity,
              position: 'absolute',
              transition: 'transform 0.05s ease-out',
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;
