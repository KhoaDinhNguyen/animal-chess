const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const fetchGameByGameId = async (gameId: string) => {
  const url = `${SERVER_URL}/game/${gameId}`;

  try {
    const jsonResponse = await fetch(url, {
      method: "GET",
    });

    if (!jsonResponse.ok) throw Error("TODO");

    const respone: Response = await jsonResponse.json();

    console.log(respone);


  } catch (err) {
    console.log(err);
  }

  return null;
}