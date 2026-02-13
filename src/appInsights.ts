import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { setConfig } from '@microsoft/power-apps/app';
import type { Metric } from '@microsoft/power-apps/telemetry';

// Hardcoded per MS docs — env vars aren't supported in code apps
const CONNECTION_STRING =
  'InstrumentationKey=;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/;ApplicationId=';

const initializeAppInsights = () => {
  const appInsights = new ApplicationInsights({
    config: {
      connectionString: CONNECTION_STRING,
    },
  });
  appInsights.loadAppInsights();
  appInsights.trackPageView({ name: 'CodeApp Loaded' });
  return appInsights;
};

const appInsights = initializeAppInsights();

// Forward Power Platform metrics (sessionLoadSummary, networkRequest) to App Insights
setConfig({
  logger: {
    logMetric: (value: Metric) => {
      appInsights.trackEvent(
        {
          name: value.type,
        },
        value.data as Record<string, string | number | boolean | undefined>,
      );
    },
  },
});

export default appInsights;
