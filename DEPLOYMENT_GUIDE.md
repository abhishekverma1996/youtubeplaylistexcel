# Deployment Guide: YouTube Playlist to Excel Converter

This guide explains how to deploy the YouTube Playlist to Excel Converter application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (you can sign up with your GitHub account)
3. Node.js installed locally (for testing purposes)

## Step 1: Push Your Code to GitHub

1. Initialize a Git repository in your project folder:
   ```bash
   cd youtubeplaylist
   git init
   ```

2. Create a `.gitignore` file if it doesn't exist:
   ```bash
   echo "node_modules/" >> .gitignore
   echo ".next/" >> .gitignore
   echo "*.log" >> .gitignore
   ```

3. Commit your code:
   ```bash
   git add .
   git commit -m "Initial commit: YouTube Playlist to Excel Converter"
   ```

4. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name your repository (e.g., "youtube-playlist-excel")
   - Make it public or private as desired
   - Don't initialize with a README

5. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com/dashboard

2. Click "New Project"

3. Import your GitHub repository:
   - Click "Import" next to your repository
   - Grant Vercel access to your GitHub repositories if prompted

4. Configure project settings:
   - Project Name: Leave as default or change as desired
   - Framework Preset: Select "Next.js"
   - Root Directory: Leave as is (should be "/")

5. Environment Variables (if applicable):
   - No environment variables are required for this project since we're not using API keys

6. Click "Deploy"

## Step 3: View Your Deployed Application

1. After deployment completes, you'll see a success screen with your deployment URL

2. Click "Go to Dashboard" to view your project

3. Your application will be live at the provided URL (e.g., https://your-project-name.vercel.app)

## Updating Your Deployment

To update your deployed application after making changes:

1. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

2. Vercel will automatically detect the changes and redeploy your application

## Troubleshooting

### Common Issues

1. **Build Failures**: 
   - Check the build logs in your Vercel dashboard
   - Ensure all dependencies are properly listed in package.json

2. **Runtime Errors**:
   - Check the browser console for JavaScript errors
   - Check the Vercel function logs for API route errors

3. **Deployment Not Triggering**:
   - Ensure you're pushing to the main branch (or the branch Vercel is watching)
   - Check that GitHub integration is properly configured in Vercel

### Support

If you encounter any issues not covered in this guide:
1. Check the Vercel documentation: https://vercel.com/docs
2. Review the Next.js documentation: https://nextjs.org/docs
3. Contact Vercel support through their dashboard