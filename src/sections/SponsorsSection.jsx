import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const SponsorsSectionContainer = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;

  /* Decorative gradient orbs for depth */
  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    filter: blur(70px);
    opacity: 0.25;
  }
  &::before {
    top: -80px;
    right: -120px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(closest-side, ${({ theme }) => theme.googleColors.blue.primary}, transparent 65%);
  }
  &::after {
    bottom: -100px;
    left: -120px;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(closest-side, ${({ theme }) => theme.googleColors.green.primary}, transparent 65%);
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, ${({ theme }) => theme.googleColors.blue.primary}, ${({ theme }) => theme.googleColors.green.primary});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.6rem;
    height: 4px;
    width: 84px;
    border-radius: 999px;
    background: linear-gradient(90deg, ${({ theme }) => theme.googleColors.blue.primary}, ${({ theme }) => theme.googleColors.yellow.primary});
    opacity: 0.85;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  max-width: 760px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SponsorsGrid = styled.div`
  display: grid;
  gap: 3.5rem;
`;

const SponsorTier = styled.div`
  margin-bottom: 3rem;
`;

const TierTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 auto 2rem;
  text-align: center;
  width: max-content;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: ${({ theme, $type }) => {
    switch($type) {
      case 'platinum': return `linear-gradient(135deg, ${theme.googleColors.blue.primary}22, ${theme.googleColors.blue.primary}11)`;
      case 'gold': return `linear-gradient(135deg, ${theme.googleColors.yellow.dark}22, ${theme.googleColors.yellow.dark}11)`;
      case 'silver': return `linear-gradient(135deg, ${theme.googleColors.grey[600]}22, ${theme.googleColors.grey[600]}11)`;
      default: return `linear-gradient(135deg, ${theme.colors.primary}22, ${theme.colors.primary}11)`;
    }
  }};
  color: ${({ theme, $type }) => {
    switch($type) {
      case 'platinum': return theme.googleColors.blue.primary;
      case 'gold': return theme.googleColors.yellow.dark;
      case 'silver': return theme.googleColors.grey[600];
      default: return theme.colors.text.primary;
    }
  }};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SponsorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.25rem;
  justify-items: center;
`;

const SponsorCard = styled(motion.div)`
  position: relative;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surfaceElevated}, ${({ theme }) => theme.colors.surface});
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 6px 24px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.35s ${({ theme }) => theme.colors.transitions?.default || 'ease'}, box-shadow 0.35s ${({ theme }) => theme.colors.transitions?.default || 'ease'};

  /* Subtle gradient border glow */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, ${({ theme }) => theme.googleColors.blue.primary}33, transparent, ${({ theme }) => theme.googleColors.green.primary}33);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    opacity: 0.0;
    transition: opacity 0.35s ease;
  }

  &:hover::before { opacity: 1; }

  &:hover {
    transform: translateY(-10px) rotateX(2deg);
    box-shadow: 0 16px 40px ${({ theme }) => theme.colors.shadow};
  }
`;

const SponsorLogo = styled.div`
  height: 200px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.background.secondary}, ${({ theme }) => theme.colors.background.tertiary});
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.35s ease, filter 0.35s ease;
  }
  
  ${SponsorCard}:hover & img {
    transform: scale(1.07) translateZ(0);
    filter: drop-shadow(0 6px 16px rgba(0,0,0,0.25));
  }
`;

const SponsorContent = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
  text-align: center;
`;

const SponsorName = styled.h4`
  font-size: 1.15rem;
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SponsorDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

const SponsorLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  color: ${({ theme }) => theme.googleColors.blue.primary};
  background: ${({ theme }) => `${theme.googleColors.blue.primary}15`};
  border: 1px solid ${({ theme }) => `${theme.googleColors.blue.primary}33`};
  font-weight: 600;
  text-decoration: none;
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};

  &:hover {
    background: ${({ theme }) => `${theme.googleColors.blue.primary}25`};
    transform: translateY(-1px);
    box-shadow: 0 6px 14px ${({ theme }) => theme.colors.shadow};
  }
`;

// Dummy sponsors data
const sponsorsData = {
  platinum: [
    {
      id: 1,
      name: "Google Cloud",
      description: "Cloud computing services and APIs",
      logo: "https://res.cloudinary.com/dfstpdwih/image/upload/v1747640809/Codehelp/tmp-4-1747640809293.png",
      website: "https://cloud.google.com"
    },
    {
      id: 2,
      name: "Firebase",
      description: "App development platform",
      logo: "https://res.cloudinary.com/dfstpdwih/image/upload/v1747640084/Codehelp/tmp-2-1747640083929.png",
      website: "https://firebase.google.com"
    }
  ],
  gold: [
    {
      id: 3,
      name: "Android",
      description: "Mobile operating system",
      logo: "https://developer.android.com/static/images/brand/Android_Robot.png",
      website: "https://android.com"
    },
    {
      id: 4,
      name: "TensorFlow",
      description: "Machine learning framework",
      logo: "",
      website: "https://tensorflow.org"
    },
    {
      id: 5,
      name: "Chrome",
      description: "Web browser and platform",
      logo: "https://www.google.com/chrome/static/images/chrome-logo.svg",
      website: "https://www.google.com/chrome"
    }
  ],
  silver: [
    {
      id: 6,
      name: "Flutter",
      description: "UI toolkit for mobile apps",
      logo: "https://storage.googleapis.com/cms-storage-bucket/6a07d8a62f4308d2b854.svg",
      website: "https://flutter.dev"
    },
    {
      id: 7,
      name: "Angular",
      description: "Web application framework",
      logo: "https://angular.io/assets/images/logos/angular/angular.svg",
      website: "https://angular.io"
    },
    {
      id: 8,
      name: "Google Maps Platform",
      description: "Location-based services",
      logo: "https://developers.google.com/static/maps/images/maps-icon.svg",
      website: "https://developers.google.com/maps"
    }
  ]
};

const SponsorsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <SponsorsSectionContainer id="sponsors" className="animate-section">
      <SectionContent ref={sectionRef}>
        <SectionHeader>
          <SectionTitle>Our Previous Sponsors</SectionTitle>
          <SectionDescription>
            We're proud to partner with leading technology companies who share our vision of fostering innovation and learning in the developer community.
          </SectionDescription>
        </SectionHeader>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SponsorsGrid>
            {/* Platinum Sponsors */}
            <SponsorTier>
              <TierTitle $type="platinum">Platinum Sponsors</TierTitle>
              <SponsorsList>
                {sponsorsData.platinum.map((sponsor) => (
                  <SponsorCard key={sponsor.id} variants={itemVariants}>
                    <SponsorLogo>
                      <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
                    </SponsorLogo>
                    <SponsorContent>
                      <SponsorName>{sponsor.name}</SponsorName>
                      <SponsorDescription>{sponsor.description}</SponsorDescription>
                      <SponsorLink href={sponsor.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </SponsorLink>
                    </SponsorContent>
                  </SponsorCard>
                ))}
              </SponsorsList>
            </SponsorTier>
            
            {/* Gold Sponsors */}
            <SponsorTier>
              <TierTitle $type="gold">Gold Sponsors</TierTitle>
              <SponsorsList>
                {sponsorsData.gold.map((sponsor) => (
                  <SponsorCard key={sponsor.id} variants={itemVariants}>
                    <SponsorLogo>
                      <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
                    </SponsorLogo>
                    <SponsorContent>
                      <SponsorName>{sponsor.name}</SponsorName>
                      <SponsorDescription>{sponsor.description}</SponsorDescription>
                      <SponsorLink href={sponsor.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </SponsorLink>
                    </SponsorContent>
                  </SponsorCard>
                ))}
              </SponsorsList>
            </SponsorTier>
            
            {/* Silver Sponsors */}
            <SponsorTier>
              <TierTitle $type="silver">Silver Sponsors</TierTitle>
              <SponsorsList>
                {sponsorsData.silver.map((sponsor) => (
                  <SponsorCard key={sponsor.id} variants={itemVariants}>
                    <SponsorLogo>
                      <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
                    </SponsorLogo>
                    <SponsorContent>
                      <SponsorName>{sponsor.name}</SponsorName>
                      <SponsorDescription>{sponsor.description}</SponsorDescription>
                      <SponsorLink href={sponsor.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </SponsorLink>
                    </SponsorContent>
                  </SponsorCard>
                ))}
              </SponsorsList>
            </SponsorTier>
          </SponsorsGrid>
        </motion.div>
      </SectionContent>
    </SponsorsSectionContainer>
  );
};

export default SponsorsSection;