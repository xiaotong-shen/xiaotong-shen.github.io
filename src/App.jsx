import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useState } from 'react';

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
  
  &:hover {
    color: #60a5fa;
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

function App() {
  return (
    <Container>
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
            Contact
          </NavLink>
          <NavLink
            href="./resources/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
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
  );
}

export default App;


