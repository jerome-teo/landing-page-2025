import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from "./$types";
import { SCRIPTS_API } from '$env/static/private';

export async function POST({request}: RequestEvent): Promise<Response> {
  console.log("Processing POST request");
  const { userId, name, college, needsTravelStipend } = await request.json();
  try {
    const url = SCRIPTS_API + "?" + new URLSearchParams({
      endpoint: "upsertOneStatus",
      userId,
      name,
      college,
      needsTravelStipend: needsTravelStipend.toString()
    });
    console.log("Posting to URL: ", url);
    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        }
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