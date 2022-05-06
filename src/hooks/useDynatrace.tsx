import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    const dtSource = process.env.REACT_APP_DYNATRACE_SOURCE;
    if (dtSource) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = dtSource;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);
};
