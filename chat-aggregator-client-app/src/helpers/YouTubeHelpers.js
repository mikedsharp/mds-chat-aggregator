const serviceEndpoint = "http://localhost:3000";
const healthEndpoint = `${serviceEndpoint}/health`;

export function getCachebustValue() {
  return Math.random() * 10000000000000000;
}
export async function checkApiHealth() {
  const random = getCachebustValue();
  const healthResult = await fetch(`${healthEndpoint}?cachebust=${random}`, {
    method: "GET",
  });
  const healthData = await healthResult.json();
  return healthData.healthy;
}

export async function getAuthUrl() {
  const youTubeAuthLinkResponse = await fetch(
    `${serviceEndpoint}/authenticate-youtube`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const youTubeAuthLinkData = await youTubeAuthLinkResponse.json();
  return youTubeAuthLinkData.authUrl;
}
