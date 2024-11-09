import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from "./$types";
import { SCRIPTS_API } from '$env/static/private';

export async function POST({ request }: RequestEvent): Promise<Response> {
  console.log("Processing POST request");
  const { userId, name, college, needsTravelStipend } = await request.json();
  let date = new Date();
  let datetime = date.toLocaleDateString() + ", " + date.toLocaleTimeString();
  try {
    const url = SCRIPTS_API + "?" + new URLSearchParams({
      endpoint: "upsertOneStatus"
    });
    console.log("Posting to URL: ", url);
    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          userId,
          name,
          college,
          needsTravelStipend
        })
      }
    );
    const body = await response.json();
    console.log("Response: ", body);
    if (response.ok) return json("ok");
    throw error(response.status, body);
  } catch (err) {
    throw error(500, "Internal server error");
  }
}