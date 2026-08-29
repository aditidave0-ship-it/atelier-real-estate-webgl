export async function pushLeadToCRM(lead) {
  const endpoint = process.env.CRM_WEBHOOK_URL;
  const token = process.env.CRM_WEBHOOK_TOKEN;

  if (!endpoint) {
    return { delivered: false, reason: 'crm_not_configured' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(lead)
  });

  if (!response.ok) {
    throw new Error(`CRM delivery failed with status ${response.status}`);
  }

  return { delivered: true };
}
