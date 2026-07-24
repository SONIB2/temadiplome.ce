import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-PCRF9CB1D4";

let isInitialized = false;

export const initGA = (): void => {
  if (isInitialized) return;

  ReactGA.initialize(MEASUREMENT_ID, {
    gtagOptions: {
      send_page_view: false,
    },
  });

  isInitialized = true;
};

export const trackPageView = (
  path: string,
  title: string = document.title
): void => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title,
  });
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string
): void => {
  ReactGA.event({
    category,
    action,
    label,
  });
};