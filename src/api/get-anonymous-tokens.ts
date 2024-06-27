export default async function getAnonymousTokens(): Promise<string | undefined> {
  let token: string | undefined;

  await fetch(`https://auth.eu-central-1.aws.commercetools.com/oauth/${process.env.project_key}/anonymous/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&anonymous_id=${Math.random()}`,
  })
    .then((res: Response) => res.json())
    .then((data) => {
      token = data.access_token;
    })
    .catch((error) => error);

  return token;
}
