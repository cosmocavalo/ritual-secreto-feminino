import { useEffect } from 'react';

const REDIRECT_URL = 'https://portempolimitado.lovable.app';

export const useBackRedirect = () => {
  useEffect(() => {
    // Push a fake state to enable back button detection
    window.history.pushState(null, '', window.location.href);
    
    const handlePopState = () => {
      // Redirect when user tries to go back
      window.location.href = REDIRECT_URL;
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // This triggers when user tries to close tab or change URL
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};
