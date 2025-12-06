import * as XLSX from 'xlsx';  
import { Innertube } from 'youtubei.js';

export async function GET(request) {
  try {
    const url = new URL(request.url).searchParams.get('url');
    
    console.log("Received URL:", url);

    if (!url) {
      return new Response(JSON.stringify({ error: 'Playlist URL is required' }), {
        status: 400,
      });
    }

    // Validate YouTube playlist URL
    if (!url.includes('youtube.com/playlist') && !url.includes('youtu.be/playlist')) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube playlist URL' }),
        { status: 400 }
      );
    }

    // Extract playlist ID from URL
    let playlistId;
    if (url.includes('list=')) {
      playlistId = url.split('list=')[1].split('&')[0];
    } else {
      return new Response(
        JSON.stringify({ error: 'Could not extract playlist ID from URL' }),
        { status: 400 }
      );
    }

    // Initialize YouTube client
    const youtube = await Innertube.create();
    
    // Fetch playlist data
    const playlist = await youtube.getPlaylist(playlistId);
    
    // Map data to required format
    const data = playlist.videos.map((video) => ({
      Title: video.title.toString(),
      URL: `https://www.youtube.com/watch?v=${video.id}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Playlist');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="playlist.xlsx"',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong', details: err.message }),
      { status: 500 }
    );
  }
}