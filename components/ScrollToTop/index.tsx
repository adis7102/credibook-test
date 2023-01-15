import React from 'react';

const ScrollToTop = () => {

  const scrollToTop = (): void =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  

  return (
    <div className="scroll-top" onClick={() => scrollToTop()}>Back to top!</div>
  )
}

export default ScrollToTop