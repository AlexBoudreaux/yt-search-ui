
# YT Search UI

## Overview
YT Search UI is a sleek, modern React-based web application designed for easy and efficient searching of YouTube videos. This application showcases the power of React in creating responsive and user-friendly interfaces. Deployed with Vercel, the app offers seamless Continuous Deployment (CD) directly from the Git repository, ensuring that the latest features and updates are always live.

## Features
- **React Frontend**: Crafted with the latest React features for a dynamic user experience.
- **Vercel Deployment**: The application is deployed on Vercel for high availability and optimal performance.
- **Continuous Deployment**: Integrated with a Git repository for continuous deployment. Any commits pushed to the repository are automatically deployed to the development environment, making updates hassle-free.
- **Supabase Database**: Utilizes Supabase for robust and scalable database management.
- **Cloud Run API**: Backend API hosted on Google Cloud Run, providing a reliable and scalable serverless solution for handling requests.

## Links
- **Vercel Dashboard**: [Vercel Dashboard](https://vercel.com/alex-boudreaux-s-projects/yt-search-ui)
- **Live Application**: [YT Search UI](https://yt-search-ui.vercel.app/)
- **Database Dashboard**: [Supabase Dashboard](https://supabase.com/dashboard/project/bbrcyfqrvwqbboudayre)
- **API on Cloud Run**: [Cloud Run Dashboard](https://console.cloud.google.com/run?authuser=1&project=yt-search-409720)
- **API URL**: [YT Search API](https://yt-search-api-d6kibk2c6q-ue.a.run.app)
- **API Repository**: [GitHub Repo](https://github.com/AlexBoudreaux/yt-search-api)

## Running the Application Locally

### Prerequisites
- Node.js and npm
- Python 3 and pip

### Setting Up the React App

1. **Clone the Repository**:
   ```
   git clone https://github.com/AlexBoudreaux/yt-search-ui.git
   cd yt-search-ui
   ```

2. **Change API URL**:
   ```
   line 12: const apiUrl = <url>
   ```

3. **Install Dependencies**:
   ```
   npm install
   ```

4. **Run the App**:
   ```
   npm start
   ```
   The app will be available at `http://localhost:3000`.

### Setting Up the API Locally

1. **Clone the API Repository**:
   ```
   git clone https://github.com/AlexBoudreaux/yt-search-api.git
   cd yt-search-api
   ```

2. **Install Python Dependencies**:
   ```
   pip install -r requirements.txt
   ```

3. **Run the API**:
   ```
   export FLASK_APP=main.py   
   flask run
   ```
   The API will be available at `http://localhost:8000`.

### Continuous Deployment with Vercel

The YT Search UI app benefits from Vercel's continuous deployment feature. To deploy updates:

1. **Make Changes**: Update the code in your local development environment.
2. **Commit and Push**:
   ```
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. **Automatic Deployment**: Vercel automatically deploys the new changes to the development environment, making the updates live.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
