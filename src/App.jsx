import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

// Define keyframes at the top level
const pulseKeyframes = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  @keyframes sparkle {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`;

const GlobalStyle = styled.div`
  ${pulseKeyframes}
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0f172a;
  color: #f8fafc;
`;

const Header = styled.header`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(motion.a)`
  color: #f8fafc;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  padding: 4px 8px;
  
  &:hover {
    color: rgb(206, 228, 255);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: radial-gradient(
      circle at center,
      rgba(96, 165, 250, 0.42) 0%,
      rgba(96, 165, 250, 0.47) 25%,
      rgba(96, 165, 250, 0.05) 50%,
      transparent 80%
    );
    border-radius: 50%;
    z-index: -1;
    transition: all 0.5s ease;
    filter: blur(8px);
  }

  &:hover::after {
    width: 200%;
    height: 200%;
    animation: softGlow 3s ease-in-out infinite;
  }

  @keyframes softGlow {
    0% {
      opacity: 0.3;
      transform: translate(-50%, -50%) scale(1);
      filter: blur(8px);
    }
    50% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1.2);
      filter: blur(12px);
    }
    100% {
      opacity: 0.3;
      transform: translate(-50%, -50%) scale(1);
      filter: blur(8px);
    }
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const AnimatedTitle = styled(motion.h1)`
  font-size: 2rem;
  color: #ffffff;
  font-weight: normal;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #94a3b8;
  margin-bottom: 2rem;
`;

const AnimatedCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at center,
    rgba(96, 165, 250, 0.1) 35%,
    transparent 85%
  );
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center,
      rgba(96, 165, 250, 0.2) 0%,
      transparent 60%
    );
    animation: pulse 2s ease-in-out infinite;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
`;

const SparkleWrapper = styled(motion.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  pointer-events: none;
`;

function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const numSparkles = 8;
      const minRadius = 20;
      const maxRadius = 80;

      const newSparkles = Array.from({ length: numSparkles }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = minRadius + Math.random() * (maxRadius - minRadius);
        const randomDelay = Math.random() * 0.5;
        
        return {
          id: Date.now() + Math.random(),
          x: e.clientX + Math.cos(angle) * distance,
          y: e.clientY + Math.sin(angle) * distance,
          scale: 0.3 + Math.random() * 0.7,
          rotation: Math.random() * 360,
          delay: randomDelay,
          driftX: (Math.random() - 0.5) * 50,
          driftY: -30 - Math.random() * 50,
          initialOpacity: 0.7 + Math.random() * 0.3, // Random initial opacity between 0.7 and 1
        };
      });

      setSparkles(prevSparkles => [...prevSparkles, ...newSparkles].slice(-80));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <SparkleWrapper>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          initial={{ 
            x: sparkle.x, 
            y: sparkle.y, 
            scale: sparkle.scale, 
            opacity: sparkle.initialOpacity,
            rotate: sparkle.rotation
          }}
          animate={{ 
            x: sparkle.x + sparkle.driftX,
            y: sparkle.y + sparkle.driftY,
            scale: 0,
            opacity: 0,
            rotate: sparkle.rotation + 180
          }}
          transition={{ 
            duration: 3,
            ease: "easeOut",
            delay: sparkle.delay,
            opacity: { 
              duration: 3.5,
              ease: [0.4, 0, 0.2, 1] // Custom easing for smoother fade
            }
          }}
          style={{
            background: `radial-gradient(circle at center, 
              rgba(96, 165, 250, ${sparkle.initialOpacity}) 0%, 
              rgba(96, 165, 250, ${sparkle.initialOpacity * 0.3}) 50%,
              rgba(96, 165, 250, 0) 90%)`,
            boxShadow: `0 0 10px rgba(96, 165, 250, ${sparkle.initialOpacity * 0.5})`,
            width: '3px',
            height: '3px',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </SparkleWrapper>
  );
}

function App() {
  return (
    <GlobalStyle>
      <Container>
        <SparkleTrail />
        <Header>
          <HeaderLeft>
            <AnimatedCircle>
              <ProfileImage 
                src="./resources/star.png"
                alt="Profile"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity
                }}
              />
            </AnimatedCircle>
            <AnimatedTitle>
              Xiaotong Shen
            </AnimatedTitle>
          </HeaderLeft>
          
          <NavLinks>
            <NavLink
              href="https://www.linkedin.com/in/shen-xiaotong/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              contact
            </NavLink>
            <NavLink
              href="./resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              resume
            </NavLink>
          </NavLinks>
        </Header>

        <Main>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
          </Subtitle>
        </Main>
      </Container>
    </GlobalStyle>
  );
}

export default App;


