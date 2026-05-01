import * as XLSX from "xlsx";
import { Innertube } from "youtubei.js";

export async function GET(request) {
  try {
    const url = new URL(request.url).searchParams.get("url");

    if (!url) {
      return new Response(JSON.stringify({ error: "Playlist URL is required" }), { status: 400 });
    }

    if (!url.includes("list=")) {
      return new Response(JSON.stringify({ error: "Invalid playlist URL" }), { status: 400 });
    }

    const playlistId = url.split("list=")[1].split("&")[0];

    const youtube = await Innertube.create();

    let playlist = await youtube.getPlaylist(playlistId);

    let allVideos = [];

    // 🔁 FIRST BATCH
    allVideos.push(...playlist.videos);
    console.log(`Initial videos fetched: ${playlist.videos.length}`);

    // 🔁 FETCH CONTINUATIONS
    let continuationCount = 0;
    while (playlist.has_continuation) {
      playlist = await playlist.getContinuation();
      allVideos.push(...playlist.videos);
      continuationCount++;
      console.log(`Continuation ${continuationCount} fetched. Total videos so far: ${allVideos.length}`);
    }

    console.log(`Total videos fetched: ${allVideos.length}`);

    // 🧾 Excel data
    const data = allVideos.map((video, index) => ({
      "Sr.No.": index + 1,
      Title: video.title?.toString() || "",
      URL: `https://www.youtube.com/watch?v=${video.id}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Playlist");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="playlist.xlsx"',
      },
    });
  } catch (err) {
    console.error("Error processing playlist:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: err.message }),
      { status: 500 }
    );
  }
}
