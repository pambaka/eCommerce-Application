export default async function isTokenActive(token: string): Promise<boolean> {
  let isActive: boolean = false;

  await fetch(`https://auth.eu-central-1.aws.commercetools.com/oauth/introspect`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `token=${token}`,
  })
    .then((res) => {
      console.log(res);

      return res.json();
    })
    .then((data) => {
      console.log(data, data.active);

      if (data.active) isActive = true;
    })
    .catch((error) => console.log(error));

  return isActive;
}
