/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response("Hello World!");
// 	},
// };

// export default {
//   async fetch(request) {

//     const ua = (request.headers.get("User-Agent") || "").toLowerCase();
//     const accept = request.headers.get("Accept") || "";

//     const isAI =
//       ua.includes("gptbot") ||
//       ua.includes("chatgpt") ||
//       ua.includes("claude") ||
//       ua.includes("anthropic") ||
//       ua.includes("perplexity");

//     // AI / markdown response
//     if (isAI || accept.includes("text/markdown")) {

//       return new Response(
// `# AI Version

// This is markdown content served to AI agents.

// - Fast
// - Lightweight
// - Markdown optimized
// `,
//         {
//           headers: {
//             "Content-Type": "text/markdown; charset=utf-8",
//             "Vary": "Accept, User-Agent",
//             "Link": '</llms.txt>; rel="service-desc"'
//           }
//         }
//       );
//     }

//     // Normal browser response
//     return new Response(
//       `<h1>Normal Website HTML</h1>`,
//       {
//         headers: {
//           "Content-Type": "text/html"
//         }
//       }
//     );
//   }
// };


export default {
  async fetch(request) {

    const url = new URL(request.url);

    const ua = (request.headers.get("User-Agent") || "").toLowerCase();
    const accept = request.headers.get("Accept") || "";

    const isAI =
      ua.includes("gptbot") ||
      ua.includes("chatgpt") ||
      ua.includes("claude") ||
      ua.includes("anthropic") ||
      ua.includes("perplexity");

    // YOUR LOCAL WP SITE
    const origin = "https://relax-surfboard-twitch.ngrok-free.dev";

    // AI markdown version
    if (isAI || accept.includes("text/markdown")) {

      const cleanPath = url.pathname.replace(/\/$/, "");

	  const mdUrl = origin + cleanPath + ".md";

      const response = await fetch(mdUrl);

      return new Response(response.body, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept, User-Agent",
          "Link": '</llms.txt>; rel="service-desc"'
        }
      });
    }

    // Normal HTML version
    return fetch(origin + url.pathname);
  }
};