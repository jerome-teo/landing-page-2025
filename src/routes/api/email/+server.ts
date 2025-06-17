import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from "./$types";
import { SCRIPTS_API } from '$env/static/private';

export async function GET() {
  console.log("✅ GET /api/email hit");
  return json({ hellog: "world" });
}

export const handle = async ({ event, resolve }) => {
  console.log('➡️', event.request.method, event.url.pathname);
  return resolve(event);
};
// export async function POST({ request }: RequestEvent): Promise<Response> {
//   console.log("Processing POST request");
//   // const { firstName, lastName, age, phoneNumber, email,
//   //   school,
//   //   levelOfStudy,
//   //   countryOfResidence,
//   //   linkedinUrl, } = await request.json();
//   const { userId, name, college, needsTravelStipends } = await request.json();
//   let date = new Date();
//   let datetime = date.toLocaleDateString() + ", " + date.toLocaleTimeString();
//   try {
//     const url = SCRIPTS_API + "?" + new URLSearchParams({
//       endpoint: "upsertOneStatus"
//     });
//     console.log("Posting to URL: ", url);
//     const response = await fetch(url,
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json;charset=UTF-8"
//         },
//         body: JSON.stringify({
//           "name": "JER",
//           "college": "UCL",
//           "userId": "a@a.dgo",
//           "needsTravelStipends": true,
//           "date": "2 fed"
//         })
//       }
//     );
//     const body = await response.json();
//     console.log("Response: ", body);
//     if (response.ok) return json("ok");
//     throw error(response.status, body);
//   } catch (err) {
//     throw error(500, "Internal server error");
//   }
// }



// export async function POST({ request }: RequestEvent) {
//   let rawBody = '';
//   try {
//     rawBody = await request.text();
//     const body = JSON.parse(rawBody);

//     const { userId, name, college, needsTravelStipends } = body;

//     // Example debug response
//     return json({
//       message: 'POST received',
//       received: { userId, name, college, needsTravelStipends },
//       note: 'Processed successfully on server'
//     });
//   } catch (err) {
//     return json({
//       error: 'Invalid JSON',
//       rawBody,
//       note: 'Something went wrong parsing the request'
//     }, { status: 400 });
//   }
// }


export async function POST({ request }: RequestEvent) {
  const body = await request.json();
  console.log('📢 /api/email hit – body =', body);   // ← shows in the dev-server console
  return json({ received: body });
}
// export async function POST({ request }: RequestEvent) {
//   let rawBody = '';
//   const body = await request.json();       // safe again now
//   console.log('✅ body that reached the route:', body);

//   return json({
//     ok: true,
//     message: 'Processed successfully',
//     data: body
//   });

//   try {
//     // Safely read the raw body text
//     rawBody = await request.text();
//     console.log("🟡 Raw body received:", rawBody);

//     // Manually parse JSON
//     const body = JSON.parse(rawBody);
//     console.log("✅ Parsed body:", body);

//     const { userId, name, college, needsTravelStipends } = body;

//     // Validate required fields
//     if (!userId || !name || !college) {
//       return json({
//         error: 'Missing required fields',
//         received: body
//       }, { status: 400 });
//     }

//     // All good — reply with debug info
//     return json({
//       ok: true,
//       message: 'Processed successfully',
//       data: { userId, name, college, needsTravelStipends }
//     });
//   } catch (err) {
//     console.error("💥 Error parsing request:", err);
//     return json({
//       ok: false,
//       error: err,
//       rawBody
//     }, { status: 400 });
//   }
// }

