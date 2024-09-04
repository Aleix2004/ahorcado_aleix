// src/hooks/usePreventNavigation.js

import { useEffect } from 'react';

const usePreventNavigation = (message = 'You have unsaved changes, do you really want to leave?') => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message]);
};

export default usePreventNavigation;
