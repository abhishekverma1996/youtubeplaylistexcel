# YouTube Playlist to Excel Converter

This is a Next.js application that allows users to convert YouTube playlist data into Excel format. Simply enter a YouTube playlist URL and download an Excel file containing the titles and URLs of all videos in the playlist.

## Features

- Extracts all videos from any public YouTube playlist
- Exports data to Excel (.xlsx) format
- No API key required
- Responsive and user-friendly interface
- Real-time processing with loading indicators

## Technologies Used

- [Next.js 16](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [youtubei.js](https://github.com/LuanRT/YouTube.js) for YouTube data extraction
- [xlsx](https://github.com/SheetJS/sheetjs) for Excel file generation

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. Copy the URL of any YouTube playlist
2. Paste it into the input field on the homepage
3. Click "Download Excel"
4. An Excel file with video titles and URLs will be downloaded automatically

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Deployment Guide](DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.